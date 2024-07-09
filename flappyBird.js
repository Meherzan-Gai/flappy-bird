

function init(){
class Bird {
    constructor(img, width, height){
        this.img = img;
        this.x = 100;
        this.y = 100;
        this.width = width;
        this.height = height;
    }
};

Bird.prototype.flap = function(){
    if (this.y - 5 <= 0){
        this.y = 0;
    } else {
        this.y -= 5;
    }
}

Bird.prototype.fall = function(){
    if (this.y + 5 >= context.canvas.height){
        this.y  = context.canvas.height;
    } else {
        this.y += 5;
    }
}


Bird.prototype.draw = function() {
    context.drawImage(img, this.x, this.y);
}

class Gap {
    constructor(x, height, width){
        this.x = x;
        this.height = height;
        this.width = width || 20;
    }


}



Gap.prototype.draw = function(){
    context.fillRect(this.x - this.width/2, 0, this.width, this.y - this.height/2); // TOP COLLISION PIPE

    context.fillRect(this.x - this.width/2, this.y + this.height/2, this.width, 360 - (this.y + this.height/2)); // BOTTOM COLLISION PIPE)
}

class Scenery{
    constructor(x, y, width, height, xMoveAmount, yMoveAmount){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xMoveAmount = xMoveAmount;
        this.yMoveAmount = yMoveAmount;
        this.image = new Image(width,height);
    }
}

Scenery.prototype.moveScenery = function(){
    this.x -= xMoveAmount;
    this.y -= yMoveAmount;
}

Scenery.prototype.draw = function(){
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
}

class Grass extends Scenery{
    constructor(x, y, width, height, xMoveAmount, yMoveAmount){
        super(x, y, width, height, xMoveAmount, yMoveAmount);
        this.image = 'assets/grass.jpeg';
    }
}


class Cloud extends Scenery{
    constructor(x, y, width, height, xMoveAmount, yMoveAmount){
        super(x, y, width, height, xMoveAmount, yMoveAmount);
        this.image.src = 'assets/cloud.jpg';
    }
}


const clouds = [];

for (var i = 0; i < 8; i++){
    clouds.push(new Cloud(i*Math.random(100,300), Math.random(100,200),40,40,2,0));
}

for (var j = 0; j < 8; j++){
    clouds[j].draw();    
}


}


    




function draw(){
    const context = document.querySelector("canvas").getContext("2d", { alpha: false });
    const bodycontext = document.querySelector("body");
    context.canvas.height = bodycontext.clientHeight;
    context.canvas.width = bodycontext.clientWidth;

    context.beginPath();
    context.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    context.moveTo(110, 75);
    context.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
    context.moveTo(65, 65);
    context.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
    context.moveTo(95, 65);
    context.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
    context.stroke(); 
}

draw();
