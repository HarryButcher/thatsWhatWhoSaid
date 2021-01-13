const quotesURL = "https://www.officeapi.dev/api/quotes/";
const characterURL = "https://www.officeapi.dev/api/characters/";

//GENERATING LIST OF CHARACTER NAMES
axios.get(characterURL).then((response) => {
  charData = response.data.data;
  console.log(charData);
  charData.forEach((item) => {
    fullName = `${item.firstname} ${item.lastname}`;
    const characterContainer = document.querySelector(".characters");
    const characterItem = document.createElement("option");
    characterItem.classList.add("characters__individual");
    characterItem.innerHTML = fullName;
    characterContainer.appendChild(characterItem);
  });
});

//FUNCTION TO GENERATE ID BASED ON USER INPUT
function getCharID(name) {
  separateName = name.split(" ");
  firstname = separateName[0];
  return axios.get(characterURL).then((response) => {
    charData = response.data.data;
    charID = "";
    charData.forEach((item) => {
      if (item.firstname === firstname) {
        charID = item._id;
      }
    });
    return charID;
  });
}

//FUNCTION TO GENERATE QUOTES BASED ON CHARACTER ID
function getQuoteByID(charID) {
  axios
    .get(quotesURL)
    .then((response) => {
      quotesData = response.data.data;
      console.log(quotesData);
      quotesArray = [];
      quotesData.forEach((item) => {
        if (item.character._id === charID) {
          quotesArray.push(item.content);
        }
      });
      console.log(quotesArray);
      let randomQuote =
        quotesArray[Math.floor(Math.random() * quotesArray.length)];
      return randomQuote;
    })
    .then((quote) => {
      // const quoteContainer = document.querySelector('.character__quote')
      const inputContainer = document.querySelector(".quote__container");
      inputContainer.innerHTML = "";
      const quoteContainer = document.createElement("div");
      const quoteBody = document.createElement("div");
      quoteContainer.classList.add("character__quote");
      inputContainer.appendChild(quoteContainer);
      quoteContainer.innerHTML = quote;
    });
}

//EVENT LISTENER
const charForm = document.querySelector(".character__input");
charForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let charName = event.target.character.value;
  getCharID(charName).then((response) => {
    return getQuoteByID(response);
  });
});
