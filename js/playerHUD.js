class PlayerHUD extends Phaser.Scene {
  constructor() {
    super({key:'playerHUD'});
  }

  init(data) {
    this.dungeonScene = data.prevScene;
  }

  create(){
    this.dungeonScene = this.scene.get('dungeonScene');
    this.dungeonGenerator = this.dungeonScene.dungeonGenerator;

    this.currentRoom = this.dungeonGenerator.playerRoom;
    //console.log(this.dungeonScene.dungeonGenerator.dungeon.rooms);

    this.drawMiniMap();

    //draw greyed room (room tracker)
    this.greyRoom = this.add.sprite(this.currentRoom.centerX * 3 + config.width/8 * 6 + 1, this.currentRoom.centerY * 3 + 1, 'grey');
    //draw player X point
    this.playerPoint = this.add.sprite(this.dungeonGenerator.playerRoom.centerX * 3 + config.width/8 * 6 + 1, 
      this.dungeonGenerator.playerRoom.centerY * 3 + 1, 'x');

    this.ammoText = this.dungeonScene.add.text(this.cameras.main.centerX * 2 - 75, this.cameras.main.centerY * 2 - 25, "");
    //this.ammoText = this.dungeonScene.add.text(20, 20, "");
    this.ammoText.setScrollFactor(0);

    this.reloadText = this.dungeonScene.add.text(this.dungeonScene.player.x, this.dungeonScene.player.y, "");
    this.playerX = this.dungeonScene.add.text(30, 50, "");
    this.playerX.setScrollFactor(0);

    this.playerY= this.dungeonScene.add.text(30, 100, "");
    this.playerY.setScrollFactor(0);

    this.healthBar = this.add.graphics();
    this.barLength = 0;
  }

  roomChange() {
    if (this.dungeonGenerator.playerRoom === this.currentRoom) {
      return false;
    }
    return true;
  }

  drawPlayerPoint() {
    if (this.roomChange()) {
      this.currentRoom = this.dungeonGenerator.playerRoom;
      //draw in grey room
      this.greyRoom = this.add.sprite(this.currentRoom.centerX * 3 + config.width/8 * 6 + 1, this.currentRoom.centerY * 3 + 1, 'grey');
      //redraw player point
      this.playerPoint.destroy();
      this.playerPoint = this.add.sprite(this.currentRoom.centerX * 3 + config.width/8 * 6 + 1, this.currentRoom.centerY * 3 + 1, 'x');
    }
  } 

  drawMiniMap() {
    this.dungeonScene.dungeonGenerator.dungeon.rooms.forEach(room => {
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
        this.add.sprite(room.x * 3 + config.width/8 * 6, room.y * 3, 'room00').setOrigin(0,0);
      }
    });
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
