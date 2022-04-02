class UserManualScene extends Phaser.Scene{ //the scene is a class, so we will be using this a lot to reference
    //methods and variables owned by it. This is where i make a lot of mistakes lol
constructor()
{
    super("UserManualScene");

}
preload(){
    this.load.image('home','./assets/infobutton.png');
    this.load.image('info', './assets/information.png');
}
create(){
    var informationtext=this.add.image(230,380,"info"); 
        informationtext.setScale(1.2);
        //informationtext.setOrigin(0.5);
    let homebutton=this.add.image(200,100,'home');
    homebutton.setScale(.5);
    homebutton.setInteractive();
    homebutton.on('pointerup',()=>{
        //this.sound.stopAll();// stop the music and load the next scene
        this.scene.start('TitleScene');
    })
}
update(){
    
}

}
