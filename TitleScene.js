/* This scene contains the tiltle of the Game
*  It appears after the BootScene
*  In this scene users are allowed to choose an egg 
*  The color of the egg coresponds with the color of
*  their new pet. 
*/

var allusers = []
userData = {}
var dict = {}
const Array1 = []
const Array2 = []
var colorvalue2 = null
var enemycolor
var enemey
let userChooseEgg = false;

class TitleScene extends Phaser.Scene { //the scene is a class, so we will be using this a lot to reference
    //methods and variables owned by it.
    constructor() {
        super("TitleScene");
        this.bgmusic;
        this.type;
        this.sound1 = 0;
    }

    preload() {  // this is the preload function, it loads all the assets for the scene
    }

    create() {
        // Check if the user chose an egg or not
        // if the user chose an egg, user needs to be redirected to the MainScene
        // Otherwise the user needs to choose an egg.
        this.sound1=0;
        this.sound.stopAll();// stop all previous sounds
        //this is the create function
        //create variable called bg, and make it equal to an image of "bgname" at location (225,400)
        let bg = this.add.image(225, 400, "back");
        bg.setScale(.6); //changes the scale of the background image

        //start the music for the scene
        this.bgmusic = this.sound.play("bgmusic", { //creates variable called music that plays the music
            volume: 0.5,
            loop: true
        });
        /////////////////////////////////////////////////////////////////////////
        // ██╗   ██╗███████╗███████╗██████╗     ██╗███╗   ██╗███████╗ ██████╗  //
        // ██║   ██║██╔════╝██╔════╝██╔══██╗    ██║████╗  ██║██╔════╝██╔═══██╗ //
        // ██║   ██║███████╗█████╗  ██████╔╝    ██║██╔██╗ ██║█████╗  ██║   ██║ //
        // ██║   ██║╚════██║██╔══╝  ██╔══██╗    ██║██║╚██╗██║██╔══╝  ██║   ██║ //
        // ╚██████╔╝███████║███████╗██║  ██║    ██║██║ ╚████║██║     ╚██████╔╝ //
        //  ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝    ╚═╝╚═╝  ╚═══╝╚═╝      ╚═════╝  //
        /////////////////////////////////////////////////////////////////////////
        checkAndGetData();
        // call the user name of the logged in user
        var username = this.add.text(10, 735, '', { font: '20px Arial', fill: '#00ff00' });
        //call to the api to get the id of the logged in user
        //call the getnickname function to get the nickname of the user
        //    console.log(getNickname()) // console log to see if it works
        getNickname() // then call the .then function to pass in the promis value and get the id
            // from the await function, we can get the nickname of the user
            .then(usern => {
                username.setText("Logged in As :" + [usern]);//display it to the screen
                //var usernameUD = usern;
            });

        getColor().then(color => {
            if (userChooseEgg == true || color == null) {
                // if (color == null) {
                console.log('let it choose');
                userChooseEgg = false;
                // }
            }
            else {
                if (color == "red") {
                    this.type = "0";
                    this.scene.start('MainScene',
                        {
                            type: this.type,
                        })
                }
                if (color == "white") {
                    this.type = "1";
                    this.scene.start('MainScene',
                        {
                            type: this.type,
                        })
                }
                if (color == "blue") {
                    this.type = "2";
                    this.scene.start('MainScene',
                        {
                            type: this.type,
                        })
                }
            }
        });

        //get the user  id for the current logged in user
        var User = this.add.text(10, 760, '', { font: '20px Arial', fill: '#00ff00' });
        //call to the api to get the id of the logged in user

        User.setText("User ID :" + [userData["uid"]]);//display it to the screen
        console.log(userData)
        // ADDING THE TITLE AND EGG CHOICE AND PRODUCER TAGS
        var title = this.add.image(225, 80, "title")
        var eggs = this.add.image(225, 550, "eggchoice")
        
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

        //add the white egg sprite and give it some movement,
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
            this.scene.start('MainScene',
                {
                    type: this.type
                })
        }

        );
        //creating pet2 egganimation
        whiteegg.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('whiteegg',
                {
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
            this.scene.start('MainScene',
                {
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
        //store the choice of the egg inside of firebase



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

            targets: title,//who it targeting
            alpha: 0.2,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'

        });
        this.tweens.add({ // a tween is kinda like animation lite
            targets: eggs, //this one affects text
            duration: 900,
            alpha: 0.5, //modifies opacity
            yoyo: true, //yoyo effect
            repeat: -1 //-1 means yes repeat
        });
    }

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
function checkAndGetData() {
    var user = firebaseApp.auth().currentUser;// get the current user
    var uid;// get the user id
    if (user == null) // if equal to null then there is sign in problem
    {
        alert('Please sign in.')
    }
    if (user != null) // if the user is not null
    {
        uid = user.uid;// get the user id
        userData["uid"] = uid;
        getInfo();
    }
}

function getInfo() {
    uid = userData["uid"] // calling getID function to get the user id
    // // now reading the user data and get the nickname
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {// making sure we are returning only the user info
            if (doc.id == uid) {
                userData["nickname"] = doc.data().nickname;
                userData["color"] = doc.data().color;
            }
        });
    });
}

