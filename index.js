const boxes = document.getElementsByClassName("box");
const winnerTextDiv = document.getElementById("winnerText");
const resetButton = document.getElementById("resetButton");
const turn = document.getElementById("turn");

let isPlayer1Turn = true;
let endGame = false;
const X = "X";
const O = "O";

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

for (let i = 0; i < boxes.length; i++) {
  const box = boxes[i];

  box.addEventListener("click", () => {
    if (!endGame) {
      if (box.innerHTML === "") {
        box.innerHTML = isPlayer1Turn ? X : O;
        turn.innerHTML = isPlayer1Turn ? "Player 2" : "Player 1";
        isPlayer1Turn = !isPlayer1Turn;

        for (let j = 0; j < winCombinations.length; j++) {
          const winCombination = winCombinations[j];
          let value = boxes[winCombination[0]].innerHTML;

          if (
            value !== "" &&
            value === boxes[winCombination[1]].innerHTML &&
            value === boxes[winCombination[2]].innerHTML
          ) {
            let winner = value === X ? 1 : 2;

            endGame = true;
            isPlayer1Turn = true;
            winnerTextDiv.innerHTML = `Player ${winner} wins`;
            resetButton.style.display = "block";
          }
        }

        if (isGameEnded() && !endGame) {
          endGame = true;
          isPlayer1Turn = true;
          winnerTextDiv.innerHTML = `Draw!`;
          resetButton.style.display = "block";
        }
      }
    }
  });
}

function isGameEnded() {
  let boxesArray = Array.from(boxes);

  return boxesArray.every((box) => box.innerHTML.length);
}

resetButton.addEventListener("click", reset);

function reset() {
  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    box.innerHTML = "";
    winnerTextDiv.innerHTML = "";
    resetButton.style.display = "none";
    endGame = false;
  }
}
