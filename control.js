var context, controller, Chara, loop;

context = document.querySelector("canvas").getContext("2d");
context.canvas.height = 180;
context.canvas.width = 320;

Chara = {
    height: 32,
    jumping: true,
    width: 32,
    x: 144,
    x_velocity: 0,
    y: 0,
    y_velocity: 0
};

controller = {
    left: false,
    right: false,
    up: false,
    keyListener: function (event) {
        var key_state = (event.type == "keydown")?true:false;
        
        switch(event.keyCode){
            case 65://a key
                controller.left = key_state;
            break;
            case 87://w key
                controller.up = key_state;
            break;
            case 68://d key
                controller.right = key_state;
            break;
        }
    }
};

loop = function(){
    if(controller.up && Chara.jumping == false){
        Chara.y_velocity -= 20;
        Chara.jumping = true;
    }
    if(controller.left){
        Chara.x_velocity -= 0.5;
    }
        if(controller.right){
        Chara.x_velocity += 0.5;
    }
    
    Chara.y_velocity += 1.5;
    Chara.x += Chara.x_velocity;
    Chara.y += Chara.y_velocity;
    Chara.x_velocity *= 0.9;
    Chara.y_velocity *= 0.9;
    
     if (Chara.y > 180 - 16 - 32){
         Chara.jumping = false;
         Chara.y = 180 - 16 - 32;
         Chara.y_velocity = 0;
     }
    
    if (Chara.x < -32) {
    Chara.x = 320;

    } else if (Chara.x > 320){
        Chara.x = -32;
    }
context.fillStyle = "#202020";
context.fillRect(0, 0, 320, 180);
context.fillStyle = "#ff0000";
context.beginPath();
context.rect(Chara.x, Chara.y, Chara.width, Chara.height);
context.fill();
context.strokeStyle = "#202830";
context.lineWidth = 4;
context.beginPath();
context.moveTo(0, 164);
context.lineTo(320, 164);
context.stroke();
    
window.requestAnimationFrame(loop);
    
};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);



