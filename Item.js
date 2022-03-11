class Item extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, "bathimg");
        config.scene.add.existing(this);
        // this.itemType = type; //the type of item: food, toy, bath, 
        // this.arrayMax = max; //max number, not max index

    }

    // changeItem(scene){

    //     this.imgIndex = Math.floor(Math.random() * this.arrayMax);

    // }

    createanimations() {

    }

    add() { }

}