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

		//Load spritesheet used for the dungeon
		this.load.image("tiles", "../images/testTiles.png");

		//Load music and sound effects
		this.load.audio("shootSound", "../sound/shoot.mp3");
		this.load.audio("music", "../sound/tempMusic.mp3");

		//Load minimap room images
		this.load.image('room00', '../images/rooms/room00.png');
		this.load.image('room05105510', '../images/rooms/room01.png');
		this.load.image('room50105510', '../images/rooms/room02.png');
		this.load.image('room5005105', '../images/rooms/room03.png');
		this.load.image('room5005510', '../images/rooms/room04.png');
		this.load.image('room5005', '../images/rooms/room05.png');
		this.load.image('room05510', '../images/rooms/room06.png');
		this.load.image('room105510', '../images/rooms/room07.png');
		this.load.image('room50105', '../images/rooms/room08.png');
		this.load.image('room09', '../images/rooms/room09.png');
		this.load.image('room10', '../images/rooms/room10.png');
		this.load.image('room05105', '../images/rooms/room11.png');
		this.load.image('room50510', '../images/rooms/room12.png');
		this.load.image('room105', '../images/rooms/room13.png');
		this.load.image('room510', '../images/rooms/room14.png');
		this.load.image('room05', '../images/rooms/room15.png');
		this.load.image('room50', '../images/rooms/room16.png');

		//Load X mark image
		this.load.image('x', '../images/rooms/x.png');
		//Load tracked room image
		this.load.image('grey','../images/rooms/grey.png');
	}

	/**Loads assets used for the scene
	*/
	create() {
			// Disable right click bringing up browser menu
			game.input.mouse.disableContextMenu();

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
    this.scene.switch('dungeonScene');
	}

}
