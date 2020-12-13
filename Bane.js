class Bane{
    constructor(){
        this.rectXPos = 0;
        this.rectYPos = 0;
        this.rectAntalRowsX = 40;
        this.rectAntalRowsY = this.rectAntalRowsX/2;
        this.lineAntalRowsX = this.rectAntalRowsX-1;
        this.lineAntalRowsY = this.rectAntalRowsY-1;
        if(this.rectAntalRowsX < 2)this.rectAntalRowsX = 2;
        if(this.rectAntalRowsX%2 != 0) this.rectAntalRowsX++;
        this.rectSz = width/this.rectAntalRowsX*0.9;
        this.lineSz = width/(this.rectAntalRowsX-1)*0.05;
        this.rectYRest = (height-this.lineSz*this.lineAntalRowsY-this.rectSz*this.rectAntalRowsY)/2;
        this.rectXRest = (width-(this.rectSz*this.rectAntalRowsX + this.lineSz*this.lineAntalRowsX))/2;
        this.grid = createVector(0, 0);
        this.left = true;
        this.right = true;
        this.down = true;
        this.roof = false;
        this.returnRest = [this.rectXRest, this.rectYRest, this.left, this.right, this.down];
        this.baneArray = [];
        this.baneArray1_1 = [];
        this.baneArray1_2 = [];
        this.baneNumber;
        this.playerX;
        this.playerY;
        this.playerSz;
        this.counter;
        this.antalRowsJump = 35;
        this.antalRowsBeforeJump = 39;
        this.baneChange = false;
        
  
    }


    banerne(){
        this.baneArray1_1 = [
            //  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40
        /* 1 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        /* 2 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        /* 3 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        /* 4 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        /* 5 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        /* 6 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        /* 7 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        /* 8 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        /* 9 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 10 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 11 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 12 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 13 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 14 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 15 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 16 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 17 */ 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 18 */ 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 19 */ 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 20 */ 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,  
        ]
        this.baneArray1_2 = [
            //  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40
        /* 1 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        /* 2 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        /* 3 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        /* 4 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        /* 5 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        /* 6 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        /* 7 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        /* 8 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        /* 9 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 10 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 11 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 12 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 13 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 14 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 15 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 16 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 17 */ 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 18 */ 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 19 */ 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 20 */ 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,  
        ]




        this.baneArray = this.baneArray1_1;
    }


    banen(playerX, playerY, playerSz, jumped){
        this.playerSz = playerSz;
        this.playerX = playerX;
        this.playerY = playerY;
        this.jumped = jumped;
        this.right = true;
        this.left = true;
        this.down = true;
        this.jump = false;
        this.roof = false;
        

        

        for(this.grid.y = 0; this.grid.y < this.rectAntalRowsY; this.grid.y++){ //dette laver det firkantet grid på y-aksen
            for(this.grid.x = 0; this.grid.x < this.rectAntalRowsX; this.grid.x++){ //dette laver det firkantet grid på x-aksen
                this.rectXPos = this.grid.x * this.rectSz + this.grid.x * this.lineSz + this.rectXRest; //blokkens x-position
                this.rectYPos = this.grid.y * this.rectSz + this.grid.y * this.lineSz + this.rectYRest; //blokkens y-position
                this.baneNumber = this.grid.x + this.grid.y * this.rectAntalRowsX; //blokkens id eller nummer ifh. til arrayet
                fill(255);

                





                // hele if-statementet kigger på om baneArray i 'n' er lig med 1 og hvis det er det, så er det en blok, som man kan træde på
                if(this.baneArray[this.baneNumber] == 1 || mouseIsPressed && this.rectXPos <= mouseX && this.rectXPos + this.rectSz >= mouseX && this.rectYPos <= mouseY && this.rectYPos + this.rectSz >= mouseY){
                    this.baneArray[this.baneNumber] = 1;
                    fill(255, 0 ,0);

                    if(this.jumped == false && this.playerX >= this.rectXPos - this.lineSz && this.playerX <= this.rectXPos + this.rectSz + this.lineSz && this.playerY <= this.rectYPos + this.rectSz/2 - 1 && this.playerY + this.playerSz/2 + this.lineSz >= this.rectYPos){
                        this.down = false; // denne if statement gør at man stopper med at udregne tyngdekraften i Ball.js og ens player rykker sig ikke fra y-aksen når man står på en blok
                        this.playerY = this.rectYPos - this.playerSz/2 - this.lineSz;
                        print("down = false: " + this.down);
                    }
                    if(this.playerX >= this.rectXPos - this.lineSz && this.playerX <= this.rectXPos + this.rectSz + this.lineSz && this.playerY >= this.rectYPos + this.rectSz/2 + 1 && this.playerY <= this.rectYPos + this.rectSz + this.playerSz/2 + this.lineSz){
                        this.playerY = this.rectYPos + this.rectSz + this.playerSz/2 + this.lineSz;
                        this.roof = true; // denne if statement gør at man ændre velocity i Ball.js til 0 og ens player falder ned når man rammer en blok oven over en selv
                        print("down = true: " + this.down);
                    }
                    if(this.rectXPos + this.rectSz/2 - 1 >= this.playerX && this.rectXPos <= this.playerX + this.playerSz/2 + this.lineSz && this.rectYPos - this.lineSz <= this.playerY && this.rectYPos >= this.playerY - this.rectSz - this.playerSz/2 - this.lineSz + 1){
                        this.right = false; // denne if statement gør at man ikke kan gå til højre, hvis man rammer en blok ved at trykke højre arrow
                        this.playerX = this.rectXPos - this.playerSz/2 - this.lineSz;
                        print("right = false: " + this.right);
                    }

                    if(this.rectXPos + this.rectSz/2 + 1 <= this.playerX && this.rectXPos + this.rectSz + this.playerSz/2 + this.lineSz >= this.playerX && this.rectYPos - this.lineSz <= this.playerY && this.rectYPos >= this.playerY - this.rectSz - this.playerSz/2 - this.lineSz + 1){ 
                        this.left = false; // denne if statement gør at man ikke kan gå til venstre, hvis man rammer en blok ved at trykke venstre arrow
                        this.playerX = this.rectXPos + this.rectSz + this.playerSz/2 + this.lineSz;
                        print("left = false: " + this.left);
                    }

                    if(this.playerY == this.rectYPos - this.playerSz/2 - this.lineSz){ //gør sådan at playeren kan hoppe på blokkene
                        this.jump = true;
                    }

                } 


                rect(this.rectXPos, this.rectYPos, this.rectSz, this.rectSz);
                
               
                stroke(235);
                strokeCap(SQUARE);
                strokeWeight(this.lineSz*2);
                if(this.grid.y != 0)
                line(this.rectXRest, this.rectYPos, width - this.rectXRest, this.rectYPos);
                if(this.grid.x != 0)
                line(this.rectXPos, this.rectYRest, this.rectXPos, height - this.rectYRest);
                noStroke();
                
               

                //gør sådan at banen ændre sig i sketch.js ved at kalde baneSortering
                if(this.playerX >= this.rectXPos && this.grid.x >= this.antalRowsBeforeJump){
                    this.baneChange = true;
                    this.playerX -= (this.rectSz + this.lineSz) * (this.antalRowsJump + 1) + this.playerSz;
                }


            }
           
            
        }

        this.jumped = false; // gør sådan at playeren kan hoppe ellers ville playeren ikke hopppe når down == false og bare blive på blokken

        if(height - this.playerSz/2 - this.rectYRest == this.playerY){ //gør sådan at playeren kan hoppe i grundfladen
           this.jump = true; 
        } 

        if(this.playerY <= this.rectYRest + this.playerSz/2){ // gør sådan at playeren falder med det samme når den rammer taget
            this.playerY = this.rectYRest + this.playerSz/2;
            this.roof = true;
        }
        this.returnRest = [this.rectXRest, this.rectYRest, this.left, this.right, this.down, this.playerX, this.playerY, this.jump, this.jumped, this.roof, this.baneChange];
        return this.returnRest;
    }




    baneSorting(){
        //rykker arayet og hele gridet, ligesom at rykke ens kamera, sådan at der kommer en ny adition til banen, sådan at det er en lang bane
       
        for(this.counter = 0; this.counter < this.rectAntalRowsX * this.rectAntalRowsY; this.counter ++){
            if(this.counter % this.rectAntalRowsX == 0)this.baneArray.splice(this.counter, this.antalRowsJump);
            if(this.counter % this.rectAntalRowsX >= this.rectAntalRowsX - this.antalRowsJump)this.baneArray.splice(this.counter, 0, this.baneArray1_2[this.counter - (this.rectAntalRowsX - this.antalRowsJump)]);
        }
        this.baneChange = false;
    }


}
