class BootScene extends Phaser.Scene {
    constructor(){
        super("BootScene");
        //defining the variables needed
        this.loadBar = null;
        this.loadTxt= null;
        this.percent =0;
        this.imageNum=0;
        this.fileload="";
        this.petImage=null;
        this.imageNum=0;
        this.name='';
    }


    preload() 
    {
        
        //This is where images are loaded
        //this.load.image('use a short name', './assets/name_of_image');
        
        this.load.image(BOOTPET[0].name,`./assets/${BOOTPET[0].image}`)
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
        this.load.image('square', './assets/square1.png');
        for (let i = 0; i < 200; i++) {
             this.load.image(`square-${i}`, './assets/square1.png');
        }

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
        //for victory winscene spritesheet
        this.load.spritesheet('winningpet', './assets/final spritesheets/1 Pink_Monster/Pink_Monster_Jump_8.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
          //for bathe      
        this.load.spritesheet('petthrow', './assets/final spritesheets/1 Pink_Monster/Pink_Monster_Throw_4.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('petclimb', './assets/final spritesheets/1 Pink_Monster/Pink_Monster_Climb_4.png', { //this is for a spritesheet
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
        //for pet2------------------------------------------------------
        this.load.spritesheet('pet2run', './assets/final spritesheets/2 Owlet_Monster/Owlet_Monster_Run_6.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('pet2winningpet', './assets/final spritesheets/2 Owlet_Monster/Owlet_Monster_Jump_8.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('pet2idle', './assets/final spritesheets/2 Owlet_Monster/Owlet_Monster_Idle_4.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('pet2punch', './assets/final spritesheets/2 Owlet_Monster/Owlet_Monster_Push_6.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('pet2lightattack', './assets/final spritesheets/2 Owlet_Monster/Owlet_Monster_Attack1_4.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('pet2heavyattack', './assets/final spritesheets/2 Owlet_Monster/Owlet_Monster_Attack2_6.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('pet2deadpet', './assets/final spritesheets/2 Owlet_Monster/Owlet_Monster_Death_8.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('pet2climb', './assets/final spritesheets/2 Owlet_Monster/Owlet_Monster_Climb_4.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });    
        this.load.spritesheet('pet2throw', './assets/final spritesheets/2 Owlet_Monster/Owlet_Monster_Throw_4.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });        
        //Pet3--------------------------------------------------------------
        this.load.spritesheet('pet3', './assets/final spritesheets/3 Dude_Monster/Dude_Monster_Run_6.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('pet3idle', './assets/final spritesheets/3 Dude_Monster/Dude_Monster_Idle_4.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('pet3punch', './assets/final spritesheets/3 Dude_Monster/Dude_Monster_Push_6.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('pet3lightattack', './assets/final spritesheets/3 Dude_Monster/Dude_Monster_Attack1_4.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('pet3heavyattack', './assets/final spritesheets/3 Dude_Monster/Dude_Monster_Attack2_6.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('pet3deadpet', './assets/final spritesheets/3 Dude_Monster/Dude_Monster_Death_8.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('pet3winningpet', './assets/final spritesheets/3 Dude_Monster/Dude_Monster_Jump_8.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('pet3climb', './assets/final spritesheets/3 Dude_Monster/Dude_Monster_Climb_4.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });        
        this.load.spritesheet('pet3throw', './assets/final spritesheets/3 Dude_Monster/Dude_Monster_Throw_4.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
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
        this.load.audio('FightAnnounce', './assets/FinishHim.mp3');
        this.load.audio('petcall','./assets/SUCCESS CHEERS Win Cute Vocal Chime 03.wav');

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
    //this.setCat(BOOTPET[1]);
    }
   // create(){
         //this.load.image(BOOTPET[1]);
        //let index = Math.floor(Math.random() * BOOTPET.length); 
        //this.setCat(BOOTPET[1]);
    //}
    
    updateText(){
                       
        this.setCat(BOOTPET[0]);
        this.tweens.add({
            targets: [this.petImage],
            duration: 50,
            alpha: 0,
            scale:0.1,
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
                
                }
                //return image to zero after reaching the last value
                else if (this.imageNum == BOOTPET.length){
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