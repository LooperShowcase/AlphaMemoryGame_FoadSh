let cards = [];
let firstCard, secondCard;
let score = 0;
let lockBoard = false;
const cardsContainer = document.getElementById("cards");
document.getElementById("Score").textContent = score;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCard();
    generateCards();
    console.log(cards);
  });

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
       <div class="front">
       <img class="front-image" src=${card.image}>
      </div>
      <div class="back">
       
      </div>
       `;
    cardsContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
    cardElement.addEventListener("touchstart", flipCard);
  }
}

function shuffleCard() {
  let currentIndex = cards.length;
  let randomIndex;
  let temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function flipCard() {
  if (lockBoard === true) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.name === secondCard.dataset.name) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  firstCard.removeEventListener("touchstart", flipCard);
  secondCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("touchstart", flipCard);
  score++;
  document.getElementById("Score").textContent = score;
  if (score === 9) {
    startConfetti();
  }
  unlockBoard();
}

function unlockBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    unlockBoard();
  }, 1000);
}

function restart() {
  window.location.reload();
}
