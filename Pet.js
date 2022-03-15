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
    let petdance = this.add.sprite(200, 250,"pet");
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
}
//juvinileAnimation(){

//}
//adultAnimation(){

//}



}