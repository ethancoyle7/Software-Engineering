class Pet{
    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    constructor(scene){
        this.pet1=null;
        this.scene =scene;
        this.choice = '';
        this.lvl=0;
        this.pett=null;
        
        
    }
    Status(){
        //lvl
        //experience
        //ID=generated
        //name= the thing that the player entered 
        //type= 1 / 2/ 3
        //Maturity= size so..... setScale(Maturity)
    }
    petCollider(){
        this.pett = this.add.sprite(200,250,"pet2run");
        
        this.pett.setScale(5);
        //make the pet interactive and movable
        this.pett.setInteractive({ draggable: true });
        // to know the item is selected change the color of the item
        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff0000);
        });
        // Create the idle animation
        this.pett.anims.create({
            key: 'idle1',
            frames: this.anims.generateFrameNumbers('pet', {
                start:0,
                end:5
            }),
            frameRate: 12,
            repeat: 1
        });
        this.pett.anims.play('idle1');
    }

    // some pet animations for actions
    Pet1Animation(choice){
         this.pet1 = this.add.sprite(200, 250,"pet");
            this.pet1.setScale(5);
            //make the pet interactive and movable
            this.pet1.setInteractive({ draggable: true });
            // to know the item is selected change the color of the item
            this.input.on('dragstart', function (pointer, gameObject) {
                gameObject.setTint(0xff0000);
            });
            // Create the idle animation
            this.pet1.anims.create({
                key: 'idle1',
                frames: this.anims.generateFrameNumbers('pet', {
                    start:0,
                    end:5
                }),
                frameRate: 12,
                repeat: 1
            });
            this.pet1.anims.create({
                key: 'feed',
                frames: this.anims.generateFrameNumbers('petclimb', {
                    frames: [0, 3]
                }),
                frameRate: 8,
                repeat: 1
            });
            this.pet1.anims.create({
                key: 'bathe+',
                frames: this.anims.generateFrameNumbers('petthrow', {
                    frames: [0, 1]
                }),
                frameRate: 3,
                repeat: -1
            });
            this.pet1.anims.create({
                key: 'health+',
                frames: this.anims.generateFrameNumbers('winningpet', {
                    start:0,
                    end: 7
                }),
                frameRate: 8,
                repeat: -1
            });
                   
        //this.pet1.on('animationstart-feed',()=>{
          //  this.pet1.anims.stop('idle1');
          this.pet1.anims.play(choice);  
        //});
        // At the end of action
        this.pet1.on('animationcomplete', () => {
            console.log("Hello ra");
            this.pet1.anims.play('idle1');
            //this.pet1.destroy();
            });
        this.pet1.on('animationstart',()=>{
            this.pet1.destroy();
        })
            //this.Pet1Stop();
        // Play idle by default
        
        
            
    }

    Pet1Stop(){
        //this.pet1.anims.play(choice);

        
    }
    Pet2Animation(choice){
        let pet2 = this.add.sprite(200,250,"pet2run");
        pet2.setScale(5);
        //make the pet interactive and movable
        pet2.setInteractive({ draggable: true });
        // to know the item is selected change the color of the item
        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff0000);
        });
        pet2.anims.create({
            key: 'idle1',
            frames: this.anims.generateFrameNumbers('pet2run', {
                frames: [0, 5]
            }),
            frameRate: 8,
            repeat: -1
        });
        pet2.anims.create({
            key: 'feed',
            frames: this.anims.generateFrameNumbers('pet2climb', {
                frames: [0, 3]
            }),
            frameRate: 8,
            repeat: -1
        });
        pet2.anims.create({
            key: 'bathe+',
            frames: this.anims.generateFrameNumbers('pet2throw', {
                frames: [0, 1]
            }),
            frameRate: 3,
            repeat: -1
        });
        pet2.anims.create({
            key: 'health+',
            frames: this.anims.generateFrameNumbers('pet2winningpet', {
                start:0,
                end: 7
            }),
            frameRate: 8,
            repeat: -1
        });  
        pet2.anims.play(choice);
        }
    Pet3Animation(choice){
        let pet3 = this.add.sprite(200,250,"pet3");
        pet3.setScale(5);
        //make the pet interactive and movable
        pet3.setInteractive({ draggable: true });
        // to know the item is selected change the color of the item
        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff0000);
        });
        pet3.anims.create({
            key: 'idle1',
            frames: this.anims.generateFrameNumbers('pet3', {
                frames: [0, 5]
            }),
            frameRate: 7,
            repeat: -1
        });
        pet3.anims.create({
            key: 'feed',
            frames: this.anims.generateFrameNumbers('pet3climb', {
                frames: [0, 3]
            }),
            frameRate: 8,
            repeat: -1
        });
        pet3.anims.create({
            key: 'bathe+',
            frames: this.anims.generateFrameNumbers('pet3throw', {
                frames: [0, 1]
            }),
            frameRate: 3,
            repeat: -1
        });
        pet3.anims.create({
            key: 'health+',
            frames: this.anims.generateFrameNumbers('pet3winningpet', {
                start:0,
                end: 7
            }),
            frameRate: 8,
            repeat: -1
        });  
        pet3.anims.play(choice);
    }


    }