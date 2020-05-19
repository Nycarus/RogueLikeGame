/**
* @class This class represents the title screen for the game.
*/
class TitleScene extends Phaser.Scene {

	/**Constructor method
	*@constructor
	*/
	constructor() {
		super({key:'titleScene'});
	}

	/**Preloads assets used for the scene
	*/
	preload() {
		//Xing background
		this.load.image('background', '../images/background.jpg');
		//Load tileset and tilemap
		this.load.image('mc_tiles', 'images/tilesets/minecraft_tileset.png');
		this.load.tilemapTiledJSON('room1', 'images/tilesets/roomNESW.json');

		//Loading atlas and images used for the game
		this.load.image('gameBackground', '../images/hahaa.jpg');
		this.load.image('wall', '../images/wall.png');
		this.load.image('bullet', '../images/bullet.png');
		this.load.atlas('player', '../images/player.png', '../images/player.json');

		//Load music and sound effects
		this.load.audio("shootSound", "../sound/shoot.mp3");
		this.load.audio("music", "../sound/tempMusic.mp3");
	}

	/**Loads assets used for the scene
	*/
	create() {
			//Title screen background
		 	var bg = this.add.sprite(0,0,'background');
		  bg.setOrigin(0,0);

			//Clickable text which would lead you to the main game
		  var text = this.add.text(300,300, 'Welcome to our game!');
			text.setInteractive();
			text.on('pointerdown', () => this.clickButton());
	}

	/**Function to switch game scenes
	*/
	clickButton() {
    this.scene.switch('gameScene');
	}

}
