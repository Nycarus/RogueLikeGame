// default starting game config
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [TitleScene, GameScene, DungeonScene],
  physics: {
    // we'll use arcade physics for now, I don't know how big the size of the project will actually be
    default: "arcade",
    arcade: {
      debug: true
    }
  }
}
//adjust player's movement and bullet speed
var playerSettings = {
  playerSpeed: 300,
  bulletSpeed: 600,
}

// run the config
var game = new Phaser.Game(config);

// start title
game.scene.start('titleScene');
