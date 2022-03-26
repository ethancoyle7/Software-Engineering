class MainScene extends Phaser.Scene {

    // This is where we define data members
    constructor() {

        super("MainScene");
        this.BATHCOORDS = [50, 750];
        this.CLOTHECOORDS = [150, 750];
        this.FOODCOORDS = [275, 750];
        this.TOYCOORDS = [375, 750];
        this.pet = null;
        this.petClass =null;
        this.hunger=null;
        this.happiness=null;
        this.health=null;
        this.width1=200;
        this.hungerw=200;
        this.type='';
        this.items = [];// this is a collection of items
        // this.itemsIcons = [];
        this.percent = 0;
        this.background = null;
        // this.item = null;
        this.app = firebase.initializeApp(firebaseConfig);
        firebase.analytics();
        // this.auth = firebase.auth();
        this.database = firebase.database();
        // this.scoreTable = this.database.collection('Scores')
        
    }
    init(data){
        this.type=data.type;
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



    }
    // Runs when we first enter this scene
    create() {

        this.sound.stopAll()
        var value = 0;

        //create container to randomize music everytime load up the main scene
        const backgroundmusic = ['1', '2', '3', '4', '5', '6']
        //const bathing = ["lotion", "brush", "gloves", "detergent", "sanitizer", "brush2", "shampoo","soapbox","soap","sunscreen","toothbrush","wipey","box"];
        const musicloop = Math.floor(Math.random() * backgroundmusic.length);//choose random string name
        //var box2 = this.add.rectangle(170, 740, 100, 100, 0xe7a23c);//create box to cover up overlapping
        this.sound.play(backgroundmusic[musicloop], { volume: 3 })//insert image with randomly chosen key

        console.log(backgroundmusic[musicloop])//see what sound playing

        //this.sound.play('bgmusic', { volume: 0.1 });
        //this.data.set('LEVEL', value);

        //create a backdound and a music for the load up 
        // load the background image and set x and y coords
        // then set the scale to .7
        let background = this.add.image(200, 400, 'bg');
        background.setScale(.7);
        var style = { font: "20px Arial", fill: "#fff" };//set style used in text


        //adding the sprite and then setting the scale on the screen
        this.pet = this.add.sprite(200, 500, "pet")
        this.pet.setScale(6);
        let choose=['pet','pet2run','pet3'];
        let choose2=['petclimb','pet2climb','pet3climb'];
        let choose3=['winningpet','pet2winningpet','pet3winningpet'];
        let choose4=['petthrow','pet2throw','pet3throw'];
        //creating pet animation
        this.pet.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers(choose[this.type], {
                start: 0,
                end: 5
            }),
            frameRate: 12,
            repeat: -1
        });

        //creat death animation
        this.pet.anims.create({
            key: 'dead',
            frames: this.anims.generateFrameNumbers(choose[this.type], {
                start: 11,
                end: 20
            }),
            frameRate: 12,
            repeat: -1
        });

        this.pet.anims.create({
            key: 'feed',
            frames: this.anims.generateFrameNumbers(choose2[this.type], {
                frames: [0, 3]
            }),
            frameRate: 8,
            repeat: -1
        });
        this.pet.anims.create({
            key: 'health+',
            frames: this.anims.generateFrameNumbers(choose3[this.type], {
                start:0,
                end: 7
            }),
            frameRate: 8,
            repeat: -1
        });
        this.pet.anims.create({
            key: 'bathe+',
            frames: this.anims.generateFrameNumbers(choose4[this.type], {
                frames: [0, 1]
            }),
            frameRate: 3,
            repeat: -1
        });

        this.pet.anims.play('run');



        //make the pet interactive and movable
        this.pet.setInteractive({ draggable: true });
        // to know the item is selected change the color of the item
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

        // health, hunger, happiness creation

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

        // setting notifications for the pet being fed, bathed, clothed, and played with
        var PetFed = this.add.text(320, 140, '', { font: '20px Arial', fill: '#00ff00' });
        //set the text indicator for the level icon text value

        var PetClothed = this.add.text(320, 160, '', { font: '20px Arial', fill: '#00ff00' });
        //set the text indicator for the level icon text value

        var PetBathed = this.add.text(320, 180, '', { font: '20px Arial', fill: '#00ff00' });
        //set the text indicator for the level icon text value

        var PetPlay = this.add.text(320, 200, '', { font: '20px Arial', fill: '#00ff00' });
        //set the text indicator for the level icon text value

        //creating a petclass object
       // this.petClass= new Pet(this);
        //this.petClass.Pet1Animation(this,'idle1');
        //add box to cover up items from overlapping

        // this.petClass.Pet3Animation.call(this,'idle1');
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
                var val1 = Math.floor(Math.random() * 5) // using rand number between 0 and 10
                health.width -= val1; //decrement the health randomly w/ val

                var val2 = Math.floor(Math.random() * 5) // using rand number between 0 and 10
                hunger.width -= val2; //decrement the health randomly w/ val
                console.log(hunger.width)//lets see what the width is 

                //timing for the happiness to go down incrementally
                var val3 = Math.floor(Math.random() * 5) // using rand number between 0 and 10
                happiness.width -= val3; //decrement the health randomly w/ val
                console.log(happiness.width)//lets see what the width is 

                //if one or more of the conditions are true and the pet dies, then the scene changes to game over
                if (health.width < 1) {
                    this.sound.stopAll();
                    this.scene.start("MainDead")
                }
                //if the pets hunger is less than 1 and the time left is 0, load the runawaypet scene
                if (hunger.width < 1 && this.timeLeft <= 49990) {
                    this.scene.start("Runawaypet")
                }
                //if the health width is less than 1


                if (health.width < 360)//placeholder for the value once if the players health,hunger happiness go above 350
                {
                    // increment the value of the level
                    value++;
                    //set the new value to hold the level
                    text.setText(['LVL\n\n' + value,]);
                    //health.width==350;//trying to reset width

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


                //add identifiers for the various components 
                this.add.text(10, 650, "CLOTHE", style);//label it 
                this.add.text(135, 650, "BATHE", style);//label it 
                this.add.text(260, 650, "PLAY", style);//label it 
                this.add.text(370, 650, "FEED", style);//label it 


                //create list to iterate through with key string names of clothes
                const clothes = ["bikini", "boots", "boots2", "bowtie", "hat", "jacket", "outfit1", "outfit2", "outfit3", "shoes", "shoes2", "witchhat"];
                const random = Math.floor(Math.random() * clothes.length);// choose random value and put it in the image
                var box = this.add.rectangle(60, 740, 100, 100, 0xe7a23c);//becasue it loops it needs box before to cover up the old image
                var clothing = this.add.image(60, 740, clothes[random])//add the key randomly chose value string name
                clothing.setScale(3);// set the size
                clothing.setInteractive({ draggable: true });// it is draggable
                clothing.on('pointerdown', () => this.pet.anims.stop('run'));
                clothing.on('pointerdown', () => this.pet.anims.play('feed'));
                clothing.on('pointerup', () => this.pet.anims.stop('feed'));
                clothing.on('pointerup', () => this.pet.anims.play('run'));
                clothing.on('pointerup', () => clothing.destroy())
                clothing.on('pointerup', () => happiness.width += 15)
                clothing.on('pointerup', () => hunger.width -= 10)
                clothing.on('pointerup', () => PetClothed.setText(['Pet Clothed']))
                clothing.on('pointerup', () => this.sound.play('clothesound')) // play interaction sound

                //iterate through the bathing by string name
                const bathing = ["lotion", "brush", "gloves", "detergent", "sanitizer", "brush2", "shampoo", "soapbox", "soap", "sunscreen", "toothbrush", "wipey", "box"];
                const random2 = Math.floor(Math.random() * bathing.length);//choose random string name
                var box2 = this.add.rectangle(170, 740, 100, 100, 0xe7a23c);//create box to cover up overlapping
                var bath = this.add.image(170, 740, bathing[random2])//insert image with randomly chosen key
                bath.setScale(3);//size the image
                bath.setInteractive({ draggable: true });//it can be dragged
                bath.on('pointerdown', () => this.pet.anims.stop('run'));
                bath.on('pointerdown', () => this.pet.anims.play('bathe+'));
                bath.on('pointerup', () => this.pet.anims.stop('bathe+'));
                bath.on('pointerup', () => this.pet.anims.play('run'));
                bath.on('pointerup', () => bath.destroy())
                bath.on('pointerup', () => health.width += 10)
                bath.on('pointerup', () => happiness.width += 10)
                bath.on('pointerup', () => PetClothed.setText(['Pet Bathed']))
                bath.on('pointerup', () => this.sound.play('bathsound')) // play interaction sound

                //iterate through the toys
                const toys = ["bishop", "castle", "horse", "king", "pawn", "queen", "console1", "console2", "console3", "duckie", "octopus", "toy2"];
                const random3 = Math.floor(Math.random() * toys.length);//random chose string name
                var box3 = this.add.rectangle(280, 740, 100, 100, 0xe7a23c);//create box
                var playing = this.add.image(280, 740, toys[random3])//add key to the new image
                playing.setScale(3);//set the size
                playing.setInteractive({ draggable: true });//draggable yes
                //this generates an animation from petclass
                //playing.on('pointerdown',() =>this.petClass.Pet3Animation.call(this,'health+'));
                playing.on('pointerdown', () => this.pet.anims.stop('run'));
                playing.on('pointerdown', () => this.pet.anims.play('health+'));
                playing.on('pointerup', () => this.pet.anims.stop('health+'));
                playing.on('pointerup', () => this.pet.anims.play('run'));
                playing.on('pointerup', () => playing.destroy())
                playing.on('pointerup', () => happiness.width += 10)
                playing.on('pointerup', () => PetClothed.setText(['Pet Playing']))
                playing.on('pointerup', () => this.sound.play('happysound')) // play interaction sound

                //lastly iterat through the food
                const food = ["bun", "soup", "sandwich1", "sandwich2", "pancake2", "OJ", "orange", "grilledcheese", "eggs", "drink2", "drink", "donut", "cupcake", "chicken", "pancake"];
                const random4 = Math.floor(Math.random() * food.length);//choose random value for the image icon from list
                var box4 = this.add.rectangle(390, 740, 100, 100, 0xe7a23c);//add box
                var feeding = this.add.image(390, 740, food[random4])//input the key string name
                feeding.setScale(3);// set the size
                feeding.setInteractive({ draggable: true });//it can be dragged
                //feeding.on('pointerdown',() =>this.signal=1);
                //this generates an animation from petclass
                //feeding.on('pointerdown',() =>this.petClass.Pet3Animation.call(this,'feed'));
                feeding.on('pointerdown', () => this.pet.anims.stop('run'));
                feeding.on('pointerdown', () => this.pet.anims.play('feed'));
                //feeding.on('pointerup',() =>this.signal=0);
                feeding.on('pointerup', () => this.pet.anims.stop('feed'));
                feeding.on('pointerup', () => this.pet.anims.play('run'));
                feeding.on('pointerup', () => feeding.destroy())
                feeding.on('pointerup', () => health.width += 10)
                feeding.on('pointerup', () => happiness.width += 10)
                feeding.on('pointerup', () => hunger.width += 10)
                feeding.on('pointerup', () => PetClothed.setText(['Pet Fed']))
                //im trying to either stop the animation or destroy the previous one
                //feeding.on('pointerup',() =>this.petClass.destroy());
                feeding.on('pointerup', () => this.sound.play('eatingsound')) // play interaction sound

                if (value >= 10)//if the value hits a certain level, then the battle icon pops up
                {

                    //for the fight button hover over to press for fight
                    // this button leads to click sequence when pressed
                    const button = this.add.image(70, 200, 'button')
                    button.setInteractive() // set it interactive
                    button.on('pointerdown', () => button.setScale(1.1))// set the scale of the button
                    button.on('pointerup', () => button.setScale(1));// on ppinter up
                    button.on('pointerdown', () => this.sound.stopAll());// remove the bg music
                    button.on('pointerdown', () => this.scene.start('FightScene'))// lead to fight scene
                }




            },

            callbackScope: this,
            loop: true
        });
        //calling the function Pet bar
        //this.petAnimations();
    }
    createItems() {

        for (let i = 0; i < 4; i++) {
            if (i == 0) {
                this.items[i] = new Item({ scene: this, x: this.BATHCOORDS[0], y: this.BATHCOORDS[1] });
                this.items[i].setScale(3);
                this.items[i].setInteractive({ draggable: true });
                this.items[0].anims.create({
                    key: 'bath',
                    frames: this.anims.generateFrameNumbers('bathimg', {
                        start: 0,
                        end: 14
                    }),
                    frameRate: 0,
                    repeat: -1
                });
                this.items[i].anims.play('bath');
                this.items[i].on('pointerup', () => this.items[i].anims.nextFrame());
                this.items[i].on('pointerup', () => this.happiness.width += 5);
                this.items[i].on('pointerup', () => this.health.width += 10);
            }
            else if (i == 1) {
                this.items[i] = new Item({ scene: this, x: this.CLOTHECOORDS[0], y: this.CLOTHECOORDS[1] });
                this.items[i].setScale(3);
                this.items[i].setInteractive({ draggable: true });

                this.items[1].anims.create({
                    key: 'clothe',
                    frames: this.anims.generateFrameNumbers('clotheimg', {
                        start: 0,
                        end: 14
                    }),
                    frameRate: 0,
                    repeat: -1
                });
                this.items[i].anims.play('clothe');
                this.items[i].on('pointerup', () => this.items[i].anims.nextFrame());
                this.items[i].on('pointerup', () => this.happiness.width += 5);
                this.items[i].on('pointerup', () => this.health.width += 5);
                //var sprite1 = this.add.sprite(100, 200, 'player', 0);
                //var sprite1Copy = game.add.sprite(sprite1.x, sprite1.y, sprite1.key, sprite1.frame);
            }
            else if (i == 2) {
                this.items[i] = new Item({ scene: this, x: this.FOODCOORDS[0], y: this.FOODCOORDS[1] });
                this.items[i].setScale(3);
                this.items[i].setInteractive({ draggable: true });
                this.items[2].anims.create({
                    key: 'food',
                    frames: this.anims.generateFrameNumbers('foodimg', {
                        start: 0,
                        end: 14
                    }),
                    frameRate: 0,
                    repeat: -1
                });
                this.items[i].anims.play('food');
                this.items[i].on('pointerup', () => this.items[i].anims.nextFrame());
                this.items[i].on('pointerup', () => this.hunger.width += 5);
                this.items[i].on('pointerup', () => this.health.width += 5);
            }
            else if (i == 3) {
                this.items[i] = new Item({ scene: this, x: this.TOYCOORDS[0], y: this.TOYCOORDS[1] });
                this.items[i].setScale(3);
                this.items[i].setInteractive({ draggable: true });
                this.items[3].anims.create({
                    key: 'play',
                    frames: this.anims.generateFrameNumbers('toyimg', {
                        start: 0,
                        end: 17
                    }),
                    frameRate: 0,
                    repeat: -1
                });
                this.items[i].anims.play('play');
                this.items[i].on('pointerup', () => this.items[i].anims.nextFrame());

            }

        }


    }
    //petAnimations(){
       
        //calling petclass
        //this.petClass= new Pet(this);
        //this.petClass.Pet3Animation.call(this,'idle1');

        //this.hungerw=200;
        //this increases or decreases the values of the bars
        //have to put a limiting condition here
        //if(this.hungerw<200){
        // if(this.hungerw <200){
        // this.items[0].on('pointerup',()=>this.peter.eggAnimation.call(this));
        // this.items[0].on('pointerup',()=>this.health.width +=20);
        // this.items[2].on('pointerup',()=>this.peter.eggAnimation.call(this,feed));
        // this.items[2].on('pointerup',()=>this.hunger.width +=20);
        // }
        // }
        //if(this.hunger.width>0){

        // this.items[3].on('pointerup',()=>this.peter.eggAnimation.call(this));
        // this.items[3].on('pointerup',()=>this.hunger.width-=20);
        // this.items[3].on('pointerup',()=>this.happiness.width+=20);
        // this.items[3].on('pointerup',()=>this.hungerw-=20);

        //}
    
    // Runs every frame
    update() {
        //console.log(this.hungerw);

    }



    createAnimations() {
        //insert pet animations here????


    }
}