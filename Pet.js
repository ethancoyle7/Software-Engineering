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



eggAnimation(){
    let petdance = this.add.sprite(100, 200,"pet");
    petdance.setScale(5);
        // Create the idle animation
        petdance.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('pet', {
                frames: [0, 5]
            }),
            frameRate: 8,
            repeat: 2
        });
        petdance.anims.play('idle');

        // // Create left/right animations
        // this.player.anims.create({
        //     key: 'left',
        //     frames: this.anims.generateFrameNumbers('player', {
        //         frames: [0, 5]
        //     }),
        //     frameRate: 12,
        //     repeat: -1
        // });
        // this.player.anims.create({
        //     key: 'right',
        //     frames: this.anims.generateFrameNumbers('player', {
        //         frames: [4, 9]
        //     }),
        //     frameRate: 12,
        //     repeat: -1
        // });
        
}
//juvinileAnimation(){

//}
//adultAnimation(){

//}



}