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
        for (let i = 0; i < 600; i++) {
            this.load.image(`square-${i}`, './assets/square.png');
        }

        // "MainScene" preload to the screeen the background and the music
        this.load.image('bg', './assets/background.png');
        this.load.image('Fight', './assets/loading.png');
        this.loadprops();
        this.load.image('Return', './assets/ReturntoMainButton.png');

        // preload the pet and the health meters from assets file
        // this.load.image("pet","assets/charater.png") //this is for an image
        this.load.spritesheet('pet', './assets/petsprites.png', { //this is for a spritesheet
            frameWidth: 500,
            frameHeight: 500
        });
        this.load.spritesheet('pet2', './assets/PetPlayer.png', { //this is for a spritesheet
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

        this.load.image('c0', './assets/clothe/bikini.png');
        this.load.image('c1', './assets/clothe/boots.png');
        this.load.image('c2', './assets/clothe/boots2.png');
        this.load.image('c0', './assets/clothe/bow.png');
        this.load.image('c0', './assets/clothe/goggles.png');
        this.load.image('c0', './assets/clothe/hat.png');
        this.load.image('c0', './assets/clothe/jacket.png');
        this.load.image('c0', './assets/clothe/outfit1.png');
        this.load.image('c0', './assets/clothe/outfit2.png');
        this.load.image('c0', './assets/clothe/outfit3.png');
        this.load.image('c0', './assets/clothe/outfit4.png');

        // this.load.image('', './assets/FoodButton.png');
        // this.load.image('Bathe', './assets/BatheButton.png');
        // this.load.image('Play', './assets/PlayButton.png');
    }
}