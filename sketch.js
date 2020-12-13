//0:rectXRest, 1:rectYRest, 2:left, 3:right, 4:down, 5:playerX, 6:playerY, 7:jump, 8:jumped, 9:roof, 10:baneChange
var rest = [1, 1, true, true, true, 1, 1, false, false, false, false];
var ground = 2;
var pause = 0;
var player = {
    x: 10,
    y: 60,
    sz: 1,
}



function setup(){
    createCanvas(1100, 600);
    banen = new Bane();
    player1 = new Ball(); 

    banen.banerne();
}


function draw(){
        
        textSize(200);
        text('d', width+100, 1111);

        background(75);
        
        if(rest[10] == true) banen.banerne();
        rest = banen.banen(player.x, player.y, player.sz, rest[8]);

        ground = player1.move(rest[0], rest[1], rest[2], rest[3], rest[4], rest[5], rest[6], rest[9]);

        player = player1.display();


        
}

function keyPressed(){
    if(rest[7] == true && key == 'ArrowUp' || rest[7] == true && key == ' ' || rest[7] == true && key == 'w'){
        rest[8] = true;
        player1.jump();
    }

}