// api call to get the nickname of the user that is logged in
async function getNickname() {
    uid = userData["uid"] // calling getID function to get the user id
    // // now reading the user data and get the nickname
    await db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {// making sure we are returning only the user info
            if (doc.id == uid) {
                userData["nickname"] = doc.data().nickname;
                result = doc.data().nickname; // if the user is found override result to the nickname
                //return doc.data();    
            }
        });
    });
    return result // return the result to the main function
}

// Function will set a color for new user and update this value (color) on firebase database
function setColor(color) {
    uid = userData["uid"] // calling getID function to get the user id
    userData["color"] = color; // set the color to the userData
    var docRef = db.collection("users").doc(uid); // go into the users collections then into the user profile data
    return docRef.update({
        color: color // update the color with the one we passed earlier
    })
        .then(() => { // print out a message telling the info has been updated.
            console.log("Color has been successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating: ", error);
        });
}

async function getColor() {
    uid = userData['uid']
    // // now reading the user data and get the nickname
    await db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {// making sure we are returning only the user info
            if (doc.id == uid) {
                userData['color'] = doc.data().color;
                result = doc.data().color; // if the user is found override result to the nickname
                console.log("her her her here")
            }
        });
    });
    return result // return the result to the main function
}
async function getUsers() {
    uid = userData['uid']
    // now reading the user data and get the nickname
    await db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {// making sure we are returning only the user info
            if (doc.id != uid) {

                //push each nickname into dict
                dict['nickname'] = doc.data().nickname
                dict['color'] = doc.data().color
                Array1.push(doc.data().nickname)//nickname
                Array2.push(doc.data().color)//color

                allusers.push({ name: doc.data().nickname, color: doc.data().color })


            }
        });

        //print out the value at the fighter
        //console.log(Array1[fighter])
        //console.log('Randomly pick a fighter to fight')
        const fighter = Math.floor(Math.random() * Array1.length);//picks random array index of the first value
        //which is the nickname  index
        //console.log("figher is " + Array1[fighter])// name of the fighter
        enemey = Array1[fighter]//name of the enemy
        //const ourfightername= Array1[fighter]
        var colorvalue = fighter// since the arrays are the same size return the index number of the fighter
        //var colorvalue2= Array2[fighter]// since the arrays are the same size return the index number of the fighter
        //console.log("colorvalue is " + Array2[colorvalue])// that index will be the index value of the other array
        //console.log(" the enemy is " + Array1[fighter]+" and his color is "+Array2[colorvalue])
        //console.log('this is the end of the choosing fighting opponent')
        if (Array2[colorvalue] == "blue") {
            //console.log('the color is blue')
            enemycolor = "blue"
        }
        else if (Array2[colorvalue] == "red") {
            //console.log('the color is red')
            enemycolor = "red"
        }
        else if (Array2[colorvalue] == "white") {
            //console.log('the color is white')
            enemycolor = "white"
        }
        else if (Array2[colorvalue] == "none" || Array2[colorvalue] == "null") {
            //console.log('the color  is none')
            console.log("color defaulted to red")
            enemycolor = "red"
        }

    });

    return enemey//passing the color of the enemy
    // return allusers.length? obj[ allusers[allusers.length * Math.random() | 0]] : void 0;    
}
//call the getuser function and return the color
async function getEnemyColor() {
    await getUsers()
    return enemycolor
}




