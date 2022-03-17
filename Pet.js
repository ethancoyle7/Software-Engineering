class Pet{
    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    constructor(scene){
        this.petdance=null;
        this.scene =scene;
        this.choice = '';
        
    }
// some pet animations for actions
eggAnimation(choice){
    let petdance = this.add.sprite(200, 250,"pet");
        petdance.setScale(5);
        // Create the idle animation
        petdance.anims.create({
            key: 'idle1',
            frames: this.anims.generateFrameNumbers('pet', {
                start:0,
                end:5
            }),
            frameRate: 12,
            repeat: 3
        });
        petdance.anims.create({
            key: 'feed',
            frames: this.anims.generateFrameNumbers('petclimb', {
                frames: [0, 3]
            }),
            frameRate: 8,
            repeat: -1
        });
        petdance.anims.create({
            key: 'bathe+',
            frames: this.anims.generateFrameNumbers('petthrow', {
                frames: [0, 1]
            }),
            frameRate: 3,
            repeat: -1
        });
        petdance.anims.create({
            key: 'health+',
            frames: this.anims.generateFrameNumbers('winningpet', {
                start:0,
                end: 7
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
        key: 'idle1',
        frames: this.anims.generateFrameNumbers('pet2', {
            frames: [0, 5]
        }),
        frameRate: 8,
        repeat: 2
    });
    petdance.anims.create({
        key: 'feed',
        frames: this.anims.generateFrameNumbers('pet2climb', {
            frames: [0, 3]
        }),
        frameRate: 8,
        repeat: -1
    });
    pet2dance.anims.create({
        key: 'bathe+',
        frames: this.anims.generateFrameNumbers('pet2throw', {
            frames: [0, 1]
        }),
        frameRate: 3,
        repeat: -1
    });
    pet2dance.anims.create({
        key: 'health+',
        frames: this.anims.generateFrameNumbers('pet2winningpet', {
            start:0,
            end: 7
        }),
        frameRate: 8,
        repeat: -1
    });  
    pet2dance.anims.play(choice);
    }
Pet3Animation(choice){
    let pet3dance = this.add.sprite(200,250,"pet3");
    pet3dance.setScale(5);
    pet3dance.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('pet3', {
            frames: [0, 5]
        }),
        frameRate: 8,
        repeat: 2
    });
    pet3dance.anims.create({
        key: 'feed',
        frames: this.anims.generateFrameNumbers('pet3climb', {
            frames: [0, 3]
        }),
        frameRate: 8,
        repeat: -1
    });
    pet3dance.anims.create({
        key: 'bathe+',
        frames: this.anims.generateFrameNumbers('pet3throw', {
            frames: [0, 1]
        }),
        frameRate: 3,
        repeat: -1
    });
    pet3dance.anims.create({
        key: 'health+',
        frames: this.anims.generateFrameNumbers('pet3winningpet', {
            start:0,
            end: 7
        }),
        frameRate: 8,
        repeat: -1
    });  
    pet3dance.anims.play(choice);
}


}