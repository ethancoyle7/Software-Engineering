//This Scene serves the function of loading game assets in advance
//this allows for smooth transitions between scenes
class BootScene extends Phaser.Scene 
{
    constructor()
    {
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
        //calling function to check if user is logged in
        checkIfUserIsLoggedIn();

        ///////////////////////////////////////////////////////////////////
        // ██╗      ██████╗  █████╗ ██████╗     ██████╗  █████╗ ██████╗  //
        // ██║     ██╔═══██╗██╔══██╗██╔══██╗    ██╔══██╗██╔══██╗██╔══██╗ //
        // ██║     ██║   ██║███████║██║  ██║    ██████╔╝███████║██████╔╝ //
        // ██║     ██║   ██║██╔══██║██║  ██║    ██╔══██╗██╔══██║██╔══██╗ //
        // ███████╗╚██████╔╝██║  ██║██████╔╝    ██████╔╝██║  ██║██║  ██║ //
        // ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝     ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ //
        ///////////////////////////////////////////////////////////////////
                                                                     
        //This is where image is loaded
        this.load.image("Moogles", "./assets/MisterMoogles.png");

        //This creates the loading bar 
        this.loadingBar = this.add.rectangle(225, 300, 450, 40, 0x22dd4b);
        this.loadingTxt = this.add.text(235,250, "0%", {
            fontSize: '24px',
            color: 'white',
            align: 'center'
        });
        this.loadingTxt.setOrigin(0.5);
        this.loadingBar.setOrigin(0.5);

        // "MainScene" preload to the screen the background and the music
        this.load.image('bg', './assets/background.png');
        //background for the fightscene load up
        this.load.image('circus', './assets/MarleyFight.png');
        //this.load.image('circus', './assets/circusbackground.png');
        this.load.image('Return', './assets/ReturntoMainButton.png');

        // preload the pet and the health meters from assets file
        // this.load.image("pet","assets/charater.png") //this is for an image
        ///////////////////////////////////////////////////////////////////////////////////////////////////
        // ███████╗██████╗ ██████╗ ██╗████████╗███████╗███████╗██╗  ██╗███████╗███████╗████████╗███████╗ //
        // ██╔════╝██╔══██╗██╔══██╗██║╚══██╔══╝██╔════╝██╔════╝██║  ██║██╔════╝██╔════╝╚══██╔══╝██╔════╝ //
        // ███████╗██████╔╝██████╔╝██║   ██║   █████╗  ███████╗███████║█████╗  █████╗     ██║   ███████╗ //
        // ╚════██║██╔═══╝ ██╔══██╗██║   ██║   ██╔══╝  ╚════██║██╔══██║██╔══╝  ██╔══╝     ██║   ╚════██║ //
        // ███████║██║     ██║  ██║██║   ██║   ███████╗███████║██║  ██║███████╗███████╗   ██║   ███████║ //
        // ╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   ╚══════╝ //
        ///////////////////////////////////////////////////////////////////////////////////////////////////
                  
       
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
        //spritesheet for the dead pet 1
        this.load.spritesheet('pet1dead', './assets/final spritesheets/1 Pink_Monster/Pink_Monster_Death_8.png', { //this is for a spritesheet
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
        //sprite sheet for the dead pet
        this.load.spritesheet('pet2dead', './assets/final spritesheets/2 Owlet_Monster/Owlet_Monster_Death_8.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        //assets\final spritesheets\2 Owlet_Monster\Owlet_Monster_Death_8.png        
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
        //sprite sheet for the pet 3 dead pet
        this.load.spritesheet('pet3dead', './assets/final spritesheets/3 Dude_Monster/Dude_Monster_Death_8.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('redegg', './assets/redegg.png', { //this is for a spritesheet
            frameWidth: 65,
            frameHeight: 65
        }); 
        this.load.spritesheet('blueegg', './assets/blueegg.png', { //this is for a spritesheet
            frameWidth: 65,
            frameHeight: 65
        }); 
        this.load.spritesheet('whiteegg', './assets/whiteegg.png', { //this is for a spritesheet
            frameWidth: 65,
            frameHeight: 65
        }); 
        // for health
        this.load.image('button','./assets/button.png')

        this.load.spritesheet('pinkwalk', './assets/final spritesheets/1 Pink_Monster/Pink_Monster_Walk_6.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('whitewalk', './assets/final spritesheets/2 Owlet_Monster/Owlet_Monster_Walk_6.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('bluewalk', './assets/final spritesheets/3 Dude_Monster/Dude_Monster_Walk_6.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        //----------------Enemy sprite sheet------------------------------
        //loading sprite sheet for fight animations for punching
        this.load.spritesheet('enemypunch', './assets/final spritesheets/1 Pink_Monster/Pink_Monster_Push_66.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('enemy2punch', './assets/final spritesheets/2 Owlet_Monster/Owlet_Monster_Push_66.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });       
        this.load.spritesheet('enemy3punch', './assets/final spritesheets/3 Dude_Monster/Dude_Monster_Push_66.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });       
        //loading sprite sheet for fight animations for light attack
        this.load.spritesheet('enemylightattack', './assets/final spritesheets/1 Pink_Monster/Pink_Monster_Attack1_44.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('enemy2lightattack', './assets/final spritesheets/2 Owlet_Monster/Owlet_Monster_Attack1_44.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('enemy3lightattack', './assets/final spritesheets/3 Dude_Monster/Dude_Monster_Attack1_44.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });        
         //loading sprite sheet for fight animations for heavy  attack
         this.load.spritesheet('enemyheavyattack', './assets/final spritesheets/1 Pink_Monster/Pink_Monster_Attack2_66.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('enemy2heavyattack', './assets/final spritesheets/2 Owlet_Monster/Owlet_Monster_Attack2_66.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('enemy3heavyattack', './assets/final spritesheets/3 Dude_Monster/Dude_Monster_Attack2_66.png', { //this is for a spritesheet
            frameWidth: 32,
            frameHeight: 32
        });
        // this.load.image("hungermeter","assets/hungrymeter.png")
        //////////////////////////////////////////////////////////////////////////
        // ██████╗ ███████╗████████╗    ██╗████████╗███████╗███╗   ███╗███████╗ //
        // ██╔══██╗██╔════╝╚══██╔══╝    ██║╚══██╔══╝██╔════╝████╗ ████║██╔════╝ //
        // ██████╔╝█████╗     ██║       ██║   ██║   █████╗  ██╔████╔██║███████╗ //
        // ██╔═══╝ ██╔══╝     ██║       ██║   ██║   ██╔══╝  ██║╚██╔╝██║╚════██║ //
        // ██║     ███████╗   ██║       ██║   ██║   ███████╗██║ ╚═╝ ██║███████║ //
        // ╚═╝     ╚══════╝   ╚═╝       ╚═╝   ╚═╝   ╚══════╝╚═╝     ╚═╝╚══════╝ //
        //////////////////////////////////////////////////////////////////////////
                                                                            
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
        //this.load.image('logor', './assets/logoimage.png')

        //title scene preload
        this.load.image("bgname", "./assets/background.png"); //this is how you load assets, it's the name then file path
        this.load.audio("bgmusic", "./assets/gamemusic.mp3"); //you have to specify this.load.image or .audio too
        this.load.image("back", "./assets/TitleSceneBG.png");
        this.load.image("title", "./assets/title.png");
        this.load.image("eggchoice", "./assets/eggchoose.png");
        this.load.image("teamlogo", "./assets/image (1).png");
        this.load.image('home', './assets/infobutton.png');
        this.load.image('mute', './assets/mic.png');

        //main scene preload
        this.load.audio('bathsound', './assets/PetSounds/bathsound.wav');
        this.load.audio('eatingsound', './assets/PetSounds/eatpet.wav');
        this.load.audio('happysound', './assets/PetSounds/HappySound.wav');
        this.load.audio('clothesound', './assets/PetSounds/ClothingSound.wav');
        this.load.audio('levelingup', './assets/LevelUPP.mp3');
        this.load.image('mute', './assets/mic.png');

        //main dead preload
        this.load.image('Over', './assets/GameOverPicture.png');
        this.load.image('Exit', './assets/exitbutton.png'); 
        this.load.image('MainSceneReturn', './assets/mainreturn.png'); 
        this.load.image('bubble', 'assets/bubble256.png');//add cleaning bubbles
        this.load.image('wipey', './assets/bathe/wet_wipe.png')

        //fight scene preload
        this.load.image('Over', './assets/GameOverPicture.png');
        this.load.audio('FightSound2','./assets/FightSound2.mp3');
        this.load.image('mute','./assets/mic.png');

        //win scene preload
        this.load.image('win', './assets/winner.png');
        this.load.image('Exit', './assets/exitbutton.png');
        this.load.image('MainSceneReturn', './assets/mainreturn.png');
        this.load.image('RetryFight', './assets/fightretry.png');
        this.load.image('particle', './assets/yellow.png');
        this.load.audio('WINNER', './assets/WinMusic.mp3');
        // runaway pet scene preload 
        this.load.image('PetGone', './assets/PetRunAway.png');
        this.load.image('Exit', './assets/exitbutton.png'); 
        this.load.image('MainSceneReturn', './assets/mainreturn.png'); 
        this.load.image('bubble', 'assets/bubble256.png');//add cleaning bubbles
        this.load.image('wipey', './assets/bathe/wet_wipe.png')


        //game over scene
        this.load.image('Over', './assets/GameOverPicture.png');
        this.load.image('Exit', './assets/exitbutton.png'); 
        this.load.image('MainSceneReturn', './assets/mainreturn.png'); 
        this.load.image('RetryFight', './assets/fightretry.png'); 
        this.load.image('bubble', 'assets/bubble256.png');//add cleaning bubbles
        this.load.image('wipey', './assets/bathe/wet_wipe.png')
        this.load.image("Title", "./assets/backtoTitle.png");//go back to the titlescene to choose another pet
        this.load.image("MainBack", "./assets/MainBack.png"); //go back to the main
        this.load.image("FightBack", "./assets/FightBack.png");//go back to fight

        //////////////////////////////////////////////////////////////////////////////////
        // █████╗ ██╗   ██╗██████╗ ██╗ ██████╗     ███████╗██╗██╗     ███████╗███████╗  //
        // ██╔══██╗██║   ██║██╔══██╗██║██╔═══██╗    ██╔════╝██║██║     ██╔════╝██╔════╝ //
        // ███████║██║   ██║██║  ██║██║██║   ██║    █████╗  ██║██║     █████╗  ███████╗ //
        // ██╔══██║██║   ██║██║  ██║██║██║   ██║    ██╔══╝  ██║██║     ██╔══╝  ╚════██║ //
        // ██║  ██║╚██████╔╝██████╔╝██║╚██████╔╝    ██║     ██║███████╗███████╗███████║ //
        // ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝     ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝ //
        //////////////////////////////////////////////////////////////////////////////////                                                                       
        //load the files to be used in the Fight scene
        this.load.audio('Fight', './assets/BossFight.mp3');
        this.load.audio('MUSIC', './assets/PetRunAwayMusic.mp3');
        this.load.audio('KO', './assets/fatality.mp3');
        this.load.audio('YOUWIN', './assets/winsound.mp3');
        this.load.audio('EnemyHit','./assets/EnemyHit.mp3')
        this.load.audio('Exit','./assets/exit.mp3') // for hover over exit
        //set initial picture
        // preload to the screen the background and the music in Main Scene
        this.load.audio('bgmusic', './assets/gamemusic.mp3');
        this.load.audio('MainReturn', './assets/BackMain.mp3');
        this.load.audio('Rematch', './assets/RetryMatch.mp3');
        this.load.audio('FightAnnounce', './assets/FinishHim.mp3');
        this.load.audio('petcall','./assets/SUCCESS CHEERS Win Cute Vocal Chime 03.wav');
        this.load.audio('press','./assets/EnemyHit.mp3');
        //load up the audio to loop through the different background sounds
        this.load.audio('1', './assets/mainsounds/Apprentice.mp3'); 
        this.load.audio('2', './assets/mainsounds/DMinor.mp3');
        this.load.audio('3', './assets/mainsounds/Morning.mp3');
        this.load.audio('4','./assets/mainsounds/RainbowLollipop.mp3') 
        this.load.audio('5','./assets/mainsounds/Stroll.mp3')
        this.load.audio('6', './assets/mainsounds/Sunshine.mp3');

//////////////////////////////////////////////////////////////////
// ██╗      ██████╗  █████╗ ██████╗     ██████╗  █████╗ ██████╗ //
// ██║     ██╔═══██╗██╔══██╗██╔══██╗    ██╔══██╗██╔══██╗██╔══██╗//
// ██║     ██║   ██║███████║██║  ██║    ██████╔╝███████║██████╔╝//
// ██║     ██║   ██║██╔══██║██║  ██║    ██╔══██╗██╔══██║██╔══██╗//
// ███████╗╚██████╔╝██║  ██║██████╔╝    ██████╔╝██║  ██║██║  ██║//
// ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝     ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝//
//////////////////////////////////////////////////////////////////
                                                             
        this.load.on('progress', (percent) => {
            this.loadingBar.setScale(percent, 1);
            this.percentage = Math.floor(percent * 100);
            this.loadingTxt.setText(`${this.percentage}%\n${this.fileLoading}`);
            this.updateText();
            this.createLogo();
            

        });

        this.load.on('fileprogress', (data) => {
            //this.fileLoading = data.src;
            this.fileLoading = data.key;
            
        });

        //changing the scene upon load completion
        this.load.on('complete', () => {
            this.scene.start('TitleScene');
        }); 
        
        
    }
    //function to create team logo image object
    createLogo(){
        let logo=this.add.image(225,100,'teamlogo1');
        logo.setOrigin(0.5);
    }
    
    
    updateText()
    {
        //this tween targets this.petImage object
        //the duration of the action on each image is 50 ms/Frames
        //the purpose is to decreases the size to 0.1
        this.tweens.add({
            targets: [this.petImage],
            duration: 50,
            alpha: 0,
            scale:0.1,
            ease: 'Bounce',
            //on completion of tween action a new image is generated
            onComplete:
            ()=>{
                if(this.imageNum < BOOTPET.length){
                let index = this.imageNum;
                this.setCat(BOOTPET[index]);
                this.imageNum++;
                }
                //return image to initial after reaching the last value
                else if (this.imageNum == BOOTPET.length){
                    this.imageNum=Math.floor(this.imageNum - BOOTPET.length);
                }
                
            }
        });  

    
       
        
    }
    //function to create pet image object
    setCat(petConfig)
    {
        
        // Creates an image of pet at position x:225,y:400
        this.petImage = this.add.image(225, 400, petConfig.name);
             // Sets the size of the pet
             this.petImage.setScale(5);
    
    }

    
    
}
