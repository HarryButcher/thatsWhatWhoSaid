const randomQuote = "https://www.officeapi.dev/api/quotes/random";
const quote = document.querySelector("#quote");
const start = document.querySelector("#startButton");
const reset = document.querySelector("#resetButton");
const userForm = document.querySelector("#userInputForm");
const submitButton = document.querySelector("#submit");
const quoteContainer = document.querySelector("#quoteContainer");
const scoreShown = document.querySelector("#score");
let currentQuoteId;
let scoreCount = 0;
let totalCount = 0;
let duplicateArr = [];

async function generateQuote() {
  axios.get(randomQuote).then((response) => {
    let newQuote = response.data.data.content;
    if (duplicateArr.includes(newQuote)) {
      generateQuote();
      return;
    }
    duplicateArr.push(newQuote);
    quote.innerHTML = newQuote;
    currentQuoteId = response.data.data.character.firstname.toLowerCase();
  });
}

const checkUserInput = (quoteId) => {
  let userInput = userForm.elements.userChoiceInput.value.toLowerCase();
  if (quoteId === userInput) {
    correctAnswer();
    scoreCount++;
    totalCount++;
    scoreShown.innerHTML = scoreCount;
    userForm.elements.userChoiceInput.value = "";
  } else {
    wrongAnswer();
    userForm.elements.userChoiceInput.value = "";
    totalCount++;
  }
};

function checkForm() {
  let input = document.querySelector("#userChoiceInput").value;
  let cansubmit = input.length > 0;
  submitButton.disabled = !cansubmit;
}

function correctAnswer() {
  quote.innerHTML = "Correct!";
  quoteContainer.classList.add("correctAnswer");
  quote.classList.add("correctAnswer");
}

function wrongAnswer() {
  quote.innerHTML = `False! It's ${currentQuoteId}`;
  quoteContainer.classList.add("wrongAnswer");
  quote.classList.add("wrongAnswer");
}

function finish() {
  userForm.classList.add("hide");
  if (scoreCount === 10) {
    quote.innerHTML =
      "Congratulations! 10/10. Dwight would be proud of you. <br> Want enough go? just hit the reset button.";
    quoteContainer.classList.add("winner");
    quote.classList.add("winner");
  } else if (scoreCount >= 7) {
    quote.innerHTML = `Not bad! You got ${scoreCount}/10. <br> Want to try again? Hit the reset button.`;
    quoteContainer.classList.add("winner");
    quote.classList.add("winner");
  } else if (scoreCount >= 5) {
    quote.innerHTML = `Only ${scoreCount}/10... Might be time to open up Netflix and rewatch it. <br> Want another go? Hit the reset button.`;
    quoteContainer.classList.add("loser");
    quote.classList.add("loser");
  } else {
    quote.innerHTML = `Ouch! You suck. Only ${scoreCount}/10. Might be time to rethink your life. <br> Want another go? Hit the reset button`;
    quoteContainer.classList.add("loser");
    quote.classList.add("loser");
  }
}

start.addEventListener("click", function (e) {
  e.preventDefault();
  userForm.classList.remove("hide");
  reset.removeAttribute("disabled");
  start.setAttribute("disabled", true);
  generateQuote();
});

submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  checkUserInput(currentQuoteId);
  setTimeout(function () {
    quoteContainer.classList.remove("correctAnswer");
    quoteContainer.classList.remove("wrongAnswer");
    quote.classList.remove("correctAnswer");
    quote.classList.remove("wrongAnswer");
  }, 700);
  if (totalCount >= 10) {
    finish();
    return;
  }
  setTimeout(function () {
    generateQuote();
  }, 700);
});

reset.addEventListener("click", function (e) {
  e.preventDefault();
  scoreCount = 0;
  totalCount = 0;
  duplicateArr = [];
  scoreShown.innerHTML = scoreCount;
  submitButton.disabled = true;
  quoteContainer.classList.remove("winner");
  quote.classList.remove("winner");
  userForm.classList.remove("hide");
  quoteContainer.classList.remove("loser");
  quote.classList.remove("loser");
  quote.innerHTML = "Goodluck!";
  setTimeout(function () {
    generateQuote();
  }, 1000);
});
