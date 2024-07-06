const context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 400;
context.canvas.width = 1220;

const bird = {
    img: "assets/bird.jpeg",
    width: 40,
    height: 40,
    hopping: false
};

class gap {
    constructor(x, y, width){
        this.x = x;
        this.y = y;
        this.width = width;
    }
}