window.addEventListener('load', begin)

const levels = {
    easy: 5,
    medium: 3,
    hard: 2
}

let currentLevel = levels.easy;
let time = currentLevel;
let score = 0;
let isPlaying;

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const difficulty = document.querySelector('#difficulty');
const yesButton = document.querySelector('#yesButton');
const noButton = document.querySelector('#noButton');
const mainGame = document.querySelector('#mainGame');
const chooseDif = document.querySelector('#chooseDif');
const startGame = document.querySelector('#startGame');


const words =['English', 'boy', 'hat', 'water', 'computer', 'chocolate', 'cucumber', 'hero', 'child', 'sweet'];

function begin() {
    mainGame.style.display = 'none'
    chooseDif.style.display = 'none'
    yesButton.addEventListener('click', showDif)
    noButton.addEventListener('click', endGame)
}

function showDif() {
    chooseDif.style.display = 'block'
    difficulty.addEventListener('input', chooseLevel)
    startGame.addEventListener('click', init)
}

function endGame() {
    alert('See you next time!');
}

function init() {
    if (difficulty.value === '')
        alert('Please make a choice')
    else {
        isPlaying = true;
        mainGame.style.display = 'block'
        wordInput.focus();
        showWord(words);
        wordInput.addEventListener('input', startMatch);
        countdown();
        setInterval(countdown, 1000);
    }
}

function chooseLevel() {
    if (difficulty.value == 'easy' ){
        currentLevel = levels.easy
    }
    else if (difficulty.value == 'medium'){
    currentLevel = levels.medium
    }
    else if (difficulty.value == 'hard'){
    currentLevel = levels.hard
    }

    seconds.innerHTML = currentLevel
    time = currentLevel + 1
}
function startMatch() {
    if (matchWords()) {
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score ++;
    }
    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    }
    else {
    scoreDisplay.innerHTML = score;
    }
}

function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct';
        return true;
    }
    else {
        message.innerHTML = '';
        return false;
    }
}
function showWord(words) {
    const randIndex = Math.floor(Math.random()*words.length);
    currentWord.innerHTML= words[randIndex];
}
function countdown() {
    if (time>0){
        time--;
    }
    else if (time == 0) {
        isPlaying = false;
    }
    timeDisplay.innerHTML = time;
    console.log(time)
    checkStatus();
}
function checkStatus() {
    if (isPlaying && time === 0) {
        isPlaying = false
        message.innerHTML = 'Game Over!!! Your score is: '+score;
        setTimeout(function() {
            location.reload();
        }, 1000)
    }
}