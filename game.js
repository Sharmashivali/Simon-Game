let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0; // Retrieve high score from localStorage
let h2 = document.querySelector("h2");
let highScoreDisplay = document.querySelector("#high-score");

// Show the high score at the start
highScoreDisplay.innerText = `High Score: ${highScore}`;

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game is started");
        started = true;
        levelUp();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4); // Fix: Random index between 0-3
    let randomColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);
    console.log("Game Sequence:", gameSeq);

    gameflash(randbtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        updateHighScore();
        gameOver();
    }
}

function updateHighScore() {
    if (level > highScore) {
        highScore = level;
        localStorage.setItem("highScore", highScore); // Save high score
        highScoreDisplay.innerText = `High Score: ${highScore}`; // Update display
    }
}

function gameOver() {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start `;
    document.body.classList.add("game-over");

    setTimeout(() => {
        document.body.classList.remove("game-over");
    }, 150);

    reset();
}

function btnPress() {
    let btn = this;
    userflash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
