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
    this.health = 100;
    this.fireRate = 100;
    this.nextFire = 0;

    this.totalAmmo = 30;
    this.currentAmmo = 30;
    this.haveAmmo = true;
    this.nextReload = 0;
    this.reloadRate = 3000;

    this.previousRoom = null;
    this.roomChange = false;
    this.keyboard = scene.input.keyboard.addKeys("W, A, S, D, E");

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

  freeze() {
    this.body.moves = false;
  }

  unfreeze() {
    this.body.moves = true;
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

    if (this.keyboard.E.isDown) {
      playerSettings.playerSpeed = 900;
    }
    if(this.keyboard.E.getDuration() >= 75) {
      playerSettings.playerSpeed = 300;
    }

    // Normalize and scale the velocity so that sprite can't move faster along a diagonal
    this.body.velocity.normalize().scale(playerSettings.playerSpeed);

    // Update the animation last and give left/right/down animations precedence over up animations
    if (this.keyboard.A.isDown || this.keyboard.D.isDown) {
      this.play("right", true);
    }
    else if (this.keyboard.S.isDown){
      this.play("down", true);
    }
    else if (this.keyboard.W.isDown) {
      this.play("up", true);
    }
    else {
      this.anims.stop();
      // If we were moving & now we're not, then pick a single idle frame to use
      this.setTexture("player", 0);
    }

    this.playerClick();

    if (this.health < 0){
      this.health = 0;
    }

    if (this.health > 100){
      this.health = 100;
    }
  }

  reload() {
    this.currentAmmo = this.totalAmmo;
    this.haveAmmo = true;
  }

  playerClick() {
		if (game.input.activePointer.leftButtonDown()){
			if (this.scene.time.now > this.nextFire && this.haveAmmo){
				this.nextFire = this.scene.time.now + this.fireRate;
				this.scene.fire();
				this.scene.bulletSound.play(this.scene.bulletSoundConfig);
        this.currentAmmo--;
        if (this.currentAmmo == 0){
          this.haveAmmo = false;
          this.scene.time.delayedCall(1500, this.reload, [], this);
        }
			}
		}
    if (game.input.activePointer.rightButtonDown()){
      // placeholder
    }
  }

  //**Gets current player's room location */
  getRoom() {
    let roomNumber;
    //search for all rooms in rooms array in gameScene
    for (let room in this.scene.rooms) {
      //get dimensions of room object in tilemap
      let roomLeft = this.scene.rooms[room].x;
      let roomRight = this.scene.rooms[room].x + this.scene.rooms[room].width;
      let roomTop = this.scene.rooms[room].y;
      let roomBottom = this.scene.rooms[room].y + this.scene.rooms[room].height;
      //check if player is within room
      if ( this.x > roomLeft && this.x < roomRight && this.y > roomTop && this.y < roomBottom ) {
        roomNumber = room;
      }
    }
    //if roomNumber is not equal to the currentRoom, updates the player's location else player doesn't change rooms
    if (roomNumber != this.currentRoom) {
      this.previousRoom = this.currentRoom;
      this.currentRoom = roomNumber;
      this.roomChange = true;
    }
    else {
      this.roomChange = false;
    }
  }

}
