const activityCards = document.getElementById("activity-cards");
const buttons = document.querySelectorAll(".timeframe-list__button");

let currentTimeframe = "weekly";

const appendItem = (item) => {
  activityCards.innerHTML += `
        <article class="container-card activity-card--${item.class}">
          <div class="activity-card">
            <div class="activity-card__header">
              <h2 class="activity-card__title">${item.title}</h2>
              <button class="activity-card__options-button" aria-label="More options">...</button>
            </div>
            <div class="activity-card__time-details">
              <p class="activity-card__current-time">${
                item.timeframes[currentTimeframe].current
              }hrs</p>
              <p class="activity-card__previous-time">Last ${
                currentTimeframe === "daily"
                  ? "Day"
                  : currentTimeframe === "weekly"
                  ? "Week"
                  : "Month"
              } - ${item.timeframes[currentTimeframe].previous}hrs</p>
            </div>
          </div>
        </article>
    `;
};

const populateDOM = (data) => {
  activityCards.innerHTML = "";
  data.forEach(appendItem);
};

fetch("./data.json")
  .then((response) => {
    if (!response.ok) return console.log("Oops! Something went wrong");

    return response.json();
  })
  .then((data) => {
    populateDOM(data);

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        buttons.forEach((btn) =>
          btn.classList.remove("timeframe-list__button--active")
        );
        e.target.classList.add("timeframe-list__button--active");

        currentTimeframe = e.target.innerText.toLowerCase();
        populateDOM(data);
      });
    });
  })
  .catch((err) => {
    console.error("Error fetching data:", err);
    activityCards.innerHTML = `<p class="error-message">Failed to load data. Please try again later.</p>`;
  });
