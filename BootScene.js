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


    preload() 
    {
        
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
        this.load.image('Fighting', './assets/loading.png');
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
        //loading sprite sheet for fight animations for punching
        this.load.spritesheet('petpunch', './assets/final spritesheets/1 Pink_Monster/Pink_Monster_Push_6.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        //loading sprite sheet for fight animations for light attack
        this.load.spritesheet('lightattack', './assets/final spritesheets/1 Pink_Monster/Pink_Monster_Attack1_4.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        //loading sprite sheet for fight animations for heavy  attack
        this.load.spritesheet('heavyattack', './assets/final spritesheets/1 Pink_Monster/Pink_Monster_Attack2_6.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        //assets/final spritesheets/1 Pink_Monster/Pink_Monster_Death_8.png
        this.load.spritesheet('deadpet', './assets/final spritesheets/1 Pink_Monster/Pink_Monster_Death_8.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        //stuff for the enemy
        this.load.spritesheet('pet2', './assets/enemysprite.png', { //this is for a spritesheet
            frameWidth: 500,
            frameHeight: 500
        });
        this.load.spritesheet('bathimg', './assets/bathe/bathsprite.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('clotheimg', './assets/clothe/clothessprites.png', { //this is for a spritesheet
            frameWidth: 34,
            frameHeight: 35
        });
        this.load.spritesheet('foodimg', './assets/food/foodsprites.png', { //this is for a spritesheet
            frameWidth: 30,
            frameHeight: 40
        });
        this.load.spritesheet('toyimg', './assets/play/toysprites.png', { //this is for a spritesheet
            frameWidth: 30,
            frameHeight: 35
        });
        // for health
        this.load.image('button','./assets/button.png')
        // this.load.image("hungermeter","assets/hungrymeter.png")
        
        //load the files to be used in the Fight scene
        this.load.audio('press', './assets/getout.mp3'); 
        this.load.audio('Fight', './assets/BossFight.mp3');
        this.load.audio('KO', './assets/fatality.mp3');
        this.load.audio('YOUWIN', './assets/winsound.mp3');
        this.load.audio('EnemyHit','./assets/EnemyHit.mp3')
        this.load.audio('Exit','./assets/exit.mp3') // for hover over exit
        //set initial picture
        // preload to the screeen the background and the music in Main Scene
        this.load.audio('bgmusic', './assets/gamemusic.mp3');
        this.load.audio('MainReturn', './assets/BackMain.mp3');
        this.load.audio('Rematch', './assets/RetryMatch.mp3');
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

    
}