const inputForm = document.querySelector(".inputForm");
const inputWord = document.querySelector(".inputWord");
const card = document.querySelector(".card")
const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"

inputForm.addEventListener("submit", async event => {
    event.preventDefault();
    const word = inputWord.value;
    if(word) {
        try {
            const wordData = await getWordData(word);
            console.log(wordData);
            displayWordData(wordData);
        } catch(error) {
            console.log(error);
            displayError(error);
        }
    }
    else {
        displayError("Enter a word to search");
    }
});

async function getWordData(word) {
    const search = apiUrl+word
    const response = await fetch(search);
    if(!response.ok) {
        throw new Error("Enter meaningful word");
    }
    return response.json();
}

function displayWordData(data) {
    const w = data[0].word;
    const meaning = data[0].meanings[0].definitions[0].definition;

    card.textContent = "";
    card.style.display = "block"

    const wordDisplay = document.createElement("h1");
    wordDisplay.textContent = w;
    card.appendChild(wordDisplay);

    const meaningDisplay = document.createElement("p");
    meaningDisplay.textContent = meaning;
    card.appendChild(meaningDisplay);
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    card.textContent = "";
    card.style.display = "block";
    card.appendChild(errorDisplay);
}