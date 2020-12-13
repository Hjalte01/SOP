class Display{
    constructor(){
        this.startButton;
        }

    
    startScreen(starter){

         

        background(235);
        textSize(30);
        text("Flowets betydning", width/2.5, height/12);
        
        this.startButton = createButton("start");
        this.startButton.position(width/2, height/2);
        
        if(starter == true){
            // this.startButton.remove();
            console.log("Det virker meget mærkeligt");
            return true;
        }
        

        if(starter != true){
            starter = this.startButton.mousePressed(starting);
            if(starter != true) starter = false;
           
        } 
        
        return false;



        
    }
    
    
} 

function starting(){
        console.log("starter");
        return 1;

    }