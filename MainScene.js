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
        this.items = [];// this is a collection of items
        // this.itemsIcons = [];
        this.percent = 0;
        this.background = null;
        // this.item = null;

    }

    // Runs before entering the scene, LOAD IMAGES AND SOUND HERE
    preload() {
        // // preload to the screeen the background and the music
        // this.load.audio('bgmusic', './assets/gamemusic.mp3');

        //load the images for the food
        // const food = ["bun", "soup", "sandwich1", "sandwich2", "pancake2", "OJ", "orange","grilledcheese","eggs","drink2","drink","donut","cupcake","chicken", "pancake"];
        this.load.image('pancake', './assets/food/actualpancake.png')
        this.load.image('chicken', './assets/food/chicken.png')
        this.load.image('cupcake', './assets/food/cupcake.png')
        this.load.image('donut', './assets/food/donut.png')
        this.load.image('drink', './assets/food/drink.png')
        this.load.image('drink2', './assets/food/drink2.png')
        this.load.image('eggs', './assets/food/egg.png')
        this.load.image('grilledcheese', './assets/food/grilledcheese.png')
        this.load.image('orange', './assets/food/orange.png')
        this.load.image('OJ', './assets/food/orangejuice.png')
        this.load.image('pancake2', './assets/food/pancake.png')
        this.load.image('sandwich1', './assets/food/sandwich.png')
        this.load.image('sandwich2', './assets/food/sandwich2.png')
        this.load.image('soup', './assets/food/soup.png')
        this.load.image('bun', './assets/food/stickybun.png')

        //const food = ["bun", "soup", "sandwich1", "sandwich2", "pancake2", "OJ", "orange","grilledcheese","eggs","drink2","drink","donut","cupcake","chicken", "pancake"];
        //load the images for clothing
        this.load.image('bikini', './assets/clothe/bikini.png')
        this.load.image('boots', './assets/clothe/boots.png')
        this.load.image('boots2', './assets/clothe/boots2.png')
        this.load.image('bowtie', './assets/clothe/bow.png')
        this.load.image('hat', './assets/clothe/hat.png')
        this.load.image('jacket', './assets/clothe/jacket.png')
        this.load.image('outfit1', './assets/clothe/outfit1.png')
        this.load.image('outfit2', './assets/clothe/outfit2.png')
        this.load.image('outfit3', './assets/clothe/outfit3.png')
        this.load.image('shoes', './assets/clothe/shoes.png')
        this.load.image('shoes2', './assets/clothe/shoes2.png')
        this.load.image('witchhat', './assets/clothe/witch_hat.png')
        
        //load the images for playing
        this.load.image('bishop', './assets/play/chessbishop.png')
        this.load.image('castle', './assets/play/chesscastle.png')
        this.load.image('horse', './assets/play/chesshorse.png')
        this.load.image('king', './assets/play/chessking.png')
        this.load.image('pawn', './assets/play/chesspawn.png')
        this.load.image('queen', './assets/play/chessqueen.png')
        this.load.image('console1', './assets/play/game_console1.png')
        this.load.image('console2', './assets/play/game_console2.png')
        this.load.image('console3', './assets/play/game_console3.png')
        this.load.image('duckie', './assets/play/rubber_duck.png')
        this.load.image('octopus', './assets/play/rubber_ducktopus.png')
        this.load.image('toy2', './assets/play/toy.png')
        //const toys = ["bishop", "castle", "horse", "king", "pawn", "queen", "console1","console2","console3","duckie","octopus","toy"];
        //load the images for bathing
        this.load.image('lotion', './assets/bathe/body_lotion.png')
        this.load.image('brush', './assets/bathe/cleaning_brush.png')
        this.load.image('gloves', './assets/bathe/cleaning_gloves.png')
        this.load.image('detergent', './assets/bathe/detergent.png')
        this.load.image('sanitizer', './assets/bathe/hand_sanitiser.png')
        this.load.image('brush2', './assets/bathe/scrub_brush.png')
        this.load.image('shampoo', './assets/bathe/shampoo.png')
        this.load.image('soapbox', './assets/bathe/soap_box.png')
        this.load.image('soap', './assets/bathe/soap.png')
        this.load.image('sunscreen', './assets/bathe/sun_cream_tube.png')
        this.load.image('toothbrush', './assets/bathe/toothbrush.png')
        this.load.image('toothpaste', './assets/bathe/toothpaste.png')
        this.load.image('wipey', './assets/bathe/wet_wipe.png')
        this.load.image('box', './assets/bathe/toothpaste_box.png')
        //const bathing = ["lotion", "brush", "gloves", "detergent", "sanitizer", "brush2", "shampoo","soapbox","soap","sunscreen","toothbrush","wipey","box"];

    }
    // Runs when we first enter this scene
    create() 
    {

        var value=0;
        
        //create container to randomize music everytime load up the main scene
        const backgroundmusic=['1','2','3','4','5','6','7','8']
        //const bathing = ["lotion", "brush", "gloves", "detergent", "sanitizer", "brush2", "shampoo","soapbox","soap","sunscreen","toothbrush","wipey","box"];
        const musicloop = Math.floor(Math.random() * backgroundmusic.length);//choose random string name
                    //var box2 = this.add.rectangle(170, 740, 100, 100, 0xe7a23c);//create box to cover up overlapping
        this.sound.play(backgroundmusic[musicloop], { volume: 0.1 })//insert image with randomly chosen key
    
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

        var experience = this.add.rectangle(180, 140, 350, 30, 0xe7a23c);
        experience.setStrokeStyle(4, 0x1e0a08);
        this.add.text(50, 130, "XP", style);//label it 


       
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
        
        
        
        
        //this.items[3].on('pointerup',()=>hunger.width-=20);
        //this.createItems(); //creates the items the player interacts with the pet with
        // this.createAnimations();

        this.timeLeft = 50000;		
        this.gameTimer = this.time.addEvent({
                    delay:2000,
                    callback: function()
                    {
                     this.timeLeft --;//decrement the time left
                    experience.width-=350
                    
                     //for the health of the pet
                     var val1=Math.floor(Math.random() * 10) // using rand number between 0 and 10
                     health.width-=val1; //decrement the health randomly w/ val

                     var val2=Math.floor(Math.random() * 10) // using rand number between 0 and 10
                     hunger.width-=val2; //decrement the health randomly w/ val
                     console.log(hunger.width)//lets see what the width is 

                     //timing for the happiness to go down incrementally
                     var val3=Math.floor(Math.random() * 10) // using rand number between 0 and 10
                     happiness.width-=val3; //decrement the health randomly w/ val
                     console.log(happiness.width)//lets see what the width is 
 
                     //if one or more of the conditions are true and the pet dies, then the scene changes to game over
                     if(health.width<1||hunger.width<1)
                     {
                         this.sound.stopAll();
                         this.scene.start("MainDead")   
                     }
                     if(health.width<360)//placeholder for the value once if the players health,hunger happiness go above 350
                     {
                        // increment the value of the level
                        value++;
                        //set the new value to hold the level
                        text.setText([
                            'LVL\n\n' + value,
                            
                        ]);
                    
                    //add box to cover up items from overlapping
                    var InteractionIcons = this.add.rectangle(180, 720, 550, 160, 0xe7a23c);
                    InteractionIcons.setStrokeStyle(5, 0x1e0a08);
                    //add identifiers for the various components 
                    this.add.text(10, 650, "CLOTHE", style);//label it 
                    this.add.text(135, 650, "BATHE", style);//label it 
                    this.add.text(260, 650, "PLAY", style);//label it 
                    this.add.text(370, 650, "FEED", style);//label it 

                    //create list to iterate through with key string names of clothes
                    const clothes = ["bikini", "boots", "boots2", "bowtie", "hat", "jacket", "outfit1","outfit2","outfit3","shoes","shoes2","witchhat"];
                    const random = Math.floor(Math.random() * clothes.length);// choose random value and put it in the image
                    var box = this.add.rectangle(60, 740, 100, 100, 0xe7a23c);//becasue it loops it needs box before to cover up the old image
                    var clothing= this.add.image(60,740,clothes[random])//add the key randomly chose value string name
                    clothing.setScale(3);// set the size
                    clothing.setInteractive({ draggable: true });// it is draggable
                    clothing.on('dragend', function (pointer, gameObject) // after it is dragged, destroy it and effect stats
                    {
                        clothing.destroy()
                        happiness.width-=30
                        
                    });
            

                    //iterate through the bathing by string name
                    const bathing = ["lotion", "brush", "gloves", "detergent", "sanitizer", "brush2", "shampoo","soapbox","soap","sunscreen","toothbrush","wipey","box"];
                    const random2 = Math.floor(Math.random() * bathing.length);//choose random string name
                    var box2 = this.add.rectangle(170, 740, 100, 100, 0xe7a23c);//create box to cover up overlapping
                    var bath= this.add.image(170,740,bathing[random2])//insert image with randomly chosen key
                    bath.setScale(3);//size the image
                    bath.setInteractive({ draggable: true });//it can be dragged
                    bath.on('dragend', function (pointer, gameObject) //after dragging is done destroy copy and effect stats
                    {
                        bath.destroy()
                        health.width-=20
                    });

                    //iterate through the toys
                    const toys = ["bishop", "castle", "horse", "king", "pawn", "queen", "console1","console2","console3","duckie","octopus","toy2"];
                    const random3 = Math.floor(Math.random() * toys.length);//random chose string name
                    var box3 = this.add.rectangle(280, 740, 100, 100, 0xe7a23c);//create box
                    var playing= this.add.image(280,740,toys[random3])//add key to the new image
                    playing.setScale(3);//set the size
                    playing.setInteractive({ draggable: true });//draggable yes
                    playing.on('dragend', function (pointer, gameObject) //destroy object after dragging and then affect stats of pet
                    {
                        playing.destroy()
                        health.width-=20
                    });

                    //lastly iterat through the food
                    const food = ["bun", "soup", "sandwich1", "sandwich2", "pancake2", "OJ", "orange","grilledcheese","eggs","drink2","drink","donut","cupcake","chicken", "pancake"];
                    const random4 = Math.floor(Math.random() * food.length);//choose random value for the image icon from list
                    var box4 = this.add.rectangle(390, 740, 100, 100, 0xe7a23c);//add box
                    var feeding= this.add.image(390,740,food[random4])//input the key string name
                    feeding.setScale(3);// set the size
                    feeding.setInteractive({ draggable: true });//it can be dragged
                    feeding.on('dragend', function (pointer, gameObject) // once done dragging: destroy and affect the stats of the pet
                    {
                        feeding.destroy()
                        health.width-=20
                    });
                    
                    if(value>=10)//if the value hits a certain level, then the battle icon pops up
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
                        
                    }
                    
                    },
                    
                    callbackScope: this,
                    loop: true
                });           
                //calling the function Pet bar
                    this.petAnimations();
    }
    createItems() {

        for (let i = 0; i < 4; i++) 
        {
            if (i == 0) 
            {
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
                this.items[i].on('pointerup',()=>this.happiness.width+=5);
                this.items[i].on('pointerup',()=>this.health.width+=10);
            } 
            else if (i == 1) 
            {
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
                this.items[i].on('pointerup',()=>this.happiness.width+=5);
                this.items[i].on('pointerup',()=>this.health.width+=5);
                //var sprite1 = this.add.sprite(100, 200, 'player', 0);
                //var sprite1Copy = game.add.sprite(sprite1.x, sprite1.y, sprite1.key, sprite1.frame);
            } 
            else if (i == 2) 
            {
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
                this.items[i].on('pointerup',()=>this.hunger.width+=5);
                this.items[i].on('pointerup',()=>this.health.width+=5);
            } 
            else if (i == 3) 
            {
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
    petAnimations(){
        //calling petclass
        this.petClass= new Pet(this);
        this.petClass.Pet3Animation.call(this,'idle1');
       
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
    }
    // Runs every frame
    update() {
    //console.log(this.hungerw);
    
    }



    createAnimations() {
        //insert pet animations here????

  
    }
}