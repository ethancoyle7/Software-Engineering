// /** @type {Phaser.Types.Core.GameConfig} */
//this file initializes game preferences and settings
const config = {
    parent: 'game',
    width: 450, //sets screen height and width
    height: 800,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT, //some phaser stuff idk
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    fps: {
        target: 30, //fps stuff. we're not gonna mess with this probably
        min: 5
    },
    scene: [
    //list of scenes in order they're going to appear in
        BackgroundScene,
        BootScene,
        TitleScene,
        UserManualScene, 
        MainScene,
        FightScene,
        GameOver,
        WinScene,
        MainDead,
        Runawaypet,
        RetirementScene,
        Credits
    ],
    //this allows the inculusion of sprites and object actions
    physics: {
        default: 'arcade',
        arcade: {
           debug: false
        }
    },
    pixelArt: true, //makes pixel art look better
}
new Phaser.Game(config);//the above method is passed through this configuration object