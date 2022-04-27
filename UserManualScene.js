//This scene functions as an informative page for the user
class UserManualScene extends Phaser.Scene{ //the scene is a class, so we will be using this a lot to reference
    //methods and variables owned by it. 
constructor()
{
    super("UserManualScene");
    this.level=0
    this.type="";

}
init(data) {
    this.type = data.type;
    if (this.type == "") {
        // No username was provided
        this.type = "0";
    }
    this.level = data.level; // Level of the player
    
    this.playername = data.playername; // Player name

}
preload(){
    this.load.image('home','./assets/infobutton.png');
    this.load.image('info', './assets/information.png');
    this.load.image('BackToTitle', './assets/BackIcon.png');
    
}
create(){
    //create a text box that will display the instructions
    var instructions=this.add.text(90,20,"USER MANUAL",{fontSize: "40px", fill: "white"});
    // information for the main scene helpful tips
    var instructionsMS=this.add.text(20,70,"Main Scene",{fontSize: "30px", fill: "red"});
    var instructions3=this.add.text(30,100,"-Click/Drag items from the bottom\n to interact",{fontSize: "20px", fill: "white"});
    var instructions4=this.add.text(30,140,"-Pet Bars Affected by interacting",{fontSize: "20px", fill: "white"});
    var instructions5=this.add.text(30,165,"-Starting at level 10,user can\n fight their pet",{fontSize: "20px", fill: "white"});

    //info for the fight scene helpful tips
    var instructionsFS=this.add.text(20,205,"Fight Scene",{fontSize: "30px", fill: "red"});
    var instructions6=this.add.text(30,240,"-Random Enemy Selected from user\n list",{fontSize: "20px", fill: "white"});
    var instructions7=this.add.text(30,280,"-Click Attack option to attack \n the enemy",{fontSize: "20px", fill: "white"});
    var instructions8=this.add.text(30,320,"-Additional attacks based on\n The pet's level",{fontSize: "20px", fill: "white"});

    //info for win scene and gameover scene helpful tips
    var instructionsWSGO=this.add.text(20,355,"Win and GameOver",{fontSize: "30px", fill: "red"});
    var instructions9=this.add.text(30,395,"-Win: User win's a fight",{fontSize: "20px", fill: "white"});
    var instructions10=this.add.text(50,425,"-Options Include(Try Again,\n Main Return or Choose Pet)",{fontSize: "20px", fill: "white"});
    var instructions11=this.add.text(30,475,"-GameOver: User's Pet Dies",{fontSize: "20px", fill: "white"});
    var instructions12=this.add.text(50,505,"-Options Include(Try Again,\n or Choose Pet)",{fontSize: "20px", fill: "white"});

    //helpful tip for overall game description
    var Objective=this.add.text(20,550,"Game Objective",{fontSize: "30px", fill: "red"});
    var instructions13=this.add.text(30,590,"-Interact with the pet",{fontSize: "20px", fill: "white"});
    var instructions14=this.add.text(30,625,"-Don't stay idle for over 3 hours ",{fontSize: "20px", fill: "white"});
    var instructions15=this.add.text(30,660,"-or your Pet will runaway or die",{fontSize: "20px", fill: "white"});
    var instructions16=this.add.text(30,695,"-HAVE FUN!!",{fontSize: "20px", fill: "white"});
   //create a button to go back to the choose an egg scene
    let homebutton=this.add.image(380,735,'BackToTitle');
    homebutton.setScale(.35);
    homebutton.setInteractive();
    homebutton.on('pointerup',()=>this.scene.start("MainScene", { type: this.type, level:this.level}));
    
}
update(){
    
}

}
