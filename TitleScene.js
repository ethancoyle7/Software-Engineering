

/* This scene is a titlescene that plays first before the user starts the game
*   This is where the user will log into their account
* 
*
*/
class TitleScene extends Phaser.Scene { //the scene is a class, so we will be using this a lot to reference
    //methods and variables owned by it. This is where i make a lot of mistakes lol
    constructor() {
        super("TitleScene");
        this.bgmusic;
        this.type;
        this.sound1 = 0;
        //this.eggNum='';
    }

    preload() {  // this is the preload function, it loads all the assets for the scene
        this.load.image("bgname", "./assets/background.png"); //this is how you load assets, it's the name then file path
        this.load.audio("bgmusic", "./assets/gamemusic.mp3"); //you have to specify this.load.image or .audio too
        this.load.image("back", "./assets/TitleSceneBG.png");
        this.load.image("title", "./assets/title.png");
        this.load.image("eggchoice", "./assets/eggchoose.png");
        this.load.image("teamlogo", "./assets/image (1).png");
        this.load.image('home', './assets/infobutton.png');
        this.load.image('mute', './assets/mic.png');

    }

    create() {
        // Check if the user chose an egg or not
        // if the user chose an egg, user needs to be redirected to the MainScene
        // Otherwise user needs to choose an egg.
        if(checkColor()){
            console.log("user has chosen color already.")
            this.scene.start('MainScene', {
                type: this.type,
            })
        }
        this.sound.stopAll();// stop all previous sounds
        //this is the create function
        //create variable called bg, and make it equal to an image of "bgname" at location (225,400)
        let bg = this.add.image(225, 400, "back");
        bg.setScale(.6); //changes the scale of the background image

        /////////////////////////////////////////////////////////////////////////
        // ██╗   ██╗███████╗███████╗██████╗     ██╗███╗   ██╗███████╗ ██████╗  //
        // ██║   ██║██╔════╝██╔════╝██╔══██╗    ██║████╗  ██║██╔════╝██╔═══██╗ //
        // ██║   ██║███████╗█████╗  ██████╔╝    ██║██╔██╗ ██║█████╗  ██║   ██║ //
        // ██║   ██║╚════██║██╔══╝  ██╔══██╗    ██║██║╚██╗██║██╔══╝  ██║   ██║ //
        // ╚██████╔╝███████║███████╗██║  ██║    ██║██║ ╚████║██║     ╚██████╔╝ //
        //  ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝    ╚═╝╚═╝  ╚═══╝╚═╝      ╚═════╝  //
        /////////////////////////////////////////////////////////////////////////

        // call the user name of the logged in user
        var username = this.add.text(10, 735, '', { font: '20px Arial', fill: '#00ff00' });
        //call to the api to get the id of the logged in user
        //call the getnickname function to get the nickname of the user
        //    console.log(getNickname()) // console log to see if it works
        getNickname() // then call the .then function to pass in the promis value and get the id
            // from the await function, we can get the nickname of the user
            .then(usern => {
                username.setText("Logged in As :" + [usern]);//display it to the screen
            });
        //get the user  id for the current logged in user
        var User = this.add.text(10, 760, '', { font: '20px Arial', fill: '#00ff00' });
        //call to the api to get the id of the logged in user
        getID() // then call the .then function to pass in the promis value and get the id
            .then(id => {
                User.setText("User ID :" + [id]);//display it to the screen
            });
        
        // if the user chose color already will redirect em to the main scene
        // console.log(readColor)



        //start the music for the scene
        this.bgmusic = this.sound.play("bgmusic", { //creates variable called music that plays the music
            volume: 0.5,
            loop: true
        });



        //access the value of getUID() and set it to the variable User



        // ADDING THE TITLE AND EGG CHOICE AND PRODUCER TAGS
        var title = this.add.image(225, 80, "title")
        var eggs = this.add.image(225, 550, "eggchoice")
        //help button
        let homebutton1 = this.add.image(40, 50, 'home');
        homebutton1.setScale(0.3);
        homebutton1.setInteractive();
        homebutton1.on('pointerdown', () => {
            this.sound.stopAll();// stop the music and load the next scene
            this.scene.start('UserManualScene');
        })
        let mutebutton = this.add.image(400, 50, 'mute');
        mutebutton.setScale(0.3);
        mutebutton.setInteractive();
        mutebutton.on('pointerdown', () => {
            console.log(this.sound1);
            if (this.sound1 == 0) {
                this.sound1 += 1;
                console.log(this.sound1);
                this.sound.stopAll();
            } else {
                this.sound1 -= 1;
                this.sound.play("bgmusic", { //creates variable called music that plays the music
                    volume: 0.5,
                    loop: true
                });
            }
        })
        ////////////////////////////////////////
        // ███████╗ ██████╗  ██████╗ ███████╗ //
        // ██╔════╝██╔════╝ ██╔════╝ ██╔════╝ //
        // █████╗  ██║  ███╗██║  ███╗███████╗ //
        // ██╔══╝  ██║   ██║██║   ██║╚════██║ //
        // ███████╗╚██████╔╝╚██████╔╝███████║ //
        // ╚══════╝ ╚═════╝  ╚═════╝ ╚══════╝ //
        ///////////////////////////////////////

        //adding the eggs to the scene for the user to make a choice
        let redegg = this.add.sprite(75, 650, "redegg");
        redegg.setScale(2);
        redegg.setInteractive();
        // on the pointer up feature, this option is passed to the other scenes
        redegg.on('pointerdown', () => {
             this.type = "0"; 
             setColor("red")
            });
        redegg.on('pointerup', () => {
            this.sound.stopAll();// stop the music and load the next scene
            this.scene.start('MainScene', {
                type: this.type,
            })
        }

        );

        //creating pet1 egg animation
        redegg.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('redegg', {
                start: 0,
                end: 3
            }),
            frameRate: 5,
            repeat: -1
        });
        redegg.anims.play('idle');// play the red egg animations

        //add the white egg sprite adn give it some movement,
        // when click on, the number will be assigned and then passed
        // to the other scenes
        let whiteegg = this.add.sprite(225, 650, "whiteegg");
        whiteegg.setScale(2);
        whiteegg.setInteractive();
        whiteegg.on('pointerdown', () => {
            this.type = "1";
            setColor("white")
        });
        whiteegg.on('pointerup', () => {
            this.sound.stopAll();
            this.scene.start('MainScene', {
                type: this.type
            })
        }

        );
        //creating pet2 egganimation
        whiteegg.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('whiteegg', {
                start: 0,
                end: 3
            }),
            frameRate: 5,
            repeat: -1
        });
        whiteegg.anims.play('idle');

        //create a blue egg for blue character and when clicked the 
        // blue character will load ad then be passed to the other scenes
        let blueegg = this.add.sprite(375, 650, "blueegg");
        blueegg.setScale(2);
        blueegg.setInteractive();
        blueegg.on('pointerdown', () => {
            this.type = "2";
            setColor("blue")
        });
        blueegg.on('pointerup', () => {
            this.sound.stopAll();
            this.scene.start('MainScene', {
                type: this.type
            })
        }

        );
        //blueegg.on('pointerdown',()=>this.eggNum=='2');
        //creating pet3 egg animation
        blueegg.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('blueegg', {
                start: 0,
                end: 3
            }),
            frameRate: 5,
            repeat: -1
        });
        blueegg.anims.play('idle');

        ///////////////////////////////////////////////////////////
        // ████████╗██╗    ██╗███████╗███████╗███╗   ██╗███████╗ //
        // ╚══██╔══╝██║    ██║██╔════╝██╔════╝████╗  ██║██╔════╝ //
        //    ██║   ██║ █╗ ██║█████╗  █████╗  ██╔██╗ ██║███████╗ //
        //    ██║   ██║███╗██║██╔══╝  ██╔══╝  ██║╚██╗██║╚════██║ //
        //    ██║   ╚███╔███╔╝███████╗███████╗██║ ╚████║███████║ //
        //    ╚═╝    ╚══╝╚══╝ ╚══════╝╚══════╝╚═╝  ╚═══╝╚══════╝ //
        ///////////////////////////////////////////////////////////

        //yoyo effect for the title
        this.tweens.add({

            targets: title,//who it targetting
            alpha: 0.2,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'

        });
        this.tweens.add({ // a tween is kinda like animation lite
            targets: eggs, //this one affects text
            duration: 900,
            alpha: 0.5, //affects opactiy
            yoyo: true, //yoyo effect
            repeat: -1 //-1 means yes repeat
        });
    }
    // update(){
    //     redegg.on('pointerdown',()=>  {      
    //         this.type="0";
    //         });
    // }
}

