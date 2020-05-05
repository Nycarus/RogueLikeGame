class Player extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y, texture, frame){
    super(scene, x, y, texture, frame);
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
  }


  create(scene){

    // ANIMATIONS USED FOR THE PLAYER SPRITE
    scene.anims.create({
      key: "left",
      frameRate: 5,
      frames: scene.anims.generateFrameNames('player', {
        prefix: 'player',
        suffix: '.png',
        start: 3,
        end: 5,
        zeroPad: 2
      })
    });

    scene.anims.create({
      key: "right",
      frameRate: 5,
      frames: scene.anims.generateFrameNames('player', {
        prefix: 'player',
        suffix: '.png',
        start: 6,
        end: 8,
        zeroPad: 2
      })
    });

    scene.anims.create({
      key: "up",
      frameRate: 5,
      frames: scene.anims.generateFrameNames('player', {
        prefix: 'player',
        suffix: '.png',
        start: 9,
        end: 11,
        zeroPad: 3
      })
    });

    scene.anims.create({
      key: "down",
      frameRate: 5,
      frames: scene.anims.generateFrameNames('player', {
        prefix: 'player',
        suffix: '.png',
        start: 0,
        end: 2,
        zeroPad: 2
      })
    });

    scene.anims.create({
      key: "idle",
      frameRate: 5,
      frames: scene.anims.generateFrameNames('player', {
        prefix: 'player',
        suffix: '.png',
        start: 1,
        end: 1,
        zeroPad: 2
      })
    });

  }

  // FUNCTIONS USED AS CONTROLS FOR THE PLAYER SPRITE
  right(){
    this.setVelocityX(80);
    this.play("right", true);
  }

  left(){
    player.setVelocityX(-80);
    player.play("left", true);
  }

  up(){
    player.setVelocityY(-80);
    player.play("up", true);
  }

  down(){
    player.setVelocityY(80);
    player.play("down", true);
  }

  idleX(){
    player.setVelocityX(0);
  }

  idleY(){
    player.setVelocityY(0);
  }
}
