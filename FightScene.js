class FightScene extends Phaser.Scene 
{
    
    // This is where we define data members
    constructor() 
    {
        super('FightScene');
        this.pet = null;
        this.enemy=null;
        


    }
    

    // Runs before entering the scene, LOAD IMAGES AND SOUND HERE
    preload() 
    {
        this.load.audio('press', './assets/honeywood.mp3'); 
    
       this.load.audio('Fight', './assets/BossFight.mp3');
       
       this.load.image('Health', "./assets/health.png");
       this.load.image('toothpaste', "./assets/bathe/toothpaste.png");
       this.load.image('Health', "./assets/button.png");
    }
    

    // Runs when we first enter this scene
    create() 
    {
       
        
        //start the boss fight music
        this.sound.play('Fight', { volume: 0.1});
        this.timeLeft = 3000;
        // set the text font information to be used in styles
        var style = { font: "20px Arial", fill: "#ffffff" };

        // load the background image and set x and y coords
        // then set the scale to .7
        let background = this.add.image(225, 400, 'Fight');
        background.setScale(.9);
        
        //add the pet to the screen and add idle animation
        this.pet =this.add.sprite(70,635,"pet")
        this.pet.setScale(5);//set the scale of the pet for fight to fit the scene width and height
        this.pet.setInteractive();
        //create idle animation for the pet whenever pet is not doing anything
        this.pet.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('petidle', {
                start: 0,
                end: 3
            }),
            frameRate: 12,
            repeat: -1
        });
        //play the pet animation and play sound whenever pressed down
       this.pet.anims.play('idle');// play the pet animotion
       this.pet.on('pointerdown',() => this.sound.play('press'))
       
        
      
        
        

        // making health and container for the pet
        var pethealthcontainer = this.add.rectangle(105, 740, 205, 35, 0x6666ff);
        var pethealth = this.add.rectangle(105, 740, 200, 30, 0xe74c3c);
        this.add.text(50,730, "HEALTH", style);//label it

        
        
        

        //add enemy sprite
        //allign it above the enemy health bar and then make it play idle animation
        this.enemy = this.add.sprite(375, 185, "pet2")
        this.enemy.setScale(.4,.4);//set the scale of the enemy for fight to fit the scene width and height
        //this.enemy.anims.play('idle2');// play the pet animotion
        this.enemy.anims.create({
            key: 'idle2',
            frames: this.anims.generateFrameNumbers('pet2', {
                start: 0,
                end: 10
            }),
            frameRate: 12,
            repeat: -1
        });
        this.enemy.anims.play('idle2');// play the pet animotion
        //making health and container for the enemy
        var enemyhealthcontainer = this.add.rectangle(340, 275, 205, 35, 0x6666ff);
        var enemyhealth = this.add.rectangle(340, 275, 200, 30, 0xe74c3c);
        this.add.text(340,265, "HEALTH", style);//label it
        
        // creating out interactive buttons
        const button2 = this.add.image(68, 250, 'button')
            button2.setInteractive()

            button2.on('pointerdown',() =>enemyhealth.width-=5);
            button2.on('pointerup', () => button.setScale( 1 ));
        
        // create a button to return back to main scene and if the button press
        //perform some actions
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
        
    }
    

        
    
    // Runs every frame
    update() 
    {
    
        
    }



}