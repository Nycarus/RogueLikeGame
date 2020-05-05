class TitleScene extends Phaser.Scene {

	constructor() {
		super({key:'titleScene'});
	}

	preload() {
		this.load.image('background', 'images/background.jpg');
	}

	create() {
			//Title screen background
		 	var bg = this.add.sprite(0,0,'background');
		  bg.setOrigin(0,0);

			//Clickable text which would lead you to the main game
		  var text = this.add.text(300,300, 'Welcome to our game!');
			text.setInteractive();
			text.on('pointerdown', () => this.clickButton());
	}

	// Function to switch game scenes
	clickButton() {
    this.scene.switch('gameScene');
	}

}
