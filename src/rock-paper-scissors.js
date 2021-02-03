// loading a function from an external dependency
const prompt = require("readline-sync").question;


// object for program to compare user inputs - allows for varied user input
const acceptableVariants = {
  rock: ["rock", "Rock", "r", "R"],
  paper: ["paper", "Paper", "p", "P"],
  scissors: ["scissors", "Scissors", "s", "S"],
  lizard: ["lizard", "Lizard", "l", "L"],
  spock: ["spock", "Spock", "sp", "Sp"],
};



function asStandardChoice(inputStr) {
  /** An nested array: array of array of strings. Object.values() is a method which returns an array. if there are number keys it will enumerate and return them in order */
  const arrayOfVariantArrays = Object.values(acceptableVariants);

  // alternative `for ... of ...` loop syntax - great for arrays
  // this checks if the arguement passed through inputStr is an accepted value and will return that string, otherwise it will return nothing and if called will be undefined
  for (let variantArray of arrayOfVariantArrays) {
    if (variantArray.includes(inputStr)) {
      return variantArray[0];
    }
  }
}


// prints the result in a message calling the makeResultMessage function
function declareWinner(userPick, computerPick) {
  const [resultMessage, replay] = makeResultMessage(userPick, computerPick);
  console.log(resultMessage)
  return replay
}


/**
 * Check if the first choice beats the second choice
 * Set out equivalent weakness. Name is choice, value is weakness
 */
function isWinningChoice(firstChoice, secondChoice) {
  const weaknesses = {
    rock: ["paper", "spock"],
    paper: ["scissors", "lizard"],
    scissors: ["rock", "spock"],
    lizard: ["rock", "scissors"],
    spock: ["lizard", "paper"]
  };
  return weaknesses[secondChoice].includes(firstChoice); // returns true if first choice (user) beats second choice (computer), otherwise false
}


// find the the user's choice and return if valid
function getUserChoice() {
  // constantly loop until a valid input has been stored and returned
  while (true) {
    const answer = prompt("Your choice: rock (r), paper (p), scissors (s), lizard (l), or spock (sp)? \n> "); // ask user question and save into answer variable
    const standardisedChoice = asStandardChoice(answer); // return the standardised choice in case user inputs alternatives/shortened 
    if (standardisedChoice) {
      // if choice can be standardised, we can exit out of the while loop with a return of the standardisd choice
      return standardisedChoice;
    } else {
      // otherwise, log a helpful message and continue the while loop, since nothing/undefined is returned, which is a falsey statement
      console.log(
        "Sorry, I don't recognise that as a choice! \nPlease try 'rock', 'paper' or 'scissors' (without quotation marks)."
      );
    }
  }
} 

function makeResultMessage(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return [`You both chose ${computerChoice} - it's a draw! Let's play again!`, true]; // return true to use to replay game
  } else if (isWinningChoice(userChoice, computerChoice)) {
    return [`Your ${userChoice} beat the computer's ${computerChoice}! You are a mighty champion!`, false];
  } else {
    return [`The computer's ${computerChoice} beat your ${userChoice}! Bad luck...`, false];
  }
}


// Main game function which is called in the index.js file
function playRound() {
  const computerChoice = randomPick(); // call randomPick function to get the computer's choice
  const userChoice = getUserChoice(); // call getUserChoice function
  if (declareWinner(userChoice, computerChoice)) {
    playRound()
  };
}


/* Object.keys() returns an array of the property names in the given object
*/
function randomPick() {
  const choiceOptions = Object.keys(acceptableVariants); // ["rock", "paper", "scissors"]
  const randomIndex = Math.floor(Math.random() * choiceOptions.length); // Generates a random number 0-1 and multiplies by the length of choiceOptions (3) and floors to get an index
  const computerChoice = choiceOptions[randomIndex]; // uses previously generated index to select the computers choice
  return computerChoice; // return computer choice
}

module.exports = {
  asStandardChoice,
  isWinningChoice,
  makeResultMessage,
  playRound,
};
