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
		//Poggers background
		this.load.image('background', '../images/background.jpg');
		this.load.image('background1','../images/pogchamp.jpg')
		
		//Load tileset and tilemap
		this.load.image('mc_tiles', 'images/tilesets/minecraft_tileset.png');
		this.load.tilemapTiledJSON('room1', 'images/tilesets/roomNESW.json');

		//Loading atlas and images used for the game
		this.load.image('gameBackground', '../images/hahaa.jpg');
		this.load.image('wall', '../images/wall.png');
		this.load.image('bullet', '../images/bullet.png');
		this.load.atlas('player', '../images/player.png', '../images/player.json');

		//Load spritesheet used for the dungeon
		this.load.image("tiles", "../images/testTiles.png");

		//Load music and sound effects
		this.load.audio("shootSound", "../sound/shoot.mp3");
		this.load.audio("music", "../sound/tempMusic.mp3");

		//Load minimap room images
		this.load.image('room10', '../images/rooms/room10.png');
	}

	/**Loads assets used for the scene
	*/
	create() {
		//Title screen background
		this.background = this.add.tileSprite(0,0,config.width,config.height,'background1');
		this.background.setOrigin(0,0);

		//Clickable text which would lead you to the main game
		var text = this.add.text(300,300, 'Welcome to our game!', {color: '#000000'});
		text.setInteractive();
		text.on('pointerdown', () => this.clickButton());
	}

	update() {
		this.background.tilePositionY -= 1;
	}

	/**Function to switch game scenes
	*/
	clickButton() {
		this.scene.start('dungeonScene');
		this.scene.start('hud');
	}

}
