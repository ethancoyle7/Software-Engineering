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
        //adding the sprite and then setting the scale on the screen
        this.pet = this.add.sprite(200, 500, "pet")
        this.pet.setScale(6);
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

        //this.pet.anims.play('dead');
        var style = { font: "20px Arial", fill: "#fff" };
        //container to hold the health bar
        let container = this.add.sprite(100, 50, 'container');
        // the energy bar. Another simple sprite
        let healthbar = this.add.sprite(container.x, container.y, "healthbar");
        // a copy of the energy bar to be used as a mask
        this.energyMask1 = this.add.sprite(healthbar.x, healthbar.y, "healthbar");
        this.add.text(10, 5, "HEALTH", style);//label it 
        this.energyMask1.visible = false;
        // and we assign it as energyBar's mask.
        healthbar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyMask1)
        this.gameTimer = this.time.addEvent({
            delay: 0,
            callback: function () {
                this.timeLeft--;

                // dividing enery bar width by the number of seconds gives us the amount
                // of pixels we need to move the energy bar each second
                let stepWidth = this.energyMask1.width / 1000;

                // moving the mask
                this.energyMask1.x -= stepWidth;
                if (this.timeLeft == 0) {
                    this.scene.start("MainScene")
                }
            },

            callbackScope: this,
            loop: true
        });
        //happiness container and health bar
        let happiness = this.add.sprite(100, 120, 'happiness');
        // happiness bar another sprite held within container
        let happinessbar = this.add.sprite(happiness.x, happiness.y, "happinessbar");
        // a copy of the energy bar to be used as a mask. Another simple sprite but...
        this.energyMask2 = this.add.sprite(happinessbar.x, happinessbar.y, "happinessbar");
        this.add.text(10, 75, "HAPPINESS", style);
        this.energyMask2.visible = false;

        // and we assign it as energyBar's mask.
        happinessbar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyMask2)
        this.gameTimer = this.time.addEvent({
            delay: 0,
            callback: function () {
                this.timeLeft--;

                // dividing enery bar width by the number of seconds gives us the amount
                // of pixels we need to move the energy bar each second
                let stepWidth = this.energyMask2.displayWidth / 1000;

                // moving the mask
                this.energyMask2.x -= stepWidth;
                if (this.timeLeft == 0) {
                    this.scene.start("MainScene")
                }
            },
            callbackScope: this,
            loop: true
        });

        let hunger = this.add.sprite(100, 190, 'hunger');
        // the energy bar. Another simple sprite
        let hungerBar = this.add.sprite(hunger.x, hunger.y, "hungerbar");
        this.energyMask3 = this.add.sprite(hungerBar.x, hungerBar.y, "hungerbar");
        this.add.text(10, 145, "HUNGER", style); // label it
        // ...it's not visible...
        this.energyMask3.visible = false;
        // and we assign it as hungerBar's mask.
        hungerBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyMask3)
        this.gameTimer = this.time.addEvent({
            delay: 0,
            callback: function () {
                this.timeLeft--;

                // dividing enery bar width by the number of seconds gives us the amount
                // of pixels we need to move the energy bar each second
                let stepWidth = this.energyMask3.displayWidth / 1000;

                // moving the mask
                this.energyMask3.x -= stepWidth;
                if (this.timeLeft == 0) {
                    this.pet.anims.play('dead')
                    this.scene.start("MainScene")//restarts the main scene
                }
            },
            callbackScope: this,
            loop: true
        });

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

        //for the fight button hover over to press for fight
        // this button leads to click sequence when pressed
        const button = this.add.image(68, 250, 'button')
        button.setInteractive() // set it interactive
        button.on('pointerdown', () => button.setScale(1.1))// set the scale of the button
        button.on('pointerup', () => button.setScale(1));// on ppinter up
        button.on('pointerdown', () => this.sound.removeByKey('bgmusic'))// remove the bg music
        button.on('pointerdown', () => this.scene.start('FightScene'))// lead to fight scene


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