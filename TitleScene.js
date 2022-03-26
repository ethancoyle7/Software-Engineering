/* This scene is a titlescene that plays first before the user starts the game
*   This is where the user will log into their account
*
*
*/
class TitleScene extends Phaser.Scene{ //the scene is a class, so we will be using this a lot to reference
                                        //methods and variables owned by it. This is where i make a lot of mistakes lol
    constructor(){
        super("TitleScene");
        this.bgmusic;
    }

    preload(){  // this is the preload function, it loads all the assets for the scene
        this.load.image("bgname", "./assets/background.png"); //this is how you load assets, it's the name then file path
        this.load.audio("bgmusic", "./assets/gamemusic.mp3"); //you have to specify this.load.image or .audio too
        
    }

    create()
    { //this is the create function
        //create variable called bg, and make it equal to an image of "bgname" at location (225,400)
        let bg = this.add.image(225,400, "bgname");
        bg.setScale(.7); //changes the scale of the background image
        this.bgmusic = this.sound.play("bgmusic", { //creates variable called music that plays the music
            volume: 0.5,
            loop: true
        });

        let text = this.add.text(225, 400, "CHOOSE AN EGG!!", { //puts text on screen at that location
            fontSize: '36px', //there's a lot of text properties that can be edited here
            fontFamily: 'Minecraft'
        });
        text.setOrigin(0.5, 0.5); //sets like the alignment of the text
        //text.setInteractive(); //sets whether or not the text can be clicked or not
       
        //load up the red egg for the user to start with  
        this.redegg = this.add.sprite(100, 600, "redegg")
          //for the redegg
          this.redegg.setInteractive(); 
          this.redegg.on('pointerdown', ()=>{ // when mouse event, start main scene
              this.sound.stopAll();
              this.scene.start('MainScene');
          });
          //for the white egg
        //creating pet1 egg animation
        this.redegg.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('redegg', {
                start: 0,
                end: 3
            }),
            frameRate: 5,
            repeat: -1
        });
        this.redegg.anims.play('idle');

        //loading up the white egg icon for the user to choose which egg they would liek to start with
        this.whiteegg = this.add.sprite(300, 600, "whiteegg")
         
        this.whiteegg.setInteractive(); 
        this.whiteegg.on('pointerdown', ()=>{ // when mouse event, start main scene
               this.sound.stopAll();
               this.scene.start('MainScene3');
           });
         
        //creating pet2 egganimation
       
        this.whiteegg.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('whiteegg', {
                start: 0,
                end: 3
            }),
            frameRate: 5,
            repeat: -1
        });
        this.whiteegg.anims.play('idle');
        
        this.blueegg = this.add.sprite(200, 600, "blueegg")
          //for the blue egg
        this.blueegg.setInteractive(); 
        this.blueegg.on('pointerdown', ()=>{ // when mouse event, start main scene
              this.sound.stopAll();
              this.scene.start('MainScene2');
          });
       
        //creating pet3 egg animation
        this.blueegg.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('blueegg', {
                start: 0,
                end: 3
            }),
            frameRate: 5,
            repeat: -1
        });
        this.blueegg.anims.play('idle');
        
       
        
        this.tweens.add({ // a tween is kinda like animation lite
            targets: [text], //this one affects text
            duration: 900,
            alpha: 0, //affects opactiy
            yoyo: true, //yoyo effect
            repeat: -1 //-1 means yes repeat
        });

     
    }
}