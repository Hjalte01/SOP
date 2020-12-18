class Bane{
    constructor(){  //Der er virkelig mange værdier her og mange af dem er nok lidt ligegyldig men for at skabe overskud for mig selv og de flest giver god mening, men jeg vil prøve at forklare resten
        this.rectXPos = 0;  //positionen for den første firkants/brik/blok i gridets x-position
        this.rectYPos = 0;
        this.rectAntalRowsX = 40; //antallet af rækker af firkanter i x-aksen
        if(this.rectAntalRowsX < 2)this.rectAntalRowsX = 2; // gør sådan at antal rækker i x-aksen ikke kan være mindre end 2
        if(this.rectAntalRowsX%2 != 0) this.rectAntalRowsX++; // gør sådan at antal rækker i x-aksen skal være et positiv tal
        this.rectAntalRowsY = this.rectAntalRowsX/2;
        this.lineAntalRowsX = this.rectAntalRowsX-1; //antalet af linjer i mellem, hver firkant i x-aksen
        this.lineAntalRowsY = this.rectAntalRowsY-1;
        this.rectSz = width/this.rectAntalRowsX*0.9; // størrelsen på brikkene / firkanterne i gridet
        this.lineSz = width/(this.rectAntalRowsX-1)*0.05;
        this.rectYRest = (height-this.lineSz*this.lineAntalRowsY-this.rectSz*this.rectAntalRowsY)/2; //igen den grå kant længde i y-aksen
        this.rectXRest = (width-(this.rectSz*this.rectAntalRowsX + this.lineSz*this.lineAntalRowsX))/2;
        this.grid = createVector(0, 0); //positionen af firkanterne i gridet bruges i loopet til at danne hele gridet
        this.left = true; //igen hvis den er true, så kan man godt gå mod venstre
        this.right = true;
        this.down = true;
        this.roof = false; //man kan ikke svæve i loftet og falder direkte ned
        this.returnRest = [this.rectXRest, this.rectYRest, this.left, this.right, this.down]; //noget der skal returners og bruges i de andre klasser
        this.baneArray = []; //selve banen der kører
        this.baner = []; //Alle banerne
        this.nextBane; //Udregner den næste bane ud fra den der lige har kørt
        this.tempNextBane; //hjælper til denne udregning af den næste bane
        this.baneArray1_1 = []; //bane 1
        this.baneArray1_2 = []; //bane 2
        this.brik2Array = []; //er alle brik 2, som er de grønne brikke der forsvinder og dukker op.
        this.brik2Counter = 140; //Det er counteren til brik2Array, og ændre hastigheden de grønne brikke dukker op igen
        this.baneNumber; // brikkens nummer / id til arrayet
        this.playerX;
        this.playerY;
        this.playerSz;
        this.antalRowsJump = 40; //jeg startede med at ændre to array ved at fjerne hvert første værdi i x-aksen og adde dem ind fra et andet array men det laggede for meget, så dette bruges bare til at ændre playerens x-værdi når man skifter bane
        this.antalRowsBeforeJump = 39; //skifter bane når x-værdien er større end brik 39
        this.baneChange = false; //skifter banen
        this.newArrayString = ''; //printer hele arrayet ud med kommentare, sådan at det nemt at lave nye baner
        this.brik0 = false; //i såkaldt developer mode, så kan man adde en usynlig blok, som bare er et 0 på det punkt man klikker
        this.brik1 = false; // Her adder man en rød brik der hvor man klikker
        this.brik2 = false; // her adder man en grøn brik, for at se dette, så skal du ned og udkommentere developer mode
        
        
  
    }


    banerne(){
        /*
        Banerne i spillet dem neden under og kommentaren med 1, 2, 3 viser hvor brikkene ville være i spillet
        Dette er ikke nødvendigt, jeg synes bare det var rart at visuelt kunne se det, da jeg programmerede koden og
        pga. jeg tænkte det var nemmere for andre at forstå min kode.
        da jeg i developer mode kan danne disse array meget nemt, forklarer developer mode i metoden banen, men i realiteten
        Så kan jeg danne dem ved at trykke 'enter' i developer mode, også bruge det jeg får i consolen og print det ind som en ny bane
        */
        this.baneArray1_1 = [
           //  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40
        /* 1 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        /* 2 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        /* 3 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        /* 4 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        /* 5 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        /* 6 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        /* 7 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        /* 8 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        /* 9 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 10 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 11 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 12 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 13 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 14 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 15 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 16 */ 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 17 */ 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 18 */ 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 19 */ 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
       /* 20 */ 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1  
        ]
        this.baneArray1_2 = [
            //  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40
        /* 1 */ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        /* 2 */ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        /* 3 */ 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 
        /* 4 */ 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 
        /* 5 */ 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 
        /* 6 */ 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 
        /* 7 */ 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 
        /* 8 */ 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 
        /* 9 */ 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 
       /* 10 */ 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 
       /* 11 */ 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 
       /* 12 */ 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 
       /* 13 */ 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 
       /* 14 */ 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 
       /* 15 */ 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 
       /* 16 */ 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 
       /* 17 */ 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
       /* 18 */ 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
       /* 19 */ 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
       /* 20 */ 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1  
        ]
            //banen er en random af de to baner
        this.nextBane;
        this.baner = [this.baneArray1_1, this.baneArray1_2];
        do{
            this.tempNextBane = Math.floor(Math.random() * Math.floor(this.baner.length));
            this.nextBane;
        }
        while(this.tempNextBane == this.nextBane);
        
        this.nextBane = this.tempNextBane;
        this.baneArray = this.baner[this.tempNextBane];

        this.baneChange = false;
    }


    banen(playerX, playerY, playerSz, jumped){ //updatere værdierne
        this.playerSz = playerSz;
        this.playerX = playerX;
        this.playerY = playerY;
        this.jumped = jumped;
        this.right = true;
        this.left = true;
        this.down = true;
        this.jump = false;
        this.roof = false;
        
        
        //gør sådan at banen ændre sig i sketch.js ved at kalde baneSortering
        if(this.playerX >= this.rectXPos && this.grid.x >= this.antalRowsBeforeJump){
            this.baneChange = true;
            this.playerX -= (this.rectSz + this.lineSz) * (this.antalRowsJump + 1) + this.playerSz;
            for(var i = 0; i < this.brik2Array.length; i++){ //gør sådan at brik2 forsvinder, så den ikke overlaper
                if(this.brik2Array[i] != undefined){
                    this.brik2Array[i] = undefined;
                    this.baneArray[i] = 2;
                }
            }
            
        }
        

        for(this.grid.y = 0; this.grid.y < this.rectAntalRowsY; this.grid.y++){ //dette laver det firkantet grid på y-aksen
            for(this.grid.x = 0; this.grid.x < this.rectAntalRowsX; this.grid.x++){ //dette laver det firkantet grid på x-aksen
                this.rectXPos = this.grid.x * this.rectSz + this.grid.x * this.lineSz + this.rectXRest; //blokkens x-position
                this.rectYPos = this.grid.y * this.rectSz + this.grid.y * this.lineSz + this.rectYRest; //blokkens y-position
                this.baneNumber = this.grid.x + this.grid.y * this.rectAntalRowsX; //blokkens id eller nummer ifh. til arrayet
                fill(255);

                

                //dette er developer mode, hvor man nemt kan danne baner, og manuere rundt
                /*             // <-- slet '/*' denne for at prøve developer mode
                if(keyIsDown(48)){ // '0' når du venstrer klikker, så sletter du brikke
                    this.brik0 = true;
                    this.brik1 = false;
                    this.brik2 = false;
                }else if(keyIsDown(49)){ // '1' når du venstre klikker, så tilføjer du røde brikke
                    this.brik0 = false;
                    this.brik1 = true;
                    this.brik2 = false;
                }else if(keyIsDown(50)){ // '2' når du venstre klikker, så tilføjer du grønne brikke
                    this.brik0 = false;
                    this.brik1 = false;
                    this.brik2 = true;
                }
                // Dette if statement tilføjer brikkene når man ventre klikker
                if(mouseIsPressed && mouseButton === LEFT && this.rectXPos <= mouseX && this.rectXPos + this.rectSz >= mouseX && this.rectYPos <= mouseY && this.rectYPos + this.rectSz >= mouseY){
                    if(this.brik0) this.baneArray[this.baneNumber] = 0;
                    if(this.brik1) this.baneArray[this.baneNumber] = 1;
                    if(this.brik2) this.baneArray[this.baneNumber] = 2;
                }
                if(keyIsDown(13)){ // 'enter' knap, printer banen ud i et array, som jeg kan kopiere ind i metoden banerne for at danne en ny bane
                    this.newArrayString = '';
                    for(var i = 0; i < 800; i++){
                        if(i%40 == 0) this.newArrayString += '\/* ' + (i/40 + 1) + ' *\/ ';
                        this.newArrayString += banen.baneArray[i] + ', ';
                    }     
                    print(this.newArrayString);
                }
                if(keyIsDown(69)){ // 'e', gør sådan at man kan lettere komme igennem banerne
                    this.down = false;
                    this.jump = true;
                    this.jumped = false;
                }
                */               // <-- slet '*/' denne for at prøve developer mode
                //oven over er developer mode, jeg sætter det i kommentar når jeg aflevere det, da det ikke er en feature til spillet 
                //Hvis du har lyst, så kan du prøve det ved at afkomentere det 'crl + k + u' for at afkommentere og 'ctl + k + c' for at kommentere det igen



                if(this.brik2Array[this.baneNumber] != undefined) this.brik2Array[this.baneNumber] ++; //gør sådan at de grønne blokke kan tælle op med 1



                // hele if-statementet kigger på om baneArray i 'n' er lig med 1 eller 2 og hvis det er det, så er det en blok, som man kan træde på
                if(this.baneArray[this.baneNumber] == 1 || this.baneArray[this.baneNumber] == 2 && this.baneChange == false || this.brik2Array[this.baneNumber] >= this.brik2Counter){
                    
                    if(this.baneArray[this.baneNumber] == 1){ //hvis brikken er lig med 1, så bliver dne rød
                        fill(255, 0 ,0); //rød farve
                    } 
                    if(this.baneArray[this.baneNumber] == 2 || this.brik2Array[this.baneNumber] >= this.brik2Counter){ //banearray i 'n' lig med 2
                      
                        if(this.brik2Array[this.baneNumber] == undefined) this.brik2Array[this.baneNumber] = 0; //gør sådan at brikkene får en værdi
                        if(this.brik2Array[this.baneNumber] >= this.brik2Counter && this.baneArray[this.baneNumber] == 2){ //hvis værdien de har er større end counteren, som var ca. 140, så sættes banearray i nummeret til 0 og den bliver dermed en hvid usynlig brik
                            this.baneArray[this.baneNumber] = 0;
                            this.brik2Array[this.baneNumber] = 0;
                        }
                        if(this.brik2Array[this.baneNumber] >= this.brik2Counter && this.baneArray[this.baneNumber] == 0){ //hvis værdien næste gang, så er større end counteren, så sættes den til 2, som er den grønne brik
                            this.baneArray[this.baneNumber] = 2;
                            this.brik2Array[this.baneNumber] = 0;
                        } 
                        fill(0, 255, 0); //grøn farve





                    }

                    if(this.jumped == false && this.playerX >= this.rectXPos - this.lineSz && this.playerX <= this.rectXPos + this.rectSz + this.lineSz && this.playerY <= this.rectYPos + this.rectSz/2 - 1 && this.playerY + this.playerSz/2 + this.lineSz >= this.rectYPos){
                        this.down = false; // denne if statement gør at man stopper med at udregne tyngdekraften i Ball.js og ens player rykker sig ikke fra y-aksen når man står på en blok
                        this.playerY = this.rectYPos - this.playerSz/2 - this.lineSz;
                        // print("down = false: " + this.down);
                    }
                    if(this.playerX >= this.rectXPos - this.lineSz && this.playerX <= this.rectXPos + this.rectSz + this.lineSz && this.playerY >= this.rectYPos + this.rectSz/2 + 1 && this.playerY <= this.rectYPos + this.rectSz + this.playerSz/2 + this.lineSz){
                        this.playerY = this.rectYPos + this.rectSz + this.playerSz/2 + this.lineSz;
                        this.roof = true; // denne if statement gør at man ændre velocity i Ball.js til 0 og ens player falder ned når man rammer en blok oven over en selv
                        // print("down = true: " + this.down);
                    }
                    if(this.rectXPos + this.rectSz/2 - 1 >= this.playerX && this.rectXPos <= this.playerX + this.playerSz/2 + this.lineSz && this.rectYPos <= this.playerY && this.rectYPos >= this.playerY - this.rectSz - this.playerSz/2){
                        this.right = false; // denne if statement gør at man ikke kan gå til højre, hvis man rammer en blok ved at trykke højre arrow
                        this.playerX = this.rectXPos - this.playerSz/2 - this.lineSz;
                        // print("right = false: " + this.right);
                    }

                    if(this.rectXPos + this.rectSz/2 + 1 <= this.playerX && this.rectXPos + this.rectSz + this.playerSz/2 + this.lineSz >= this.playerX && this.rectYPos <= this.playerY && this.rectYPos >= this.playerY - this.rectSz - this.playerSz/2){ 
                        this.left = false; // denne if statement gør at man ikke kan gå til venstre, hvis man rammer en blok ved at trykke venstre arrow
                        this.playerX = this.rectXPos + this.rectSz + this.playerSz/2 + this.lineSz;
                        // print("left = false: " + this.left);
                    }

                    if(this.playerY == this.rectYPos - this.playerSz/2 - this.lineSz){ //gør sådan at playeren kan hoppe på blokkene
                        this.jump = true;
                    }
                } 

                rect(this.rectXPos, this.rectYPos, this.rectSz, this.rectSz); //det der danner alle blokkene / brikkene
            
                //Det næste her er det der danner linjerne i mellem hver blok
                stroke(235);
                strokeCap(SQUARE);
                strokeWeight(this.lineSz*2);
                if(this.grid.y != 0)
                line(this.rectXRest, this.rectYPos, width - this.rectXRest, this.rectYPos);
                if(this.grid.x != 0)
                line(this.rectXPos, this.rectYRest, this.rectXPos, height - this.rectYRest);
                noStroke();
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
        return this.returnRest; //returnere objektet this.returnRest, som bliver sat lige oven over
    }




    


    

}


