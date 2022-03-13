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
        this.load.image('Over', './assets/GameOverPicture.png');
    //load the files to be used in the scene  
    }
    

    // Runs when we first enter this scene
    create() 
    {
        //for timed event
        
       
        
        //start the boss fight music
        this.sound.play('Fight', { volume: 0.1});
        // set the text font information to be used in styles
        var style = { font: "20px Arial", fill: "#ffffff" };

        // load the background image and set x and y coords
        // then set the scale to .7
        let background2 = this.add.image(225, 400, 'Fighting');
        background2.setScale(.9);
        
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
        //creating animation for the double punch
        this.pet.anims.create({
            key: 'punch',
            frames: this.anims.generateFrameNumbers('petpunch', {
                start: 0,
                end: 5
            }),
            frameRate: 12,
            repeat: -1
        });
        //for the light attack create animation sequence
        this.pet.anims.create({
            key: 'light',
            frames: this.anims.generateFrameNumbers('lightattack', {
                start: 0,
                end: 3
            }),
            frameRate: 12,
            repeat: -1
        });
        //create animation for the heavy attacking character
        this.pet.anims.create({
            key: 'heavy',
            frames: this.anims.generateFrameNumbers('heavyattack', {
                start: 0,
                end: 5
            }),
            frameRate: 12,
            repeat: -1
        });
        this.pet.anims.create({
            key: 'dead',
            frames: this.anims.generateFrameNumbers('deadpet', {
                start: 0,
                end: 7
            }),
            frameRate: 12,
            repeat: -1
        });

        //play the pet animation and play sound whenever pressed down
       this.pet.anims.play('idle');// play the pet animotion
       this.pet.on('pointerdown',() => this.sound.play('press'))
        // making health and container for the pet
        var pethealthcontainer = this.add.rectangle(105, 740, 205, 35, 0x1e0a08);
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
        var enemyhealthcontainer = this.add.rectangle(340, 275, 205, 35, 0x1e0a08);
        var enemyhealth = this.add.rectangle(340, 275, 200, 30, 0xe74c3c);
        this.add.text(340,265, "HEALTH", style);//label it

        //WE WANT A RECTANGLE TO HOLD THE ATTACK BUTTONS INSIDE SO MAKE IT BEFORE
        //ATTACK BUTTONS SO AS TO NOT COVER UP BARS
        var AttackContainer = this.add.rectangle(340,680, 175, 170, 0xa9a9a9);
        AttackContainer.setStrokeStyle(4, 0x1e0a08);
        this.add.text(290, 600, "ATTACKS", style);//label it 

        // creating attack buttons to attack the enemy 
        //ie Light, Heavy, Punch etc 
        //give them rectangle and make interactive and when clicked, they adjust the pet health
        var Light = this.add.rectangle(340,660, 150, 30, 0xb8860b);
        Light.setStrokeStyle(4, 0x1e0a08);
        this.add.text(290, 650, "Light Attack", style);//label it 
        Light.setInteractive() // SET IT INTERACTIVE
        Light.on('pointerdown',() =>enemyhealth.width-=2);//ENEMY HEALTH -=2
        Light.on('pointerdown',() =>console.log(enemyhealth.width)); //logging the width of the enemy bar
        Light.on('pointerdown',() =>this.enemy.setTint(0xff0000));// create a tint to know got attacked
        Light.on('pointerdown',() =>this.sound.play('press')); // play sound when hit
        Light.on('pointerdown',() =>this.sound.play('EnemyHit', { volume: 0.1})); // play sound when hit
        Light.on('pointerdown',() =>this.pet.anims.stop('idle'));// stop the idle animation to create new animation effect
        Light.on('pointerdown',() =>this.pet.anims.play('light'));// play the punching animation
        //on relase of the button click
        Light.on('pointerup', () => this.enemy.clearTint());// on the pointer up clear the tint
        Light.on('pointerup', () => button.setScale( 1 )); //BUTTON ANIMATION
        Light.on('pointerup', () => this.pet.anims.stop('light'));// stop the previous animation
        Light.on('pointerup',() =>this.pet.anims.play('idle'));// got back to the idle animation

        //this.pet.anims.play('idle');// play the pet animotion
        //create container and rectangle for the heavy attack
        var Heavy = this.add.rectangle(340, 700, 150, 30, 0xb8860b);
        Heavy.setStrokeStyle(4, 0x1e0a08); // BORDER AROUND THE RECTANGLE
        this.add.text(280, 690, "Heavy Attack", style);//label it 
        Heavy.setInteractive() // set it interactive
        Heavy.on('pointerdown',() =>enemyhealth.width-=5);//adjust the enemy health accordingly -5
        Heavy.on('pointerdown',() =>console.log(enemyhealth.width));//logging the width of enemy bar
        Heavy.on('pointerdown',() =>this.enemy.setTint(0xff0000));// create a tint to know got attacked
        Heavy.on('pointerdown',() =>this.sound.play('press')); // play sound when hit
        Heavy.on('pointerdown',() =>this.sound.play('EnemyHit', { volume: 0.1})); // play sound when hit
        Heavy.on('pointerdown',() =>this.pet.anims.stop('idle'));// stop the idle animation to create new animation effect
        Heavy.on('pointerdown',() =>this.pet.anims.play('heavy'));// play the punching animation
        //on the release of the button
        Heavy.on('pointerup', () => this.enemy.clearTint());// on the pointer up clear the tint
        Heavy.on('pointerup', () => button.setScale( 1 ));
        Heavy.on('pointerup', () => this.pet.anims.stop('heavy'));// stop the previous animation
        Heavy.on('pointerup',() =>this.pet.anims.play('idle'));// got back to the idle animation

        //create rectangle for punching and nice container to hold it
        var Punch = this.add.rectangle(340, 740, 150, 30, 0xb8860b);
        Punch.setStrokeStyle(4, 0x1e0a08);
        this.add.text(280, 730, "Double Punch", style);//label it 
        Punch.setInteractive() // make it interactive
        Punch.on('pointerdown',() =>enemyhealth.width-=10);// enemy health -10
        Punch.on('pointerdown',() =>console.log(enemyhealth.width));//logging the width of the enemy bar
        Punch.on('pointerdown',() =>this.enemy.setTint(0xff0000));// create a tint to know got attacked
        Punch.on('pointerdown',() =>this.sound.play('press')); // play sound when hit
        Punch.on('pointerdown',() =>this.sound.play('EnemyHit', { volume: 0.1}));// create a tint to know got attacked
        Punch.on('pointerdown',() =>this.pet.anims.stop('idle'));// stop the idle animation to create new animation effect
        Punch.on('pointerdown',() =>this.pet.anims.play('punch'));// play the punching animation
        //when released
        Punch.on('pointerup', () => this.enemy.clearTint());// on the pointer up clear the tint
        Punch.on('pointerup', () => button.setScale( 1 ));
        Punch.on('pointerup', () => this.pet.anims.stop('punch'));// stop the previous animation
        Punch.on('pointerup',() =>this.pet.anims.play('idle'));// got back to the idle animation
       
       

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
       //whats the enemys stats for the width which represents remaining health
       //console.log(enemyhealth.width)

       //create a timed event that acts as the ai fighting the characters player 
       //once the health is 0 or less than 0, then start the game over scene
       this.timeLeft = 50000;		
       this.gameTimer = this.time.addEvent({
                   delay: 500,
                   callback: function()
                   {
                    this.timeLeft --;//decrement the time left

                    pethealth.width-=Math.floor(Math.random() * 10); //decrement the health randomly w/in 0-10
                    console.log(pethealth.width)//lets see what the width is 
                    if(pethealth.width<0)// if the pets health is less than 0, load the game over scene
                    {
                        //this.sound.removeByKey('Fight')
                        //this.sound.play("fatality");
                        this.scene.start("GameOver")
                        //this.add.image(200,200,"Over")
                        
                    }
                    if(enemyhealth.width< 0)// check for the enemy health to be less than 0
                    {
                        //this.sound.removeByKey('Fight')
                        //this.sound.play("fatality");
                        this.scene.start("WinScene")
                        //this.add.image(200,200,"Over")
                        
                    } 
                   },
                   
                   callbackScope: this,
                   loop: true
               });
               

               //this.add.image(200,200,"Over")
    }
       //pethealth.width-=Math.floor(Math.random() * 10);

    
       
    

        //
        
    
       //pethealth.width-=Math.floor(Math.random() * 10);

   
    
    
        
    
    // Runs every frame
    update() 
    {
        
        
    }
}