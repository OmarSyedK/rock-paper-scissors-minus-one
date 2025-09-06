let yourscore = 0;
let oppenentscore = 0;
let you;
let opponent;

let choices = ["rock", "paper", "scissors"];
let opponentChoice0;
let opponentChoice1;
let userChoice0;
let userChoice1;
let instruction;

window.onload = function() {
    for(let i=0; i < 3; i++) {
        let choice = document.createElement("img");
        choice.id = choices[i];
        choice.src = choices[i] + ".png";
        choice.addEventListener("click", selectChoice);
        document.getElementById("choices").append(choice);
    }
    userChoice0 = document.getElementById("user-choice0");
    userChoice1 = document.getElementById("user-choice1");
    opponentChoice0 = document.getElementById("opponent-choice0");
    opponentChoice1 = document.getElementById("opponent-choice1");

    userChoice0.addEventListener("click", chooseOne);
    userChoice1.addEventListener("click", chooseOne);

    instruction = document.getElementById("instructions");
}

function selectChoice() {
    if(userChoice0.src.includes("empty")){
        userChoice0.src = this.src;
    } else {
        userChoice1.src = this.src;
        let firstChoice = choices[Math.floor(Math.random() * 3)];
        let secondChoise;

        do{
            secondChoise = choices[Math.floor(Math.random() * 3)];
        }while(secondChoise == firstChoice);

        document.getElementById("opponent-choice0").src = firstChoice + ".png";
        document.getElementById("opponent-choice1").src = secondChoise + ".png";
        document.getElementById("choices").hidden = true;
        instruction.innerText = "Choose One!";
    }
}

function chooseOne() {
    if(!userChoice0.src.includes("empty") && !userChoice1.src.includes("empty") && !you && !opponent) {
        if (this ==  userChoice0) {
            userChoice1.hidden = true;
        } else {
            userChoice0.hidden = true;
        }
        let n = Math.floor(Math.random() * 2);
        let opponentChoice;
        if (n==0) {
            opponentChoice = opponentChoice0;
            opponentChoice1.hidden = true;
        } else {
            opponentChoice = opponentChoice1;
            opponentChoice0.hidden = true;
        }
        for(i = 0; i < choices.length; i++) {
            if (getImgName(this).includes(choices[i])){
                you = choices[i];
            }
            if (getImgName(opponentChoice).includes(choices[i])){
                opponent = choices[i];
            } 
        }
        checkWinner();
    }
}

function checkWinner() {
    if(you != opponent) {
        if (you == "rock"){
            if (opponent == "scissors"){
                yourscore++;
            } else if (opponent == "paper") {
                oppenentscore++;
            }
        } else if (you == "paper") {
            if (opponent == "rock") {
                yourscore++;
            } else if (opponent == "scissors") {
                oppenentscore++;
            } 
        } else if (you == "scissors") {
            if (opponent == "paper") {
                yourscore++;
            } else if (opponent == "rock") {
                oppenentscore++;
            }
        }
    }
    document.getElementById("user-score").innerText = yourscore;
    document.getElementById("opponent-score").innerText = oppenentscore;
    setTimeout(resetGame, 3000);
}

function resetGame() {
    you = null;
    opponent = null;
    userChoice0.hidden = false;
    userChoice1.hidden = false;
    opponentChoice0.hidden = false;
    opponentChoice1.hidden = false;

    userChoice0.src = "empty.png";
    userChoice1.src = "empty.png";
    opponentChoice0.src = "empty.png";
    opponentChoice1.src = "empty.png";
    document.getElementById("choices").hidden = false;
    instruction.innerText = "Rock Paper Scissors!"
}

function getImgName(img) {
    let imgSrcArray = img.src.split("/");
    return imgSrcArray[imgSrcArray.length - 1];
}