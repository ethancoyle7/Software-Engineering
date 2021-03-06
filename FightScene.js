//This Scene is where the users pets fight each other
//The pet is distinguished by the nickname and color
//selected by an existing user (the choice is made in the main scene
//and carries it to this scene)
class FightScene extends Phaser.Scene {

    // This is where we define data members
    constructor() {
        super('FightScene');
        this.pet = null;
        this.type = '';
        this.sound3 = 0;
        this.enemyheath = null;
        this.victory = false;
        this.defeat = false;
        this.pethealth = null;
        this.level = 0;
        this.enemy1 = 0;
        this.enemyname = '';
        this.playername = ""

    }
    //gets data from previous scenes
    init(data) {
        this.type = data.type;
        if (this.type == "") {
            // No username was provided default is 0
            this.type = "0";
        }
        this.level = data.level;
        this.enemy1 = data.enemy;
        this.enemyname = data.enemyname;
        this.playername = data.playername;
    }

    // Runs before entering the scene, LOAD IMAGES AND SOUND HERE
    preload() {
    }

    // Runs when we first enter this scene
    create() {
        ////////////////////////////////////////////////
        // ███████╗███████╗████████╗██╗   ██╗██████╗  //
        // ██╔════╝██╔════╝╚══██╔══╝██║   ██║██╔══██╗ //
        // ███████╗█████╗     ██║   ██║   ██║██████╔╝ //
        // ╚════██║██╔══╝     ██║   ██║   ██║██╔═══╝  //
        // ███████║███████╗   ██║   ╚██████╔╝██║      //
        // ╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝      //
        ////////////////////////////////////////////////
        console.log('the boolean starts as is: ', userChooseEgg)
        this.sound3=0;
        this.sound.stopAll();// stop all previous sounds
        //start the boss fight music
        this.sound.play('FightSound2', { volume: 1 });
        this.sound.play('FightAnnounce');
        console.log(" level transferred is" + this.level)// check to see the level

        // set the text font information to be used in styles
        var style = { font: "20px Arial", fill: "#ffffff" };

        // load the background image and set x and y coords
        // then set the scale to .7
        let background2 = this.add.image(225, 400, 'circus');
        background2.setScale(.7);

        //add the pet to the screen and add idle animation
        this.pet = this.add.sprite(100, 635, "pet")
        this.pet.setScale(5);//set the scale of the pet for fight to fit the scene width and height
        this.pet.setInteractive();

        //after passing in the number of the pet based off the egg, the number corresponds to that in 
        // each choice list
        let choose = ['pet', 'pet2run', 'pet3'];
        let choose2 = ['petpunch', 'pet2punch', 'pet3punch'];
        let choose3 = ['lightattack', 'pet2lightattack', 'pet3lightattack'];
        let choose4 = ['heavyattack', 'pet2heavyattack', 'pet3heavyattack'];
        let choose5 = ['enemypunch', 'enemy2punch', 'enemy3punch'];
        let choose6 = ['enemylightattack', 'enemy2lightattack', 'enemylightattack'];
        let choose7 = ['enemyheavyattack', 'enemy2heavyattack', 'enemy3heavyattack'];
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
        //play the pet animation and play sound whenever pressed down
        this.pet.anims.play('run');// play the pet animotion
        //------------------ENEMY ANIMATIONS---------------------------------------------------
        var enemyq = this.add.sprite(340, 90, "pet2");
        enemyq.setScale(5);
        enemyq.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers(choose[this.enemy1],
                {
                    start: 0,
                    end: 5
                }),
            frameRate: 12,
            repeat: -1
        });
        //creating animation for the double punch
        enemyq.anims.create({
            key: 'punch',
            frames: this.anims.generateFrameNumbers(choose5[this.enemy1],
                {
                    start: 5,
                    end: 0
                }),
            frameRate: 12,
            repeat: -1
        });
        //for the light attack create animation sequence
        enemyq.anims.create({
            key: 'light',
            frames: this.anims.generateFrameNumbers(choose6[this.enemy1],
                {
                    start: 0,
                    end: 3
                }),
            frameRate: 12,
            repeat: -1
        });
        //create animation for the heavy attacking character
        enemyq.anims.create({
            key: 'heavy',
            frames: this.anims.generateFrameNumbers(choose7[this.enemy1],
                {
                    start: 5,
                    end: 0
                }),
            frameRate: 8,
            repeat: -1
        });
        //play the enemy animation and play sound whenever pressed down
        enemyq.anims.play('heavy');// play the enemy animation
        //mute button
        let mutebutton = this.add.image(50, 120, 'mute'); // creating a mute button
        mutebutton.setScale(0.4); // setting the scale
        mutebutton.setInteractive();// make it clickable
        mutebutton.on('pointerdown', () => {
            console.log(this.sound3);
            if (this.sound3 == 0) {
                this.sound3 += 1;
                //console.log(this.sound3);
                this.sound.stopAll();
            }
            else {
                this.sound3 -= 1;
                this.sound.play("FightSound2", { volume: 1 });
            }
        })



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
        this.add.text(50, 730, "HEALTH", style);//label it
        //add the player name
        //display the players name
        var playernamebg = this.add.rectangle(110, 770, 200, 25, 0x000000);
        playernamebg.setAlpha(0.5);
        this.add.text(10, 760, this.playername, { font: '20px Arial', fill: '#00ff00' });
        //add grey transparent background for the playername



        //making health and container for the enemy
        var enemyheathcontainer = this.add.rectangle(340, 200, 205, 35, 0x1e0a08);
        this.enemyheath = this.add.rectangle(340, 200, 200, 30, 0xe74c3c);
        this.add.text(320, 190, "HEALTH", style);//label it
        //this.add.text(270,210, "Enemy :"+this.enemyname, style);//label it
        var opponentnamebg = this.add.rectangle(340, 230, 200, 25, 0x000000);
        opponentnamebg.setAlpha(0.5)
        var OpponenetName = this.add.text(240, 220, '', { font: '20px Arial', fill: '#00ff00' });
        //set the text indicator for the level icon text value
        OpponenetName.setText([
            this.enemyname
        ]);
        //add grey transparent background for the opponentname
        ;

        //WE WANT A RECTANGLE TO HOLD THE ATTACK BUTTONS INSIDE SO MAKE IT BEFORE
        //ATTACK BUTTONS SO AS TO NOT COVER UP BARS
        //var AttackContainer = this.add.rectangle(340, 680, 175, 170, 0xa9a9a9);
        var AttackContainer = this.add.rectangle(340, 620, 175, 250, 0xa9a9a9);
        AttackContainer.setStrokeStyle(4, 0x1e0a08);
        this.add.text(290, 500, "ATTACKS", style);//label it 

        // create a button to return back to main scene and if the button press
        //perform some actions
        const button = this.add.image(50, 40, 'Return')
        button.setInteractive()
        button.on('pointerdown', () => this.sound.stopAll())
        button.on('pointerdown', () => button.setScale(1.1))
        button.on('pointerup', () => button.setScale(1));
        button.on('pointerdown', () => this.scene.start('MainScene',
            {
                type: this.type,
                level: this.level -= 2 // return to main and pass the pet type and the level back
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
            callback: function () {
                //////////////////////////////////////////////////////////////////////////////////////////////////////////
                // ███████╗███╗   ██╗███████╗███╗   ███╗██╗   ██╗     █████╗ ████████╗████████╗ █████╗  ██████╗██╗  ██╗ //
                // ██╔════╝████╗  ██║██╔════╝████╗ ████║╚██╗ ██╔╝    ██╔══██╗╚══██╔══╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝ //
                // █████╗  ██╔██╗ ██║█████╗  ██╔████╔██║ ╚████╔╝     ███████║   ██║      ██║   ███████║██║     █████╔╝  //
                // ██╔══╝  ██║╚██╗██║██╔══╝  ██║╚██╔╝██║  ╚██╔╝      ██╔══██║   ██║      ██║   ██╔══██║██║     ██╔═██╗  //
                // ███████╗██║ ╚████║███████╗██║ ╚═╝ ██║   ██║       ██║  ██║   ██║      ██║   ██║  ██║╚██████╗██║  ██╗ //
                // ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝     ╚═╝   ╚═╝       ╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ //
                //////////////////////////////////////////////////////////////////////////////////////////////////////////

                var enemyattack = 0 // the basis attack value
                var EnemyAttack = 0 //the enemy attack set to 0

                //if statement to boost up the intensity of the fight
                //dependent upon the level, the atttacker will attack with diffrent intensity
                if (this.level >= 10 && this.level < 20) {
                    //generate random number between 0 and 5
                    
                    enemyattack = 6


                }
                if (this.level >= 20 && this.level < 30)//between 20 and 30
                {
                    var EnemyAttack = Math.floor(Math.random() * 6)
                    enemyattack = 8
                    console.log("Enemy attackthing for level 20+")

                }
                if (this.level >= 30) //between 30 and 40
                {
                    var EnemyAttack = Math.floor(Math.random() * 8)
                    enemyattack = 10
                    console.log("Enemy attackthing for level 30+")
                }
                //if statement to boost up the intensity of the fight
                //console.log("enemy attack with " + enemyattack)

                this.timeLeft--;//decrement the time left

                var val = Math.floor(Math.random() * enemyattack) // using rand number between 0 and 10
                // for ai fight
                this.pethealth.width -= val; //decrement the health randomly w/ val


                //set it where the pet when is attack changes to a different color
                if (val > 0) {

                    this.pet.setTint(0xff0000);

                }
                //set the tint clear so user knows that the pet hasnt been hurt
                if (val == 0) {

                    this.pet.clearTint();
                }



            },

            callbackScope: this,
            loop: true
        });

        //create another timed event to constently check to see if the value of the enemies health gets to be 0 and not go over
        // had issue with being able to go past this, so this timed event fixes that issue because there is no delay in the event
        this.timeLeft2 = 5000000;
        this.gameTimer2 = this.time.addEvent({
            delay: 0,
            callback: function () {
                /////////////////////////////////////////////////////////////////////////////////////
                // ██████╗ ███████╗████████╗     █████╗ ████████╗████████╗ █████╗  ██████╗██╗  ██╗ //
                // ██╔══██╗██╔════╝╚══██╔══╝    ██╔══██╗╚══██╔══╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝ //
                // ██████╔╝█████╗     ██║       ███████║   ██║      ██║   ███████║██║     █████╔╝  //
                // ██╔═══╝ ██╔══╝     ██║       ██╔══██║   ██║      ██║   ██╔══██║██║     ██╔═██╗  //
                // ██║     ███████╗   ██║       ██║  ██║   ██║      ██║   ██║  ██║╚██████╗██║  ██╗ //
                // ╚═╝     ╚══════╝   ╚═╝       ╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ //
                /////////////////////////////////////////////////////////////////////////////////////



                //basis values at the start of the fight
                var heavy = 2
                var light = 1
                var punch = 3
                //console.log(" the level is inside of the second timer is  :"+this.level);
                //if statement to boost up the intensity of the fight
                //dependent upon the level, the attack values will be scalled accross the levels
                if (this.level >= 10 && this.level < 20) {
                    heavy = 2
                    light = 1
                    punch = 3

                }
                if (this.level >= 20 && this.level < 30)//between 20 and 30
                {

                    heavy = 3
                    light = 2
                    punch = 4

                }
                if (this.level >= 30 ) //greater than or equal to 30
                {

                    //adjust attack settings
                    heavy = 4
                    light = 3
                    punch = 5

                }
                
                //console.log(" the punch  is :"+punch);
                //console.log(" the light  is :"+light);
                //console.log(" the heavy  is :"+heavy);
                this.timeLeft2--;//decrement the time left


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
                var attackval = 0
                //give them rectangle and make interactive and when clicked, they adjust the pet health
                var Light = this.add.rectangle(340, 550, 150, 30, 0xb8860b);
                Light.setStrokeStyle(4, 0x1e0a08);
                this.add.text(290, 540, "Light Attack", style);//label it

                Light.setInteractive() // SET IT INTERACTIVE


                Light.on('pointerdown', () => {
                    //console.log("our  light attack value for level " + this.level + " is " + light);
                    //attackval=2;//set the attack value to 2
                    var attack0 = this.enemyheath.width -= light;//adjust the enemy health accordingly -5
                    if (attack0 <= 2)// check for the enemy health to be less than 0
                    {
                        this.endFight();
                        userChooseEgg = true,
                        this.scene.start("WinScene",
                            {
                                type: this.type,
                                level: this.level,
                                playername: this.playername//pass the playername to the next scene
                            })
                        console.log('the boolean is: ', userChooseEgg)

                    }

                    this.enemyheath.width -= light;
                    //console.log(this.enemyheath.width)

                    //ENEMY HEALTH -=2
                    //console.log(this.enemyheath.width); //logging the width of the enemy bar
                    enemyq.setTint(0xff0000);// create a tint to know got attacked
                    if (this.sound3 == 0) {
                        this.sound.play('press'); // play sound when hit
                        this.sound.play('EnemyHit', { volume: 0.1 }); // play sound when hit
                    }
                    this.pet.anims.stop('run');// stop the idle animation to create new animation effect
                    this.pet.anims.play('light');// play the punching animation
                    // }
                });

                Light.on('pointerup', () => {
                    enemyq.clearTint();// on the pointer up clear the tint
                    button.setScale(1); //BUTTON ANIMATION
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

                var Heavy = this.add.rectangle(340, 590, 150, 30, 0xb8860b);
                Heavy.setStrokeStyle(4, 0x1e0a08); // BORDER AROUND THE RECTANGLE
                this.add.text(280, 580, "Heavy Attack", style);//label it 
                //console.log(" the level is :"+this.level);
                //console.log(" And our punrch val is"+heavy);
                Heavy.setInteractive() // set it interactive


                Heavy.on('pointerdown', () => {
                    //attackval=5 //set the attack value to 5
                    //console.log("our  heavy attack value for level " + this.level + " is " + heavy);
                    var attack = this.enemyheath.width -= heavy;//adjust the enemy health accordingly -5
                    if (attack <= 2)// check for the enemy health to be less than 0
                    {
                        this.endFight();
                        userChooseEgg = true,
                        this.scene.start("WinScene",
                            {
                                type: this.type,
                                level: this.level,
                                playername: this.playername//pass the playername to the next scene
                            })
                        console.log('the boolean is: ', userChooseEgg)

                    }

                    this.enemyheath.width -= heavy;
                    //console.log(this.enemyheath.width)

                    //this.enemyheath.width-=heavy;//adjust the enemy health accordingly -5
                    //console.log(this.enemyheath.width);//logging the width of enemy bar
                    enemyq.setTint(0xff0000);// create a tint to know got attacked
                    if (this.sound3 == 0) {
                        this.sound.play('press'); // play sound when hit
                        this.sound.play('EnemyHit', { volume: 0.1 }); // play sound when hit
                    }
                    this.pet.anims.stop('run');// stop the idle animation to create new animation effect
                    this.pet.anims.play('heavy');// play the punching animation
                    // }
                });

                Heavy.on('pointerup', () => {
                    enemyq.clearTint();// on the pointer up clear the tint
                    button.setScale(1);
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
                var Punch = this.add.rectangle(340, 630, 150, 30, 0xb8860b);
                Punch.setStrokeStyle(4, 0x1e0a08);
                this.add.text(280, 620, "Double Punch", style);//label it 

                Punch.setInteractive() // make it interactive

                Punch.on('pointerdown', () => {
                    //console.log(" the level is :"+this.level);
                    //console.log(" And our punrch val is"+punch);
                    //attackval=10 //set the attack value to 10
                    //console.log("our punch value for level " + this.level + " is " + punch);
                    var attack2 = this.enemyheath.width -= punch;//adjust the enemy health accordingly -5
                    if (attack2 <= 2)// check for the enemy health to be less than 0
                    {
                        this.endFight();
                        userChooseEgg = true;
                        this.scene.start("WinScene",
                            {
                                type: this.type,
                                level: this.level,
                                playername: this.playername//pass the playername to the next scene
                            })
                        console.log('the boolean is: ', userChooseEgg)
                    }

                    this.enemyheath.width -= punch;
                    //console.log(this.enemyheath.width)

                    //this.enemyheath.width-=punch;// enemy health -10
                    //console.log(this.enemyheath.width);//logging the width of the enemy bar
                    enemyq.setTint(0xff0000);// create a tint to know got attacked
                    if (this.sound3 == 0) {
                        this.sound.play('press'); // play sound when hit
                        this.sound.play('EnemyHit', { volume: 0.1 });// create a tint to know got attacked
                    }
                    this.pet.anims.stop('run');// stop the idle animation to create new animation effect
                    this.pet.anims.play('punch');// play the punching animation
                    // }
                });
                Punch.on('pointerup', () => {
                    enemyq.clearTint();// on the pointer up clear the tint
                    button.setScale(1);
                    this.pet.anims.stop('punch');// stop the previous animation
                    this.pet.anims.play('run');// got back to the idle animation
                });


            // pet will learn a new attack if their level is  greater than 20
            if(this.level<20)
            {
                //set containter for the attack level up display info
                var AttackText = this.add.text(290,660, '', { font: '20px Courier', fill: '#00ff00' });
                //Add text to let the user know they must level their player up if they want to learn a new attack
                AttackText.setText([' Level Up\n To Learn\nNew Attack']);
                //make it flashing in and out
                
            }
            this.tweens.add({

                targets: AttackText,//who it targeting
                alpha: 1,//what the alpha value is
                yoyo: true, //make it go back and forth
                repeat: -1, //repeat it forever
                ease: 'Sine.easeInOut' 
    
            });
            ////////////////////////////////////////////////////////////////////////////////////////
            // ███╗   ██╗███████╗██╗    ██╗     █████╗ ████████╗████████╗ █████╗  ██████╗██╗  ██╗ //
            // ████╗  ██║██╔════╝██║    ██║    ██╔══██╗╚══██╔══╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝ //
            // ██╔██╗ ██║█████╗  ██║ █╗ ██║    ███████║   ██║      ██║   ███████║██║     █████╔╝  //
            // ██║╚██╗██║██╔══╝  ██║███╗██║    ██╔══██║   ██║      ██║   ██╔══██║██║     ██╔═██╗  //
            // ██║ ╚████║███████╗╚███╔███╔╝    ██║  ██║   ██║      ██║   ██║  ██║╚██████╗██║  ██╗ //
            // ╚═╝  ╚═══╝╚══════╝ ╚══╝╚══╝     ╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ //
            ////////////////////////////////////////////////////////////////////////////////////////
                                                                                              
            //once past the level 20, the attacktext will no longer display
            if(this.level>=20) // if between level 20 and
            {
            //add an atack box for the pet to learn a new
                    var SpecialAttack = this.add.rectangle(340,670, 150, 30, 0xb8860b);
                    SpecialAttack.setStrokeStyle(4, 0x1e0a08);
                    this.add.text(290, 660, "Special ", style);//label it
                    
                    SpecialAttack.setInteractive() // SET IT INTERACTIVE
                    
                    
                        SpecialAttack.on('pointerdown', () =>
                                {
                                    
                                    //generate a random value between 1 and 10
                                    var randomval = Phaser.Math.Between(1, 10); // special attack has variable damage

                                    var specialattack=this.enemyheath.width-=randomval;//adjust the enemy health accordingly -5
                                    if(specialattack<=5)// check for the enemy health to be less than 0
                                    {
                                        this.endFight();
                                        userChooseEgg = true;
                                        this.scene.start("WinScene",
                                        {
                                            type: this.type,
                                            level: this.level,
                                            playername: this.playername//pass the playername to the next scene
                                        })
                                        console.log('the boolean is: ', userChooseEgg)
                                    
                                    }
                                    
                                        this.enemyheath.width-=randomval;
                                        //console.log(this.enemyheath.width)
                                        
                                        //ENEMY HEALTH -=2
                                        //console.log(this.enemyheath.width); //logging the width of the enemy bar
                                        enemyq.setTint(0xff0000);// create a tint to know got attacked
                                        if(this.sound3==0)
                                        {
                                            this.sound.play('press'); // play sound when hit
                                            this.sound.play('EnemyHit', { volume: 0.1}); // play sound when hit
                                        }
                                        this.pet.anims.stop('run');// stop the idle animation to create new animation effect
                                        this.pet.anims.play('light');// play the punching animation
                                    // }
                                });
                        
                    SpecialAttack.on('pointerup', () =>
                            {
                                enemyq.clearTint();// on the pointer up clear the tint
                                button.setScale( 1 ); //BUTTON ANIMATION
                                this.pet.anims.stop('light');// stop the previous animation
                                this.pet.anims.play('run');// got back to the idle animation
                            });
            }// end of the if statement for new attack learned


            //add display to let the user know they must level up to learn a new attack
            if(this.level>=20 && this.level<30)
            {
                //set containter for the attack level up display info
                var AttackText2 = this.add.text(270,700, '', { font: '20px Courier', fill: '#00ff00' });
                //Add text to let the user know they must level their player up if they want to learn a new attack
                AttackText2.setText([' Level Up To\nLearn Attack']);
                //make it flashing in and out
                
            }
            this.tweens.add({

                targets: AttackText2,//who it targeting
                alpha: 1,//what the alpha value is
                yoyo: true, //make it go back and forth
                repeat: -1, //repeat it forever
                ease: 'Sine.easeInOut' 
    
            });
            ////////////////////////////////////////////////////////////////////////////////////////////////////
            // ███╗   ██╗███████╗██╗    ██╗     █████╗ ████████╗████████╗ █████╗  ██████╗██╗  ██╗    ██████╗  //
            // ████╗  ██║██╔════╝██║    ██║    ██╔══██╗╚══██╔══╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝    ╚════██╗ //
            // ██╔██╗ ██║█████╗  ██║ █╗ ██║    ███████║   ██║      ██║   ███████║██║     █████╔╝      █████╔╝ //
            // ██║╚██╗██║██╔══╝  ██║███╗██║    ██╔══██║   ██║      ██║   ██╔══██║██║     ██╔═██╗     ██╔═══╝  //
            // ██║ ╚████║███████╗╚███╔███╔╝    ██║  ██║   ██║      ██║   ██║  ██║╚██████╗██║  ██╗    ███████╗ //
            // ╚═╝  ╚═══╝╚══════╝ ╚══╝╚══╝     ╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝    ╚══════╝ //
            ////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          
            if(this.level>=30) // player learns new attack after level 30
            {
                
                //add the box for the attack
                    var SpecialAttack2 = this.add.rectangle(340,710, 150, 30, 0xb8860b);
                    SpecialAttack2.setStrokeStyle(4, 0x1e0a08);
                    this.add.text(290, 700, "Punish Him", style);//label it
                    
                    SpecialAttack2.setInteractive() // SET IT INTERACTIVE
                    
                    //create pointer down and pointer up methods for this attack
                        SpecialAttack2.on('pointerdown', () =>
                                {
                                    
                                    //generate a random value between 1 and 15
                                    var randomval2 = Phaser.Math.Between(1, 15); // special attack has variable damage

                                    var specialattack2=this.enemyheath.width-=randomval2;//adjust the enemy health accordingly -5
                                    if(specialattack2<=5)// check for the enemy health to be less than 0
                                    {
                                        this.endFight();
                                        userChooseEgg = true;
                                        this.scene.start("WinScene",
                                        {
                                            type: this.type,
                                            level: this.level,
                                            playername: this.playername//pass the playername to the next scene
                                        })
                                        console.log('the boolean is: ', userChooseEgg)
                                    
                                    }
                                    
                                        this.enemyheath.width-=randomval2;
                                        //console.log(this.enemyheath.width)
                                        
                                        //ENEMY HEALTH -=2
                                        //console.log(this.enemyheath.width); //logging the width of the enemy bar
                                        enemyq.setTint(0xff0000);// create a tint to know got attacked
                                        if(this.sound3==0)
                                        {
                                            this.sound.play('press'); // play sound when hit
                                            this.sound.play('EnemyHit', { volume: 0.1}); // play sound when hit
                                        }
                                        this.pet.anims.stop('run');// stop the idle animation to create new animation effect
                                        this.pet.anims.play('light');// play the punching animation
                                    // }
                                });
                        
                    SpecialAttack2.on('pointerup', () =>
                            {
                                enemyq.clearTint();// on the pointer up clear the tint
                                button.setScale( 1 ); //BUTTON ANIMATION
                                this.pet.anims.stop('light');// stop the previous animation
                                this.pet.anims.play('run');// got back to the idle animation
                            });
            }// end of the if statement for new attack learned
            },

            callbackScope: this,
            loop: true
        });
    }
    // Runs every frame
    update() {
        //this.checkWin();
        this.checkDead();

        if (this.defeat) {
            this.endFight();
            userChooseEgg = true;
            this.scene.start("GameOver", {
                type: this.type, level: this.level, playername: this.playername
            })
            console.log('the boolean is: ', userChooseEgg)
        }


    }
    //check in the update if the pet health is less than 0
    checkDead() {
        if (this.pethealth.width <= 0) // if the pet health is less than 0
        {
            this.defeat = true; // set defeat to true
        }
    }


    //at end of the fight set back to orginal vals
    endFight() {
        this.pet = null;
        //this.enemyq=null;
        // this.type='';
        this.sound3 = 0;
        this.enemyheath = null;
        this.victory = false;
        this.defeat = false;
        this.pethealth = null;
    }
}