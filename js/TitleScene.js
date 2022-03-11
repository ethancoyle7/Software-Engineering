/* This scene is a titlescene that plays first before the user starts the game
*   This is where the user will log into their account
*
*
*/
class TitleScene extends Phaser.Scene{ //the scene is a class, so we will be using this a lot to reference
                                        //methods and variables owned by it. This is where i make a lot of mistakes lol
    constructor(){
        super("TitleScene");
    }

    preload(){  // this is the preload function, it loads all the assets for the scene
        this.load.image("bgname", "./assets/background.png"); //this is how you load assets, it's the name then file path
        this.load.audio("bgmusic", "./assets/gamemusic.mp3"); //you have to specify this.load.image or .audio too
        this.load.image('button','./assets/button.png')
    }

    create(){ //this is the create function
        //create variable called bg, and make it equal to an image of "bgname" at location (225,400)
        let bg = this.add.image(225,400, "bgname");
        bg.setScale(.7); //changes the scale of the background image
        let music = this.sound.play("bgmusic", { //creates variable called music that plays the music
            volume: 0.5,
            loop: true
        });

        let text = this.add.text(225, 400, "Tap to Play", { //puts text on screen at that location
            fontSize: '36px', //there's a lot of text properties that can be edited here
            fontFamily: 'Minecraft'
        });
        
        
        text.setOrigin(0.5, 0.5); //sets like the alignment of the text
        text.setInteractive(); //sets whether or not the text can be clicked or not
        this.input.on('pointerdown', ()=>{ // when mouse event, start main scene
            this.sound.removeByKey('bgmusic');
            this.scene.start('MainScene');
        });
        this.tweens.add({ // a tween is kinda like animation lite
            targets: [text], //this one affects text
            duration: 900,
            alpha: 0, //affects opactiy
            yoyo: true, //yoyo effect
            repeat: -1 //-1 means yes repeat
        });
        
    }
}