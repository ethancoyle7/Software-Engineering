//This scene is the pet area where interaction with the pet takes place
class MainScene extends Phaser.Scene {

    // This is where we define data members
    constructor() 
    {
        super("MainScene");
        this.pet = null;
        this.sound2 = 0;
        this.type = '';
        this.level = 0;
        this.enemy = ""
        this.encolor = ""
        this.enemyname = ""
        this.playername = ""
    }
    //this initializes the data
    init(data) {
        this.type = data.type;
        if (this.type == "") {
            // No username was provided
            this.type = "0";
        }
        this.level = data.level; // Level of the player
        this.enemy = data.enemy; // Enemy type
        this.enemyname = data.enemyname; // Enemy name
        this.playername = data.playername; // Player name

    }

    // Runs before entering the scene, LOAD IMAGES AND SOUND HERE
    preload() {
        this.load.image('quitbtn','./assets/quitbtn.png')
    }
    // Runs when we first enter this scene
    create() {
        this.sound.stopAll()// to prevent looping stop all previous sounds
        var value = 0 // value for the level



        //call the getnickname function
        getNickname().then(data => {
            this.playername = data;//assign the api return data of the player nickname to the nickname to be used throughout
        });

        //to display all the users log all the accounts
        console.log(allusers)
        getUsers().then(users => {
            console.log("the enemy we will fight is name is : " + enemey);//name of the enemy
            //assign the enemy name to the value of the enemy
            this.enemyname = enemey;
            getEnemyColor().then(enemyColor => {
                console.log(enemyColor);
                console.log("the usernames color of that one  is : " + enemyColor);// color of the enemy
                //after reading in the enemy color and name we can now compare the color of enemy and assign it a value 
                //for the fight color animation
                if (enemyColor == 'red') {
                    this.enemy = 0;
                }
                else if (enemyColor == 'white') {
                    this.enemy = 1;
                }
                else {
                    this.enemy = 2;
                }
            });
        });


        //////////////////////////////////////////////////////////////////////////
        // ██╗    ██╗   ██╗██╗          ██████╗██╗  ██╗███████╗ ██████╗██╗  ██╗ //
        // ██║    ██║   ██║██║         ██╔════╝██║  ██║██╔════╝██╔════╝██║ ██╔╝ //
        // ██║    ██║   ██║██║         ██║     ███████║█████╗  ██║     █████╔╝  //
        // ██║    ╚██╗ ██╔╝██║         ██║     ██╔══██║██╔══╝  ██║     ██╔═██╗  //
        // ███████╗╚████╔╝ ███████╗    ╚██████╗██║  ██║███████╗╚██████╗██║  ██╗ //
        // ╚══════╝ ╚═══╝  ╚══════╝     ╚═════╝╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝ //
        //////////////////////////////////////////////////////////////////////////

        //check to see if the level being passed is undefined or not
        if (this.level == undefined)// if undefined set the level to 0
        {
            console.log("level is undefined");
            this.level = 0;
            this.level = value;
        }
        else// if not undefined set the level to the level passed
        {
            console.log(" not undefined");
            value = this.level;
        }
        //set the text to the level
        //this.add.text(10, 10, 'Level: ' + value, { fontSize: '32px', fill: '#000' });



        //increment this.level by one
        //this.level = this.level + 1;
        console.log(" our level is this: " + value);

        ////////////////////////////////////////////////////////////////////////////////////////
        // ██████╗  █████╗ ███╗   ███╗███████╗    ███████╗███████╗████████╗██╗   ██╗██████╗   //
        // ██╔════╝ ██╔══██╗████╗ ████║██╔════╝    ██╔════╝██╔════╝╚══██╔══╝██║   ██║██╔══██╗ //
        // ██║  ███╗███████║██╔████╔██║█████╗      ███████╗█████╗     ██║   ██║   ██║██████╔╝ //
        // ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝      ╚════██║██╔══╝     ██║   ██║   ██║██╔═══╝  //
        // ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗    ███████║███████╗   ██║   ╚██████╔╝██║      //
        //  ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝    ╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝      //
        ////////////////////////////////////////////////////////////////////////////////////////

        //create container to randomize music everytime load up the main scene
        const backgroundmusic = ['1', '2', '3', '4', '5', '6']
        //const bathing = ["lotion", "brush", "gloves", "detergent", "sanitizer", "brush2", "shampoo","soapbox","soap","sunscreen","toothbrush","wipey","box"];
        const musicloop = Math.floor(Math.random() * backgroundmusic.length);//choose random string name
        //var box2 = this.add.rectangle(170, 735, 100, 100, 0xe7a23c);//create box to cover up overlapping
        this.sound.play(backgroundmusic[musicloop], { volume: 3 })//insert image with randomly chosen key
        // for clarification the console will show what music number is playing
        //console.log(backgroundmusic[musicloop])//see what sound playing

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
            //console.log(this.sound2);
            if (this.sound2 == 0) {
                this.sound2 += 1;
                //console.log(this.sound2);
                this.sound.stopAll();
            } else {
                this.sound2 -= 1;
                this.sound.play(backgroundmusic[musicloop], { volume: 3 })
            }
        })


        //adding the sprite and then setting the scale on the screen
        this.pet = this.add.sprite(200, 450, "pet");
        //setting the initial size of pet according to its level
        //this is the size shown upon loading the page
        if(this.level<10){
            this.pet.setScale(5);
            console.log("At least I work");
            console.log(this.level);
            console.log(value);
        }
        else if(this.level>=10 && this.level <20){
            this.pet.setScale(7)
            console.log(value)
        }
        else if(this.level>20 && this.level <30){
            this.pet.setScale(8);
        }
        else if(this.level >=30){
            this.pet.setScale(9);
        }
        

        // depending on the pet the value passed in will be assigned to certain pet and
        //the number passed in will reference the choice below i.e if the user
        // choses 1 then the value inside of the game will reference list item number 1
        // in each choice below
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
        this.add.text(10, 88, "SATISFACTION", style);//label it 
        //create rectangle for xp points

        //oscillating display of rectangle targeting this rectangle
        //this takes the form of a rectangle with a purple fill fading 
        //in and out constantly
        this.tweens.add({

            targets: levelrect,//rectangle it is targeting
            alpha: 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'

        });

        //txt to be inside of the level to let the user know what level they are on
        var text = this.add.text(378, 30, '', { font: '20px Courier', fill: '#00ff00' });
        //set the text indicator for the level icon text value

        //set the text to display the level
        text.setText([

            'LVL \n\n ' + (this.level),
            console.log("level is" + this.level)
        ]);
        //creating experience bar and value
        var experience = 0;
        var EXP = this.add.text(10, 130, '', { font: '20px Arial', fill: '#00ff00' });
        //set the text indicator for the level icon text value
        EXP.setText([
            'EXPERIENCE : ' + experience,
        ]);

        const signoutButton = this.add.image(70 ,200 , 'quitbtn')
        signoutButton.setInteractive() // set it interactive
        signoutButton.setScale(2)
        signoutButton.on('pointerdown', () => signOut())
        // signoutButton.on('pointerup', () => signOut.setScale(2.5));



        // to help identify the interactions and the array of items, create label to differentiate
        var PetFed = this.add.text(320, 140, '', { font: '20px Arial', fill: '#00ff00' });
        var PetClothed = this.add.text(310, 130, '', { font: '20px Arial', fill: '#00ff00' });
        var PetBathed = this.add.text(320, 180, '', { font: '20px Arial', fill: '#00ff00' });
        var PetPlay = this.add.text(320, 200, '', { font: '20px Arial', fill: '#00ff00' });

        //////////////////////////////////////////////////////////////////////////////////
        // ██╗      ██████╗  █████╗ ██████╗     ██╗████████╗███████╗███╗   ███╗███████╗ //
        // ██║     ██╔═══██╗██╔══██╗██╔══██╗    ██║╚══██╔══╝██╔════╝████╗ ████║██╔════╝ //
        // ██║     ██║   ██║███████║██║  ██║    ██║   ██║   █████╗  ██╔████╔██║███████╗ //
        // ██║     ██║   ██║██╔══██║██║  ██║    ██║   ██║   ██╔══╝  ██║╚██╔╝██║╚════██║ //
        // ███████╗╚██████╔╝██║  ██║██████╔╝    ██║   ██║   ███████╗██║ ╚═╝ ██║███████║ //
        // ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝     ╚═╝   ╚═╝   ╚══════╝╚═╝     ╚═╝╚══════╝ //
        //////////////////////////////////////////////////////////////////////////////////

        //display helpful tool for the user that easing in and out about the labels
        var InfoBox = this.add.rectangle(225, 630, 450, 30, 0x000000);
        InfoBox.setStrokeStyle(2, 0x1e0a08);
        var Info = this.add.text(5, 615, '', { font: '24px Arial', fill: '#00ff00' });
        //set the text indicator for the level icon text value
        Info.setText([
            'Click/Drag Item Below to Interact with Pet',
        ]);
        this.tweens.add({

            targets: Info,//who it targeting
            alpha: 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'

        });
        // display the box that holds the identifiers for the icons
        var InteractionIcons = this.add.rectangle(225, 660, 450, 30, 0xe7a23c);
        InteractionIcons.setStrokeStyle(2, 0x1e0a08);
        //add identifiers for the various components 
        this.add.text(10, 650, "CLOTHE", style);//label it 
        this.add.text(135, 650, "BATHE", style);//label it 
        this.add.text(260, 650, "PLAY", style);//label it 
        this.add.text(370, 650, "FEED", style);//label it 
        //load up the food items
        //draw a semi transparent circle colored gray
        var foodcircle = this.add.circle(390, 735, 50, 0x000000);
        foodcircle.setStrokeStyle(4, 0x00ff00);
        foodcircle.setAlpha(0.5);


        const food = ["bun", "soup", "sandwich1", "sandwich2", "pancake2", "OJ", "orange", "grilledcheese", "eggs", "drink2", "drink", "donut", "cupcake", "chicken", "pancake"];
        const random4 = Math.floor(Math.random() * food.length);//choose random value for the image icon from list
        //var box4 = this.add.rectangle(390, 735, 100, 100, 0xe7a23c);//add box
        var feeding = this.add.image(390, 735, food[random4])//input the key string name
        feeding.setScale(2.5);// set the size
        feeding.setInteractive({ draggable: true });//it can be dragged
        this.tweens.add({

            targets: feeding,//who it targeting
            alpha: 0.8,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'

        });

        var toycircle = this.add.circle(280, 735, 50, 0x000000);
        toycircle.setStrokeStyle(4, 0x00ff00);
        toycircle.setAlpha(0.5);
        //for the playing load up random image
        const toys = ["bishop", "castle", "horse", "king", "pawn", "queen", "console1", "console2", "console3", "duckie", "octopus", "toy2"];
        const random3 = Math.floor(Math.random() * toys.length);//randomly chosen string name
        var playing = this.add.image(280, 735, toys[random3])//add key to the new image
        playing.setScale(2.5);//set the size
        playing.setInteractive({ draggable: true });//draggable yes
        this.tweens.add({

            targets: playing,//who it targeting
            alpha: 0.8,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'

        });

        //for the bathing load up random image
        var bathcircle = this.add.circle(170, 735, 50, 0x000000);
        bathcircle.setStrokeStyle(4, 0x00ff00);
        bathcircle.setAlpha(0.5);
        const bathing = ["lotion", "brush", "gloves", "detergent", "sanitizer", "brush2", "shampoo", "soapbox", "soap", "sunscreen", "toothbrush", "wipey", "box"];
        const random2 = Math.floor(Math.random() * bathing.length);//choose random string name
        //var box2 = this.add.rectangle(170, 735, 100, 100, 0xe7a23c);//create box to cover up overlapping
        var bath = this.add.image(170, 735, bathing[random2])//insert image with randomly chosen key
        bath.setScale(2.5);//size the image
        bath.setInteractive({ draggable: true });//it can be dragged
        this.tweens.add({

            targets: bath,//who it targeting
            alpha: 0.8,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'

        });

        var clothecircle = this.add.circle(60, 735, 50, 0x000000);
        clothecircle.setStrokeStyle(4, 0x00ff00);
        clothecircle.setAlpha(0.5);
        //create list to iterate through with key string names of clothes
        const clothes = ["bikini", "boots", "boots2", "bowtie", "hat", "jacket", "outfit1", "outfit2", "outfit3", "shoes", "shoes2", "witchhat"];
        const random = Math.floor(Math.random() * clothes.length);// choose random value and put it in the image
        //var box = this.add.rectangle(60, 735, 100, 100, 0xe7a23c);//because it loops it needs box before to cover up the old image
        var clothing = this.add.image(60, 735, clothes[random])//add the key randomly choice value string name
        clothing.setScale(2.5);// set the size
        clothing.setInteractive({ draggable: true });// it is draggable
        this.tweens.add({

            targets: clothing,//who it targeting
            alpha: 0.8,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'

        });
        //set warning for the health width being too low the player needs to interact
        //and if the health stays at 5 till the the three hours, then the player will die
        var Warning = this.add.text(130, 345, '', { font: '24px Arial', fill: '#00ff00' }); //health warning
        var Warning2 = this.add.text(130, 365, '', { font: '24px Arial', fill: '#00ff00' });//before the pet runs away
        //adding tweens to the warnings for flashing
        this.tweens.add({

            targets: Warning,//who it targeting
            alpha: 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'

        });
        this.tweens.add({

            targets: Warning2,//who it targeting
            alpha: 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'

        });
        //console.log(" feeding x is " + feeding.x);
        //console.log(" feeding y is " + feeding.y);
        var box = this.add.rectangle(130, 595, 240, 30, 0x000000);
        box.setStrokeStyle(4, 0x00ff00);
        box.setAlpha(0.5)
        var Timer = this.add.text(10, 580, '', { font: '24px Arial', fill: '#00ff00' });
        //create transparent box to cover up the overlapping
        
        //set the text indicator for the level icon text value

        //set the text to display the level
        //convert milliseco
        Timer.setText([""]);
        

        /////////////////////////////////////////////////////////////////////////////////////////////
        // ████████╗██╗███╗   ███╗███████╗    ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗ //
        // ╚══██╔══╝██║████╗ ████║██╔════╝    ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝ //
        //    ██║   ██║██╔████╔██║█████╗      █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗ //
        //    ██║   ██║██║╚██╔╝██║██╔══╝      ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║ //
        //    ██║   ██║██║ ╚═╝ ██║███████╗    ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║ //
        //    ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝    ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝ //
        /////////////////////////////////////////////////////////////////////////////////////////////                                                                       
        //create a timer for the game loop which will cause the pets' health value to slowly decline and 
        // the attributes of the pet will increase and decrease depending on the actions
        this.timeLeft = 10800000;// 3 hours
        this.gameTimer = this.time.addEvent({
            delay: 500,
            callback: function () {
        //         var Timer = this.add.text(10, 580, '', { font: '24px Arial', fill: '#00ff00' });
        // //set the text indicator for the level icon text value

        // //set the text to display the level
        //         Timer.setText([""]);
                this.timeLeft--;//decrement the time left
                //iftimeleft--

                
                
                //add text on the screen to view the timeleft
                //var timeLeftText = this.add.text(10, 580, 'Time Left: ' + this.timeLeft, { font: '24px Arial', fill: '#00ff00' });
                //console.log("time left is " + this.timeLeft);
                //experience.width-=350
                //resetting the values of the notifications
                PetClothed.setText([''])
                PetBathed.setText(['']);
                PetFed.setText(['']);
                PetPlay.setText(['']);
                //set the warning texts to empty
                Warning.setText(['']);
                Warning2.setText(['']);

                //set values dependant on the level
                var levelupvalue = 2
                var decrement = 1
                var increment = 2
                //if statement to boost up the intensity of the fight



                if (this.level >= 20 && this.level < 30) //if the level is less than 10
                {
                    levelupvalue = 4 //level up value is 4
                    decrement = 3 //decrement is 3
                    increment = 4 //increment is 4
                }
                if (this.level >= 30 && this.level < 40) //if the level is less than 10
                {
                    levelupvalue = 5 //level up value is 5
                    decrement = 4 //decrement is 4
                    increment = 5 //increment is 5
                }
                if (this.level >= 40 && this.level < 50) //if the level is less than 10
                {
                    levelupvalue = 6 //level up value is 6
                    decrement = 5 //decrement is 5
                    increment = 6 //increment is 6
                }
                if (this.level >= 50 && this.level < 60) //if the level is less than 10
                {
                    levelupvalue = 7 //level up value is 7
                    decrement = 6 //decrement is 6
                    increment = 7 //increment is 7

                }
                if (this.level >= 60 && this.level < 70) //if the level is less than 10
                {
                    levelupvalue = 8 //level up value is 8
                    decrement = 7 //decrement is 7
                    increment = 8 //increment is 8
                }
                if (this.level >= 70 && this.level < 80) //if the level is less than 10
                {
                    levelupvalue = 9 //level up value is 9
                    decrement = 8 //decrement is 8
                    increment = 9 //increment is 9
                }
                if (this.level >= 80 && this.level < 90) //if the level is less than 10
                {
                    levelupvalue = 10 //level up value is 10
                    decrement = 9 //decrement is 9
                    increment = 10 //increment is 10

                }
                if (this.level >= 90) //if the level is less than 10
                {
                    levelupvalue = 11 //level up value is 11
                    decrement = 10 //decrement is 10
                    increment = 11 //increment is 11

                }
                else {
                    decrement = 3
                }
                //for the health of the pet

                var val1 = Math.floor(Math.random() * decrement) // using random number between 0 and 10
                health.width -= val1; //decrement the health randomly w/ val

                var val2 = Math.floor(Math.random() * decrement) // using random number between 0 and 2
                hunger.width -= val2; //decrement the health randomly w/ val
                //console.log(hunger.width)//lets see what the width is 

                //timing for the happiness to go down incrementally
                var val3 = Math.floor(Math.random() * decrement) // using random number between 0 and 10
                happiness.width -= val3; //decrement the health randomly w/ val


                /////////////////////////////////////////////////////////////////////
                // ██████╗██╗      ██████╗ ████████╗██╗  ██╗██╗███╗   ██╗ ██████╗  //
                // ██╔════╝██║     ██╔═══██╗╚══██╔══╝██║  ██║██║████╗  ██║██╔════╝ //
                // ██║     ██║     ██║   ██║   ██║   ███████║██║██╔██╗ ██║██║  ███╗//
                // ██║     ██║     ██║   ██║   ██║   ██╔══██║██║██║╚██╗██║██║   ██║//
                // ╚██████╗███████╗╚██████╔╝   ██║   ██║  ██║██║██║ ╚████║╚██████╔╝//
                //  ╚═════╝╚══════╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ //
                /////////////////////////////////////////////////////////////////////  

                if (clothing == null)//check to see if the destroyed image is null
                {
                    console.log('null image')//log the null image to console
                    experience++;
                    EXP.setText(['EXPERIENCE : ' + experience]);
                    const random = Math.floor(Math.random() * clothes.length);// choose random value and put it in the image
                    clothing = this.add.image(60, 735, clothes[random])//add the key randomly choice value string name
                    clothing.setScale(2.5);// set the size
                    clothing.setInteractive({ draggable: true });// it is draggable
                    this.tweens.add({

                        targets: clothing,//who it targeting
                        alpha: 0.8,
                        yoyo: true,
                        repeat: -1,
                        ease: 'Sine.easeInOut' //effect for our image

                    });
                }

                //on the pointer down trigger the stop and start new animation for the pet
                clothing.on('pointerdown', () => {
                    this.pet.anims.stop('run'); //stop the pet run
                    this.pet.anims.play('feed'); //play the pet feed
                });
                //check to see if the clothing is moved and the pointer is up then destroy the clothing
                clothing.on('pointerup', () => {
                    //if the clothing is moved above where originally is, destroy it and do some things
                    if (clothing.x >= 60 || clothing.x <= 60 || clothing.x <= 0 || clothing.x >= 450 && clothing.y < 650) {
                        this.pet.anims.stop('feed')// stop the feed animation
                        this.pet.anims.play('run')// play the run animation
                        clothing.destroy(); // destroy the clothing
                        clothing = null
                        var clothingupdate = happiness.width += increment; //add happiness
                        happiness.width += increment
                        if (clothingupdate >= 350) {
                            happiness.width = 350// reset the width setting outer right bounds

                        }

                        PetClothed.setText([' PET CLOTHED']);   // set the text to be displayed
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

                if (bath == null)//check to see if the destroyed image is null
                {
                    console.log('null image')//log the null image and increase experience
                    experience++;
                    EXP.setText(['EXPERIENCE : ' + experience]);
                    const random2 = Math.floor(Math.random() * bathing.length);//choose random string name
                    bath = this.add.image(170, 735, bathing[random2])//insert image with randomly chosen key
                    bath.setScale(2.5);//size the image
                    bath.setInteractive({ draggable: true });//it can be dragged
                    this.tweens.add({

                        targets: bath,//who it targeting
                        alpha: 0.8,
                        yoyo: true,
                        repeat: -1,
                        ease: 'Sine.easeInOut' //ease effect for item

                    });
                }

                bath.on('pointerdown', () => {
                    this.pet.anims.stop('run'); //stop the pet run
                    this.pet.anims.play('bathe+'); //play the pet feed
                });
                //check to see if the clothing is moved and the pointer is up then destroy the clothing
                bath.on('pointerup', () => {
                    //if the clothing is moved above where originally is, destroy it and do some things
                    if (bath.x >= 170 || bath.x <= 170 || bath.x <= 0 || bath.x >= 450 && bath.y < 650) {
                        this.pet.anims.stop('bathe+')// stop the feed animation
                        this.pet.anims.play('run')// play the run animation
                        bath.destroy(); // destroy the clothing
                        bath = null
                        PetClothed.setText([' PET BATHED']);   // set the text to be displayed

                        //checking for bounds and updating the happiness and health
                        var bathupdatehappiness = happiness.width += 2; //add happiness
                        happiness.width += 2
                        if (bathupdatehappiness >= 350) {
                            happiness.width = 350// reset the width setting outer right bounds

                        }
                        //checking the health of the pet and  then resestting it if above 350
                        var bathupdatehealth = health.width += increment; //add happiness
                        health.width += 2
                        if (bathupdatehealth >= 350) {
                            health.width = 350// reset the width setting outer right bounds

                        }
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

                if (playing == null)//check to see if the destroyed image is null
                {
                    console.log('null image')// log the null image
                    experience++;// increase the experience by one and add new image
                    EXP.setText(['EXPERIENCE : ' + experience]); // display the experience text
                    const random3 = Math.floor(Math.random() * toys.length);//random choice string name
                    playing = this.add.image(280, 735, toys[random3])//add key to the new image
                    playing.setScale(2.5);//set the size
                    playing.setInteractive({ draggable: true });//draggable yes
                    this.tweens.add({

                        targets: playing,//who it targeting
                        alpha: 0.8,
                        yoyo: true,
                        repeat: -1,
                        ease: 'Sine.easeInOut' // effect for our item

                    });
                }

                playing.on('pointerdown', () => {
                    this.pet.anims.stop('run'); //stop the pet run
                    this.pet.anims.play('health+'); //play the pet feed
                });
                //check to see if the clothing is moved and the pointer is up then destroy the clothing

                playing.on('pointerup', () => {
                    //if the clothing is moved above where originally is, destroy it and do some things
                    if (playing.x >= 280 || playing.x <= 280 || playing.x <= 0 || playing.x >= 450 && playing.y < 650) {
                        this.pet.anims.stop('health+')// stop the feed animation
                        this.pet.anims.play('run')// play the run animation
                        playing.destroy(); // destroy the clothing
                        playing = null//set it to null value
                        PetClothed.setText([' PET PLAYING']);   // set the text to be displayed
                        // health.width += increment;   //decrement the hunger

                        //increment bars and check for bounds
                        var playupdatehappiness = happiness.width += increment; //add happiness
                        happiness.width += increment //increment the happiness
                        if (playupdatehappiness >= 350) //if the happiness is out of bounds
                        {
                            happiness.width = 350// reset the width setting outer right bounds

                        }
                        //checking and incrementing the health bar
                        var bathupdatehealth = health.width += increment; //add happiness
                        health.width += increment //increment the happiness
                        //hunger.width+=20
                        if (bathupdatehealth >= 350) //check to see if the happiness is out of bounds
                        {
                            health.width = 350// reset the width setting outer right bounds

                        }

                        //happiness.width += increment; //increment the happiness
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

                if (feeding == null)//check to see if the image is null, if it is add new randomly picked image
                {
                    console.log('null image')
                    experience++;
                    EXP.setText(['EXPERIENCE : ' + experience]);
                    var random4 = Math.floor(Math.random() * food.length);//random chose string name
                    feeding = this.add.image(390, 735, food[random4])//input the key string name
                    feeding.setScale(2.5);// set the size
                    feeding.setInteractive({ draggable: true });//it can be dragged
                    this.tweens.add({

                        targets: feeding,//who it targeting
                        alpha: 0.8, // the transparency level
                        yoyo: true,//yoyo effect
                        repeat: -1,//constantly repeat
                        ease: 'Sine.easeInOut' // add ease effect to the feeding icon

                    });
                }
                feeding.on('pointerdown', () => {

                    this.pet.anims.stop('run'); //stop the pet run
                    this.pet.anims.play('feed'); //play the pet feed
                });
                //check to see if the clothing is moved and the pointer is up then destroy the clothing


                feeding.on('pointerup', () => {
  
                    this.pet.anims.stop('feed')// stop the feed animation
                    this.pet.anims.play('run')// play the run animation
                    //if (feeding.y< 690)
                    if (feeding.x >= 390 || feeding.x <= 390 || feeding.x <= 0 || feeding.x >= 450 && feeding.y < 650)
                    //or if the clothing is moved above


                    {

                        feeding.destroy(); // destroy the clothing
                        console.log(' is it destroyed??')
                        feeding = null


                        PetClothed.setText([' PET FED']);   // set the text to be displayed
                        //health.width += increment

                        //increment bars and check for bounds
                        var foodupdatehealth = health.width += increment; //add happiness
                        health.width += increment //increment the happiness
                        if (foodupdatehealth >= 350) //if the happiness is out of bounds
                        {
                            health.width = 350// reset the width setting outer right bounds

                        }
                        //update the happiness
                        var foodupdatehappiness = happiness.width += increment; //add happiness
                        happiness.width += increment //increment the happiness
                        if (foodupdatehappiness >= 350) //if the happiness is out of bounds
                        {
                            happiness.width = 350// reset the width setting outer right bounds

                        }
                        //update the hunger bar
                        var foodupdatehunger = hunger.width += increment; //add happiness
                        hunger.width += increment //increment the happiness
                        //hunger.width-=50
                        if (foodupdatehunger >= 350) //if the happiness is out of bounds
                        {
                            hunger.width = 350// reset the width setting outer right bounds

                        }
                        //sound play
                        if (this.sound2 == 0) //if the sound is not muted
                        {
                            this.sound.play('eatingsound'); //play the sound
                        }
                    }

                });


                if (value >= 10)//if the value hits a certain level, then the battle icon pops up
                {
                    this.level = value;
                    
                    //for the fight button hover over to press for fight
                    // this button leads to click sequence when pressed
                    const button = this.add.image(70, 275, 'button')
                    button.setInteractive() // set it interactive
                    button.on('pointerdown', () => button.setScale(1.1))// set the scale of the button
                    button.on('pointerup', () => button.setScale(1));// on pointer up
                    button.on('pointerdown', () => this.sound.stopAll());// remove the bg music
                    button.on('pointerdown', () => this.scene.start('FightScene', {
                        type: this.type,
                        level: this.level,
                        enemy: this.enemy,
                        enemyname: this.enemyname,//pass in the name of the enemy
                        playername: this.playername//pass in the player name
                    }))// lead to fight scene
                }
                if(value==5){
                    const button2 = this.add.image(70, 320, 'button');
                    button2.setInteractive() // set it interactive
                    button2.on('pointerdown', () => button2.setScale(1.1))// set the scale of the button
                    button2.on('pointerup', () => button2.setScale(1));// on pointer up
                    button2.on('pointerdown', () => this.sound.stopAll());// remove the bg music
                    button2.on('pointerdown', () => this.scene.start('RetirementScene', {
                        type: this.type,
                        level: this.level,
                    }))
                }


                //lets boost intensity of the next leveling up take longer to level up after certain level

                //after checking the level adjust the increment to the new level up value
                if (experience >= levelupvalue)// once certain amount of experience, level up and play sound
                {
                    // play the level up sound
                    if (this.sound2 == 0) {
                        this.sound.play('levelingup');
                    }
                    //this.pet.anims.stop('levelup'); //stop the pet level up
                    //this.pet.anims.play('run'); //play the pet run
                    PetClothed.setText(['LEVEL UP!']); //set the text to be displayed
                    //reset the experience
                    experience = 0;
                    value++// increment the value for the level

                    text.setText([
                        'LVL \n\n ' + (this.level += 1),

                    ]);

                    EXP.setText(['EXPERIENCE : ' + experience]);
                }
                //this changes the size of the pet every 10 levels
                //It stops growing in size at level 30
                if(value>=10 && value <20){
                    this.pet.setScale(7)
                    console.log(value)
                }
                else if(value>20 && value <30){
                    this.pet.setScale(8);
                }
                else if(value >=30){
                    this.pet.setScale(9);
                }

                // create bounds for the containers
                // to avoid it going to the left

                if (health.width > 5) {
                    Warning.setText([
                        '',
                    ]);
                }
                if (health.width <= 5 && this.timeLeft != 0) {
                    health.width = 5;// reset it to 5
                    //create a text in the middle of the screen to say Feed Your Pet

                    //set text box to warn user they must feed the pet

                    //set the text indicator for the level icon text value
                    Warning.setText([
                        'Pet Needs Attention!!',
                    ]);
                    this.tweens.add({

                        targets: Warning,//who it targeting
                        alpha: 0.5,
                        yoyo: true,
                        repeat: -1,
                        ease: 'Sine.easeInOut'

                    });


                }

                //if he health is less than 0 and the timer is less than 0, then the game over scene is called
                if (health.width <= 5 && this.timeLeft <= 0)// if the time runs out and the health is at 2, then the game over scene is called
                {
                    this.scene.start("MainDead",
                        {
                            type: this.type
                        })
                }
                //create left bound checking with the happiness bar if it falls below 5 reset it on the screen to 5 

                if (happiness.width <= 5) // if the happiness falls below this, reset the val
                {
                    happiness.width = 5;// reset it to 2


                }
                ////////////////////////////////////////////////////////////////////
                // ██████╗ ██╗   ██╗███╗   ██╗ █████╗ ██╗    ██╗ █████╗ ██╗   ██╗ //
                // ██╔══██╗██║   ██║████╗  ██║██╔══██╗██║    ██║██╔══██╗╚██╗ ██╔╝ //
                // ██████╔╝██║   ██║██╔██╗ ██║███████║██║ █╗ ██║███████║ ╚████╔╝  //
                // ██╔══██╗██║   ██║██║╚██╗██║██╔══██║██║███╗██║██╔══██║  ╚██╔╝   //
                // ██║  ██║╚██████╔╝██║ ╚████║██║  ██║╚███╔███╔╝██║  ██║   ██║    //
                // ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝    //
                ////////////////////////////////////////////////////////////////////
                //experience checker, if the user gets 10 experience points, then the pet will level up
                //reate bounds check if the time left is not less than 0 then reset the hunger width to 5
                //after resetting make another heck to see if the time is 0 and if the hunger is still less than 5
                // load the run away scene because the pet did not get fed before the time runs out

                if (hunger.width > 5) {
                    Warning2.setText([
                        '',
                    ]);
                }
                if (hunger.width <= 5 && this.timeLeft2 != 0) {
                    hunger.width = 5;// reset it to 5
                    //set text box to warn user they must feed the pet

                    //set the text indicator for the level icon text value
                    Warning2.setText([
                        'Your Pet is Hungry!!',
                    ]);

                }
                //if hunger.width is not 5 or less

                else if (hunger.width <= 5 && this.timeLeft2 <= 0) //if the hunger bar goes below 1 and the time left is 0
                {   //then load the runawaypet scene
                    this.scene.start("Runawaypet",
                        {
                            type: this.type// pass the type of pet into the new scene
                        })
                }
                //if one or more of the conditions are true and the pet dies, then the scene changes to game over

            },
            callbackScope: this,
            loop: true
        });

        // this.timeLeft2 = 10800000;// 3 hours
        // this.gameTimer2 = this.time.addEvent({
        //     delay: 0,
        //     callback: function () 
        //     {
        // //         var Timer = this.add.text(10, 580, '', { font: '24px Arial', fill: '#00ff00' });
        // // //set the text indicator for the level icon text value
    
        // // //set the text to display the level
        // //         Timer.setText([""]);
        //         //this.timeLeft2--;//decrement the time left
        //         //this.timeLeft2--;
        //         console.log(this.timeLeft2%180000)
        //         let sec = Math.floor(this.timeLeft2 / 1000);
        //         let hrs = Math.floor(sec / 3600);
        //         sec -= hrs * 3600;
        //         let min = Math.floor(sec / 60);
        //         sec -= min * 60;
              
        //         sec = '' + sec;
        //         sec = ('00' + sec).substring(sec.length);
              
               
        //         // Timer.setText([
    
    
                    
        //         //     'Time Left: ' + (this.timeLeft2/1000/60).toFixed(2) +' minutes'
        //         //     //'Time Left: ' + ((this.timeLeft2/60000)).toFixed(2)+ ' ms'
        //         // ]);
                
                
        //         this.timeLeft2--;
                    
                  
        //     },
        //     callbackScope: this,
        //     loop: true
        // });
    }
    

    // Runs every frame update any items inside of the scene
    update() {
        

    }
}