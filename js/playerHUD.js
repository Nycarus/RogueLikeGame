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
    this.dungeonGenerator = this.dungeonScene.dungeonGenerator;
    this.rooms = this.dungeonGenerator.dungeon.rooms;

    this.currentRoom = this.dungeonGenerator.playerRoom;

    this.proportion();
    this.getAdjacentRooms();
    this.drawMiniMap(this.currentRoom);

    //draw greyed room (room tracker)
    this.greyRoom = this.add.sprite(this.proportionX, this.proportionY, 'grey').setOrigin(0,0);
    //draw player X point
    this.playerPoint = this.add.sprite(this.proportionX, this.proportionY, 'x').setOrigin(0,0);

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

  /*Scales the minimap according to dungeon size properly */
  proportion() {
    //this.proportionX = this.currentRoom.x * 3.2 + (config.width * 2 / (this.rooms.length/7));
    this.proportionX = this.currentRoom.x * 3 + config.width * 6 / 8;
    this.proportionY = this.currentRoom.y * 3;
  }

  /*If the room changes, updates player location on minimap */
  drawPlayerPoint() {
    //console.log(this.dungeonGenerator.playerRoom.x + " " + this.dungeonGenerator.playerRoom.y);
    if (this.roomChange()) {
      this.currentRoom = this.dungeonGenerator.playerRoom;
      this.proportion();
      console.log(this.currentRoom.x + " " + this.currentRoom.y);
      //draw in grey room
      this.greyRoom = this.add.sprite(this.proportionX, this.proportionY, 'grey').setOrigin(0,0);
      //redraw player point
      this.playerPoint.destroy();
      this.playerPoint = this.add.sprite(this.proportionX, this.proportionY, 'x').setOrigin(0,0);
      //update minimap
      this.getAdjacentRooms();
      this.drawMiniMap(this.currentRoom);
    }
  }

  /*Checks the adjacent rooms of the player room */
  getAdjacentRooms() {
    var room = this.dungeonGenerator.playerRoom;
    var doors = room.getDoorLocations();
    doors.forEach(door => {
      if (door.x === 0 && door.y === (room.height / 2 | 0)) {
        this.drawMiniMap(this.dungeonGenerator.dungeon.getRoomAt(room.x - room.width, room.y));
        //console.log(this.dungeonGenerator.dungeon.getRoomAt(room.x - 10, room.y));
      }
      else if (door.x === (room.width / 2 | 0) && door.y === 0) {
        this.drawMiniMap(this.dungeonGenerator.dungeon.getRoomAt(room.x, room.y - room.height));
      }
      else if (door.x === (room.width - 1) && door.y === (room.height / 2 | 0)) {
        this.drawMiniMap(this.dungeonGenerator.dungeon.getRoomAt(room.x + room.width, room.y));
      }
      else if (door.x === (room.width / 2 | 0) && door.y === (room.height - 1)) {
        this.drawMiniMap(this.dungeonGenerator.dungeon.getRoomAt(room.x, room.y + room.height));
      }
    })
  }

  /*Draws all rooms of dungeon on minimap, then adds room images according to doors of dungeon rooms. */
  drawMiniMap(currentRoom) {
      //var room = this.dungeonGenerator.playerRoom;  
      var room = currentRoom;
      var doors = room.getDoorLocations();
      let proportionX = currentRoom.x * 3 + config.width * 6 / 8;
      let proportionY = currentRoom.y * 3;
      console.log(doors);
      if (doors.length === 1) {
        this.add.sprite(proportionX, proportionY, 'room' + doors[0].x.toString() + doors[0].y.toString()).setOrigin(0,0);
      }
      else if (doors.length === 2) {
        this.add.sprite(proportionX, proportionY, 'room' 
        + doors[0].x.toString() + doors[0].y.toString() 
        + doors[1].x.toString() + doors[1].y.toString()).setOrigin(0,0);
      }
      else if (doors.length === 3) {
        this.add.sprite(proportionX, proportionY, 'room' 
        + doors[0].x.toString() + doors[0].y.toString() 
        + doors[1].x.toString() + doors[1].y.toString()
        + doors[2].x.toString() + doors[2].y.toString()).setOrigin(0,0);
      }
      else {
        this.add.sprite(proportionX, proportionY, 'room09').setOrigin(0,0);
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
