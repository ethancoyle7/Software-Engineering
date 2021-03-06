class MainDead extends Phaser.Scene 
{
    constructor() 
    {
        super('MainDead');
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
        
    }

    create() 
    {

        //this.sound.stop('Fight');
        this.sound.stopAll();
        this.sound.play('KO');

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

        //create the callable dead pet scene
        this.pet.anims.create({
            key: 'dead',
            frames: this.anims.generateFrameNumbers(choose5[this.type], {
                start:0,
                end: 7
            }),
            frameRate: 5,
            repeat: -1
        });
        // this.pet.anims.create({
        //     key: 'dead',
        //     frames: this.anims.generateFrameNumbers('deadpet', {
        //         start: 0,
        //         end: 7
        //     }),
        //     frameRate: 5,
        //     repeat: -1
        // });
        this.pet.anims.play("dead")
        //add exit button
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
        //add exit button
        var BackToMain=this.add.image(230,600,'MainBack')
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