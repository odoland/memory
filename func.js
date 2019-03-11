/** "Module for shortcut functions!!" */

function shuffleArray(array) {
    /* Randomly shuffles an array */

    for (let i=0; i < array.length; i++) {
        j = Math.floor(Math.random() * (i));
        [array[i], array[j]] = [array[j], array[i]];
    }
        return array;
}
function range(end) {
    /* Mimics (somewhat) Python's range function, except as a list , and single argument only*/
    return [...Array(end).keys()];
}

function sum(array) {
    return array.reduce( (acc, ele) => acc + ele, 0);
}

function setImage(elementID, src) {
    /* Sets element's image source to src.*/
    document.getElementById(elementID).src = src;
}

function canClick(query, position, clicked) {
    /* Returns boolean on whether the user can click or not.
    * User can click iff they did not click 2 cards already OR
    * If it hasn't been marked as a clicked card. 
    */
    
    return !clicked[position] && query.length < 2;
}

function updateClicked(clicked, status, ...positions) {
    /* updates the array (clicked) status can be either 1 (clicked) or 0 (unclicked) */
    positions.forEach( (i) => clicked[i] = status);
}
function turnCard(position) {
    /* Spins the card animation, to turn the card to reveal */

    
    let card = document.getElementById(`card${position}`);
    let image = document.getElementById(`img${position}`);

    card.style.animation = "spin 1s";
    
    setTimeout( () => {image.src = `images/img${grid[position]}.png`;}, 300);
        
    setTimeout( () => {card.style.animation = "none"}, 500);
}

function isMatch(query, grid) {
    /** Checks if the first card selected (query[0]) is the same imaeg as the second at position (query[1]) */
    return grid[query[0]] === grid[query[1]];
}

function coverCards(...positions) {
    
    function animateCover(i) {

        setTimeout(() => {document.getElementById(`img${i}`).src = `images/back.png`}, 750);
        console.log("running animateCover")
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
    if (sum(clicked) === size*size) {
        // reset the game;
        console.log("game over!!!");
    }
}