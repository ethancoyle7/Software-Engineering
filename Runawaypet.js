class Runawaypet extends Phaser.Scene 
{
    constructor() 
    {
        super('Runawaypet');
        this.sprites = [];
        
    }
    preload() 
    {
        this.load.image('PetGone', './assets/PetRunAway.png');
        this.load.image('Exit', './assets/exitbutton.png'); 
        this.load.image('MainSceneReturn', './assets/mainreturn.png'); 
        this.load.image('bubble', 'assets/bubble256.png');//add cleaning bubbles
        this.load.image('wipey', './assets/bathe/wet_wipe.png')
        //this.load.audio('MUSIC', './assets/PetRunAwayMusic.mp3');
    }

    create() 
    {

        //this.sound.stop('Fight');
        this.sound.stopAll();
        this.sound.play('MUSIC',{ volume: 0.1});

        for (let i = 0; i < 300; i++)
        {
            const x = Phaser.Math.Between(-64, 800);
            const y = Phaser.Math.Between(-64, 600);
            //add the image yellow.png particales to create many
            const image = this.add.image(x, y, 'wipey');
            image.setBlendMode(Phaser.BlendModes.ADD);// blend them all together
            this.sprites.push({ s: image, r: 2 + Math.random() * 6 });
        }
        var gameover =this.add.image(230,100,"PetGone")
        this.tweens.add({

            targets: gameover,//who it targetting
            alpha: 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'

        });

        this.pet =this.add.sprite(230,350,"pet")
        this.pet.setScale(5);//set the scale of the pet for fight to fit the scene width and height
        //create running animation pet will move off the screen
        this.pet.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('pet', {
                start: 0,
                end: 5
            }),
            frameRate: 12,
            repeat: -1
        });
        this.pet.anims.play("run")
        //add exit button
        var exit=this.add.image(230,500,'Exit')
        exit.setInteractive();
        //when pressed down go to boot scene
        //exit.on('pointerover',() =>;
        exit.on('pointerdown',() =>this.scene.start("TitleScene"));
        exit.on('pointerover',() => this.sound.play('Exit')); // hoverover
        this.tweens.add({

            targets: exit,//who it targetting
            alpha: 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'

        });
        //add exit button
        var BackToMain=this.add.image(230,600,'MainSceneReturn')
        BackToMain.setInteractive();
        //once clicked start the main scene
        BackToMain.on('pointerdown',() =>this.scene.start("MainScene"));
        BackToMain.on('pointerover',() => this.sound.play('MainReturn'));
        this.tweens.add({

            targets: BackToMain,//who it targetting
            alpha: 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'

        });
        //add exit button
       
        

        //Retry.on('pointerover',() => this.sound.play('KO')); 
        
    
        
    }
    update() 
    { 
        //adding animations for the background 
        for (let i = 0; i < this.sprites.length; i++)
        {
            const sprite = this.sprites[i].s;

            sprite.y -= this.sprites[i].r;

            if (sprite.y < -256)
            {
                sprite.y = 700;
            }
        }
        this.pet.x += 2;

        //if the pet goes beyond the screen, lop back to the left side
        if (this.pet.x > 500)
        {
            this.pet.x = -150;
        }
    }
}