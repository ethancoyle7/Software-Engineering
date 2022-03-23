class GameOver extends Phaser.Scene 
{
    constructor() 
    {
        super('GameOver');
        this.sprites = [];
        
    }
    preload() 
    {
        this.load.image('Over', './assets/GameOverPicture.png');
        this.load.image('Exit', './assets/exitbutton.png'); 
        this.load.image('MainSceneReturn', './assets/mainreturn.png'); 
        this.load.image('RetryFight', './assets/fightretry.png'); 
        this.load.image('bubble', 'assets/bubble256.png');//add cleaning bubbles
        this.load.image('wipey', './assets/bathe/wet_wipe.png')
        //this.load.audio('WINNER', './assets/WinMusic.mp3');
    }

    create() 
    {

        //this.sound.stop('Fight');
        this.sound.stopAll();
        this.sound.play('KO');
        this.sound.play("MUSIC")

        for (let i = 0; i < 300; i++)
        {
            const x = Phaser.Math.Between(-64, 800);
            const y = Phaser.Math.Between(-64, 600);
            //add the image yellow.png particales to create many
            const image = this.add.image(x, y, 'wipey');
            image.setBlendMode(Phaser.BlendModes.ADD);// blend them all together
            this.sprites.push({ s: image, r: 2 + Math.random() * 6 });
        }
        var gameover =this.add.image(230,100,"Over")
        this.tweens.add({

            targets: gameover,//who it targetting
            alpha: 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'

        });

        this.pet =this.add.sprite(230,350,"pet")
        this.pet.setScale(5);//set the scale of the pet for fight to fit the scene width and height
        this.pet.anims.create({
            key: 'dead',
            frames: this.anims.generateFrameNumbers('deadpet', {
                start: 0,
                end: 7
            }),
            frameRate: 5,
            repeat: -1
        });
        this.pet.anims.play("dead")
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
        var Retry=this.add.image(230,700,'RetryFight')
        Retry.setInteractive();
        Retry.on('pointerdown',() =>this.scene.start("FightScene"));
        Retry.on('pointerover',() => this.sound.play('Rematch'));
        this.tweens.add({

            targets: Retry,//who it targetting
            alpha: 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'

        });
        

        //Retry.on('pointerover',() => this.sound.play('KO')); 
        
    
        
    }
    update() { 
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
    }
}