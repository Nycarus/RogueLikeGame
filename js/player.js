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
  // FUNCTIONS USED AS CONTROLS FOR THE PLAYER SPRITE

  /**Moves the player right
  */
  right(){
    this.setVelocityX(playerSettings.playerSpeed);
    this.play("right", true);
  }

  /**Moves the player left
  */
  left(){
    this.setVelocityX(-playerSettings.playerSpeed);
    this.play("left", true);
  }

  /**Moves the player up
  */
  up(){
    this.setVelocityY(-playerSettings.playerSpeed);
    this.play("up", true);
  }

  /**Moves the player down
  */
  down(){
    this.setVelocityY(playerSettings.playerSpeed);
    this.play("down", true);
  }

  /**Stops the player from moving horizontally
  */
  idleX(){
    this.setVelocityX(0);
  }

  /**Stops the player from moving vertically
  */
  idleY(){
    this.setVelocityY(0);
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
