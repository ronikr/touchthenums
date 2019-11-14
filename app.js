"use strict";



var gBoard = [];
var elTimer = document.querySelector('.counter')
var gameInterval;
var time = 0;
var desiredNum = 1;
var clickedNum;
var isGameOn = false;
// render Radio buttons
function renderLevelSelectRadio(levels) {
    var srtHtml = '';
    for (const level in levels) {
        srtHtml += ' <input type="radio" name="level" onclick="selectLevel(this)" value="' + levels[level] + '"'
        if (level === 'defaultLevel') {
            srtHtml+='checked="checked"'
        }
        srtHtml += '> (' + levels[level] * levels[level] + ')'
    }
    var elLevelSelect = document.querySelector(".horizontal-radio");
    elLevelSelect.innerHTML = srtHtml;
}

function createBoard(level) {
    var allNumbersArray = createAllNumbersArray(level);
    pushRandomNumberIntoGameBoard(allNumbersArray, level);
    console.log(gBoard);
}
function renderBoard(gBoard) {
    var srtHtml = '';
    for (const row of gBoard) {
        srtHtml += '<tr>'
        for (const cell of row) {
            srtHtml += '<td id="" onclick="cellClicked(this, gLevel)">' + cell + '</td>'
        }
        srtHtml += '</tr>'
    }
    var elBoard = document.querySelector('.gameBoard');
    elBoard.innerHTML = srtHtml;
}

function createAllNumbersArray(level) {
    var allNumbersArray = [];
    for (var i = 0; i < level * level; i++) {
        allNumbersArray.push(i + 1);
    }
    return allNumbersArray;
};

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pushRandomNumberIntoGameBoard(allNumbersArray, level) {
    for (var i = 0; i < level; i++) {
        gBoard[i] = [];
        for (var j = 0; j < level; j++) {
            var randomNum = getRandomInRange(0, allNumbersArray.length - 1);
            gBoard[i].push(allNumbersArray[randomNum]); // return board into gBoard and don't talk to it directly
            allNumbersArray.splice(randomNum, 1);
        }
    }
}
function selectLevel(value) { // I think I abused gBoard in this code + create function resetGame that is called here
    gBoard = []
    const level = parseInt(value.value);
    createBoard(level);
    renderBoard(gBoard);
}

function startClicked() { //call this startGame and add reset game at begining 
    isGameOn = true;
    gameInterval = setInterval(() => {
        time++;
        elTimer.innerHTML = time;
    }, 1000);

}

function updateTimer() {
    console.log('hi ');
}


function stopClicked() {
    clearInterval(gameInterval);
    elTimer.innerHTML = 0;
    console.log('stopped');
    isGameOn = false; // create function resetGame
    desiredNum = 1;

}

function cellClicked(cell, level) {
    if (isGameOn) {
        clickedNum = parseInt(cell.innerHTML);

        if (desiredNum === clickedNum) {
            desiredNum += 1;
            console.log(clickedNum);
        }
        if (desiredNum === level * level + 1) {
            console.log('win')
            clearInterval(gameInterval);
        }
    }

}
renderLevelSelectRadio(gameLevel);
createBoard(gameLevel.defaultLevel);
renderBoard(gBoard);