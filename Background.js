class BackgroundScene extends Phaser.Scene 
{
    constructor()
    {
        super("BackgroundScene");
        this.fileloading="";
    
    }

    preload(){
        this.load.image("teamlogo1", "./assets/image (1).png");
        this.load.image(BOOTPET[0].name,`./assets/${BOOTPET[0].image}`)
        
        //loops through all image options of bootpet.js
        for (let i = 0; i < BOOTPET.length; i++) {
            this.load.image(BOOTPET[i].name, `./assets/${BOOTPET[i].image}`);
            //this.load.image('bg', './assets/loading.png');
        }
        this.load.on('fileprogress', (data) => {
            //this.updateText();
            // this.fileLoading = data.src;
            this.fileLoading = data.key;
            
        });
       
        

        //changing the scene
        this.load.on('complete', () => {
            this.scene.start('BootScene');
        }); 
    }

}