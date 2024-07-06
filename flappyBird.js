const context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 400;
context.canvas.width = 1220;

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
    }
}

Scenery.prototype.moveScenery = function(){
    this.x -= xMoveAmount;
    this.y -= yMoveAmount;
}

class Grass extends Scenery{
    constructor(x, y, width, height, xMoveAmount, yMoveAmount, image){
        super(x, y, width, height, xMoveAmount, yMoveAmount);
        this.img = 'assets/grass.jpeg';
    }
}


class Cloud extends Scenery{
    constructor(x, y, width, height, xMoveAmount, yMoveAmount, image){
        super(x, y, width, height, xMoveAmount, yMoveAmount);
        this.img = 'assets/cloud.jpeg';
    }
}

