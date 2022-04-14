class RetirementScene extends Phaser.Scene {
    constructor() {
        super('RetirementScene');
        this.sprites = [];
        this.particles = [];

    }
    init(data) {
        this.type = data.type;
        if (this.type == "") {
            // No username was provided
            this.type = "0";
        }
        this.level = data.level;
    }
    preload() {
        this.load.image('NewGame', './assets/NewGamebtn.png');
        this.load.image('Quit', './assets/quitbtn.png');
        this.load.image('Credits', './assets/creditsbtn.png');
        this.load.image('p1', './assets/white.png');
        this.load.image('p2', './assets/pink.png');
        this.load.image('p3', './assets/cyan.png');
        this.load.image('p4', './assets/blue.png');
        this.load.image('p5', './assets/green.png');
        this.load.image('p6', './assets/red.png');
        this.load.image('p7', './assets/orange.png');
        this.load.audio('WINNER', './assets/WinMusic.mp3');
    }

    create() {

        // console.log(this.level)
        //this.sound.stop('Fight');
        this.sound.stopAll();
        // this.sound.play('YOUWIN');
        // this.sound.play('WINNER',{ volume: 0.1});
        for (let i = 1; i < 8; i++) {
            this.particles[i] = `p${i}`;
        }
        //for the background show the yellow image at random intervals
        for (let i = 0; i < 300; i++) {
            const x = Phaser.Math.Between(-64, 800);
            const y = Phaser.Math.Between(-64, 600);
            //add the image yellow.png particales to create many
            const image = this.add.image(x, y, this.particles[Math.floor(Math.random() * this.particles.length)]);
            image.setBlendMode(Phaser.BlendModes.ADD);// blend them all together
            this.sprites.push({ s: image, r: 2 + Math.random() * 6 });
        }



        this.pet = this.add.sprite(230, 350, "pet")
        this.pet.setScale(5);//set the scale of the pet for fight to fit the scene width and height
        let choose3 = ['winningpet', 'pet2winningpet', 'pet3winningpet'];
        this.pet.anims.create({
            key: 'winner',
            frames: this.anims.generateFrameNumbers(choose3[this.type], {
                start: 0,
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
                var newgame = this.add.image(230, 500, "NewGame")
                newgame.setScale(3);
                newgame.setInteractive();
                newgame.on('pointerdown', () => this.exitGame());
                newgame.on('pointerover', () => this.sound.play('MainReturn'));
                //when pressed down go to boot scene
                //exit.on('pointerover',() =>;
                this.tweens.add({

                    targets: newgame,//who it targetting
                    alpha: 0.5,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'

                });
                //THIS SHOULD LOG THE USER OUT AS WELL
                var exit = this.add.image(230, 600, 'Quit')
                exit.setInteractive();
                exit.setScale(3);
                //when pressed down go to boot scene
                //exit.on('pointerover',() =>;
                exit.on('pointerdown', () => this.exitGame());
                exit.on('pointerover', () => this.sound.play('Exit')); // hoverover
                this.tweens.add({

                    targets: exit,//who it targetting
                    alpha: 0.5,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'

                });

                //add exit button
                var credits = this.add.image(230, 700, 'Credits')
                credits.setInteractive();
                credits.setScale(3);
                //once clicked start the main scene
                //if win the the fight then going back to the main have bonus of adding 2 to the level
                credits.on('pointerdown', () => this.scene.start("Credits"));
                // credits.on('pointerover', () => this.sound.play('MainReturn'));
                this.tweens.add({

                    targets: credits,//who it targetting
                    alpha: 0.5,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'

                });
                //add exit button
            },
            callbackScope: this,

        });

    }

    exitGame() {
        this.sound.play('Exit')
        this.sound.stopAll();
        this.scene.start("TitleScene")
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