
/* Global variables for the game */
var grid = []; // 2d grid holding the image_ids
var query = []; // Holds at most 2 items for the images.
var clicked= [];
var size;


function gameStart() {
    /* Starts the game mode specified by the forms. */
    size = document.getElementById("size").value;

    document.getElementById("opener").remove();
    document.getElementById("game").style.display = "block";

    clicked = new Array(size*size).fill(0); // Fill array with 0s. 1 marks clicked
    populateGrid(size);
    assignCards(size);
    
}

function populateGrid(size) {
    /* Function populates the game with memory cards.
     * @params: size (int) - square dimensions of cards (size x size)
     * updates html to hold cards  
    */ 

    var grid = document.querySelector(".grid");
    let position, html, row;

    // Produces the html for each 
    for (let i=0; i < size; i++) {

        let row = `<div class="row">` 
        for (let j=0; j< size; j++) {
            
            // Position calculated for each row. from 1 .. size**2
            position =  i*size + j;  
            row += `<div class="col-${j}" id="card${position}" onclick="cardClick(${position})">
            <img id="img${position}" src="images/back.png">
            </div>`;
        }

        row += `</div>`;
        grid.innerHTML += row;
    }
}

function assignCards(size) {
    /* This function assigns cards for the memory game.
     * @param size (int) dimensions of the grid
     * 
     * Functions used: range, shuffleArray : are defined in func.js
     * range(5) creates [0, 1, 2, 3, 4]
     * shuffleArray scrambles all elements in the array
    */
    let total = Math.floor((size*size)/2); // Total number of unique pics is the size **2 in half. Floor for odd numbers
    let random_indices = shuffleArray(range(size*size)); // 0, 1, 2, 3.... size**2
    let image_ids = shuffleArray(range(total));

    while(image_ids.length > 0) {
        // Grab one of the image id
        let id = image_ids.pop();
        
        // Grab two random indices to place the image in
        [i1, i2] = [random_indices.pop(), random_indices.pop()];
        [grid[i1], grid[i2]] = [id, id];
    }
    
}
function cardClick(position) {

    if (canClick(query, position, clicked)) {
     
        turnCard(position);
        updateClicked(clicked, 1, position);
        query.push(position);

        if (query.length === 2) {
            
            if (isMatch(query, grid)) { // Is a match
                lockCards(...query); // Lock cards into place
                checkGameEnd(clicked, size); // Will check if the game ended.
            } else {
                coverCards(...query); // cover  cards
                updateClicked(clicked, 0, ...query )
            }
            setTimeout( ()=> query = [], 1000); // Reset
        }

    } else {
        console.log("Cannot click that: ", query, clicked);
    }

    
}
