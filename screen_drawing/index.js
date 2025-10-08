const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let painting = false;
let currentColor = 'black'

function startPosition(e) {
    painting = true;
    draw(e)
}

function finishPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    
}