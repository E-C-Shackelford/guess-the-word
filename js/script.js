// ***** CREATE GLOBAL VARIABLES *****

// target the unordered list where the player’s guessed letters will appear
const guessedLettersList = document.querySelector(".guessed-letters");

// target the "Guess!" button
const guessButton = document.querySelector(".guess");

// target text input where the player will guess a letter
const textInput = document.querySelector(".letter");

// target the empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");

// target the paragraph where the remaining guesses will display
const remainingGuessesElement = document.querySelector(".remaining");

// target the span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");

// target the empty paragraph where messages will appear when the player guesses a letter
const messages = document.querySelector(".message");

// target the hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again hide");

// starting word to test out the game until words from a hosted file are fetched in a later step
const word = "magnolia";

// ***** ADD PLACEHOLDERS FOR EACH LETTER *****

// create a function to update the paragraph’s innerText for the “words-in-progress” element with circle symbols (●) to represent each letter in the word
const placeholders = function (word) {
  const placeholderLetters = [];
  for (const letter in word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};
placeholders(word); // 8 circle symbols should display on the screen (one for each letter in the word “magnolia”)

// ***** ADD AN EVENT LISTENER FOR THE GUESS BUTTON *****

guessButton.addEventListener("click", function (e) {
  // prevent default reloading behavior of the form (clicking a button, the form then submitting, and reloading the page)
  e.preventDefault();

  // capture the value of the input
  const guessInput = textInput.value;
  console.log(guessInput);
  // empty the value of the input
  textInput.value = "";
});
// upon clicking the Guess button, the letter entered into the input field becomes visible in the console
