class Player {
    constructor(x, y, w, h, c, xVel, yVel, jumping) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.xVel = xVel;
        this.yVel = yVel;
        this.jumping = jumping;
    }

    drawPlayer() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
         
    }
 

    
    playerMove() { // function that adds speed according to key pressed to move the character
        
        if (leftKey) {
            this.x -= this.xVel;
        }
        if (rightKey) {
            this.x += this.xVel;
        }
        if (upKey && this.jumping == false && startFall == false) {
            this.yVel = -10;
            if(grounded == true){
                deaths++;
                grounded = false;
            }
            this.jumping = true;
        }

        if (this.x < 0 - this.w) {
            this.x = canvas.width;

        } else if (this.x > canvas.width) {
            this.x = 0 - this.w;
         
        }
            this.yVel += 0.1;
        this.y += this.yVel
        this.yVel *= 0.92 ;//gravity
      
    }
    
    playerStartFall(){
        if(this.y > canvas.height * 0.5 ){
           startFall = false;
        }// timer before the start of the game to stop a cheating problem that occurs when you can jump directly on the start
    }
    playerOnSurface() {
        if (this.y >= canvas.height - this.h) {
            this.y = canvas.height - this.h;
            this.yVel = 0;
            this.jumping = false;
            grounded = true;
        }// flips jumping to false so you can jump again after landing
    }
        
    platformHit(item) {
        return (this.x <= (item.x + item.w) &&
                (this.x + this.w) >= item.x) &&
            (this.y <= (item.y + item.h) &&
                (this.y + this.h) >= item.y);
    }
    hasplatformHit(platform) {
        return this.platformHit(platform);
    }
    hasCollided() {
        var self = this;
        var collided = false;
	
        platforms.forEach(function(platform, i){
			if(self.hasplatformHit(platform)) {
				
				if(self.y + self.h >= platform.y && self.y + self.h < platform.y + platform.h){ 
				   	self.yVel = -0.15;
					self.jumping = false;
				} // landing ontop platform
				
				if(self.y <= platform.y + platform.h && self.jumping == true){
				  self.yVel = 0.5
					console.log('ouch')
				}// head collision to platform
				
				if(self.x + self.w >= platform.x && self.y + self.h > platform.y + 1 && self.x < platform.x + platform.w){
				   	self.xSpeed = -0.15;

				} // right side of player hits platform
				if(self.x <= platform.x + platform.w && self.y + self.h > platform.y + 1 && self.x > platform.x){
				   	self.xSpeed = 0.15;
				} // left side of player hits platform
				collided = true;
			}
        });
    }
}
