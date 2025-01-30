console.log("Welcome to The Game");
let AudioTurn = new Audio("ting.mp3");
let turn = "X";
let isgameover = false;
let isMultiplayer = true;

const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135]
    ];
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            isgameover = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "600px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
        }
    });
};

const bestMove = () => {
    let emptyBoxes = [];
    let boxtext = document.getElementsByClassName('boxtext');
    for (let i = 0; i < boxtext.length; i++) {
        if (boxtext[i].innerText === '') {
            emptyBoxes.push(i);
        }
    }
    let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    boxtext[randomIndex].innerText = turn;
    turn = changeTurn();
    checkWin();
    if (!isgameover) {
        document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    }
};

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            AudioTurn.play();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
                if (!isMultiplayer && turn === "O") {
                    setTimeout(bestMove, 500);
                }
            }
        }
    });
});

document.getElementById("reset").addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
    document.querySelector('.info').innerText = "Turn for " + turn;
});

document.getElementById("multiplayerMode").addEventListener('click', () => {
    isMultiplayer = true;
    resetGame();
});

document.getElementById("computerMode").addEventListener('click', () => {
    isMultiplayer = false;
    resetGame();
});

const resetGame = () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
    document.querySelector('.info').innerText = "Turn for " + turn;
};
