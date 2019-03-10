function gameStart() {
    document.getElementById("opener").remove();
    document.getElementById("game").style.display = "block";
    populateGrid(16)
}

function populateGrid(size) {
    // http://j4n.co/blog/Creating-your-own-css-grid-system
    var grid = document.querySelector(".grid");
    let n = Math.sqrt(size);

    for (let i=0; i < n; i++) {

        for (let j=i; i< n; j++) {
            
            let position =  i*n + j;

            let html = `<div id="card${i}" class="card" onclick="">
            <img src="https://www.bing.com/th?id=OIP.Sq_tM2AqMkptZpKfoJSEcgHaKu&w=191&h=277&c=7&o=5&dpr=1.25&pid=1.7">
            </div>`;
            grid.innerHTML += html;
        }
    }
}
