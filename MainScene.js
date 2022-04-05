
class MainScene extends Phaser.Scene {

    // This is where we define data members
    constructor() {
        super("MainScene");
        this.BATHCOORDS = [50, 750];
        this.CLOTHECOORDS = [150, 750];
        this.FOODCOORDS = [275, 750];
        this.TOYCOORDS = [375, 750];
        this.pet = null;
        this.petClass = null;
        this.hunger = null;
        this.happiness = null;
        this.health = null;
        this.width1 = 200;
        this.hungerw = 200;
        this.sound2 = 0;
        this.type = '';
        this.items = [];// this is a collection of items
        // this.itemsIcons = [];
        this.percent = 0;
        this.background = null;
        // this.firebaseApp = firebase.initializeApp(firebaseConfig);
        // this.db = firebase.firestore();

        // this.item = null;
        // this.scoreTable = this.database.collection('Scores')

    }
    init(data) {
        this.type = data.type;
        if (this.type == "") {
            // No username was provided
            this.type = "0";
        }
    }

    // Runs before entering the scene, LOAD IMAGES AND SOUND HERE
    preload() {
        // // preload to the screeen the background and the music
        // loading up the audio for the pet interation sounds
        this.load.audio('bathsound', './assets/PetSounds/bathsound.wav');
        this.load.audio('eatingsound', './assets/PetSounds/eatpet.wav');
        this.load.audio('happysound', './assets/PetSounds/HappySound.wav');
        this.load.audio('clothesound', './assets/PetSounds/ClothingSound.wav');
        this.load.image('mute', './assets/mic.png');


    }
    // Runs when we first enter this scene
    create() {

        this.sound.stopAll()// to prevent looping stop all previous sounds
        var value = 0;

        if (this.type == 0) {
            // console.log("red")
            setColor("red")
        }
        if (this.type == 1) {
            // console.log("white")
            setColor("white")
        }
        if (this.type == 2) {
            // console.log("blue")
            setColor("blue")
        }
        //create container to randomize music everytime load up the main scene
        const backgroundmusic = ['1', '2', '3', '4', '5', '6']
        //const bathing = ["lotion", "brush", "gloves", "detergent", "sanitizer", "brush2", "shampoo","soapbox","soap","sunscreen","toothbrush","wipey","box"];
        const musicloop = Math.floor(Math.random() * backgroundmusic.length);//choose random string name
        //var box2 = this.add.rectangle(170, 740, 100, 100, 0xe7a23c);//create box to cover up overlapping
        this.sound.play(backgroundmusic[musicloop], { volume: 3 })//insert image with randomly chosen key
        // for clarification the console will show what music number is playing
        console.log(backgroundmusic[musicloop])//see what sound playing

        //add the background to the scene
        let background = this.add.image(200, 400, 'bg');
        background.setScale(.7);
        //default style to be used later
        var style = { font: "20px Arial", fill: "#fff" };//set style used in text

        //mute button
        let mutebutton = this.add.image(400, 200, 'mute');
        mutebutton.setScale(0.5);
        mutebutton.setInteractive();
        mutebutton.on('pointerdown', () => {
            console.log(this.sound2);
            if (this.sound2 == 0) {
                this.sound2 += 1;
                console.log(this.sound2);
                this.sound.stopAll();
            } else {
                this.sound2 -= 1;
                this.sound.play(backgroundmusic[musicloop], { volume: 3 })
            }
        })


        //adding the sprite and then setting the scale on the screen
        this.pet = this.add.sprite(200, 500, "pet")
        this.pet.setScale(6);

        // depending on the pet the value passed in will be assigned to certain pet and
        //the number passed in will reference the choice below i.e if the user
        // choses 1 then the value inside of the game will reference list item number 1
        // in each choic below
        let choose = ['pet', 'pet2run', 'pet3'];
        let choose2 = ['petclimb', 'pet2climb', 'pet3climb'];
        let choose3 = ['winningpet', 'pet2winningpet', 'pet3winningpet'];
        let choose4 = ['petthrow', 'pet2throw', 'pet3throw'];

        //creating pet animation
        this.pet.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers(choose[this.type], {
                start: 0,
                end: 5
            }),
            frameRate: 12,
            repeat: -1
        });// animation for the pet running


        // animations and their fraes loaded from the boot scene 
        this.pet.anims.create({
            key: 'feed',
            frames: this.anims.generateFrameNumbers(choose2[this.type], {
                frames: [0, 3]
            }),
            frameRate: 8,
            repeat: -1
        }); // animation for feeding
        this.pet.anims.create({
            key: 'health+',
            frames: this.anims.generateFrameNumbers(choose3[this.type], {
                start: 0,
                end: 7
            }),
            frameRate: 8,
            repeat: -1
        });// animation for the health
        this.pet.anims.create({
            key: 'bathe+',
            frames: this.anims.generateFrameNumbers(choose4[this.type], {
                frames: [0, 1]
            }),
            frameRate: 3,
            repeat: -1
        });// bathing animation
        this.pet.anims.play('run'); // play the animation of the pet at the start of the game

        //////////////////////////////////////////////////////////////////////////////////
        // ██████╗ ██████╗  █████╗  ██████╗     ██╗████████╗███████╗███╗   ███╗███████╗ //
        // ██╔══██╗██╔══██╗██╔══██╗██╔════╝     ██║╚══██╔══╝██╔════╝████╗ ████║██╔════╝ //
        // ██║  ██║██████╔╝███████║██║  ███╗    ██║   ██║   █████╗  ██╔████╔██║███████╗ //
        // ██║  ██║██╔══██╗██╔══██║██║   ██║    ██║   ██║   ██╔══╝  ██║╚██╔╝██║╚════██║ //
        // ██████╔╝██║  ██║██║  ██║╚██████╔╝    ██║   ██║   ███████╗██║ ╚═╝ ██║███████║ //
        // ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝     ╚═╝   ╚═╝   ╚══════╝╚═╝     ╚═╝╚══════╝ //
        //////////////////////////////////////////////////////////////////////////////////

        // to make the items to interact with the pet draggable, initialize the draggin mechanic
        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff0000);
        });
        // curing the drag, the user can pick the item and then drag it where they
        //want it to go
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            // console.log('drag', dragX, dragY)
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        // after the dragging is done clear the tint of the dragged item
        this.input.on('dragend', function (pointer, gameObject) {
            gameObject.clearTint();
        });

        ///////////////////////////////////////////////////////////////////
        // ██████╗ ███████╗████████╗    ██████╗  █████╗ ██████╗ ███████╗ //
        // ██╔══██╗██╔════╝╚══██╔══╝    ██╔══██╗██╔══██╗██╔══██╗██╔════╝ //
        // ██████╔╝█████╗     ██║       ██████╔╝███████║██████╔╝███████╗ //
        // ██╔═══╝ ██╔══╝     ██║       ██╔══██╗██╔══██║██╔══██╗╚════██║ //
        // ██║     ███████╗   ██║       ██████╔╝██║  ██║██║  ██║███████║ //
        // ╚═╝     ╚══════╝   ╚═╝       ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ //
        ///////////////////////////////////////////////////////////////////

        // health, hunger, happiness creation below 
        //creating health rectangle and nice container to hold it
        var health = this.add.rectangle(178, 20, 350, 30, 0xe74c3c);
        health.setStrokeStyle(4, 0x1e0a08);
        this.add.text(10, 10, "HEALTH", style);//label it 
        //create container and rectangle for the happiness
        var happiness = this.add.rectangle(178, 60, 350, 30, 0x4ce73c);
        happiness.setStrokeStyle(4, 0x1e0a08);
        this.add.text(10, 50, "HAPPINESS", style);//label it 
        //create rectangle for the level display
        var levelrect = this.add.rectangle(400, 60, 70, 110, 0x9966ff);
        levelrect.setStrokeStyle(4, 0xefc53f);
        //create rectangle for hunger stats and nice container to hold it
        var hunger = this.add.rectangle(178, 100, 350, 30, 0x3c82e7);
        hunger.setStrokeStyle(4, 0x1e0a08);
        this.add.text(10, 88, "HUNGER", style);//label it 
        //create rectangle for xp points

        //oscillating display of rectangle targetting this rectangle
        this.tweens.add({

            targets: levelrect,//who it targetting
            alpha: 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'

        });

        //txt to be inside of the level to let the user know what level they are on
        var text = this.add.text(378, 30, '', { font: '20px Courier', fill: '#00ff00' });
        //set the text indicator for the level icon text value
        text.setText([
            'LVL \n\n ' + value,

        ]);

        //creating experience bar and value
        var experience = 0;
        var EXP = this.add.text(10, 130, '', { font: '20px Arial', fill: '#00ff00' });
        //set the text indicator for the level icon text value
        EXP.setText([
            'EXPERIENCE : ' + experience,
        ]);

        // to help identify the interactions and the array of items, create label to differentiatte
        var PetFed = this.add.text(320, 140, '', { font: '20px Arial', fill: '#00ff00' });
        var PetClothed = this.add.text(320, 160, '', { font: '20px Arial', fill: '#00ff00' });
        var PetBathed = this.add.text(320, 180, '', { font: '20px Arial', fill: '#00ff00' });
        var PetPlay = this.add.text(320, 200, '', { font: '20px Arial', fill: '#00ff00' });


        /////////////////////////////////////////////////////////////////////////////////////////////
        // ████████╗██╗███╗   ███╗███████╗    ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗ //
        // ╚══██╔══╝██║████╗ ████║██╔════╝    ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝ //
        //    ██║   ██║██╔████╔██║█████╗      █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗ //
        //    ██║   ██║██║╚██╔╝██║██╔══╝      ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║ //
        //    ██║   ██║██║ ╚═╝ ██║███████╗    ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║ //
        //    ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝    ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝ //
        /////////////////////////////////////////////////////////////////////////////////////////////                                                                       
        //create atimer for the game loop inwhic the health will slowly decline and 
        // the attributes of the pet will increase and decrease depending on the actions
        this.timeLeft = 50000;
        this.gameTimer = this.time.addEvent({
            delay: 700,
            callback: function () {
                this.timeLeft--;//decrement the time left
                //experience.width-=350
                //resetting the values of the notifcations
                PetClothed.setText([''])
                PetBathed.setText(['']);
                PetFed.setText(['']);
                PetPlay.setText(['']);
                var InteractionIcons = this.add.rectangle(225, 720, 440, 150, 0xe7a23c);
                InteractionIcons.setStrokeStyle(5, 0x1e0a08);
                //for the health of the pet
                var val1 = Math.floor(Math.random() * 2) // using rand number between 0 and 10
                health.width -= val1; //decrement the health randomly w/ val

                //timing for the happiness to go down incrementally
                var val3 = Math.floor(Math.random() * 2) // using rand number between 0 and 10
                happiness.width -= val3; //decrement the health randomly w/ val
                console.log(happiness.width)//lets see what the width is 

                //if one or more of the conditions are true and the pet dies, then the scene changes to game over
                if (health.width < 1) {
                    this.sound.stopAll();
                    this.scene.start("MainDead",
                        {
                            type: this.type
                        })
                }
                if (health.width > 350)// if the health gets above 360 increment the experience by 1
                {
                    health.width = 300//reset the wdith
                    experience++;
                    EXP.setText(['EXPERIENCE : ' + experience]);
                }
                if (hunger.width > 350)// if the hunger gets above 360 increment the experience by 1
                {
                    hunger.width = 300//reset the width
                    experience++;
                    EXP.setText(['EXPERIENCE : ' + experience]);
                }
                if (happiness.width > 350)// if the happiness gets above 360 increment the experience by 1
                {
                    happiness.width = 350//reset the width
                    experience++;
                    EXP.setText(['EXPERIENCE : ' + experience]);
                }

                // make the level increase when reach certain ammount of experience


                //add identifiers for the various components 
                this.add.text(10, 650, "CLOTHE", style);//label it 
                this.add.text(135, 650, "BATHE", style);//label it 
                this.add.text(260, 650, "PLAY", style);//label it 
                this.add.text(370, 650, "FEED", style);//label it 

                /////////////////////////////////////////////////////////////////////
                // ██████╗██╗      ██████╗ ████████╗██╗  ██╗██╗███╗   ██╗ ██████╗  //
                // ██╔════╝██║     ██╔═══██╗╚══██╔══╝██║  ██║██║████╗  ██║██╔════╝ //
                // ██║     ██║     ██║   ██║   ██║   ███████║██║██╔██╗ ██║██║  ███╗//
                // ██║     ██║     ██║   ██║   ██║   ██╔══██║██║██║╚██╗██║██║   ██║//
                // ╚██████╗███████╗╚██████╔╝   ██║   ██║  ██║██║██║ ╚████║╚██████╔╝//
                //  ╚═════╝╚══════╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ //
                /////////////////////////////////////////////////////////////////////  

                //create list to iterate through with key string names of clothes
                const clothes = ["bikini", "boots", "boots2", "bowtie", "hat", "jacket", "outfit1", "outfit2", "outfit3", "shoes", "shoes2", "witchhat"];
                const random = Math.floor(Math.random() * clothes.length);// choose random value and put it in the image
                var box = this.add.rectangle(60, 740, 100, 100, 0xe7a23c);//becasue it loops it needs box before to cover up the old image
                var clothing = this.add.image(60, 740, clothes[random])//add the key randomly chose value string name
                clothing.setScale(3);// set the size
                clothing.setInteractive({ draggable: true });// it is draggable

                //on the pointer down trigger the stop and start new animation for the pet
                clothing.on('pointerdown', () => {
                    this.pet.anims.stop('run'); //stop the pet run
                    this.pet.anims.play('feed'); //play the pet feed
                });
                //check to see if the clothing is moved and the pointer is up then destroy the clothing
                clothing.on('pointerup', () => {
                    //if the clothing is moved above where orginally is, destroy it and do some things
                    if (clothing.x >= 60 || clothing.x <= 60 || clothing.x <= 0 || clothing.x >= 450 && clothing.y < 650) {
                        this.pet.anims.stop('feed')// stop the feed animation
                        this.pet.anims.play('run')// play the run animation
                        clothing.destroy(); // destroy the clothing
                        PetClothed.setText([' PET CLOTHED']);   // set the text to be displayed
                        hunger.width -= 2;   //decrement the hunger
                        happiness.width += 2; //increment the happiness
                        if (this.sound2 == 0) //if the sound is not muted
                        {
                            this.sound.play('clothesound'); //play the sound
                        }
                    }
                });
                ////////////////////////////////////////////////////////////
                // ██████╗  █████╗ ████████╗██╗  ██╗██╗███╗   ██╗ ██████╗ //
                // ██╔══██╗██╔══██╗╚══██╔══╝██║  ██║██║████╗  ██║██╔════╝ //
                // ██████╔╝███████║   ██║   ███████║██║██╔██╗ ██║██║  ███╗//
                // ██╔══██╗██╔══██║   ██║   ██╔══██║██║██║╚██╗██║██║   ██║//
                // ██████╔╝██║  ██║   ██║   ██║  ██║██║██║ ╚████║╚██████╔╝//
                // ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ //
                ////////////////////////////////////////////////////////////

                //iterate through the bathing by string name
                const bathing = ["lotion", "brush", "gloves", "detergent", "sanitizer", "brush2", "shampoo", "soapbox", "soap", "sunscreen", "toothbrush", "wipey", "box"];
                const random2 = Math.floor(Math.random() * bathing.length);//choose random string name
                var box2 = this.add.rectangle(170, 740, 100, 100, 0xe7a23c);//create box to cover up overlapping
                var bath = this.add.image(170, 740, bathing[random2])//insert image with randomly chosen key
                bath.setScale(3);//size the image
                bath.setInteractive({ draggable: true });//it can be dragged
                bath.on('pointerdown', () => {
                    this.pet.anims.stop('run'); //stop the pet run
                    this.pet.anims.play('bathe+'); //play the pet feed
                });
                //check to see if the clothing is moved and the pointer is up then destroy the clothing
                bath.on('pointerup', () => {
                    //if the clothing is moved above where orginally is, destroy it and do some things
                    if (bath.x >= 170 || bath.x <= 170 || bath.x <= 0 || bath.x >= 450 && bath.y < 650) {
                        this.pet.anims.stop('bathe+')// stop the feed animation
                        this.pet.anims.play('run')// play the run animation
                        bath.destroy(); // destroy the clothing
                        PetClothed.setText([' PET BATHED']);   // set the text to be displayed
                        health.width += 2;   //decrement the hunger
                        happiness.width += 2; //increment the happiness
                        if (this.sound2 == 0) //if the sound is not muted
                        {
                            this.sound.play('bathsound'); //play the sound
                        }
                    }
                });

                /////////////////////////////////////////////////////////////
                // ██████╗ ██╗      █████╗ ██╗   ██╗██╗███╗   ██╗ ██████╗  //
                // ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██║████╗  ██║██╔════╝  //
                // ██████╔╝██║     ███████║ ╚████╔╝ ██║██╔██╗ ██║██║  ███╗ //
                // ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██║██║╚██╗██║██║   ██║ //
                // ██║     ███████╗██║  ██║   ██║   ██║██║ ╚████║╚██████╔╝ //
                // ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝  //
                /////////////////////////////////////////////////////////////

                const toys = ["bishop", "castle", "horse", "king", "pawn", "queen", "console1", "console2", "console3", "duckie", "octopus", "toy2"];
                const random3 = Math.floor(Math.random() * toys.length);//random chose string name
                var box3 = this.add.rectangle(280, 740, 100, 100, 0xe7a23c);//create box
                var playing = this.add.image(280, 740, toys[random3])//add key to the new image
                playing.setScale(3);//set the size
                playing.setInteractive({ draggable: true });//draggable yes
                playing.on('pointerdown', () => {
                    this.pet.anims.stop('run'); //stop the pet run
                    this.pet.anims.play('health+'); //play the pet feed
                });
                //check to see if the clothing is moved and the pointer is up then destroy the clothing
                playing.on('pointerup', () => {
                    //if the clothing is moved above where orginally is, destroy it and do some things
                    if (playing.x >= 280 || playing.x <= 280 || playing.x <= 0 || playing.x >= 450 && playing.y < 650) {
                        this.pet.anims.stop('health+')// stop the feed animation
                        this.pet.anims.play('run')// play the run animation
                        playing.destroy(); // destroy the clothing
                        PetClothed.setText([' PET PLAYING']);   // set the text to be displayed
                        health.width += 2;   //decrement the hunger
                        happiness.width += 2; //increment the happiness
                        if (this.sound2 == 0) //if the sound is not muted
                        {
                            this.sound.play('happysound'); //play the sound
                        }
                    }
                });
                ///////////////////////////////////////////////////////////
                // ███████╗███████╗███████╗██████╗ ██╗███╗   ██╗ ██████╗ //
                // ██╔════╝██╔════╝██╔════╝██╔══██╗██║████╗  ██║██╔════╝ //
                // █████╗  █████╗  █████╗  ██║  ██║██║██╔██╗ ██║██║  ███╗//
                // ██╔══╝  ██╔══╝  ██╔══╝  ██║  ██║██║██║╚██╗██║██║   ██║//
                // ██║     ███████╗███████╗██████╔╝██║██║ ╚████║╚██████╔╝//
                // ╚═╝     ╚══════╝╚══════╝╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝ //
                ///////////////////////////////////////////////////////////

                //lastly iterat through the food
                const food = ["bun", "soup", "sandwich1", "sandwich2", "pancake2", "OJ", "orange", "grilledcheese", "eggs", "drink2", "drink", "donut", "cupcake", "chicken", "pancake"];
                const random4 = Math.floor(Math.random() * food.length);//choose random value for the image icon from list
                var box4 = this.add.rectangle(390, 740, 100, 100, 0xe7a23c);//add box
                var feeding = this.add.image(390, 740, food[random4])//input the key string name
                feeding.setScale(3);// set the size
                feeding.setInteractive({ draggable: true });//it can be dragged
                feeding.on('pointerdown', () => {
                    this.pet.anims.stop('run'); //stop the pet run
                    this.pet.anims.play('feed'); //play the pet feed
                });
                //check to see if the clothing is moved and the pointer is up then destroy the clothing
                feeding.on('pointerup', () => {
                    //if the clothing is moved above where orginally is, destroy it and do some things
                    if (feeding.x >= 390 || feeding.x <= 390 || feeding.x <= 0 || feeding.x >= 450 && feeding.y < 650)
                    //or if the clothing is moved above

                    {
                        this.pet.anims.stop('feed')// stop the feed animation
                        this.pet.anims.play('run')// play the run animation
                        feeding.destroy(); // destroy the clothing
                        PetClothed.setText([' PET FED']);   // set the text to be displayed
                        health.width += 2
                        happiness.width += 2
                        hunger.width += 2
                        if (this.sound2 == 0) //if the sound is not muted
                        {
                            this.sound.play('eatingsound'); //play the sound
                        }
                    }
                });

                if (value >= 10)//if the value hits a certain level, then the battle icon pops up
                {

                    //for the fight button hover over to press for fight
                    // this button leads to click sequence when pressed
                    const button = this.add.image(70, 200, 'button')
                    button.setInteractive() // set it interactive
                    button.on('pointerdown', () => button.setScale(1.1))// set the scale of the button
                    button.on('pointerup', () => button.setScale(1));// on ppinter up
                    button.on('pointerdown', () => this.sound.stopAll());// remove the bg music
                    button.on('pointerdown', () => this.scene.start('FightScene', {
                        type: this.type
                    }))// lead to fight scene
                }
                //experience checker, if the user gets 10 experience points, then the pet will level up
                if (experience > 0 && experience % 3 == 0)//if the experience is divisible by 10 then the level increases
                {
                    value++;
                    text.setText(['LVL\n\n' + value,]);
                }
            },
            callbackScope: this,
            loop: true
        });

        ////////////////////////////////////////////////////////////////////
        // ██████╗ ██╗   ██╗███╗   ██╗ █████╗ ██╗    ██╗ █████╗ ██╗   ██╗ //
        // ██╔══██╗██║   ██║████╗  ██║██╔══██╗██║    ██║██╔══██╗╚██╗ ██╔╝ //
        // ██████╔╝██║   ██║██╔██╗ ██║███████║██║ █╗ ██║███████║ ╚████╔╝  //
        // ██╔══██╗██║   ██║██║╚██╗██║██╔══██║██║███╗██║██╔══██║  ╚██╔╝   //
        // ██║  ██║╚██████╔╝██║ ╚████║██║  ██║╚███╔███╔╝██║  ██║   ██║    //
        // ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝    //
        ////////////////////////////////////////////////////////////////////

        // load up a timer to moinotr that the pet is being fed
        //if it is not fed within 3 hours, then the pet will die
        this.timeLeft2 = 1800000;	//3 hours for the hunger and the pet to run away	
        this.gameTimer2 = this.time.addEvent({
            delay: 500,
            callback: function () {
                this.timeLeft2--;//decrement the time left
                var val2 = Math.floor(Math.random() * 2) // using rand number between 0 an 2
                hunger.width -= val2; //decrement the health randomly w/ val
                console.log(hunger.width)//lets see what the width is 
                //if the pets hunger is less than 1 and the time left is 0, load the runawaypet scene
                if (hunger.width < 1 && this.timeLeft2 <= 0) //if the hunger bar goes below 1 and the time left is 0
                {                                           //then load the runawaypet scene
                    this.scene.start("Runawaypet", {
                        type: this.type
                    })
                }
            },
            callbackScope: this,
            loop: true
        });

    }

    // Runs every frame update any items inside of the scene
    update() {
        //console.log(this.hungerw);

    }
}
// function checkFireBase() {
//     if (!firebase.apps.length) {
//       console.log("Initializing Firebase App.");
//       return firebaseApp = firebase.initializeApp(firebaseConfig);
//     } else {
//       console.log("Firebase has been Initialized.");
//       return firebaseApp = firebase.app(); // if already initialized, use that one
//     }
//   }

// // initialize the firebase app and  the details for it
// function getInfo() {
//     // Calling Firebase Initialization method to make sure that we initialized firebase
//     firebaseApp = checkFireBase();
//     firebaseApp.auth().onAuthStateChanged(function (user) {
//       if (user) {
//         // var displayName = user.displayName;
//         var email = user.email;
//         // var isAnonymous = user.isAnonymous;
//         var uid = user.uid;
//         console.log('id: ' + uid + ', email: ' + email);                // ...
//       } else {
//         alert('User is signed out.');
//       }
//     });
//   }

//   function getNickname(){
//     var docRef = db.collection("users").doc(cred.user.uid);

//     docRef.get().then((doc) => {
//         if (doc.exists) {
//             console.log("Document data:", doc.data());
//         } else {
//             // doc.data() will be undefined in this case
//             console.log("No such document!");
//         }
//     }).catch((error) => {
//         console.log("Error getting document:", error);
//     });
//   }

