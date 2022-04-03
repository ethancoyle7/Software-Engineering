class InfoScene extends Phaser.Scene 
{
    constructor() 
    {
        super('InfoScene');
        this.sprites = [];
        
    }
    init(data)
    {
        this.type=data.type;
        if (this.type == "") 
        {
            // No username was provided
            this.type = "0";
        }
    }
    
    preload() 
    {
        this.load.image('info', './assets/information.png');
        //this.load.audio('WINNER', './assets/WinMusic.mp3');
    }

    create() 
    {
        // add the info image to the scene
       var informationtext=this.add.image(230,100,"info"); 
        informationtext.setScale(0.5);

    
        
    }
    update() 
    { 
        
    }
}