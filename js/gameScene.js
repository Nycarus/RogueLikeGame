/**
* @class This class represents the actual game screen.
*/
class GameScene extends Phaser.Scene {

	/**Constructor method
	*@constructor
	*/
	constructor() {
		super({key:'gameScene'});
	}

	/**Preloads assets used for the scene
	*/
	preload() {
		//Load tileset and tilemap
		this.load.image('mc_tiles', 'images/tilesets/minecraft_tileset.png');
		this.load.tilemapTiledJSON('room1', 'images/tilesets/mc_dungeon.json');

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
			// Create tileset and tilemap
			this.map = this.make.tilemap({key: "room1"});
			this.tileset = this.map.addTilesetImage('mc_tileset','mc_tiles');
			this.floorLayer = this.map.createStaticLayer("Background", this.tileset, 0, 0);
			this.wallLayer = this.map.createStaticLayer("Walls", this.tileset, 0, 0);
			this.wallLayer.setCollisionByProperty({collides: true});
			//this.debugGraphics = this.add.graphics().setAlpha(0.75);

			//add hitbox detection to walls
			//this.wallLayer.renderDebug(this.debugGraphics, {
			//	tileColor: null, // Color of non-colliding tiles
			//	collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
			//	faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
			//  });

			// Music config
			this.music = this.sound.add("music");
			var musicConfig = {
				mute: false,
				volume: 0,
				rate: 1,
				detune: 0,
				seek: 0,
				loop: true,
				delay: 0
			}

			this.music.play(musicConfig);

			// Use the crosshair as a cursor
			this.input.setDefaultCursor('url(../images/crosshair.cur), pointer');

			//loop through all objects in map
			//this.rooms = [];
			//this.map.findObject("Objects", function(object) {
			//
			//	if (object.type === 'room') {
			//		this.rooms.push(object);
			//	}
			//	//player is created on spawnpoint
			//	if (object.name === 'spawnPoint') {
			//		this.player = new Player(this, object.x, object.y, 'player', 'player01.png');
			//		console.log(object.x + "and" + object.y)
			//		this.player.create(this);
			//	}
			//}, this);
			this.player = new Player(this, 500, 500, 'player', 'player01.png')
			this.player.create(this);
			// create camera
			//this.camera = this.cameras.main;
			//this.camera.startFollow(this.player);
			//set camera bounds, player cannot see beyond void
			//this.camera.setBounds(0, 0, config.width, config.height);


			// create placeholder walls to test collison out
			this.walls = this.add.group();
			this.wallOne = new Wall(this, 100, 100, 'wall');
			this.wallTwo = new Wall(this, 200, 200, 'wall');

			// create placeholder enemies to test collision and player interactions
			this.enemies = this.add.group();
			this.enemy1 = new Enemy(this, 300, 100, 'wall');
			this.enemy2 = new Enemy(this, 600, 300, 'wall');


			// create placeholder bullets to test out spawning multiple objects, .5 second delay
			this.playerBullets = this.add.group();
			this.fireRate = 500;
			this.nextFire = 0;

			//bullet sound config
			this.bulletSound = this.sound.add("shootSound");
			this.bulletSoundConfig = {
				mute: false,
				volume: 0.2,
			}

			//make bullets disappear if hit wall
			this.physics.add.overlap(this.playerBullets, this.walls, this.disappear, null, this);

			//collision detection with player vs wall
			this.physics.add.collider(this.player, this.wallLayer);

			//collison detection between player bullets and the layer wall
			this.physics.add.collider(this.playerBullets, this.wallLayer, this.disappear, null, this);

			//collison between player and the walls
			this.physics.add.collider(this.player, this.walls);

			// WASD controls
			this.keyboard = this.input.keyboard.addKeys("W, A, S, D");
		}

	/**The function that controls player shooting */
	playerShoot() {
		if (game.input.activePointer.isDown){
			//console.log(this.input.y + " & " + this.cameras.main.scrollY);
			if (this.time.now > this.nextFire){
				this.nextFire = this.time.now + this.fireRate;
				this.fire();
				this.bulletSound.play(this.bulletSoundConfig);
			}
    }
	}

	/**The function called per frame to update every object */
	update() {
		this.player.update();
		this.playerShoot();
		this.player.getRoom();
		//this.roomChange();
	}

	/**Creates a bullet class */
	fire(){
		var bullet = new Bullet(this, 100).setScale(.5);
	}

	/**When a bullet and a wall collides, the bullet entity will be deleted */
	disappear(bullet, wall){
		bullet.destroy();
	}


}
