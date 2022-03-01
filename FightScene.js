class FightScene extends Phaser.Scene 
{
    
    // This is where we define data members
    constructor() 
    {
        super('FightScene');
        this.pet = null;
        


    }
    

    // Runs before entering the scene, LOAD IMAGES AND SOUND HERE
    preload() 
    {
        this.load.audio('press', './assets/honeywood.mp3'); 
    // preload to the screeen the background and the music
        //this.load.image('bg', './assets/background.png');
        //this.load.audio('bgmusic', './assets/gamemusic.mp3');
       // this.load.image("pet","assets/charater.png")
       this.load.audio('Fight', './assets/BossFight.mp3');
    }

    // Runs when we first enter this scene
    create() 
    {
        
        //start the boss fight music
        //this.sound.play('Fight', { volume: 0.1});
        this.timeLeft = 3000;
    
        
        //this.timeLeft=this.initialTime(200);
        
        
      //create a backdound and a music for the load up 
        
        // load the background image and set x and y coords
        // then set the scale to .7
        
        let background = this.add.image(225, 400, 'Fight');
        background.setScale(.7);
        this.pet =this.add.sprite(200,500,"pet")
        this.pet.setInteractive({ draggable: true });
        this.pet.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('pet', {
                start: 0,
                end: 10
            }),
            frameRate: 12,
            repeat: -1
        });
        
       this.pet.anims.play('idle');// play the pet animotion
       this.pet.on('pointerdown',() => this.sound.play('press'))
       const button = this.add.image( 50, 40, 'Return')
	        button.setInteractive()
            button.on('pointerdown',() => this.sound.removeByKey('Fight'))
	        button.on('pointerdown', () => button.setScale( 1.1 ))
	        button.on('pointerup', () => button.setScale( 1 ));
            button.on('pointerdown',() => this.scene.start('MainScene'))
       
        this.tweens.add({

            targets: button,
            alpha: 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        
        });
        this.gameTimer = this.time.addEvent({
            delay: 0,
            callback: function()
            {
                this.timeLeft --;

                // dividing enery bar width by the number of seconds gives us the amount
                // of pixels we need to move the energy bar each second
                

                // moving the mask
                
                if(this.timeLeft == 0)
                {
                    
                    this.scene.start("GameOver")//restarts the main scene
                }
            },
            callbackScope: this,
            loop: false
        });
        
        
    }
    // Runs every frame
    update() 
    {
       
        
    }



}