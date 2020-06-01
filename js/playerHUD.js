class PlayerHUD extends Phaser.Scene {
  constructor() {
    super({key:'playerHUD'});
  }

  init(data) {
    this.dungeonScene = data.prevScene;
  }

  create(){
    this.ammoText = this.dungeonScene.add.text(this.cameras.main.centerX * 2 - 75, this.cameras.main.centerY * 2 - 25, "");
    this.ammoText.setScrollFactor(0);

    this.reloadText = this.dungeonScene.add.text(this.dungeonScene.player.x, this.dungeonScene.player.y, "");

    this.healthBar = this.add.graphics();
    this.barLength = 0;
  }

  drawHealthBar(){
    this.healthBar.clear();
    //  BG

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
    if (!this.dungeonScene.player.haveAmmo){
      this.reloadText.setText("Reloading...");
    }
		else{
      this.reloadText.setText("");
    }

    this.drawHealthBar();
  }
}
