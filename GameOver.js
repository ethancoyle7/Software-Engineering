class GameOver extends Phaser.Scene 
{
    constructor() 
    {
        super('GameOver');
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
        this.level=data.level;//pass in the level
        this.enemy= data.enemy; //pass in the enemy
        this.enemyname=data.enemyname;
        this.playername=data.playername;
        
    }
    
    preload() 
    {
      
    }

    create() 
    {
        
        //this.sound.stop('Fight');
        this.sound.stopAll();
        this.sound.play('KO');
        this.sound.play("MUSIC",{ volume: 0.1})

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
        let choose5=['pet1dead','pet2dead','pet3dead'];
        this.pet.anims.create({
            key: 'dead',
            frames: this.anims.generateFrameNumbers(choose5[this.type], {
                start:0,
                end: 7
            }),
            frameRate: 3,
            repeat: -1
        });
        this.pet.anims.play("dead")
        //add exit button
        //this.image.load("Title", "./assets/images/backtoTitle.png");
        var exit=this.add.image(230,500,'Title')
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
        
        //add exit button
        var Retry=this.add.image(230,600,'FightBack')
        Retry.setInteractive();
        Retry.on('pointerdown', () => this.scene.start("FightScene", { type: this.type, level:this.level,enemy: this.enemy,enemyname:this.enemyname,playername:this.playername }));
        //Retry.on('pointerdown',() =>this.scene.start("FightScene"));
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