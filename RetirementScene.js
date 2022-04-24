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
        this.load.image('Retired', './assets/retirementtxt.png');
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
        this.load.image("CloseGame", "./assets/RetireExit.png");
    }

    create() {

       userChooseEgg = true//set equal to true to choose another pet
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
        let rect = this.add.rectangle(230, 200, 450, 300, 0x000000);
        rect.setAlpha(.5);
        let retire = this.add.image(230, 200, "Retired");
        retire.setScale(1);

        this.pet = this.add.sprite(230, 350, "pet");
        this.pet.setScale(5);//set the scale of the pet for fight to fit the scene width and height
        let choose3 = ['pinkwalk', 'whitewalk', 'bluewalk'];
        this.pet.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers(choose3[this.type], {
                start: 0,
                end: 5
            }),
            frameRate: 6,
            repeat: -1
        });
        this.pet.anims.play("walk")
        //add exit button
        this.gameTimer = this.time.addEvent({
            delay: 750,
            callback: function () {
                var newgame = this.add.image(230, 500, "Title")// click to go to titlescene
                //newgame.setScale(3);
                newgame.setInteractive();
                newgame.on('pointerdown', () => this.scene.start("TitleScene"));
                //go back to title scene to choose another pet to start off with
                this.tweens.add({

                    targets: newgame,//who it targetting
                    alpha: 0.5,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'

                });
                //after clicking on the button, the user will be logged out and will go back to ther
                // sign in page to sign in to account.
                var exit = this.add.image(230, 600, 'CloseGame')
                exit.setInteractive();
                
                userChooseEgg = true
                exit.on('pointerdown', () => signOut());//signout of the game
                
                this.tweens.add({

                    targets: exit,//who it targetting
                    alpha: 0.5,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'

                });
            },
            callbackScope: this,

        });

    }


    update() 
    {
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