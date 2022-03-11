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

        // load the background image and set x and y coords
        // then set the scale to .7
        let background = this.add.image(225, 400, 'Fight');
        background.setScale(.9);
        
        //add the pet to the screen and add idle animation
        this.pet =this.add.sprite(50,660,"pet")
        this.pet.setScale(.4,.4);//set the scale of the pet for fight to fit the scene width and height
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
        //play the pet animation and play sound whenever pressed down
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
        
       
        
    
        //set health bar inside of another bar
        this.add.image(100, 740, 'container');
        this.add.image(340, 275, 'container');
       
        
        // display the health text to identitfy the health bar
        var style = { font: "20px Arial", fill: "#ffffff" };

        //make enemy health bar
        let healthBar=this.makeBar(140,100,0xe74c3c);
        this.setValue(healthBar,100);//set value of the health bar to 100
        healthBar.fillRect(420,160,765,30)
        //healthBar.setValue-=.10
        this.add.text(340,265, "HEALTH", style);//label it

        //make player healthbar
        let playerBar=this.makeBar(140,100,0xe74c3c);
        this.setValue(playerBar,100);//value of health bar is 100
        playerBar.fillRect(-543,625,765,30)
        
        //healthBar.setValue-=.10
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
        this.attack = this.add.sprite(55,667, 'toothpaste');
        
        const button2 = this.add.image(68, 250, 'button')
            button2.setInteractive()

            //button2.on('pointerdown',() =>this.setNewValue(healthBar,100))
            button2.on('pointerup', () => button.setScale( 1 ));
      
        
    }
    //call to make the health bars
    makeBar(x, y,color) 
       {
        //draw the bar
        let bar = this.add.graphics();
        //color the bar
        bar.fillStyle(color, 1);
        //position the bar
        bar.x = x;
        bar.y = y;
        
        //return the bar
        return bar;
        }
    //calls to set the value
    setValue(bar,percentage) 
        {
        //scale the bar
        bar.scaleX = percentage/500;
        }

        //maybe
    
    // Runs every frame
    update() 
    {
    
        
    }



}