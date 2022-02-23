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
      //create a backdound and a music for the load up 
        this.sound.play('bgmusic', { volume: 0.4});
        // load the background image and set x and y coords
        // then set the scale to .7
        
        let background = this.add.image(225, 400, 'bg');
        background.setScale(.7);
        this.pet =this.add.sprite(200,500,"pet")
        //this.load.image("button","assets/button.png")
        

        //variable given to the asset( x, y coordingte and then 
        // name of the assign asset)
        // loading up the health meters from the boot stage
        //make 3 bars
        //this.healthBar=this.add.makeBar(160,20,0x2ecc71);
        var style = { font: "20px Arial", fill: "#fff"};
        //add health bar
        let healthBar=this.makeBar(10,25,0x2ecc71);
        this.setValue(healthBar,100);
        this.add.text(10,5,"HEALTH",style);
        //add happiness bar
        let happinessbar=this.makeBar(10,80,0xe74c3c);
        this.setValue(happinessbar,100);
        this.add.text(10,60,"HAPPINESS",style);
        //add hungerbar
        let hungerbar=this.makeBar(10,135,0x2980b9);
        this.setValue(hungerbar,100);
        this.add.text(10,115,"HUNGER",style);
        
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
        
    }
    makeBar(x, y,color) 
    {
        //draw the bar
        let bar = this.add.graphics();

        //color the bar
        bar.fillStyle(color, 1);

        //fill the bar with a rectangle
        bar.fillRect(0, 0, 200, 20);
        
        //position the bar
        bar.x = x;
        bar.y = y;

        //return the bar
        return bar;
    }
    setValue(bar,percentage) 
    {
        //scale the bar
        bar.scaleX = percentage/100;
    }
    // Runs every frame
    update() 
    {
        
        
    }



}