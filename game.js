/** @type {Phaser.Types.Core.GameConfig} */
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
        BootScene,
        TitleScene, //list of scenes in order they're going to appear in
        MainScene,
        FightScene,
        GameOver

    ],
    physics: {
        default: 'arcade',
        arcade: {
           debug: true
        }
    },
    pixelArt: true //makes pixel art look better
}
new Phaser.Game(config);




