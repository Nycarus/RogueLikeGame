class PlayerHUD extends Phaser.Scene {
  constructor() {
    super({key:'playerHUD'});
  }

  init(data) {
    this.dungeonScene = data.prevScene;
  }

  preload() {
      let room = this.dungeonScene.dungeonGenerator.playerRoom;
      let w = (room.width - 1) | 0;
      let h = (room.height / 2) | 0;
      //Load minimap room images
      //this.load.image('room00', '../images/rooms/room00.png');
      //this.load.image('room05105510', '../images/rooms/room01.png');
      //this.load.image('room50105510', '../images/rooms/room02.png');
      //this.load.image('room5005105', '../images/rooms/room03.png');
      //this.load.image('room5005510', '../images/rooms/room04.png');
      //this.load.image('room5005', '../images/rooms/room05.png');
      //this.load.image('room05510', '../images/rooms/room06.png');
      //this.load.image('room105510', '../images/rooms/room07.png');
      //this.load.image('room50105', '../images/rooms/room08.png');
      //this.load.image('room09', '../images/rooms/room09.png');
      //this.load.image('room10', '../images/rooms/room10.png');
      //this.load.image('room05105', '../images/rooms/room11.png');
      //this.load.image('room50510', '../images/rooms/room12.png');
      //this.load.image('room105', '../images/rooms/room13.png');
      //this.load.image('room510', '../images/rooms/room14.png');
      //this.load.image('room05', '../images/rooms/room15.png');
      //this.load.image('room50', '../images/rooms/room16.png');
      this.load.image(`room0${h}${w}${h}${h}${w}`, '../images/rooms/room01.png');
      this.load.image(`room${h}0${w}${h}${h}${w}`, '../images/rooms/room02.png');
      this.load.image(`room${h}00${h}${w}${h}`, '../images/rooms/room03.png');
      this.load.image(`room${h}00${h}${h}${w}`, '../images/rooms/room04.png');
      this.load.image(`room${h}00${h}`, '../images/rooms/room05.png');
      this.load.image(`room0${h}${h}${w}`, '../images/rooms/room06.png');
      this.load.image(`room${w}${h}${h}${w}`, '../images/rooms/room07.png');
      this.load.image(`room${h}0${w}${h}`, '../images/rooms/room08.png');
      this.load.image(`room${w}${h}${h}${w}`, '../images/rooms/room07.png');
      this.load.image('room09', '../images/rooms/room09.png');
      this.load.image('room10', '../images/rooms/room10.png');
      this.load.image(`room0${h}${w}${h}`, '../images/rooms/room11.png');
      this.load.image(`room${h}0${h}${w}`, '../images/rooms/room12.png');
      this.load.image(`room${w}${h}`, '../images/rooms/room13.png');
      this.load.image(`room${h}${w}`, '../images/rooms/room14.png');
      this.load.image(`room0${h}`, '../images/rooms/room15.png');
      this.load.image(`room${h}0`, '../images/rooms/room16.png');

      //Load X mark image
      this.load.image('x', '../images/rooms/x.png');
      //Load tracked room image
      this.load.image('grey','../images/rooms/grey.png');
  }

  create(){
    //this.dungeonScene = this.scene.get('dungeonScene');
    this.dungeonGenerator = this.dungeonScene.dungeonGenerator;

    this.currentRoom = this.dungeonGenerator.playerRoom;

    this.drawMiniMap();

    //draw greyed room (room tracker)
    this.greyRoom = this.add.sprite(this.currentRoom.centerX * 3 + config.width/8 * 6 + 1, this.currentRoom.centerY * 3 + 1, 'grey');
    //draw player X point
    this.playerPoint = this.add.sprite(this.dungeonGenerator.playerRoom.centerX * 3 + config.width/8 * 6 + 1, 
      this.dungeonGenerator.playerRoom.centerY * 3 + 1, 'x');

    this.ammoText = this.dungeonScene.add.text(this.cameras.main.centerX * 2 - 75, this.cameras.main.centerY * 2 - 25, "");

    this.ammoText.setScrollFactor(0);

    this.reloadText = this.dungeonScene.add.text(this.dungeonScene.player.x, this.dungeonScene.player.y, "");
    this.playerX = this.dungeonScene.add.text(30, 50, "");
    this.playerX.setScrollFactor(0);

    this.playerY= this.dungeonScene.add.text(30, 100, "");
    this.playerY.setScrollFactor(0);

    this.healthBar = this.add.graphics();
    this.barLength = 0;
  }

  /*Checks if the player has changed rooms */
  roomChange() {
    if (this.dungeonGenerator.playerRoom === this.currentRoom) {
      return false;
    }
    return true;
  }

  /*If the room changes, updates player location on minimap */
  drawPlayerPoint() {
    if (this.roomChange()) {
      this.currentRoom = this.dungeonGenerator.playerRoom;
      //draw in grey room
      this.greyRoom = this.add.sprite(this.currentRoom.centerX * 3 + config.width/8 * 6 + 1, this.currentRoom.centerY * 3 + 1, 'grey');
      //redraw player point
      this.playerPoint.destroy();
      this.playerPoint = this.add.sprite(this.currentRoom.centerX * 3 + config.width/8 * 6 + 1, this.currentRoom.centerY * 3 + 1, 'x');
      //update minimap
      this.drawMiniMap();
    }
  } 

  /*Draws all rooms of dungeon on minimap, then adds room images according to doors of dungeon rooms. */
  drawMiniMap() {
      var room = this.dungeonGenerator.playerRoom;  
      var doors = room.getDoorLocations();
      if (doors.length === 1) {
        this.add.sprite(room.x * 3 + config.width/8 * 6, room.y * 3, 'room' + doors[0].x.toString() + doors[0].y.toString()).setOrigin(0,0);
      }
      else if (doors.length === 2) {
        this.add.sprite(room.x * 3 + config.width/8 * 6, room.y * 3, 'room' 
        + doors[0].x.toString() + doors[0].y.toString() 
        + doors[1].x.toString() + doors[1].y.toString()).setOrigin(0,0);
      }
      else if (doors.length === 3) {
        this.add.sprite(room.x * 3 + config.width/8 * 6, room.y * 3, 'room' 
        + doors[0].x.toString() + doors[0].y.toString() 
        + doors[1].x.toString() + doors[1].y.toString()
        + doors[2].x.toString() + doors[2].y.toString()).setOrigin(0,0);
      }
      else {
        this.add.sprite(room.x * 3 + config.width/8 * 6, room.y * 3, 'room09').setOrigin(0,0);
      }
  }

  drawHealthBar(){
    this.healthBar.clear();

    if (this.dungeonScene.player.health < 30){
      this.healthBar.fillStyle(0xff0000);
    }
    else{
      this.healthBar.fillStyle(0x00ff00);
    }

    this.barLength = Math.floor(2.46 * this.dungeonScene.player.health);
    this.healthBar.fillRect(10 + 2, 10 + 2, this.barLength, 12);
  }

  update(){
    this.ammoText.setText(this.dungeonScene.player.currentAmmo + " / " + this.dungeonScene.player.totalAmmo);
		this.reloadText.x = this.dungeonScene.player.getCenter().x - 50;
		this.reloadText.y = this.dungeonScene.player.getCenter().y - 60;
    //this.playerX.setText(this.dungeonScene.dungeonGenerator.groundLayer.worldToTileX(this.dungeonScene.player.x));
    //this.playerY.setText(this.dungeonScene.dungeonGenerator.groundLayer.worldToTileY(this.dungeonScene.player.y));
    this.playerX.setText((this.dungeonScene.dungeonGenerator.groundLayer.worldToTileX(this.dungeonScene.player.x) + 2) % 11);
    this.playerY.setText((this.dungeonScene.dungeonGenerator.groundLayer.worldToTileY(this.dungeonScene.player.y) + 2) % 11);
    if (!this.dungeonScene.player.haveAmmo){
      this.reloadText.setText("Reloading...");
    }
		else{
      this.reloadText.setText("");
    }

    this.drawHealthBar();

    this.drawPlayerPoint();
  }
}