/////////////////////////////////////////////////////////////////////
// █████╗ ██████╗ ██╗     ██████╗ █████╗ ██╗     ██╗     ███████╗  //
// ██╔══██╗██╔══██╗██║    ██╔════╝██╔══██╗██║     ██║     ██╔════╝ //
// ███████║██████╔╝██║    ██║     ███████║██║     ██║     ███████╗ //
// ██╔══██║██╔═══╝ ██║    ██║     ██╔══██║██║     ██║     ╚════██║ //
// ██║  ██║██║     ██║    ╚██████╗██║  ██║███████╗███████╗███████║ //
// ╚═╝  ╚═╝╚═╝     ╚═╝     ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ //
/////////////////////////////////////////////////////////////////////

function checkFireBase() {
    if (!firebase.apps.length) {
        console.log("Initializing Firebase App.");
        return firebaseApp = firebase.initializeApp(firebaseConfig);
    }
    else {
        console.log("Firebase has been Initialized.");
        return firebaseApp = firebase.app(); // if already initialized, use that one
    }
}
// function to retrieve the id of the user
async function getID() {
    var user = await firebaseApp.auth().currentUser;// get the current user
    var uid;// get the user id
    if (user == null) // if equal to null then there is sign in problem
    {
        alert('Please sign in.')
        return null;
    }
    if (user != null) // if the user is not null
    {
        uid = user.uid;// get the user id
        console.log(uid)
        return uid;
    }
}


// api call to get the nickname of the user that is logged in
async function getNickname() {
    uid = getID()
    // // now reading the user data and get the nickname
    await db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {// making sure we are returning only the user info
            if (doc.id == await uid) {
                console.log(doc.data().nickname);
                result = doc.data().nickname; // if the user is found override result to the nickname
                //return doc.data();    
            }
        });
    });
    return result // return the result to the main function

}

function setColor(color) {
    uid = getID()
    var washingtonRef = db.collection("users").doc(uid);
    return washingtonRef.update({
        color: color
    })
        .then(() => {
            console.log("Color has been successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating: ", error);
        });
}

function checkColor() {
    uid = getID()
    // now reading the user data and get the nickname
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {// making sure we are returning only the user info
            if (doc.id == await uid) {
                console.log(doc.data().color)
                // consoloe.log(typeof doc.data().color)
                if(doc.data().color != null){
                    console.log("user is already chose an egg, redirecting...")
                    return true;
                }
                else{
                    console.log("user needs to choose an egg.")
                    return false;
                }
                // result = doc.data().color; // if the user is found override result to the nickname
                //return doc.data();    
            }
        });
    });
    // return color // return the result to the main function
}

