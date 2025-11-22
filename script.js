/* NAVIGATION ------------------------------------------------------*/
function goToGame1() {
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("game1Screen").classList.remove("hidden");
  startPuzzle();
}

function goToGame2() {
  // Stop song1 if still playing
  const song1 = document.getElementById("song1");
  song1.pause();
  song1.currentTime = 0;

  document.getElementById("game1Screen").classList.add("hidden");
  document.getElementById("game2Screen").classList.remove("hidden");
  startMaze();
}

/* TYPEWRITER EFFECT ----------------------------------------------*/
function typeWrite(text, element, speed = 30, callback = null) {
  element.innerHTML = "";
  element.style.display = "block";

  let i = 0;
  const interval = setInterval(() => {
    element.innerHTML += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}

/* GAME 1 — PUZZLE --------------------------------------------------*/
const puzzleBoard = document.getElementById("puzzleBoard");
const game1Msg = document.getElementById("game1Msg");
let draggedPiece = null;

function startPuzzle() {
  const pieces = ["A", "B", "C", "D"].sort(() => Math.random() - 0.5);
  puzzleBoard.innerHTML = "";

  pieces.forEach(letter => {
    let div = document.createElement("div");
    div.classList.add("puzzlePiece");
    div.textContent = letter;
    div.draggable = true;
    puzzleBoard.appendChild(div);
  });

  // Show instruction at start
  document.querySelector("#game1Screen .instruction").style.display = "block";
  puzzleBoard.style.display = "grid"; // ensure puzzle is visible
  game1Msg.style.display = "none";
  document.getElementById("nextToGame2").classList.add("hidden");
}

document.addEventListener("dragstart", e => {
  if (e.target.classList.contains("puzzlePiece")) {
    draggedPiece = e.target;
  }
});

document.addEventListener("drop", e => {
  if (e.target.classList.contains("puzzlePiece")) {
    let temp = e.target.textContent;
    e.target.textContent = draggedPiece.textContent;
    draggedPiece.textContent = temp;
    checkPuzzle();
  }
});

document.addEventListener("dragover", e => e.preventDefault());

function checkPuzzle() {
  const now = [...puzzleBoard.children].map(x => x.textContent).join("");

  if (now === "ABCD") {
    // Hide puzzle and instruction
    puzzleBoard.style.display = "none";
    document.querySelector("#game1Screen .instruction").style.display = "none";

    // Play first song
    const song1 = document.getElementById("song1");
    song1.play();

    // First message
    typeWrite(
      `Close your eyes, baby. Imagine our moments together, imagine us while listening to this song. Nahanap na kita. Mahal na mahal kita, ivie.`,
      game1Msg,
      30,
      () => {
        // After a delay, show final message
        setTimeout(() => {
          typeWrite(
            `CLOSEE YOUR EYES!!                                                     
            FINISH THE SONG BEFORE YOU READ THIS!!!                                                                                                             
Hi love, I was listening to this song and it really made me think about us. “Tahan na, andito ka na”—that line hit me hard kasi it feels like I’ve finally found my home in you.

Every part of the song reminds me of how lucky I am to have you. “Kay ganda ng langit at ng 'yong mata sa gitna ng ilaw ng ating siyudad”—no matter what’s going on around us, when I see you, everything just feels right. I love how we can laugh, talk, or just be silent together, and it still feels perfect.

I want you to know, through thick and thin, I’m always yours. You’re my safe place, my comfort, my forever. Thank you for being here and making my world brighter. 💖

I can’t wait to make more memories with you, sana hanggang dulo na 'to. I’m all yours. 💞`,
            game1Msg,
            40,
            () => {
              document.getElementById("nextToGame2").classList.remove("hidden");
            }
          );
        }, 1000);
      }
    );
  }
}

/* GAME 2 — MAZE ---------------------------------------------------*/
const maze = document.getElementById("maze");
const finalMsg = document.getElementById("finalMessage");
const mazeControls = document.querySelector(".controls");

let playerPos = { x: 0, y: 0 };

function startMaze() {
  maze.innerHTML = "";
  playerPos = { x: 0, y: 0 };

  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    if (i === 0) cell.classList.add("player");
    if (i === 24) cell.classList.add("goal");

    maze.appendChild(cell);
  }

  // Show instructions and controls
  document.querySelector("#game2Screen .instruction").style.display = "block";
  maze.style.display = "grid";
  mazeControls.style.display = "flex";
  finalMsg.style.display = "none";
}

function move(direction) {
  let { x, y } = playerPos;

  if (direction === "up" && y > 0) y--;
  if (direction === "down" && y < 4) y++;
  if (direction === "left" && x > 0) x--;
  if (direction === "right" && x < 4) x++;

  playerPos = { x, y };
  renderMaze();

  if (x === 4 && y === 4) finishMaze();
}

function renderMaze() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(c => c.classList.remove("player"));

  const index = playerPos.y * 5 + playerPos.x;
  cells[index].classList.add("player");
}

function finishMaze() {
  const song2 = document.getElementById("song2");
  song2.play();

  // Hide maze and controls
  maze.style.display = "none";
  mazeControls.style.display = "none";
  document.querySelector("#game2Screen .instruction").style.display = "none";

 const fullMessage = `Hi, baobei! <3
I just want to tell you again how much I truly appreciate you. Every day, I feel so lucky and grateful to have you in my life — for your laughter, your kindness, your patience, and just for being the amazing person that you are. Salamat sa pagtitiwala mo sa akin, and for taking risks with me, even when things feel uncertain.

Even though we’re in an LDR, every moment we spend together feels so real. Watching movies with you — kahit sa gmeet lang — makes me feel like you’re right beside me. Those moments make the distance feel smaller, and they make me fall more in love with you every single time.

I’m so thankful for everything we share — our jokes, late-night calls, and all our small and big moments. Thank you for understanding me, for supporting me, and for loving me in your own sweet ways.

I love you more than words can ever express. You’re my best friend, my partner, my safe space, and my favorite person in the whole world. I promise to always cherish you, support you, and make you feel special every day.

Thank you for being my everything. I love you so much, ngayon at magpakailanman 💖
You mean so much to me. I appreciate you every single day. I love you, baby!`;

typeWrite(fullMessage, finalMsg, 25);

        
}

