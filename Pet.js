class Pet{
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x
     * @param {number} y
     */
    constructor(scene){
        this.petdance=null;
        this.scene =scene;
        this.choice = '';
        //this.x=x;
        //this.y=y;
    }
// preload(){
//  //this.preload.spritesheet('egg','./assets/death.png',{
//    //  frameWidth: 32,
//      //frameHight: 32,
//  //});
// }
// create(){

// }
// update(){

// }
// Feed(){
//     //hp goes up by some value
// }
// play(){

// }
//bathe(){

//}

eggAnimation(choice){
    let petdance = this.add.sprite(200, 250,"pet2lightattack");
        petdance.setScale(5);
        // Create the idle animation
        petdance.anims.create({
            key: 'idle1',
            frames: this.anims.generateFrameNumbers('pet2lightattack', {
                start:0,
                end:3
            }),
            frameRate: 8,
            repeat: -1
        });
        petdance.anims.create({
            key: 'feed',
            frames: this.anims.generateFrameNumbers('pet3climb', {
                frames: [0, 3]
            }),
            frameRate: 8,
            repeat: -1
        });
        
        petdance.anims.play(choice);
}
Pet2Animation(choice){
    let pet2dance = this.add.sprite(200,250,"pet2");
    pet2dance.setScale(5);
    pet2dance.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('pet2', {
            frames: [0, 5]
        }),
        frameRate: 8,
        repeat: 2
    });
    pet2dance.anims.create({
        key: 'feed',
        frames: this.anims.generateFrameNumbers('pet2climb', {
            frames: [0, 5]
        }),
        frameRate: 8,
        repeat: 2
    });
    pet2dance.anims.play(choice);
    }
Pet3Animation(choice){
    let pet3dance = this.add.sprite(200,250,"pet3");
    pet3dance.setScale(5);
    pet3dance.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('pet3run', {
            frames: [0, 5]
        }),
        frameRate: 8,
        repeat: 2
    });
    pet3dance.anims.play(choice);
}
//juvinileAnimation(){

//}
//adultAnimation(){

//}



}