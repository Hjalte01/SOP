class Ball{
    constructor(){ //Jeg intiere objektet Ball med disse værdier og forklarer dem, som måske ikke giver så meget mening
        this.sz = 25;
        this.x = 200;
        this.y = 500;
        this.xy; //objekt jeg returnere
        this.velocity = createVector(0, 0); //hastigheden der bliver addet til x- og y-aksen
        this.forceUp = -20; //når man hopper, så adder den denne værdi til velocity
        this.friction = 0.9;
        this.rectXRest; //det er den grå kant jeg adder til x-aksen for at få gridet til at passe selv med andre værdier, dog gik jeg lidt væk fra den ide, så hvis man ændre gridets størrelse i Bane.js så bør der være nogle fejl hist og her
        this.rectYRest;
        this.gravity = 0.6;
        this.acceleration = 0.6;
        this.airResistans = 0.95; //hjælper til at lave en ikke lineær velocity ændring, og lidt mere virkeligt
        this.left = true; //om man må / kan trykke på venstre arrowknap og gå mod den retning
        this.right = true;
        this.down = true;
        this.roof = false; //gør sådan at man ikke sidder fast i loftet, indtil velocity går i positiv
        this.history = [] //danner trails
    }




    move(rectXRest, rectYRest, left, right, down, x, y, roof){//igen alternativ form for inheritance med updaterede værdier fra constructoren
        this.rectXRest = rectXRest;
        this.rectYRest = rectYRest;
        this.roof = roof;
        this.left = left;
        this.right = right;
        this.down = down;
        this.x = x;
        this.y = y;
        
        if(this.roof == true){ //man falder, med det samme når man rammer loftet
            this.velocity.y = 0;
        } 
        

        if(this.down == true){ //gør sådan at man falder
            this.velocity.y += this.gravity;
            this.velocity.y *= this.airResistans;
            this.y += this.velocity.y;
        }
        if(this.left == true && keyIsDown(LEFT_ARROW) || this.left == true && keyIsDown(65)){ //gør sådan at man kan gå mod venstre
            this.velocity.x += this.acceleration;
            this.velocity.x *= this.friction;
            this.x -= this.velocity.x;
            if(this.x <= this.sz/2) this.x = this.sz/2;
        }
        if(this.right == true && keyIsDown(RIGHT_ARROW) || this.right == true && keyIsDown(68)){ //gør sådan at man kan gå mod højre
            this.velocity.x += this.acceleration;
            this.velocity.x *= this.friction;
            this.x += this.velocity.x;
            if(this.x >= width-this.sz/2) this.x = width-this.sz/2;
        }

        // Disse if-statements laver boundaries til banen
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
            
        //det næste stykke her adder en trail på bolden
        var v = createVector(this.x, this.y);
        this.history.push(v); //Dette adder den nuværende x og y værdi til historie
        
        //loop der laver selve trailet, jeg skrev at den starter på 1, da
        for(var i = 1; i < this.history.length; i++){ //den først værdi er den samme, som vores player værdi og alligevel bliver overskrevet
            var pos = this.history[i]; 
            fill(0, 255 - (i+1) * 10, 255 - (i+1) * 10);
            ellipse(pos.x, pos.y, this.sz)
        }
        if(this.history.length > 4) this.history.splice(0, 1); //den adder kun 4 trails, men man ser kun 3 af dem
    
    }


    jump(){ //gør såden at playeren hopper
       this.velocity.y = this.forceUp;
    }


    display(){ //viser ens player
        fill(0, 255, 255);
        noStroke();
        circle(this.x, this.y, this.sz); //selve playeren man ser i spillet

        this.xy = { //jeg vil gerne returnere flere værdier, så jeg laver dette array og returnere det
            x: this.x,
            y: this.y,
            sz: this.sz,
        }
        return this.xy;
    }

    
    
}


 