/** Global constants for timing (delay) */
const CARD_TURN = 300; // Time to 
const CARD_SPIN = 500; // Time to spin card
const CARD_COVER = 800; // Time to wait before covering the card

const VICTORY_DELAY = 800; // Time to wait before announcing victory

/** "Module for shortcut functions!!" */

function shuffleArray(array) {
    /* Randomly shuffles an array - (Fisher-Yates shuffle) */

    for (let i=0; i < array.length; i++) {
        j = Math.floor(Math.random() * (i));
        [array[i], array[j]] = [array[j], array[i]];
    }
        return array;
}
function range(end) {
    /* Partial mimic Python's range function, except as a list, and single argument only*/
    return [...Array(end).keys()];
}

function sum(array) {
    /* sums the elements of the array */
    return array.reduce( (acc, ele) => acc + ele, 0);
}

function removeMiddleElementFromArray(arr) {
    /* Removes the middle element of the array */
    let mid = Math.floor(arr.length/2);
    let last = arr.length - 1;

    [arr[mid], arr[last]] = [arr[last], arr[mid]];
    arr.pop();
}

function canClick(query, position, clicked) {
    /* Returns boolean on whether the user can click or not.
    * User can click iff they did not click 2 cards already OR
    * If it hasn't been marked as a clicked card. 
    */
    return !clicked[position] && query.length < 2;
}

/* Functions for the game logic */

function updateClicked(clicked, status, ...positions) {
    /* updates the array (clicked) status can be either 1 (clicked) or 0 (unclicked) */
    positions.forEach( (i) => clicked[i] = status);
}
function turnCard(position) {
    /* Spins the card animation, to turn the card to reveal */

    let card = document.getElementById(`card${position}`);
    let image = document.getElementById(`img${position}`);

    card.style.animation = "spin 1s";
    
    setTimeout( () => {image.src = `images/img${grid[position]}.png`;}, CARD_TURN);
        
    setTimeout( () => {card.style.animation = "none"}, CARD_SPIN);
}

function isMatch(query, grid) {
    /** Checks if the first card selected (query[0]) is the same imaeg as the second at position (query[1]) */
    return grid[query[0]] === grid[query[1]];
}

function coverCards(...positions) {
    
    function animateCover(i) {

        setTimeout(() => {document.getElementById(`img${i}`).src = `images/back.png`}, CARD_COVER);
    }

    positions.forEach(animateCover);

}

function lockCards(...positions) {

    function removeClickability(position) {
        document.getElementById(`img${position}`).onclick = "";
    }

    positions.forEach(removeClickability);
}

function checkGameEnd(clicked, size) {
    /* Function checks for game end and also ends game */

    function setVictoryScreen() {
        document.querySelector(".grid").innerHTML = ` <img src="images/victory.gif">`
        document.querySelector("#reset").innerHTML = "Play Again!"

    }
    if (sum(clicked) === size*size - (size%2) ) { // odd sizes get extra 1
        // reset the game;
        console.log("Game Over!!!");
        setTimeout(setVictoryScreen, VICTORY_DELAY);
        
        /* Find the lowest score */
        let current_score = parseInt(document.getElementById("score").innerHTML);

        let lowest = Math.min(current_score, localStorage.getItem('lowestScore'));

        localStorage.setItem('lowestScore', lowest);

        document.querySelector("#lowest_score").innerHTML = `<tr> ${lowest} <tr>`
    }
}

function getlocalStorageScore() {
    /* Updates html with localStorage */ 
    const score = localStorage.getItem('lowestScore');
    if (score == null || score == Infinity ) {
        localStorage.setItem('lowestScore', Infinity);
        document.getElementById("lowest_score").innerHTML = "&nbsp";
    } else {
        document.getElementById("lowest_score").innerHTML = score;
    }

}


/* Developer functions */
function cheat(grid) {
    let size = Math.sqrt(grid.length);
    for (let i=0; i<size; i++) {
        console.log(grid.slice(i*size, i*size + size));
    }
}