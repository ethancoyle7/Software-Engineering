class FightScene extends Phaser.Scene 
{

    // This is where we define data members
    constructor() 
    {
        super('FightScene');
        this.pet = null;
        


    }

    // Runs before entering the scene, LOAD IMAGES AND SOUND HERE
   // preload() 
    //{
    // preload to the screeen the background and the music
        //this.load.image('bg', './assets/background.png');
        //this.load.audio('bgmusic', './assets/gamemusic.mp3');
       // this.load.image("pet","assets/charater.png")
       

    // Runs when we first enter this scene
    create() 
    {
        
        this.timeLeft = 2000;
        this.timeLeft--;
        
        //this.timeLeft=this.initialTime(200);
        
        
      //create a backdound and a music for the load up 
        
        // load the background image and set x and y coords
        // then set the scale to .7
        
        let background = this.add.image(225, 400, 'Fight');
        background.setScale(.7);
        this.pet =this.add.sprite(200,500,"pet")
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
        
       const button = this.add.image( 50, 40, 'Return')
	        button.setInteractive()
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
        
        
    }
    // Runs every frame
    update() 
    {
    }



}