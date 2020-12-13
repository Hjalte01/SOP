class Ball{
    constructor(){
        this.sz = 25;
        this.x = width/2.5;
        this.y = 500;
        this.xy;
        this.velocity = createVector(0, 0);
        this.forceUp = -25;
        this.friction = 0.9;
        this.rectXRest;
        this.rectYRest;
        this.gravity = 0.6;
        this.acceleration = 0.6;
        this.airResistans = 0.95;
        this.left = true;
        this.right = true;
        this.down = true;
        this.roof = false;
    }




    move(rectXRest, rectYRest, left, right, down, x, y, roof){
        this.rectXRest = rectXRest;
        this.rectYRest = rectYRest;
        this.roof = roof;
        this.left = left;
        this.right = right;
        this.down = down;
        this.x = x;
        this.y = y;
        
        if(this.roof == true){
            this.velocity.y = 0;
        } 
        

        if(this.down == true){
            this.velocity.y += this.gravity;
            this.velocity.y *= this.airResistans;
            this.y += this.velocity.y;
        }
        if(this.left == true && keyIsDown(LEFT_ARROW) || this.left == true && keyIsDown(65)){
            this.velocity.x += this.acceleration;
            this.velocity.x *= this.friction;
            this.x -= this.velocity.x;
            if(this.x <= this.sz/2) this.x = this.sz/2;
        }
        if(this.right == true && keyIsDown(RIGHT_ARROW) || this.right == true && keyIsDown(68)){
            this.velocity.x += this.acceleration;
            this.velocity.x *= this.friction;
            this.x += this.velocity.x;
            if(this.x >= width-this.sz/2) this.x = width-this.sz/2;
        }


        if(this.x < this.rectXRest + this.sz/2){
            this.x = this.rectXRest + this.sz/2;
        }
        if(this.x > width - this.rectXRest - this.sz/2){
            this.x = width - this.rectXRest - this.sz/2;
        }
        if(this.y > height - this.sz/2 - this.rectYRest){
            this.y = height - this.sz/2 - this.rectYRest;
        }
        if(this.y < this.sz/2 + this.rectYRest){
            this.y = this.sz/2 + this.rectYRest;
        }
            

    

        return height - this.rectYRest - this.sz/2;
    }


    jump(){
       this.velocity.y = this.forceUp;
    }


    display(){
        fill(255, 0, 0);
        strokeWeight(0);
        circle(this.x, this.y, this.sz);

        this.xy = {
            x: this.x,
            y: this.y,
            sz: this.sz,
        }


        return this.xy;
    }

    
    
}


 