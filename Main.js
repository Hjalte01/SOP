//0:rectXRest, 1:rectYRest, 2:left, 3:right, 4:down, 5:playerX, 6:playerY, 7:jump, 8:jumped, 9:roof, 10:baneChange
var rest = [1, 1, true, true, true, 1, 1, false, false, false, false];
var player = { //jeg laver dette array, som tager værdierne senere, som jeg får fra klassen Ball.js i metoden display fra objektet 'xy'.
    x: 0,
    y: 60, //denne værdi er den eneste vigtige da den betyder hvor playeren starter henne, jeg godt kunne havde gjordt noget andet, men det var ikke betydende så længe der ikke fandtes en brik i den y-position i starten af hver bane.
    sz: 0,
}



function setup(){ //jeg danner et canvas og et objekt til klasserne: Bane.js og Ball.js
    createCanvas(1100, 600);
    banen = new Bane(); 
    player1 = new Ball(); 

    banen.banerne(); //Jeg danner den først bane
}


function draw(){

        background(75); //backgrounden og det der hele tiden resetter mit canvas
        
        if(rest[10] == true) banen.banerne(); //hvis baneChange er true, som sker når ens player.x = er nået til 39 brick i x-aksen, som man kan se på variablen this.antalRowsBeforeJump i bane.js.
        rest = banen.banen(player.x, player.y, player.sz, rest[8]); //da inheritance i javascript er besværligt, så valgte jeg at returne objekter for at gøre det nemmest for mig selv + den kalder metoden banen i klassen bane.js

        player1.move(rest[0], rest[1], rest[2], rest[3], rest[4], rest[5], rest[6], rest[9]); //Man kan læse, hvad argumenterne er på linje 1 i kommentaren + den kalder metoden move, som ændre hastigheden på playeren

        player = player1.display(); //objektet player bliver sat til de værdier som xy objekter var sat til i Ball.js og playeren bliver vist.


        
}
//playeren hopper, hvis man enten trykker mellemrum, piltast opad, eller 'w'. Dog skal man også være på en flad flade før det virker.
function keyPressed(){ 
    if(rest[7] == true && key == 'ArrowUp' || rest[7] == true && key == ' ' || rest[7] == true && key == 'w'){
        rest[8] = true;
        player1.jump(); //her intiere man hoppet
    }

}
