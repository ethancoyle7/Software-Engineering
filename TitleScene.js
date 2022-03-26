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
this.type='';
//this.eggNum='';
}

preload()
{  // this is the preload function, it loads all the assets for the scene
this.load.image("bgname", "./assets/background.png"); //this is how you load assets, it's the name then file path
this.load.audio("bgmusic", "./assets/gamemusic.mp3"); //you have to specify this.load.image or .audio too

}

create()
{ 

//this is the create function
//create variable called bg, and make it equal to an image of "bgname" at location (225,400)
let bg = this.add.image(225,400, "bgname");
bg.setScale(.7); //changes the scale of the background image
this.bgmusic = this.sound.play("bgmusic", { //creates variable called music that plays the music
volume: 0.5,
loop: true
});

let text = this.add.text(225, 400, "Choose an egg", { //puts text on screen at that location
fontSize: '36px', //there's a lot of text properties that can be edited here
fontFamily: 'Minecraft'
});
text.setOrigin(0.5, 0.5); //sets like the alignment of the text
// text.setInteractive(); //sets whether or not the text can be clicked or not
// this.input.on('pointerdown', ()=>{ // when mouse event, start main scene
//     this.sound.stopAll();
//     this.scene.start('MainScene',{type:this.eggNum});
//});
let redegg = this.add.sprite(100, 600, "redegg");
redegg.setScale(2);
redegg.setInteractive();
redegg.on('pointerdown',()=>  {      
this.type="0";
});
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

let whiteegg = this.add.sprite(300, 600, "whiteegg");
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

let blueegg = this.add.sprite(200, 600, "blueegg");
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
targets: [text], //this one affects text
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