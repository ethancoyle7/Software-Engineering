class FightScene extends Phaser.Scene 
{
    
    // This is where we define data members
    constructor() 
    {
        super('FightScene');
        this.pet = null;
        this.enemy=null;
        this.type='';
        this.sound3=0;
        this.enemyheath = null;
        this.victory = false;
        this.defeat = false;
        this.pethealth = null;
        this.level = 0;
    }
    init(data)
    {
        this.type=data.type;
        if (this.type == "") 
        {
            // No username was provided
            this.type = "0";
        }
        this.level=data.level;
    }
    
    // Runs before entering the scene, LOAD IMAGES AND SOUND HERE
    preload() 
    {
        this.load.image('Over', './assets/GameOverPicture.png');
        this.load.audio('FightSound2','./assets/FightSound2.mp3');
        this.load.image('mute','./assets/mic.png');
    //load the files to be used in the scene  
    }
    

    // Runs when we first enter this scene
    create() 
    {
        ////////////////////////////////////////////////
        // ███████╗███████╗████████╗██╗   ██╗██████╗  //
        // ██╔════╝██╔════╝╚══██╔══╝██║   ██║██╔══██╗ //
        // ███████╗█████╗     ██║   ██║   ██║██████╔╝ //
        // ╚════██║██╔══╝     ██║   ██║   ██║██╔═══╝  //
        // ███████║███████╗   ██║   ╚██████╔╝██║      //
        // ╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝      //
        ////////////////////////////////////////////////
                                                  
        this.sound.stopAll();// stop all previous sounds
        //start the boss fight music
        this.sound.play('FightSound2', { volume: 1});
        this.sound.play('FightAnnounce');
        console.log(" level transferred is"+this.level)// check to see the level

        // set the text font information to be used in styles
        var style = { font: "20px Arial", fill: "#ffffff" };

        // load the background image and set x and y coords
        // then set the scale to .7
        let background2 = this.add.image(225, 400, 'circus');
        background2.setScale(.7);
        
        //add the pet to the screen and add idle animation
        this.pet =this.add.sprite(70,635,"pet")
        this.pet.setScale(5);//set the scale of the pet for fight to fit the scene width and height
        this.pet.setInteractive();

        //after passing in the number of the pet based off the egg, the number corresponds to that in 
        // each choice list
        let choose=['pet','pet2run','pet3'];
        let choose2=['petpunch','pet2punch','pet3punch'];
        let choose3=['lightattack','pet2lightattack','pet3lightattack'];
        let choose4=['heavyattack','pet2heavyattack','pet3heavyattack'];
        //create idle animation for the pet whenever pet is not doing anything

        /////////////////////////////////////////////////////////////////////////////////////
        // █████╗ ███╗   ██╗██╗███╗   ███╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗███████╗  //
        // ██╔══██╗████╗  ██║██║████╗ ████║██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝ //
        // ███████║██╔██╗ ██║██║██╔████╔██║███████║   ██║   ██║██║   ██║██╔██╗ ██║███████╗ //
        // ██╔══██║██║╚██╗██║██║██║╚██╔╝██║██╔══██║   ██║   ██║██║   ██║██║╚██╗██║╚════██║ //
        // ██║  ██║██║ ╚████║██║██║ ╚═╝ ██║██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║███████║ //
        // ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝ //
        /////////////////////////////////////////////////////////////////////////////////////
                                                                                       
        this.pet.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers(choose[this.type], 
            {
                start: 0,
                end: 5
            }),
            frameRate: 12,
            repeat: -1
        });
        //creating animation for the double punch
        this.pet.anims.create({
            key: 'punch',
            frames: this.anims.generateFrameNumbers(choose2[this.type], 
            {
                start: 0,
                end: 5
            }),
            frameRate: 12,
            repeat: 2
        });
        //for the light attack create animation sequence
        this.pet.anims.create({
            key: 'light',
            frames: this.anims.generateFrameNumbers(choose3[this.type], 
            {
                start: 0,
                end: 3
            }),
            frameRate: 12,
            repeat: 2
        });
        //create animation for the heavy attacking character
        this.pet.anims.create({
            key: 'heavy',
            frames: this.anims.generateFrameNumbers(choose4[this.type], 
            {
                start: 0,
                end: 5
            }),
            frameRate: 12,
            repeat: 2
        });
        //mute button
        let mutebutton = this.add.image(400,50,'mute'); // creating a mute button
        mutebutton.setScale(0.2); // setting the scale
        mutebutton.setInteractive();// make it clickable
        mutebutton.on('pointerdown',()=>
        {
            console.log(this.sound3);
            if(this.sound3==0)
            {
            this.sound3+=1;
            console.log(this.sound3);
            this.sound.stopAll();
            }
            else
            {
            this.sound3-=1;
            this.sound.play("FightSound2", { volume: 1});
            }
        })

        //play the pet animation and play sound whenever pressed down
       this.pet.anims.play('run');// play the pet animotion

    ///////////////////////////////////////////////////////////////////////////////////////////
    //    ██╗  ██╗███████╗ █████╗ ██╗  ████████╗██╗  ██╗    ██████╗  █████╗ ██████╗ ███████╗ //
    //    ██║  ██║██╔════╝██╔══██╗██║  ╚══██╔══╝██║  ██║    ██╔══██╗██╔══██╗██╔══██╗██╔════╝ //
    //    ███████║█████╗  ███████║██║     ██║   ███████║    ██████╔╝███████║██████╔╝███████╗ //
    //    ██╔══██║██╔══╝  ██╔══██║██║     ██║   ██╔══██║    ██╔══██╗██╔══██║██╔══██╗╚════██║ //
    //    ██║  ██║███████╗██║  ██║███████╗██║   ██║  ██║    ██████╔╝██║  ██║██║  ██║███████║ //
    //    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝   ╚═╝  ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ //
    ///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         
        // making health and container for the pet
        var pethealthcontainer = this.add.rectangle(105, 740, 205, 35, 0x1e0a08);
        this.pethealth = this.add.rectangle(105, 740, 200, 30, 0xe74c3c);
        this.add.text(50,730, "HEALTH", style);//label it
        
         //add enemy sprite
        //allign it above the enemy health bar and then make it play idle animation
        this.enemy = this.add.sprite(375, 105, "pet2")
        this.enemy.setScale(.4,.4);//set the scale of the enemy for fight to fit the scene width and height
        //this.enemy.anims.play('idle2');// play the pet animotion
        this.enemy.anims.create({
            key: 'idle2',
            frames: this.anims.generateFrameNumbers('pet2', 
            {
                start: 0,
                end: 10
            }),
            frameRate: 12,
            repeat: -1
        });
        this.enemy.anims.play('idle2');// play the pet animotion
        //making health and container for the enemy
        var enemyheathcontainer = this.add.rectangle(340, 200, 205, 35, 0x1e0a08);
        this.enemyheath = this.add.rectangle(340, 200, 200, 30, 0xe74c3c);
        this.add.text(320,190, "HEALTH", style);//label it

        //WE WANT A RECTANGLE TO HOLD THE ATTACK BUTTONS INSIDE SO MAKE IT BEFORE
        //ATTACK BUTTONS SO AS TO NOT COVER UP BARS
        var AttackContainer = this.add.rectangle(340,680, 175, 170, 0xa9a9a9);
        AttackContainer.setStrokeStyle(4, 0x1e0a08);
        this.add.text(290, 600, "ATTACKS", style);//label it 

        // create a button to return back to main scene and if the button press
        //perform some actions
        const button = this.add.image( 50, 40, 'Return')
	        button.setInteractive()
            button.on('pointerdown',() => this.sound.stopAll())
	        button.on('pointerdown', () => button.setScale( 1.1 ))
	        button.on('pointerup', () => button.setScale( 1 ));
            button.on('pointerdown',() => this.scene.start('MainScene',
            {
                type: this.type,
                level: this.level-=2 // return to main and pass the pet type and the level back
            }))
       
        this.tweens.add({

            targets: button,
            alpha: 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        
        });
       //whats the enemys stats for the width which represents remaining health
       //console.log(this.enemyheath.width)
  
        /////////////////////////////////////////////////////////////////////////////////////////////
        // ████████╗██╗███╗   ███╗███████╗    ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗ //
        // ╚══██╔══╝██║████╗ ████║██╔════╝    ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝ //
        //    ██║   ██║██╔████╔██║█████╗      █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗ //
        //    ██║   ██║██║╚██╔╝██║██╔══╝      ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║ //
        //    ██║   ██║██║ ╚═╝ ██║███████╗    ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║ //
        //    ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝    ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝ //
        /////////////////////////////////////////////////////////////////////////////////////////////  
       //create a timed event that acts as the ai fighting the characters player 
       
       //once the health is 0 or less than 0, then start the game over scene
       this.timeLeft = 50000;		
       this.gameTimer = this.time.addEvent({
                   delay: 500,
                   callback: function()
                   {
                    //////////////////////////////////////////////////////////////////////////////////////////////////////////
                    // ███████╗███╗   ██╗███████╗███╗   ███╗██╗   ██╗     █████╗ ████████╗████████╗ █████╗  ██████╗██╗  ██╗ //
                    // ██╔════╝████╗  ██║██╔════╝████╗ ████║╚██╗ ██╔╝    ██╔══██╗╚══██╔══╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝ //
                    // █████╗  ██╔██╗ ██║█████╗  ██╔████╔██║ ╚████╔╝     ███████║   ██║      ██║   ███████║██║     █████╔╝  //
                    // ██╔══╝  ██║╚██╗██║██╔══╝  ██║╚██╔╝██║  ╚██╔╝      ██╔══██║   ██║      ██║   ██╔══██║██║     ██╔═██╗  //
                    // ███████╗██║ ╚████║███████╗██║ ╚═╝ ██║   ██║       ██║  ██║   ██║      ██║   ██║  ██║╚██████╗██║  ██╗ //
                    // ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝     ╚═╝   ╚═╝       ╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ //
                    //////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                        
                    var enemyattack=5
                    
                    //if statement to boost up the intensity of the fight
                    //dependent upon the level, the atttacker will attack with diffrent intensity
                    if(this.level>=10 &&this.level<20)
                    {
                        enemyattack=5
                       
            
                    }
                    if(this.level>=20 &&this.level<30)//between 20 and 30
                    {
                        enemyattack=6
                       
            
                    }
                    if(this.level>=30 &&this.level<40) //between 30 and 40
                    {
                        enemyattack=7
                       
                    }
                    if(this.level>=40) //between 40 and 50
                    {
                        enemyattack=8
                        
                    
                    }
                    // else //if level is 50 or more
                    // { 
                    //     enemyattack=9
                       
                        
                    // }
                    console.log("enemy attack with "+enemyattack)
                    
                    this.timeLeft --;//decrement the time left

                    var val=Math.floor(Math.random() * enemyattack) // using rand number between 0 and 10
                                                           // for ai fight
                    this.pethealth.width-=val; //decrement the health randomly w/ val
                    //console.log(this.pethealth.width)//lets see what the width is 
                    
                    
                    //set it where the pet when is attack changes to a different color
                    if(val>0)
                    {
                        this.pet.setTint(0xff0000);
                        //this.sound.play('EnemyHit')
                    }
                    //set the tint clear so user knows that the pet hasnt been hurt
                    if(val==0)
                    {
                        this.pet.clearTint(); 
                    }
                    
                    //this.pet.clearTint();
                    // if(this.pethealth.width<=1)// if the pets health is less than 0, load the game over scene
                    // {
                    //     //this.sound.removeByKey('Fight')
                    //     //this.sound.play("fatality");
                        
                    //     this.scene.start("WinScene",{
                    //         type: this.type,level:this.level
                    //         })
                    //     //this.add.image(200,200,"Over")
                        
                    // }
                   
                   },
                   
                   callbackScope: this,
                   loop: true
               });

        //create another timed event to constently check to see if the value of the enemies health gets to be 0 and not go over
        // had issue with being able to go past this, so this timed event fixes that issue because there is no delay in the event
        this.timeLeft2 = 5000000;		
        this.gameTimer2 = this.time.addEvent({
                   delay: 0,
                   callback: function()
                   {
                    /////////////////////////////////////////////////////////////////////////////////////
                    // ██████╗ ███████╗████████╗     █████╗ ████████╗████████╗ █████╗  ██████╗██╗  ██╗ //
                    // ██╔══██╗██╔════╝╚══██╔══╝    ██╔══██╗╚══██╔══╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝ //
                    // ██████╔╝█████╗     ██║       ███████║   ██║      ██║   ███████║██║     █████╔╝  //
                    // ██╔═══╝ ██╔══╝     ██║       ██╔══██║   ██║      ██║   ██╔══██║██║     ██╔═██╗  //
                    // ██║     ███████╗   ██║       ██║  ██║   ██║      ██║   ██║  ██║╚██████╗██║  ██╗ //
                    // ╚═╝     ╚══════╝   ╚═╝       ╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ //
                    /////////////////////////////////////////////////////////////////////////////////////
                                                                                                   
                                                                               
                    
                    var heavy=5
                    var light=3
                    var punch=6
                    //console.log(" the level is inside of the second timer is  :"+this.level);
                    //if statement to boost up the intensity of the fight
                    //dependent upon the level, the attack values will be scalled accross the levels
                    if(this.level>=10 &&this.level<20)
                    {
                        heavy=5
                        light=3
                        punch=6
            
                    }
                    if(this.level>=20 &&this.level<30)//between 20 and 30
                    {
                       
                        heavy=6
                        light=4
                        punch=7
            
                    }
                    if(this.level>=30 &&this.level<40) //between 30 and 40
                    {
                        
                        heavy=7
                        light=5
                        punch=8
                    
                    }
                    if(this.level>=40 &&this.level<50) //between 40 and 50
                    {
                        
                        heavy=8
                        light=6
                        punch=9
                    
                    }
                    if(this.level>=50)//if level is 50 or more
                    { 
                       
                        heavy=9
                        light=7
                        punch=10
                        
                    }
                    //console.log(" the punch  is :"+punch);
                    //console.log(" the light  is :"+light);
                    //console.log(" the heavy  is :"+heavy);
                    this.timeLeft2 --;//decrement the time left

                    
                    // creating attack buttons to attack the enemy 
                    //ie Light, Heavy, Punch etc 
                    ///////////////////////////////////////////
                    // ██╗     ██╗ ██████╗ ██╗  ██╗████████╗ //
                    // ██║     ██║██╔════╝ ██║  ██║╚══██╔══╝ //
                    // ██║     ██║██║  ███╗███████║   ██║    //
                    // ██║     ██║██║   ██║██╔══██║   ██║    //
                    // ███████╗██║╚██████╔╝██║  ██║   ██║    //
                    // ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝    //
                    ///////////////////////////////////////////
                    var attackval=0                                    
                    //give them rectangle and make interactive and when clicked, they adjust the pet health
                    var Light = this.add.rectangle(340,660, 150, 30, 0xb8860b);
                    Light.setStrokeStyle(4, 0x1e0a08);
                    this.add.text(290, 650, "Light Attack", style);//label it
                    
                        Light.setInteractive() // SET IT INTERACTIVE
                    
                    
                        Light.on('pointerdown', () =>
                                {
                                    console.log("our  light attack value for level "+this.level+" is "+light);
                                    //attackval=2;//set the attack value to 2
                                    var attack0=this.enemyheath.width-=light;//adjust the enemy health accordingly -5
                                    // if(attack0<=2)// check for the enemy health to be less than 0
                                    // {
                                    //                 //this.sound.removeByKey('Fight')
                                    //                 //this.sound.play("fatality");
                                                    
                                    //     this.scene.start("WinScene",
                                    //     {
                                    //         type: this.type,
                                    //         level: this.level
                                    //     })
                                    // }
                                    // else
                                    // {
                                       this.enemyheath.width-=light;
                                        console.log(this.enemyheath.width)
                                        
                                        //ENEMY HEALTH -=2
                                        console.log(this.enemyheath.width); //logging the width of the enemy bar
                                        this.enemy.setTint(0xff0000);// create a tint to know got attacked
                                        if(this.sound3==0)
                                        {
                                            this.sound.play('press'); // play sound when hit
                                            this.sound.play('EnemyHit', { volume: 0.1}); // play sound when hit
                                        }
                                        this.pet.anims.stop('run');// stop the idle animation to create new animation effect
                                        this.pet.anims.play('light');// play the punching animation
                                    // }
                                });
                        
                    Light.on('pointerup', () =>
                            {
                                this.enemy.clearTint();// on the pointer up clear the tint
                                button.setScale( 1 ); //BUTTON ANIMATION
                                this.pet.anims.stop('light');// stop the previous animation
                                this.pet.anims.play('run');// got back to the idle animation
                            });
                            
            
                    //create container and rectangle for the heavy attack
                    ///////////////////////////////////////////////
                    // ██╗  ██╗███████╗ █████╗ ██╗   ██╗██╗   ██╗//
                    // ██║  ██║██╔════╝██╔══██╗██║   ██║╚██╗ ██╔╝//
                    // ███████║█████╗  ███████║██║   ██║ ╚████╔╝ //
                    // ██╔══██║██╔══╝  ██╔══██║╚██╗ ██╔╝  ╚██╔╝  //
                    // ██║  ██║███████╗██║  ██║ ╚████╔╝    ██║   //
                    // ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝  ╚═══╝     ╚═╝   //
                    ///////////////////////////////////////////////
                                                            
                    var Heavy = this.add.rectangle(340, 700, 150, 30, 0xb8860b);
                    Heavy.setStrokeStyle(4, 0x1e0a08); // BORDER AROUND THE RECTANGLE
                    this.add.text(280, 690, "Heavy Attack", style);//label it 
                    //console.log(" the level is :"+this.level);
                    //console.log(" And our punrch val is"+heavy);
                            Heavy.setInteractive() // set it interactive
                        
                    
                        Heavy.on('pointerdown', () =>
                        {
                            //attackval=5 //set the attack value to 5
                            console.log("our  heavy attack value for level "+this.level+" is "+heavy);
                            var attack=this.enemyheath.width-=heavy;//adjust the enemy health accordingly -5
                            // if(attack<=2)// check for the enemy health to be less than 0
                            // {
                            //                 //this.sound.removeByKey('Fight')
                            //                 //this.sound.play("fatality");
                                            
                            //     this.scene.start("WinScene",
                            //     {
                            //         type: this.type,
                            //         level: this.level
                            //     })
                            // }
                            // else
                            // {
                               this.enemyheath.width-=heavy;
                                console.log(this.enemyheath.width)
                            
                            //this.enemyheath.width-=heavy;//adjust the enemy health accordingly -5
                                console.log(this.enemyheath.width);//logging the width of enemy bar
                                this.enemy.setTint(0xff0000);// create a tint to know got attacked
                                if(this.sound3==0)
                                {
                                    this.sound.play('press'); // play sound when hit
                                    this.sound.play('EnemyHit', { volume: 0.1}); // play sound when hit
                                }
                                this.pet.anims.stop('run');// stop the idle animation to create new animation effect
                                this.pet.anims.play('heavy');// play the punching animation
                            // }
                        });
                        
                    Heavy.on('pointerup', () =>
                        {
                            this.enemy.clearTint();// on the pointer up clear the tint
                            button.setScale( 1 );
                            this.pet.anims.stop('heavy');// stop the previous animation
                            this.pet.anims.play('run');// got back to the idle animation
                        });
                    /////////////////////////////////////////////////
                    // ██████╗ ██╗   ██╗███╗   ██╗ ██████╗██╗  ██╗ //
                    // ██╔══██╗██║   ██║████╗  ██║██╔════╝██║  ██║ //
                    // ██████╔╝██║   ██║██╔██╗ ██║██║     ███████║ //
                    // ██╔═══╝ ██║   ██║██║╚██╗██║██║     ██╔══██║ //
                    // ██║     ╚██████╔╝██║ ╚████║╚██████╗██║  ██║ //
                    // ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝╚═╝  ╚═╝ //
                    /////////////////////////////////////////////////
                                                                
                    //create rectangle for punching and nice container to hold it
                    var Punch = this.add.rectangle(340, 740, 150, 30, 0xb8860b);
                    Punch.setStrokeStyle(4, 0x1e0a08);
                    this.add.text(280, 730, "Double Punch", style);//label it 
                    
                    Punch.setInteractive() // make it interactive
                    
                    Punch.on('pointerdown', () =>
                        {
                            //console.log(" the level is :"+this.level);
                            //console.log(" And our punrch val is"+punch);
                            //attackval=10 //set the attack value to 10
                            console.log("our punch value for level "+this.level+" is "+punch);
                            var attack2=this.enemyheath.width-=punch;//adjust the enemy health accordingly -5
                            // if(attack2<=2)// check for the enemy health to be less than 0
                            // {
                            //                 //this.sound.removeByKey('Fight')
                            //                 //this.sound.play("fatality");
                                            
                            //     this.scene.start("WinScene",
                            //     {
                            //         type: this.type,
                            //         level: this.level
                            //     })
                            // }
                            // else
                            // {
                               this.enemyheath.width-=punch;
                                console.log(this.enemyheath.width)
                            
                                //this.enemyheath.width-=punch;// enemy health -10
                                console.log(this.enemyheath.width);//logging the width of the enemy bar
                                this.enemy.setTint(0xff0000);// create a tint to know got attacked
                                if(this.sound3==0)
                                {
                                    this.sound.play('press'); // play sound when hit
                                    this.sound.play('EnemyHit', { volume: 0.1});// create a tint to know got attacked
                                }
                                this.pet.anims.stop('run');// stop the idle animation to create new animation effect
                                this.pet.anims.play('punch');// play the punching animation
                            // }
                        });
                    Punch.on('pointerup', () =>
                        {
                            this.enemy.clearTint();// on the pointer up clear the tint
                            button.setScale( 1 );
                            this.pet.anims.stop('punch');// stop the previous animation
                            this.pet.anims.play('run');// got back to the idle animation
                        });
                        
                        //create a cool down timer before can be clicked again
                        
                        /////////////////////////////////////////////////
                    // if(this.pethealth.width<=1)// if the pets health is less than 0, load the game over scene
                    //     {
                    //         //this.sound.removeByKey('Fight')
                    //         //this.sound.play("fatality");
                            
                    //         //go to the game over scen pass the type and the level to the scene
                    //         this.scene.start("GameOver",{
                    //             type: this.type,level:this.level
                    //             })
                    //     }
                    
                   },
                   
                   callbackScope: this,
                   loop: true
               });              
    }
    // Runs every frame
    update() 
    {  
        this.checkWin();
        this.checkDead();
        if(this.victory){
            this.endFight();
            this.scene.start("WinScene",
            {
                type: this.type,
                level: this.level
            })
        }

        if(this.defeat){
            this.endFight();
            this.scene.start("GameOver",{
                type: this.type,level:this.level
                })
        }
     
        
    }

    checkWin(){
        if(this.enemyheath.width<=0){
            this.victory = true;
        }
    }

    checkDead(){
        if(this.pethealth.width<=0){
            this.defeat = true;
        }
    }


    endFight(){
        this.pet = null;
        this.enemy=null;
        this.type='';
        this.sound3=0;
        this.enemyheath = null;
        this.victory = false;
        this.defeat = false;
        this.pethealth = null;
    }
}