
//* Game scene */
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [TitleScene, GameScene],
  physics: {
    // we'll use arcade physics for now, I don't know how big the size of the project will actually be
    default: "arcade",
    arcade: {
      debug: true
    }
  }
}

// run the config
var game = new Phaser.Game(config);

// start title
game.scene.start('titleScene');
