class WinScene extends Phaser.Scene {
    constructor() 
    {             
        super('WinScene'); 
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
        this.level=data.level;
    }
    preload() {
        // this.load.image('win', './assets/winner.png');
        // this.load.image('Exit', './assets/exitbutton.png');
        // this.load.image('MainSceneReturn', './assets/mainreturn.png');
        // this.load.image('RetryFight', './assets/fightretry.png');
        // this.load.image('particle', './assets/yellow.png');
        // this.load.audio('WINNER', './assets/WinMusic.mp3');
    }

    create() {

        console.log(this.level)
        //this.sound.stop('Fight');
        this.sound.stopAll();
        this.sound.play('YOUWIN');
        this.sound.play('WINNER',{ volume: 0.1});

        //for the background show the yellow image at random intervals
        for (let i = 0; i < 300; i++) {
            const x = Phaser.Math.Between(-64, 800);
            const y = Phaser.Math.Between(-64, 600);
            //add the image yellow.png particales to create many
            const image = this.add.image(x, y, 'particle');
            image.setBlendMode(Phaser.BlendModes.ADD);// blend them all together
            this.sprites.push({ s: image, r: 2 + Math.random() * 6 });
        }

        var gameover = this.add.image(230, 100, "win")
        this.tweens.add({

            targets: gameover,//who it targetting
            alpha: 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'

        });

        this.pet = this.add.sprite(230, 350, "pet")
        this.pet.setScale(5);//set the scale of the pet for fight to fit the scene width and height
        let choose3=['winningpet','pet2winningpet','pet3winningpet'];
        this.pet.anims.create({
            key: 'winner',
            frames: this.anims.generateFrameNumbers(choose3[this.type], {
                start:0,
                end: 7
            }),
            frameRate: 8,
            repeat: -1
        });
        this.pet.anims.play("winner")
        //add exit button
        this.gameTimer = this.time.addEvent({
            delay: 750,
            callback: function () {
                var exit = this.add.image(230, 500, 'Exit')
                exit.setInteractive();
                //when pressed down go to boot scene
                //exit.on('pointerover',() =>;
                exit.on('pointerdown', () => this.scene.start("TitleScene"));
                exit.on('pointerover', () => this.sound.play('Exit')); // hoverover
                this.tweens.add({

                    targets: exit,//who it targetting
                    alpha: 0.5,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'

                });
                //add exit button
                var BackToMain = this.add.image(230, 600, 'MainSceneReturn')
                BackToMain.setInteractive();
                //once clicked start the main scene
                //if win the the fight then going back to the main have bonus of adding 2 to the level
                BackToMain.on('pointerdown', () => this.scene.start("MainScene", { type: this.type, level:this.level+=2 }));
                BackToMain.on('pointerover', () => this.sound.play('MainReturn'));
                this.tweens.add({

                    targets: BackToMain,//who it targetting
                    alpha: 0.5,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'

                });
                //add exit button
                var Retry = this.add.image(230, 700, 'RetryFight')
                Retry.setInteractive();
                Retry.on('pointerdown', () => this.scene.start("FightScene", { type: this.type,level:this.level }));
                Retry.on('pointerover', () => this.sound.play('Rematch'));
                this.tweens.add({

                    targets: Retry,//who it targetting
                    alpha: 0.5,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'

                });
            },
            callbackScope: this,

        });

    }
    update() {
        //adding animations for the background 
        for (let i = 0; i < this.sprites.length; i++) {
            const sprite = this.sprites[i].s;

            sprite.y -= this.sprites[i].r;

            if (sprite.y < -256) {
                sprite.y = 700;
            }
        }
    }
}