let isPlaying = true;
let Player = "X";
let Computer = "O";

//Just easier at this time, possibility of a infinite loop
//if not handled correctly
let displayLocked = false;

let playerCount = 0;

let board = ["", "", "", "", "", "", "", "", ""];

const squares = document.querySelectorAll(".gameCells");
const winnerToast = document.getElementById("winnerToast");

const winningCombos = [
    [0, 1, 2],  // top row
    [3, 4, 5], // middle row
    [6, 7, 8],  // bottom row

    [0, 3, 6],  // left column
    [1, 4, 7],  // middle column
    [2, 5, 8],  // right column

    [0, 4, 8],  // diagonal TL-BR
    [2, 4, 6],  // diagonal TR-BL

]

document.getElementById("resetBtn").addEventListener("click", event => {
    squares.forEach((square, index) => {
        square.textContent = "";
        board[index] = "";
    });
    playerCount = 0;
    isPlaying = true;
    winnerToast.textContent = "Waiting for a winner!";
    winnerToast.classList.remove("win", "lose");
    displayLocked = false;
});


function CheckWin() {
    for (const [a, b, c] of winningCombos) {
        if (board[a] === "X" && board[b] === "X" && board[c] === "X") {
            winnerToast.textContent = "You Won!";
            winnerToast.classList.add("win");
            isPlaying = false;
            displayLocked = true;
            return true;
        }
        else if (board[a] === "O" && board[b] === "O" && board[c] === "O") {
            winnerToast.textContent = "Computer won!";
            winnerToast.classList.add("lose")
            isPlaying = false;
            displayLocked = true;
            return;
        }
    }


    if (!board.includes("")) {
        isPlaying = false;
        winnerToast.textContent = "Tie!";
        return;
    };
}


squares.forEach(square => {
    square.addEventListener("click", event => {
        if (displayLocked) return;
        if (board[square.id.slice(-1)] != "") return;

        playerCount++;
        square.textContent = Player;
        board[square.id.slice(-1)] = Player;
        if (CheckWin()) return;
      
        ComputerPick();

    });
});


function ComputerPick() {

    let computerChoice = Math.floor(Math.random() * 9);

    if (!isPlaying) {
        return;
    }
    else if (board[computerChoice] != "") {
        ComputerPick();
    }
    else {
        board[computerChoice] = Computer;
        squares[computerChoice].textContent = Computer;
        CheckWin();
    }
}

