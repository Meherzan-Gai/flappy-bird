    class Fish {
        constructor(src, width, height, context){
            this.img = new Image(width, height);
            this.img.src = src;
            this.x = context.canvas.width/2 - width;
            this.y = context.canvas.height/2 - height/2;
            this.width = width;
            this.height = height;
            this.context = context;
            this.velocity = 0;
            this.gravity = 0.0015;
            this.jumpStrength = -0.5;
            this.isJumping = false;
            this.lives = 3;
        }
    };
    
    Fish.prototype.jump = function(){
        this.velocity = this.jumpStrength;
        this.isJumping = false;
    }
    
    Fish.prototype.fall = function(){
        if (this.isJumping){
            this.velocity = this.jumpStrength;
        } else{
            this.velocity += this.gravity;
            this.y += this.velocity;

            if (this.y + this.height > this.context.canvas.height) {
                this.y = this.context.canvas.height - this.height;
                this.velocity = 0;
            } else if (this.y < 0) {
                this.y = 0;
                this.velocity = 0;
            }
        }
    }

    Fish.prototype.hitObstacle = function(gap) {
        if (this.x+this.width > gap.x && this.x < gap.x+gap.gapWidth){

            if (this.y < gap.y || this.y + this.height > gap.y + gap.gapHeight){

                if (gap.isHit === false){
                    this.lives--;
                    gap.isHit=true;
                    gap.x = -1000;
                }
            }
        } 
    }
    
    
    Fish.prototype.draw = function() {
        this.context.drawImage(this.img, this.x, this.y);
    }
    
    class Gap {
       
        constructor(x, y, gapWidth, gapHeight, context){
            this.x = x;
            this.y = y;
            this.gapWidth = gapWidth || 20;
            this.gapHeight = gapHeight || 500;
            this.context = context;
            this.img = new Image();
            this.img.src= 'assets/net.png';
            this.isHit = false;
        }
    
    
    }
    
    
    
    Gap.prototype.draw = function(){
        this.context.drawImage(this.img ,this.x, 0, this.gapWidth, this.y); // TOP COLLISION PIPE
        //this.context.drawImage(this.img, this.x, this.y + this.gapHeight, this.gapWidth, this.context.canvas.height - (this.y + this.gapHeight)); // BOTTOM COLLISION PIPE)
        this.context.fillStyle = '#70481a'
        this.context.fillRect(this.x, 0 , this.gapWidth, this.y);
        this.context.fillRect(this.x, this.y + this.gapHeight, this.gapWidth, this.context.canvas.height - (this.y + this.gapHeight));
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

        if (this.y+this.height < 0){
            this.y = this.context.canvas.height;
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
    
    
    class Bubble extends Scenery{
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
    window.addEventListener("keypress", () => {
        if (event.key === ' ') {
            fish.isJumping = true;
            fish.jump();
        }
    })
    const bubbles = [];
    const tallAlgae = [];
    const shortAlgae = [];
    
   
    for (var i = 0; i < 10; i++){
        for (var j = 0; j < 5; j++){
            bubbles.push(new Bubble(Math.random()*context.canvas.width, Math.random()*context.canvas.height ,60,40, (Math.random() *2+4)/3, Math.random()*4/3, context, 'assets/bubbles.png'));
        }
        tallAlgae.push(new Algae(i*200,400,300,context.canvas.height/1.2, 1.67, 0, context, 'assets/algae.png'));
        shortAlgae.push(new Algae(i*200 + 100,context.canvas.height + 100-context.canvas.height/2, 300, context.canvas.height/2 ,1.67,0, context, 'assets/algae.png'));

    }

    var gaps = [];
    for (var i = 0; i < 40; i++) {  
        gaps.push(new Gap(i * 400+ 1400, Math.random() * context.canvas.height - 100, 40, 250, context));
    }

   


    function draw(){
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = '#1f41db';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        for (var i = 0; i < 10; i++){
            tallAlgae[i].moveScenery();
            tallAlgae[i].draw();

            shortAlgae[i].moveScenery();
            shortAlgae[i].draw();

            for (var j = 0; j < 5; j++){
                bubbles[5*i + j].moveScenery();
                bubbles[5*i + j].draw();
            }
            fish.fall();


        }
        context.drawImage(fish.img, fish.x, fish.y, fish.width, fish.height);
        for (var k = 0; k < gaps.length; k++) {
            gaps[k].draw();
            fish.hitObstacle(gaps[k]);
            gaps[k].x -= 2;
        }
        console.log(fish.lives);
    }
    
setInterval(draw, 10);

