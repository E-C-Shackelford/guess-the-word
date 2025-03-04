// ***** CREATE GLOBAL VARIABLES *****

// target the unordered list where the player’s guessed letters will appear
const guessedLettersList = document.querySelector(".guessed-letters");

// target the "Guess!" button
const guessButton = document.querySelector(".guess");

// target text input where the player will guess a letter
const letterInput = document.querySelector(".letter");

// target the empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");

// target the paragraph where the remaining guesses will display
const remainingGuessesElement = document.querySelector(".remaining");

// target the span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");

// target the empty paragraph where messages will appear when the player guesses a letter
const messages = document.querySelector(".message");

// target the hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

// starting word to test out the game until words from a hosted file are fetched in a later step
let word = "magnolia";

// this empty array will contain all the letters the player guesses
let guessedLetters = [];

// 8 is the maximum number of guesses the player can make
// the variable remainingGuesses will change over time
let remainingGuesses = 8;

const getWord = async function () {
  const res = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const wordsData = await res.text();
  // console.log(wordsData);

  // transform fetched data into an array
  // each word is separated by a newline (line break), so the delimiter is used to create the array
  const wordArray = wordsData.split("\n");
  // console.log(wordArray);

  // pull a random index from wordArray and remove any extra whitespace around the word
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  // call the placeholders function and pass it the variable storing the random word
  placeholders(word);
};
getWord();

// ***** ADD PLACEHOLDERS FOR EACH LETTER *****

// create a function to update the paragraph’s innerText for the “words-in-progress” element with circle symbols (●) to represent each letter in the word
const placeholders = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    // console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};
// placeholders(word); // 8 circle symbols should display on the screen (one for each letter in the word “magnolia”)

// ***** ADD AN EVENT LISTENER FOR THE GUESS BUTTON *****

guessButton.addEventListener("click", function (e) {
  // prevent default reloading behavior of the form (clicking a button, the form then submitting, and reloading the page)
  e.preventDefault();

  // empty the text of the message element
  messages.innerText = "";

  // capture the value of the input
  const guessInput = letterInput.value;
  // console.log(guessInput);

  // call the function that checks the input and pass it the input value as an argument, then store the result of this function call to a variable
  const goodGuessInput = validateInput(guessInput);
  // console.log(goodGuessInput);

  /*
   make sure that the variable mapped to the result of the function validates that the player’s input is returning a letter and
   if it’s returning a letter, pass it as an argument to your makeGuess function.
   */

  if (goodGuessInput) {
    makeGuess(guessInput);
  }

  // empty the value of the input
  letterInput.value = "";
});

// ***** CHECK PLAYER'S INPUT *****

// validate the player’s input
const validateInput = function (input) {
  // use a regular expression to ensure the player inputs a letter
  const acceptedLetter = /[a-zA-Z]/;

  // each condition has a message directing the player on what to input

  // check if the input is empty
  if (input.length === 0) {
    messages.innerText = "Please enter a letter";
    // check if the input is more than one letter
  } else if (input.length > 1) {
    messages.innerText = "Please enter a single letter";
    // check if a character that doesn’t match the regular expression pattern was entered
  } else if (!input.match(acceptedLetter)) {
    messages.innerText = "Please enter a letter A-Z";
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
    messages.innerText =
      "You've already guessed this letter. Please try again.";
    // if the player hasn't guessed that letter before, add the letter to the guessedLetters array
  } else {
    guessedLetters.push(guessInput);
    console.log(guessedLetters);
    showGuessedLetters();
    // when the guessesRemaining function is called, the argument that's passed is the letter the player guesses
    updateGuessesRemaining(guessInput);
    updateWordInProgress(guessedLetters);
  }
};

// ***** SHOW GUESSED LETTERS *****

// update the page with the letters the player guesses
const showGuessedLetters = function () {
  // empty unordered list where guessed letters display
  guessedLettersList.innerHTML = "";
  for (const letter of guessedLetters) {
    // create a new list item for each letter inside the guessedLetters array
    const li = document.createElement("li");
    li.innerText = letter;
    // add new list item to the unordered list
    guessedLettersList.append(li);
  }
};

// ***** UPDATE THE WORD IN PROGRESS *****

// create a function to update the word in progress that accepts guessedLetters array as a parameter --> this function will replace the circle symbols with the correct letters guessed
const updateWordInProgress = function (guessedLetters) {
  // change the word variable to uppercase
  const wordUpper = word.toUpperCase();
  // split the word string into an array so the letter can appear in the guessedLetters array
  const wordArray = wordUpper.split("");
  // console.log(wordArray);

  // create a new array with the updated characters
  const revealWord = [];
  // check if wordArray contains any letters from guessedLetters array
  for (const letter of wordArray) {
    // if it contains any of the letters, update the circle symbol with the correct letter
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  // console.log(revealWord);
  // update the empty paragraph where the word in progress will appear
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

// ***** COUNT & MONITOR REMAINING GUESSES *****

const updateGuessesRemaining = function (guessInput) {
  // making both the guessed letter and the word that's being guessed uppercase will compare letters with the same casing
  const upperWord = word.toUpperCase();
  // if the word doesn't include the letter that has been guessed, communicate this to the player and subtract 1 from the remainin guesses, else let them know they guessed a correct letter
  if (!upperWord.includes(guessInput)) {
    messages.innerText = `Sorry, but ${guessInput} isn't a letter in the word.`;
    remainingGuesses -= 1;
  } else {
    messages.innerText = `Good guess, ${guessInput} is a letter in the word.`;
  }

  // let the player know how many guesses they have left or if they have used up all guesses and thus reached the end of the game
  if (remainingGuesses === 0) {
    messages.innerHTML = `Sorry, you don't have any guesses left, so the game is now over. The word was <span class="highlight">${word}</span>`;
    startOver();
  } else if (remainingGuesses === 1) {
    // update the span inside the paragraph where the remaining guesses will display
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
};
// the number of guesses will only update when an incorrect guess is made

// ***** CHECK IF THE PLAYER WON *****

const checkIfWin = function () {
  // verify if the word in progress matches the word the player should guess
  if (word.toUpperCase() === wordInProgress.innerText) {
    // if the player has won, add the win class to the empty paragraph where messages appear when the letter is guessed
    messages.classList.add("win");
    // update the paragraph's contents
    messages.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    startOver();
  }
};

// ***** HIDE & SHOW ELEMENTS *****

const startOver = function () {
  // hide the Guess! button, the paragraph where the reamining guesses display, and the unordered list where guessed letters appear
  guessButton.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  guessedLettersList.classList.add("hide");

  playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
  // reset original values
  messages.classList.remove("win");
  messages.innerText = "";
  guessedLettersList.innerText = "";
  remainingGuesses = 8;
  guessedLetters = [];
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;

  // pull the new word
  getWord();

  // show the Guess! button, paragraph with remaining guesses, and guessed letters once more
  guessButton.classList.remove("hide");
  remainingGuessesElement.classList.remove("hide");
  guessedLettersList.classList.remove("hide");

  playAgainButton.classList.add("hide");
});
