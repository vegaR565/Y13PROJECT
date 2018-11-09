class platform {
    constructor(x, y, w, h, c, xSpeed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.xSpeed = xSpeed;
    }
    drawPlat() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }
    
    platMove(){
        this.x += this.xSpeed;
        if(this.x > canvas.width - this.w || this.x < 0){
            this.xSpeed *= -1; // flips opposites move directions   
        }
        
        if(hero.y < canvas.height / 2 && hero.jumping == true){
           this.y += 1;
        }
    }
    playerWin(){
        if(hero.y < platforms[platforms.length-1].y){  //win condition
            bg='green';
               canvasContext.font = "16px Arial";
            canvasContext.fillStyle = "red";
            canvasContext.fillText("YOU WIN! YOUR TOTAL DEATHS ARE =" + deaths, 10 ,20 );
        
        }
    }
    
    
}

  function plaformDraw() {
            var randXgen = Math.floor(Math.random() * 3);
            var platformWidth = Math.floor(Math.random() * (platMaxWidth - platMinWidth) + platMinWidth);
            const plaformHeight = 10;
            var platformXpos = Math.floor(400 / 4 * randXgen); 
            var platformYpos = 800 -  Math.floor(800 / 20 * platformCount);
            
            var platXspeed = Math.random()*(1-.2) + .2;
      
            platformCount++;
        var color = 'grey';
             if(platformCount == platformTotal){
               color = 'red';
            }
        
        var p = new platform(platformXpos, platformYpos, platformWidth, plaformHeight, color, platXspeed);
            
         
            platforms.push(p);//function that randomizes the platforms and draws them
        }
