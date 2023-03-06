playerOneClicks = [];
playerTwoClicks = [];
playerOneScore = 0;
playerTwoScore = 0;
tieScore = 0;
clickCounter = 0;
valueArray = [];
cells = document.querySelectorAll(".cell");
h6 = document.getElementById("turnColor");
refresh = document.getElementById("button");
winnerDeclaration = document.getElementById("winner-declaration");
winnerText = document.getElementById("winner-text");
restartBtn = document.getElementById("restart-after-win");
clearScore = document.getElementById("clear-score");

winningPatterns = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9],
  ];
// making the cells clickable
cells.forEach((cell) => {
    cell.addEventListener(
      "click",
      (e) => {
        const turn = document.getElementById("turnTracker");
        let target = e.target;
        console.log(target.id);
        valueArray.push(Number(target.id));
        if (clickCounter % 2 === 0) {
          target.innerText = "X";
          turn.classList.remove("fa-x");
          turn.classList.add("fa-o");
          playerOneClicks.push(Number(target.id));
          h6.style.color = "#F2B147";
          target.style.color = "#3CC4BF";
        } else {
          target.innerText = "O";
          turn.classList.remove("fa-o");
          turn.classList.add("fa-x");
          playerTwoClicks.push(Number(target.id));
          h6.style.color = "#3CC4BF";
          target.style.color = "#F2B147";
        }
        clickCounter++;
        if (playerOneClicks.length >= 3 || playerTwoClicks.length >= 3) {
          if (checkForWinner(playerOneClicks)) {
            winnerDeclaration.classList.toggle("show-winner");
            winnerText.innerText = "The winner is player one!";
            winnerText.style.color = "#F2B147";
          } else if (checkForWinner(playerTwoClicks)) {
            winnerDeclaration.classList.toggle("show-winner");
            winnerText.innerText = "The winner is player two!";
            winnerText.style.color = "#3CC4BF";
            playerTwoPlaceholder.innerText = playerTwoScore;
          } else if (clickCounter === 9) {
            winnerDeclaration.classList.toggle("show-winner");
            winnerText.innerText = `It's a tie ¯\_(ツ)_/¯ `;
            winnerText.style.color = "lightgrey";
          }
        }
      },
      { once: true }
    );
  });

restartBtn.addEventListener("click", restartAndClear);
refresh.addEventListener("click", restartAndClear)
  
  function restartAndClear() {
    window.location.reload();
  }
  
  function checkForWinner(arr) {
    return winningPatterns.some((combinations) => {
      return combinations.every((element) => {
        return arr.includes(element);
      });
    });
  }
  
