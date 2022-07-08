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

// this empty array will contain all the letters the player guesses
const guessedLetters = [];

// ***** ADD PLACEHOLDERS FOR EACH LETTER *****

// create a function to update the paragraph’s innerText for the “words-in-progress” element with circle symbols (●) to represent each letter in the word
const placeholders = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
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

  // empty the text of the message element
  messages.value = "";

  // call the function that checks the input and pass it the input value as an argument, then store the result of this function call to a variable
  const goodGuessInput = validateInput(guessInput);
  console.log(goodGuessInput);

  /*
   make sure that the variable mapped to the result of the function validates that the player’s input is returning a letter and
   if it’s returning a letter, pass it as an argument to your makeGuess function.
   */

  if (goodGuessInput) {
    makeGuess(guessInput);
  }
});
// upon clicking the Guess button, the letter entered into the input field becomes visible in the console

// ***** CHECK PLAYER'S INPUT *****

// validate the player’s input
const validateInput = function (input) {
  // use a regular expression to ensure the player inputs a letter
  const acceptedLetter = /[a-zA-Z]/;

  // each condition has a message directing the player on what to input

  // check if the input is empty
  if (input.length === 0) {
    message.innerText = "Please enter a letter";
    // check if the input is more than one letter
  } else if (input.length > 1) {
    message.innerText = "Please enter a single letter";
    // check if a character that doesn’t match the regular expression pattern was entered
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Please enter a letter A-Z";
    // if all other conditions aren’t met, the input is a letter, which is what's desired, so the input is returned
  } else {
    return input;
  }
};

// ***** CAPTURE INPUT *****

const makeGuess = function (guessInput) {
  // convert all letters to one casing since JS is case-sensitive — convert letter parameter to uppercase
  guessInput = guessInput.toUpperCase();
  // check if guessedLetters array already contains that letter
  if (guessedLetters.includes(guessInput)) {
    message.innerText = "You've already guessed this letter. Please try again.";
    // if the player hasn't guessed that letter before, add the letter to the guessedLetters array
  } else {
    guessedLetters.push(guessInput);
    console.log(guessedLetters);
  }
};
