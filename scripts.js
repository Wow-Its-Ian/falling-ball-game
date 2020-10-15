 const character = document.getElementById("character");
 const game = document.getElementById("game");
 let interval;
 let both = 0;
 let counter = 0;
 let currentBlocks = [];

 function moveLeft() {
     const left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
     if(left > 0) {
        character.style.left = left - 2 + "px";
    }
 }

 function moveRight() {
    const left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left < 380) {
        character.style.left = left + 2 + "px";
    }
}

document.addEventListener("keydown", event => {
    if(both === 0) {
        both ++;
        if(event.key === "ArrowLeft") {
            interval = setInterval(moveLeft, 1);
        }
        if(event.key === "ArrowRight") {
            interval = setInterval(moveRight, 1);
        }
    }
})

document.addEventListener("keyup", event => {
    clearInterval(interval);
    both = 0;
})

setInterval(function(){
    let blockLast = document.getElementById("block" + (counter - 1));
    let holeLast = document.getElementById("hole" + (counter - 1));
    
    if(counter > 0) {
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }

    if(blockLastTop < 400 || counter === 0) {
        let block = document.createElement("div")
        let hole = document.createElement("div");

        block.setAttribute("class", "block");
        block.setAttribute("id", "block" + counter);

        hole.setAttribute("class", "hole");
        hole.setAttribute("id", "hole" + counter);

        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";

        let random= Math.floor((Math.random() * 360));
        hole.style.left = random + "px";

        game.appendChild(block);
        game.appendChild(hole);

        currentBlocks.push(counter);

        counter++;
    }
    
    for(let i = 0; i < currentBlocks.length; i++) {
        let current = currentBlocks[i];
        let iblock = document.getElementById("block" + current);
        let ihole = document.getElementById("hole" + current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));

        iblock.style.top = iblockTop - 0.5 + "px";
        ihole.style.top = iblockTop - 0.5 + "px";

        if(iblockTop < -20) {
            currentBlocks.shift();
            iblock.remove();
        }
    }

}, 1);
