class MainScene extends Phaser.Scene {

    // This is where we define data members
    constructor() {
        super("MainScene");
        this.BATHCOORDS = [50, 750];
        this.CLOTHECOORDS = [150, 750];
        this.FOODCOORDS = [275, 750];
        this.TOYCOORDS = [375, 750];
        this.pet = null;
        this.items = [];// this is a collection of items
        // this.itemsIcons = [];
        this.percent = 0;
        this.background = null;
        // this.item = null;

    }

    // Runs before entering the scene, LOAD IMAGES AND SOUND HERE
    preload() {
        // preload to the screeen the background and the music
        this.load.audio('bgmusic', './assets/gamemusic.mp3');

    }
    // Runs when we first enter this scene
    create() {
        //this.sound.play('bgmusic', { volume: 0.1 });
        this.timeLeft = 200000;
        this.timeLeft--;
        //create a backdound and a music for the load up 
        // load the background image and set x and y coords
        // then set the scale to .7
        let background = this.add.image(200, 400, 'bg');
        background.setScale(.7);
        var style = { font: "20px Arial", fill: "#fff" };//set style used in text

        //adding the sprite and then setting the scale on the screen
        this.pet = this.add.sprite(200, 500, "pet")
        this.pet.setScale(6);
        //creating pet animation
        this.pet.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('pet', {
                start: 0,
                end: 5
            }),
            frameRate: 12,
            repeat: -1
        });



        // this.item = this.add.Item(50, 750, 'bathimg')
        // this.item = new Item({scene:this,x:50,y:750});
        // this.item.setScale(3);
        // this.item.setInteractive({ draggable: true });
        // this.createAnimations();
        // this.item.anims.play('bath');
        // this.item.on('pointerup', () => this.item.anims.nextFrame());



        //creat death animation
        this.pet.anims.create({
            key: 'dead',
            frames: this.anims.generateFrameNumbers('pet', {
                start: 11,
                end: 20
            }),
            frameRate: 12,
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
         var healthcontainer = this.add.rectangle(105, 40, 205, 35, 0x1e0a08);
         var health = this.add.rectangle(105, 40, 200, 30, 0xe74c3c);
         this.add.text(10, 30, "HEALTH", style);//label it 
 
         //create container and rectangle for the happiness
         var happinesscontainer = this.add.rectangle(105, 80, 205, 35, 0x1e0a08);
         var happiness = this.add.rectangle(105, 80, 200, 30, 0x4ce73c);
         this.add.text(10, 70, "HAPPINESS", style);//label it 
 
         //create rectangle for hunger stats and nice container to hold it
         var hungercontainer = this.add.rectangle(105,120, 205, 35, 0x1e0a08);
         var hunger = this.add.rectangle(105, 120, 200, 30, 0x3c82e7);
         this.add.text(10, 108, "HUNGER", style);//label it 

          //create rectangle for xp points
          var experiencecontainer = this.add.rectangle(55,160, 105, 35, 0x1e0a08);
          var experience = this.add.rectangle(55, 160, 100, 30, 0xe7a23c);
          this.add.text(10, 148, "XP", style);//label it 
        
        //for the fight button hover over to press for fight
        // this button leads to click sequence when pressed
        const button = this.add.image(68, 215, 'button')
        button.setInteractive() // set it interactive
        button.on('pointerdown', () => button.setScale(1.1))// set the scale of the button
        button.on('pointerup', () => button.setScale(1));// on ppinter up
        button.on('pointerdown', () => this.sound.removeByKey('bgmusic'))// remove the bg music
        button.on('pointerdown', () => this.scene.start('FightScene'))// lead to fight scene
        
        //add a circle to game that fades in and out
        // add text to let know it is the level icon
        //to display the level
        var circle = this.add.circle(350, 95, 60, 0x9966ff);
        circle.setStrokeStyle(4, 0xefc53f);
        this.add.text(320, 60, "LEVEL", style);
        //add tweens to make the circle fade in and out
        this.tweens.add({

            targets: circle,
            alpha: 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'

        });

        



        this.createItems(); //creates the items the player interacts with the pet with

        // this.createAnimations();


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
            } else if (i == 1) {
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
            } else if (i == 2) {
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
            } else if (i == 3) {
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
    // Runs every frame
    update() {

      
    }



    createAnimations() {
        //insert pet animations here????

  
    }


}