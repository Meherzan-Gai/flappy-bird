    class Fish {
        constructor(src, width, height, context){
            this.img = new Image(width, height);
            this.img.src = src;
            this.x = context.canvas.width/2 - width;
            this.y = context.canvas.height/2 - height/2;
            this.width = width;
            this.height = height;
            this.context = context;
        }
    };
    
    Fish.prototype.jump = function(){
        if (this.y - 5 <= 0){
            this.y = 0;
        } else {
            this.y -= 5;
        }
    }
    
    Fish.prototype.fall = function(){
        if (this.y + 5 >= this.context.canvas.height){
            this.y  = this.context.canvas.height;
        } else {
            this.y += 5;
        }
    }
    
    
    Fish.prototype.draw = function() {
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
        this.x -= this.xMoveAmount;
        this.y -= this.yMoveAmount;
        if (this.x + this.width < 0){
            this.x = this.context.canvas.width;
        }

        if (this.y < 0 || this.y + this.height > 200){
            this.yMoveAmount *= -1;
        }
    }
    
    Scenery.prototype.draw = function(){
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    
    class Algae extends Scenery{
        constructor(x, y, width, height, xMoveAmount, yMoveAmount, context, src){
            super(x, y, width, height, xMoveAmount, yMoveAmount, context);
            this.image.src = src;
        }
    }
    
    
    class Cloud extends Scenery{
        constructor(x, y, width, height, xMoveAmount, yMoveAmount, context, src){
            super(x, y, width, height, xMoveAmount, yMoveAmount, context);
            this.image.src = src;
        }
    }

    




    const context = document.querySelector("canvas").getContext("2d", { alpha: false });
    const bodycontext = document.querySelector("body");
    context.canvas.width = bodycontext.clientWidth;
    context.canvas.height = bodycontext.clientHeight;
    context.fillStyle = '#1f41db';
    context.fillRect(0,0,context.canvas.width, context.canvas.height);
    


    const fish = new Fish('assets/fish.png',100,60,context);
    const clouds = [];
    const algae = [];
    
   
    for (var i = 0; i < 8; i++){
        clouds.push(new Cloud(i*Math.random()*200+100, Math.random()*200,60,40, Math.random() * 5, Math.random()*2 , context, 'assets/bubbles.png'));
        algae.push(new Algae(i*200,300,300,context.canvas.height,5,0, context, 'assets/algae.png'));
    }


    function draw(){
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = '#1f41db';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        for (var i = 0; i < 8; i++){
            clouds[i].moveScenery();
            algae[i].moveScenery();
            clouds[i].draw();
            algae[i].draw();
        }
        context.drawImage(fish.img, fish.x, fish.y, fish.width, fish.height);
    }
    
setInterval(draw, 30);

