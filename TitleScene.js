

/* This scene is a titlescene that plays first before the user starts the game
*   This is where the user will log into their account
*
*
*/
class TitleScene extends Phaser.Scene{ //the scene is a class, so we will be using this a lot to reference
    //methods and variables owned by it. This is where i make a lot of mistakes lol
constructor()
{
    super("TitleScene");
    this.bgmusic;
    this.type='';
//this.eggNum='';
}

preload()
{  // this is the preload function, it loads all the assets for the scene
    this.load.image("bgname", "./assets/background.png"); //this is how you load assets, it's the name then file path
    this.load.audio("bgmusic", "./assets/gamemusic.mp3"); //you have to specify this.load.image or .audio too
    this.load.image("back", "./assets/TitleSceneBG.png");
    this.load.image("title", "./assets/title.png");
    this.load.image("eggchoice", "./assets/eggchoose.png");
    this.load.image("producer", "./assets/producertag.png");
}

create()
{ 

    this.sound.stopAll();// stop all previous sounds
//this is the create function
//create variable called bg, and make it equal to an image of "bgname" at location (225,400)
    let bg = this.add.image(225,400, "back");
    bg.setScale(.6); //changes the scale of the background image
    this.bgmusic = this.sound.play("bgmusic", { //creates variable called music that plays the music
    volume: 0.5,
    loop: true
    });
    // ADDING THE TITLE AND EGG CHOICE AND PRODUCER TAGS
    var title = this.add.image(225, 65, "title")
    var producerline = this.add.image(225, 145, "producer")
    var eggs = this.add.image(225, 600, "eggchoice")

    let redegg = this.add.sprite(75, 700, "redegg");
    redegg.setScale(2);
    redegg.setInteractive();
    redegg.on('pointerdown',()=>  {this.type="0";});    
    redegg.on('pointerup',()=>{
        this.sound.stopAll();
        this.scene.start('MainScene',{
        type: this.type
    })}

);
//creating pet1 egg animation
    redegg.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('redegg', {
    start: 0,
    end: 3
    }),
    frameRate: 5,
    repeat: -1
    });
    redegg.anims.play('idle');

    let whiteegg = this.add.sprite(375, 700, "whiteegg");
    whiteegg.setScale(2);
    whiteegg.setInteractive();
    whiteegg.on('pointerdown',()=>  {      
    this.type="1";
    });
    whiteegg.on('pointerup',()=>{
    this.sound.stopAll();
    this.scene.start('MainScene',{
    type: this.type
    })}

);
//creating pet2 egganimation
    whiteegg.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('whiteegg', {
    start: 0,
    end: 3
    }),
    frameRate: 5,
    repeat: -1
    });
    whiteegg.anims.play('idle');

    let blueegg = this.add.sprite(225, 700, "blueegg");
    blueegg.setScale(2);
    blueegg.setInteractive();
    blueegg.on('pointerdown',()=>  {      
    this.type="2";
    });
    blueegg.on('pointerup',()=>{
    this.sound.stopAll();
    this.scene.start('MainScene',{
    type: this.type
    })}

);        
//blueegg.on('pointerdown',()=>this.eggNum=='2');
//creating pet3 egg animation
    blueegg.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('blueegg', {
    start: 0,
    end: 3
    }),
    frameRate: 5,
    repeat: -1
    });
    blueegg.anims.play('idle');



    this.tweens.add({ // a tween is kinda like animation lite
    targets: eggs, //this one affects text
    duration: 900,
    alpha: 0, //affects opactiy
    yoyo: true, //yoyo effect
    repeat: -1 //-1 means yes repeat
    });
}
// update(){
//     redegg.on('pointerdown',()=>  {      
//         this.type="0";
//         });
// }
}