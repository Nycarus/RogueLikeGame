/** @class This class represents the character the player controls
*/
class Player extends Phaser.Physics.Arcade.Sprite{

  /**Constructor method
	*@constructor
  *@param {Scene} scene - The scene where the player is present
  *@param {number} x - The desired x location of the player
  *@param {number} y - The desired y location of the player
  *@param {string} texture - The atlas spritesheet of the player
  *@param {string} frame - The starting sprite frame of the player
	*/
  constructor(scene, x, y, texture, frame){
    super(scene, x, y, texture, frame);
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);

    //This variables are created so player can switch rooms
    this.scene = scene;
    this.currentRoom = 1;
    this.previousRoom = null;
    this.roomChange = false;
    this.keyboard = scene.input.keyboard.addKeys("W, A, S, D");

  }

  /**Loads assets used for the scene
  *@param {Scene} scene - The scene where the player is present
	*/
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
  update(){
    const prevVelocity = this.body.velocity.clone();

    // Stop any previous movement from the last frame
    this.setVelocity(0);

    // Horizontal movement
    if (this.keyboard.A.isDown) {
      this.setVelocityX(-playerSettings.playerSpeed);
      this.setFlipX(true);
    }
    else if (this.keyboard.D.isDown) {
      this.setVelocityX(playerSettings.playerSpeed);
      this.setFlipX(false);
    }

    // Vertical movement
    if (this.keyboard.W.isDown) {
      this.setVelocityY(-playerSettings.playerSpeed);
    } else if (this.keyboard.S.isDown) {
      this.setVelocityY(playerSettings.playerSpeed);
    }

    // Normalize and scale the velocity so that sprite can't move faster along a diagonal
    this.body.velocity.normalize().scale(playerSettings.playerSpeed);

    // Update the animation last and give left/right/down animations precedence over up animations
    if (this.keyboard.A.isDown || this.keyboard.D.isDown) {
      this.play("right", true);
    }
    else if (this.keyboard.S.isDown){
      this.play("down", true)
    }
    else if (this.keyboard.W.isDown) {
      this.play("up", true);
    }
    else {
      this.anims.stop();
      // If we were moving & now we're not, then pick a single idle frame to use
      this.setTexture("player", 0);
    }
  }


}
