const {
  asStandardChoice,
  isWinningChoice,
  makeResultMessage,
} = require("./rock-paper-scissors");

test("asStandardChoice returns a standardised choice version of a string", () => {
  expect(asStandardChoice("rock")).toBe("rock");
  expect(asStandardChoice("Rock")).toBe("rock");
  expect(asStandardChoice("r")).toBe("rock");
  expect(asStandardChoice("R")).toBe("rock");

  expect(asStandardChoice("paper")).toBe("paper");
  expect(asStandardChoice("Paper")).toBe("paper");
  expect(asStandardChoice("p")).toBe("paper");
  expect(asStandardChoice("P")).toBe("paper");

  expect(asStandardChoice("scissors")).toBe("scissors");
  expect(asStandardChoice("Scissors")).toBe("scissors");
  expect(asStandardChoice("s")).toBe("scissors");
  expect(asStandardChoice("S")).toBe("scissors");
});

test("asStandardChoice returns undefined for random other input", () => {
  expect(asStandardChoice("apple")).toBeUndefined();
  expect(asStandardChoice("bananas")).toBeUndefined();
  expect(asStandardChoice("Z")).toBeUndefined();
  expect(asStandardChoice(12321)).toBeUndefined();
  expect(asStandardChoice(["rock"])).toBeUndefined();
});

test("isWinningChoice returns true if and only if first argument beats second argument in RPS", () => {
  expect(isWinningChoice("rock", "rock")).toBe(false);
  expect(isWinningChoice("rock", "paper")).toBe(false);
  expect(isWinningChoice("rock", "scissors")).toBe(true);

  expect(isWinningChoice("paper", "rock")).toBe(true);
  expect(isWinningChoice("paper", "paper")).toBe(false);
  expect(isWinningChoice("paper", "scissors")).toBe(false);

  expect(isWinningChoice("scissors", "rock")).toBe(false);
  expect(isWinningChoice("scissors", "paper")).toBe(true);
  expect(isWinningChoice("scissors", "scissors")).toBe(false);
});

test.only("makeResultMessage returns a string reporting the result between player and computer", () => {
  expect(makeResultMessage("rock", "scissors")).toBe(
    "Your rock beat the computer's scissors! You are a mighty champion!"
  );
  expect(makeResultMessage("paper", "rock")).toBe(
    "Your paper beat the computer's rock! You are a mighty champion!"
  );

  expect(makeResultMessage("scissors", "lizard")).toBe(
    "Your scissors beat the computer's lizard! You are a mighty champion!"
  );

  expect(makeResultMessage("rock", "rock")).toBe(
    "You both chose rock - it's a draw!"
  );
  expect(makeResultMessage("paper", "paper")).toBe(
    "You both chose paper - it's a draw!"
  );

  expect(makeResultMessage("rock", "paper")).toBe(
    "The computer's paper beat your rock! Bad luck..."
  );
  expect(makeResultMessage("paper", "scissors")).toBe(
    "The computer's scissors beat your paper! Bad luck..."
  );
});
