const activityCards = document.getElementById("activity-cards");

const appendItem = (item) => {
  activityCards.innerHTML += `
        <article class="container-card activity-card--${item.class}">
          <div class="activity-card">
            <div class="activity-card__header">
              <h2 class="activity-card__title">${item.title}</h2>
              <button class="activity-card__options-button">...</button>
            </div>
            <div class="activity-card__time-details">
              <p class="activity-card__current-time">${item.timeframes.weekly.current}hrs</p>
              <p class="activity-card__previous-time">Last Week - ${item.timeframes.weekly.previous}hrs</p>
            </div>
          </div>
        </article>
    `;
};

const populateDOM = (data) => {
  for (const item of data) {
    appendItem(item);
  }
};

fetch("./data.json")
  .then((response) => {
    if (!response.ok) return console.log("Oops! Something went wrong");

    return response.json();
  })
  .then((data) => {
    populateDOM(data);
  });
