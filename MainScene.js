class MainScene extends Phaser.Scene 
{

    // This is where we define data members
    constructor() 
    {
        super("MainScene");
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
        this.timeLeft = 3000;
        
        //this.timeLeft=this.initialTime(200);
        
        
      //create a backdound and a music for the load up 
        this.sound.play('bgmusic', { volume: 0.4});
        // load the background image and set x and y coords
        // then set the scale to .7
        
        let background = this.add.image(225, 400, 'bg');
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
        
        // style format for the health stuff
        //var style = { font: "20px Arial", fill: "#fff"};
        this.pet.anims.play('idle');
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
        
        
        //this.pet.anims.play('dead');
        var style = { font: "20px Arial", fill: "#fff"};
        //container to hold the health bar
        let container = this.add.sprite( 100,50,'container');
        // the energy bar. Another simple sprite
        let healthbar = this.add.sprite(container.x, container.y, "healthbar");
        // a copy of the energy bar to be used as a mask
        this.energyMask1 = this.add.sprite(healthbar.x, healthbar.y, "healthbar");
        this.add.text(10,5,"HEALTH",style);//label it 
        this.energyMask1.visible = false;
        // and we assign it as energyBar's mask.
        healthbar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyMask1)
        this.gameTimer = this.time.addEvent({
            delay: 0,
            callback: function()
            {
                this.timeLeft --;

                // dividing enery bar width by the number of seconds gives us the amount
                // of pixels we need to move the energy bar each second
                let stepWidth = this.energyMask1.displayWidth / 650;

                // moving the mask
                this.energyMask1.x -= stepWidth;
                if(this.timeLeft == 0){
                    this.pet.anims.stop('idle');
                    this.scene.pet.anims.play('dead');
                    this.scene.start("MainScene")
                }
            },
            
            callbackScope: this,
            loop: true
        });
        //happiness container and health bar
        let happiness = this.add.sprite( 100,120,'happiness');
        // happiness bar another sprite held within container
        let happinessbar = this.add.sprite(happiness.x, happiness.y, "happinessbar");
        // a copy of the energy bar to be used as a mask. Another simple sprite but...
        this.energyMask2 = this.add.sprite(happinessbar.x, happinessbar.y, "happinessbar");
        this.add.text(10,75,"HAPPINESS",style);
        this.energyMask2.visible = false;

        // and we assign it as energyBar's mask.
        happinessbar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyMask2)
        this.gameTimer = this.time.addEvent({
            delay: 0,
            callback: function()
            {
                this.timeLeft --;

                // dividing enery bar width by the number of seconds gives us the amount
                // of pixels we need to move the energy bar each second
                let stepWidth = this.energyMask2.displayWidth / 650;

                // moving the mask
                this.energyMask2.x -= stepWidth;
                if(this.timeLeft == 0){
                    this.scene.start("MainScene")
                }
            },
            callbackScope: this,
            loop: true
        });
        
        let hunger = this.add.sprite( 100,190,'hunger');
        // the energy bar. Another simple sprite
        let hungerBar = this.add.sprite(hunger.x, hunger.y, "hungerbar");
        this.energyMask3 = this.add.sprite(hungerBar.x, hungerBar.y, "hungerbar");
        this.add.text(10,145,"HUNGER",style); // label it
        // ...it's not visible...
        this.energyMask3.visible = false;
        // and we assign it as hungerBar's mask.
        hungerBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyMask3)
        this.gameTimer = this.time.addEvent({
            delay: 0,
            callback: function()
            {
                this.timeLeft --;

                // dividing enery bar width by the number of seconds gives us the amount
                // of pixels we need to move the energy bar each second
                let stepWidth = this.energyMask3.displayWidth / 650;

                // moving the mask
                this.energyMask3.x -= stepWidth;
                if(this.timeLeft == 0)
                {
                    this.pet.anims.play('dead')
                    this.scene.start("MainScene")//restarts the main scene
                }
            },
            callbackScope: this,
            loop: true
        });
        
        
        
        
        
        //this.load.image("button","assets/button.png")
        this.toy=this.add.sprite(10,570,'toy')
        //toy.setInteractive();
        this.toy.setInteractive({ draggable: true });
        this.pet.setInteractive({ draggable: true });

        // to know the item is selected change the color of the item
        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff0000);
        });
        // curing the drag, the user can pick the item and then drag it where they
        //want it to go
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            console.log('drag', dragX, dragY)
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
        var circle = this.add.circle(350,95, 60, 0x9966ff);
        circle.setStrokeStyle(4, 0xefc53f);
        this.add.text(320,60,"LEVEL",style);
        //add tweens to make the circle fade in and out
        this.tweens.add({

            targets: circle,
            alpha: 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
    
        });

        //for the fight button hover over to press for fight
        const button = this.add.image( 30, 210, "button")
	        .setInteractive()
	        .on('pointerdown', () => button.setScale( 1.1 ))
	        .on('pointerup', () => button.setScale( 1 ));
        //idle animation for sprite
        
        // style format for the health stuff
        //var style = { font: "20px Arial", fill: "#fff"};
        
        
    }
    // Runs every frame
    update() 
    {
        
        
    }



}