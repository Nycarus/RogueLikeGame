
//* Game scene */
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [TitleScene, GameScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  }
}

var game = new Phaser.Game(config);

// start title
game.scene.start('titleScene');
