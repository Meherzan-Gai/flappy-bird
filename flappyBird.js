
    class Bird {
        constructor(img, width, height, context){
            this.img = img;
            this.x = 100;
            this.y = 100;
            this.width = width;
            this.height = height;
            this.context = context;
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
        if (this.y + 5 >= this.context.canvas.height){
            this.y  = this.context.canvas.height;
        } else {
            this.y += 5;
        }
    }
    
    
    Bird.prototype.draw = function() {
        this.context.drawImage(this.img, this.x, this.y);
    }
    
    class Gap {
        constructor(x, height, width, context){
            this.x = x;
            this.height = height;
            this.width = width || 20;
            this.context = context;
        }
    
    
    }
    
    
    
    Gap.prototype.draw = function(){
        this.context.fillRect(this.x - this.width/2, 0, this.width, this.y - this.height/2); // TOP COLLISION PIPE
    
        this.context.fillRect(this.x - this.width/2, this.y + this.height/2, this.width, 360 - (this.y + this.height/2)); // BOTTOM COLLISION PIPE)
    }
    
    class Scenery{
        constructor(x, y, width, height, xMoveAmount, yMoveAmount, context){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.xMoveAmount = xMoveAmount;
            this.yMoveAmount = yMoveAmount;
            this.image = new Image(width,height);
            this.context = context;
        }
    }
    
    Scenery.prototype.moveScenery = function(){
        this.x -= xMoveAmount;
        this.y -= yMoveAmount;
    }
    
    Scenery.prototype.draw = function(){
        this.image.addEventListener("load", () => {
            this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
        });
    }
    
    class Grass extends Scenery{
        constructor(x, y, width, height, xMoveAmount, yMoveAmount, context){
            super(x, y, width, height, xMoveAmount, yMoveAmount, context);
            this.image.src = 'assets/grass.jpeg';
        }
    }
    
    
    class Cloud extends Scenery{
        constructor(x, y, width, height, xMoveAmount, yMoveAmount, context){
            super(x, y, width, height, xMoveAmount, yMoveAmount, context);
            this.image.src = 'assets/cloud.jpg';
        }
    }

    




function draw(){
    const context = document.querySelector("canvas").getContext("2d", { alpha: false });
    const bodycontext = document.querySelector("body");
    context.canvas.height = bodycontext.clientHeight;
    context.canvas.width = bodycontext.clientWidth;
    context.fillStyle = '#FFFFFF';


    const clouds = [];
    
    for (var i = 0; i < 8; i++){
       clouds.push(new Cloud(i*Math.random()*200+100, i*Math.random()*200+100,40,40,2,0, context));
    }

    for (var i = 0; i < 8; i++){
        clouds[i].draw();
    } 
  
    
}


draw();
