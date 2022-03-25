const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x8B6F19;
const COLOR_DARK = 0x260e04;

class NewScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LeaderboardScene' });

    }
    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create() {


        if (!firebase.apps.length) {
            var firebaseApp = firebase.initializeApp(firebaseConfig);
        } else {
            var firebaseApp = firebase.app(); // if already initialized, use that one
        }

        firebaseApp.auth().onAuthStateChanged(function (user) {
            if (user) {
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                console.log(displayName + '(' + uid + '): ' + email);                // ...
            } else {
                console.log('User is signed out.');
            }
        });
        var buttons = this.rexUI.add.buttons({
            x: 225, y: 300,
            orientation: 'y',

            buttons: [
                createButton(this, 'Sign In'),
                createButton(this, 'Create an account'),
                createButton(this, 'Sign Out'),
            ],

            space: { item: 8 }

        }).layout()

        var print = this.add.text(400, 0, '');
        buttons
            .on('button.click', function (button,index) {
                print.text += `Click button-${button.text}\n`;
                buttons.setButtonEnable(false)
                setTimeout(() => {
                    buttons.setButtonEnable(true)
                }, 1000);
            })
        // Sign out function
        // firebaseApp.auth().signOut();
        var email = 'test1@test.com';
        var password = 'test1@test.com';
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        });
    }
    update() {

    }
}
var createButton = function (scene, text) {
    return scene.rexUI.add.label({
        width: 100,
        height: 70,
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT),
        text: scene.add.text(0, 0, text, {
            fontSize: 30,
        }),
        space: {
            left: 10,
            right: 10,
        }
    });
}