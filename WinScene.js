class WinScene extends Phaser.Scene {
    constructor() 
    {             
        super('WinScene'); 
        this.sprites = []; 
        this.enemyname='';
        this.enemy=""
        this.playername='';

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
        this.enemy= data.enemy;
        this.enemyname=data.enemyname;
        this.playername=data.playername;
    }
    preload() 
    {
    }

    create() 
    {

        getNickname().then(data => {
            //console.log(data);
            this.playername = data;//assign the api return data of the player nickname to the nickname to be used throughout
            //console.log("your nickname is ",this.playername);//loggin the data to see if working and it is
        });
        getUsers().then(users => 
            {
            //console.log(users);

            console.log("the enemy we will fight is name is : "+enemey);//name of the enemy
            //EnemyName=enemey;
            this.enemyname=enemey; //pass in the enemy
            //this.enemy=enemey;// assign to value
            getEnemyColor().then(enemyColor => 
                {
                    //EnemyName=enemey;
                    console.log(enemyColor);
                    console.log("the usernames color of that one  is : "+enemyColor);// color of the enemy
                    //after reading in the enemy color and name we can now compare the color of enemy and assign it a value 
                    //for the fight color animation
                    if(enemyColor=='red'){
                        this.enemy=0;
                    }
                    else if(enemyColor == 'white'){
                        this.enemy=1;
                    }
                    else{
                        this.enemy=2;
                    }
            });
        });
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
        getUsers().then(users => 
            {
            //console.log(users);

            console.log("the enemy we will fight is name is : "+enemey);//name of the enemy
            //EnemyName=enemey;
            //this.enemy=enemey;// assign to value
            getEnemyColor().then(enemyColor => 
                {
                    //EnemyName=enemey;
                    console.log(enemyColor);
                    console.log("the usernames color of that one  is : "+enemyColor);// color of the enemy
                    //after reading in the enemy color and name we can now compare the color of enemy and assign it a value 
                    //for the fight color animation
                    if(enemyColor=='red'){
                        this.enemy=0;
                    }
                    else if(enemyColor == 'white'){
                        this.enemy=1;
                    }
                    else{
                        this.enemy=2;
                    }
            });
        });
        this.gameTimer = this.time.addEvent({
            delay: 750,
            callback: function () {
                var exit = this.add.image(230, 500, 'Title')
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
                var BackToMain = this.add.image(230, 600, 'MainBack')
                BackToMain.setInteractive();
                //once clicked start the main scene
                //if win the the fight then going back to the main have bonus of adding 2 to the level
                BackToMain.on('pointerdown', () => this.scene.start("MainScene", { type: this.type, level:this.level+=2}));
                BackToMain.on('pointerover', () => this.sound.play('MainReturn'));
                this.tweens.add({

                    targets: BackToMain,//who it targetting
                    alpha: 0.5,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'

                });
                //add exit button
                var Retry = this.add.image(230, 700, 'FightBack')
                Retry.setInteractive();
                Retry.on('pointerdown', () => this.scene.start("FightScene", { type: this.type,level:this.level,enemy: this.enemy,enemyname:this.enemyname,playername:this.playername }));
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