class BootScene extends Phaser.Scene {
    constructor(){
        super("BootScene");
        //defining the variables needed
        this.loadBar = null;
        this.loadTxt= null;
        this.percent =0;
        this.imageNum=0;
        this.fileload="";
        //this.kitten=[];
        this.petImage=null;
    }


    preload() {
        
        //This is where images are loaded
        //this.load.image('use a short name', './assets/name_of_image');
        
        
        //loops through all image options of bootpet.js
        for (let i = 0; i < BOOTPET.length; i++) {
            this.load.image(BOOTPET[i].name, `./assets/${BOOTPET[i].image}`);
            //this.load.image('bg', './assets/loading.png');
        }

        //This is the loading bar area - i reused some code
        this.loadingBar = this.add.rectangle(235, 300, 420, 40, 0x22dd4b);
        this.loadingTxt = this.add.text(235,250, "0%", {
            fontSize: '24px',
            color: 'white',
            align: 'center'
        });
        this.loadingTxt.setOrigin(0.5);
        // Load a bunch of assets 
        this.load.image('square', './assets/square.png');
        // for (let i = 0; i < 600; i++) {
        //     this.load.image(`square-${i}`, './assets/square.png');
        // }

        // "MainScene" preload to the screeen the background and the music
        this.load.image('bg', './assets/background.png');
        this.load.image('Fight', './assets/loading.png');
        this.loadprops();
        this.load.image('Return', './assets/ReturntoMainButton.png');

        // preload the pet and the health meters from assets file
        // this.load.image("pet","assets/charater.png") //this is for an image
        
        this.load.spritesheet('pet', './assets/final spritesheets/1 Pink_Monster/Pink_Monster_Run_6.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('petidle', './assets/final spritesheets/1 Pink_Monster/Pink_Monster_Idle_4.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        
        this.load.spritesheet('pet2', './assets/enemysprite.png', { //this is for a spritesheet
            frameWidth: 500,
            frameHeight: 500
        });
        // for health
        this.load.image('container', './assets/energy.png');
        this.load.image("healthbar", "./assets/health.png");
        //for happiness
        this.load.image('happiness', './assets/energy.png');
        this.load.image("happinessbar", "./assets/try4.png");
        //for hunger
        this.load.image('hunger', './assets/energy.png');
        this.load.image("hungerbar", "./assets/hunger.png");
        // this.load.image("health","assets/healthbar.png")
        this.load.image('button','./assets/button.png')
        // this.load.image("hungermeter","assets/hungrymeter.png")
        

        //set initial picture

        // Loading events listeners
        this.load.on('progress', (percent) => {
            this.loadingBar.setScale(percent, 1);
            this.percentage = Math.floor(percent * 100);
            this.updateText();

        });
        this.load.on('fileprogress', (data) => {
            // this.fileLoading = data.src;
            this.fileLoading = data.key;
            this.updateText();
        }); 
        //changing the scene
        this.load.on('complete', () => {
            this.scene.start('TitleScene');
        }); 
    
    }
    //create(){
        //this.load.image(BOOTPET[1]);
        //let index = Math.floor(Math.random() * BOOTPET.length); 
        //this.setCat(BOOTPET[1]);
    //}
    
    updateText(){
 
        this.setCat(BOOTPET[1]);
        this.tweens.add({
            targets: [this.petImage],
            //completeDelay: 1000,
            //x:-5,
            //right:20,
            duration: 500,
            alpha: 0,
            scale:0.1,
            
            //yoyo: true,
            ease: 'Bounce',
            //repeat: -1
            onComplete:
            ()=>{
                if(this.imageNum < BOOTPET.length){
                //let index = Math.floor(Math.random() * BOOTPET.length);
                let index = this.imageNum;
                this.setCat(BOOTPET[index]);
                //this.setCat(BOOTPET[]);
                    this.imageNum++;
                }else if (this.imageNum == BOOTPET.length){
                    this.imageNum=Math.floor(this.imageNum - BOOTPET.length);
                }
                
            }
        });  

       this.loadingTxt.setText(`${this.percentage}%\n${this.fileLoading}`);
        
    }
    setCat(petConfig){
        // Create a image of pet at position x:225,y:400
        this.petImage = this.add.image(225, 400, petConfig.name);
             // Set the size of the pet
             this.petImage.setScale(5);
    
    }

    loadprops(){

        //load bath items
        this.load.image('b0', './assets/bathe/cleaning_brush.png');
        this.load.image('b1', './assets/bathe/body_lotion.png');
        this.load.image('b2', './assets/bathe/cleaning_gloves.png');
        this.load.image('b3', './assets/bathe/detergent.png');
        this.load.image('b4', './assets/bathe/hand_sanitiser.png');
        this.load.image('b5', './assets/bathe/scrub_brush.png');
        this.load.image('b6', './assets/bathe/scrub_sponge.png');
        this.load.image('b7', './assets/bathe/shampoo.png');
        this.load.image('b8', './assets/bathe/soap_box.png');
        this.load.image('b9', './assets/bathe/soap.png');
        this.load.image('b10', './assets/bathe/sun_cream_tube.png');
        this.load.image('b11', './assets/bathe/toothbrush.png');
        this.load.image('b12', './assets/bathe/toothpaste_box.png');
        this.load.image('b13', './assets/bathe/toothpaste.png');
        this.load.image('b14', './assets/bathe/wet_wipe.png');

        //load clothing items
        this.load.image('c0', './assets/clothe/bikini.png');
        this.load.image('c1', './assets/clothe/boots.png');
        this.load.image('c2', './assets/clothe/boots2.png');
        this.load.image('c3', './assets/clothe/bow.png');
        this.load.image('c4', './assets/clothe/goggles.png');
        this.load.image('c5', './assets/clothe/hat.png');
        this.load.image('c6', './assets/clothe/jacket.png');
        this.load.image('c7', './assets/clothe/outfit1.png');
        this.load.image('c8', './assets/clothe/outfit2.png');
        this.load.image('c9', './assets/clothe/outfit3.png');
        this.load.image('c10', './assets/clothe/outfit4.png');
        this.load.image('c11', './assets/clothe/shoes.png');
        this.load.image('c12', './assets/clothe/shoes2.png');
        this.load.image('c13', './assets/clothe/witch_hat.png');

        //load food items
        this.load.image('f0', './assets/food/actualpancake.png');
        this.load.image('f1', './assets/food/chicken.png');
        this.load.image('f2', './assets/food/cupcake.png');
        this.load.image('f3', './assets/food/donut.png');
        this.load.image('f4', './assets/food/drink.png');
        this.load.image('f5', './assets/food/drink2.png');
        this.load.image('f6', './assets/food/egg.png');
        this.load.image('f7', './assets/food/grilledcheese.png');
        this.load.image('f8', './assets/food/orange.png');
        this.load.image('f9', './assets/food/orangejuice.png');
        this.load.image('f10', './assets/food/pancake.png');
        this.load.image('f11', './assets/food/sandwich.png');
        this.load.image('f12', './assets/food/sandwich2.png');
        this.load.image('f13', './assets/food/soup.png');
        this.load.image('f14', './assets/food/stickybun.png');

        //load play items
        this.load.image('p0', './assets/play/chessbishop.png');
        this.load.image('p1', './assets/play/chesscastle.png');
        this.load.image('p2', './assets/play/chesshorse.png');
        this.load.image('p3', './assets/play/chessking.png');
        this.load.image('p4', './assets/play/chesspawn.png');
        this.load.image('p5', './assets/play/chessqueen.png');
        this.load.image('p6', './assets/play/dice.png');
        this.load.image('p7', './assets/play/game_console1.png');
        this.load.image('p8', './assets/play/game_console2.png');
        this.load.image('p9', './assets/play/game_console3.png');
        this.load.image('p10', './assets/play/game_console4.png');
        this.load.image('p11', './assets/play/game_console5.png');
        this.load.image('p12', './assets/play/game_console6.png');
        this.load.image('p13', './assets/play/game_console7.png');
        this.load.image('p14', './assets/play/game_console8.png');
        this.load.image('p15', './assets/play/rubber_duck.png');
        this.load.image('p16', './assets/play/rubber_ducktopus.png');
        this.load.image('p17', './assets/play/toy.png');



        // this.load.image('', './assets/FoodButton.png');
        // this.load.image('Bathe', './assets/BatheButton.png');
        // this.load.image('Play', './assets/PlayButton.png');
    }
}