const socket = io();
selectedColor = 'red'
function setup() {

    createCanvas(500, 500);
    background(204);
}

function draw(x, y) {
    stroke(selectedColor);
    point(x, y);
    smooth();
    strokeWeight(5);
}


function mouseDragged(event) {
    draw(mouseX, mouseY);
    socket.emit("getCoordinates", mouseX, mouseY, selectedColor)
}
document.getElementById('clearBtn').addEventListener('click', () => {
    clear()
    background(204);
    socket.emit("clear-canvas", "hello")

})
document.getElementById('color').addEventListener('change', (event) => {
    selectedColor = event.target.value
})


socket.on("receive", (x, y, color) => {
    stroke(color);
    point(x, y);
    smooth();
    strokeWeight(5);
});
socket.on("clear-canvas", () => {
    clear()
    background(204);
})