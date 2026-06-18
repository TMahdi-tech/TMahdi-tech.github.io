let vakjes = document.querySelectorAll(".vakje");
let tekst = document.getElementById("tekst");
let reset = document.getElementById("reset");

let naamXEl = document.getElementById("naamX");
let naamOEl = document.getElementById("naamO");
let scoreXEl = document.getElementById("scoreX");
let scoreOEl = document.getElementById("scoreO");

let speler = "X";
let gameOver = false;

let naamX = "";
while (naamX.trim() === "") {
    naamX = prompt("Naam van speler X?");
}

let naamO = "";
while (naamO.trim() === "") {
    naamO = prompt("Naam van speler O?");
}

naamXEl.innerText = naamX;
naamOEl.innerText = naamO;

let scoreX = 0;
let scoreO = 0;

let winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function leegBord() {
  for (let i = 0; i < vakjes.length; i++) {
    vakjes[i].innerText = "";
  }
}

function updateTekstBeurt() {
  if (speler === "X") tekst.innerText = naamX + " (X) is aan de beurt";
  else tekst.innerText = naamO + " (O) is aan de beurt";
}

function checkWin() {
  for (let i = 0; i < winCombos.length; i++) {
    let a = winCombos[i][0];
    let b = winCombos[i][1];
    let c = winCombos[i][2];

    if (
      vakjes[a].innerText != "" &&
      vakjes[a].innerText == vakjes[b].innerText &&
      vakjes[b].innerText == vakjes[c].innerText
    ) {
      gameOver = true;

      if (vakjes[a].innerText === "X") {
        scoreX++;
        scoreXEl.innerText = scoreX;
        tekst.innerText = naamX + " wint!";
      } else {
        scoreO++;
        scoreOEl.innerText = scoreO;
        tekst.innerText = naamO + " wint!";
      }

      return;
    }
  }
}

function checkDraw() {
  let vol = 0;
  for (let i = 0; i < vakjes.length; i++) {
    if (vakjes[i].innerText != "") vol++;
  }
  if (vol === 9 && gameOver === false) {
    tekst.innerText = "Gelijkspel!";
    gameOver = true;
  }
}

for (let i = 0; i < vakjes.length; i++) {
  vakjes[i].addEventListener("click", function () {
    if (gameOver) return;

    if (vakjes[i].innerText == "") {
      vakjes[i].innerText = speler;

      checkWin();
      checkDraw();

      if (gameOver) return;

      if (speler === "X") speler = "O";
      else speler = "X";

      updateTekstBeurt();
    }
  });
}

reset.addEventListener("click", function () {
  leegBord();
  speler = "X";
  gameOver = false; 
  updateTekstBeurt();
});

updateTekstBeurt();
