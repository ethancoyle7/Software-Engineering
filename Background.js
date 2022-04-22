//Purpose of this Scene is to load images for loading scene
//(this measure is to prevent a green box/ imgages from not loading the first time)
class BackgroundScene extends Phaser.Scene 
{
    constructor()
    {
        super("BackgroundScene");
        this.fileloading="";
    
    }

    preload(){
        //loading images directly from assets folder
        this.load.image("teamlogo1", "./assets/image (1).png");
        //loading images from bootpet.js 
        this.load.image(BOOTPET[0].name,`./assets/${BOOTPET[0].image}`)
        
        //loops through all image options of bootpet.js
        for (let i = 0; i < BOOTPET.length; i++) {
            this.load.image(BOOTPET[i].name, `./assets/${BOOTPET[i].image}`);
            //this.load.image('bg', './assets/loading.png');
        }
        //loads all files in preload and sends it through scenes as data
        this.load.on('fileprogress', (data) => {
            this.fileLoading = data.key;
            
        });
       
        

        //changing the scene
        this.load.on('complete', () => {
            this.scene.start('BootScene');
        }); 
    }

}