class GameOver extends Phaser.Scene 
{
    constructor() 
    {
        super('GameOver');
        
    }
    preload() 
    {
        this.load.image('Over', './assets/GameOverPicture.png');
        this.load.image('Exit', './assets/exitbutton.png'); 
        this.load.image('MainSceneReturn', './assets/mainreturn.png'); 
        this.load.image('RetryFight', './assets/fightretry.png'); 
    }

    create() 
    {

        //this.sound.stop('Fight');
        this.sound.play('KO');
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
        exit.on('pointerdown',() =>this.scene.start("BootScene"));
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
    update() { }
}