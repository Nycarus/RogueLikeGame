class PlayerHUD extends Phaser.Scene {

  init(data) {
    this.dungeonScene = data.prevScene;
  }

  create(){
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

  drawHealthBar(){
    this.healthBar.clear();

    create() {
        this.dungeonScene = this.scene.get('dungeonScene');
        console.log(this.dungeonScene.dungeonGenerator.dungeon.rooms);

        this.dungeonScene.dungeonGenerator.dungeon.rooms.forEach(room => {
            this.add.sprite(room.x * 3 + config.width/8 * 6, room.y * 3, 'room10').setOrigin(0,0);
        });
    }

    playerLocation() {
        let graphics = this.add.graphics();

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
}
