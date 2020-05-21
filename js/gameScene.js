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

	/**Loads assets used for the scene
	*/
	create() {
		// Create tileset and tilemap
		this.map = this.make.tilemap({key: "room1"});
		this.tileset = this.map.addTilesetImage('mc_tileset','mc_tiles');
		this.floorLayer = this.map.createStaticLayer("Background", this.tileset, 0, 0);
		this.wallLayer = this.map.createStaticLayer("Walls", this.tileset, 0, 0);
		this.wallLayer.setCollisionByProperty({collides: true});

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

		this.player = new Player(this, 500, 500, 'player', 'player01.png')
		this.player.create(this);

		// Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
		this.cameras.main.startFollow(this.player);

		//collision detection with player vs wall
		this.physics.add.collider(this.player, this.wallLayer);

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

		this.enemyBullets = this.add.group();

		//bullet sound config
		this.bulletSound = this.sound.add("shootSound");
		this.bulletSoundConfig = {
			mute: false,
			volume: 0.2,
		}

		//make bullets disappear if hit wall
		this.physics.add.overlap(this.playerBullets, this.walls, this.disappear, null, this);

		//make bullets disappear if hit an enemy
		this.physics.add.overlap(this.playerBullets, this.enemies, this.disappear, null, this);

		//make enemy bullets disappear if hit wall
		this.physics.add.overlap(this.enemyBullets, this.walls, this.disappear, null, this);

		//make enemy bullets disappear if hit an player
		this.physics.add.overlap(this.enemyBullets, this.player, this.disappear, null, this);

		//collision detection with player vs wall
		this.physics.add.collider(this.player, this.wallLayer);

		//collision detection with enemy vs wall
		this.physics.add.collider(this.enemies, this.wallLayer);

		//collision detection with player vs enemy
		this.physics.add.collider(this.player, this.enemies);

		//collison detection between player bullets and the layer wall
		this.physics.add.collider(this.playerBullets, this.wallLayer, this.disappear, null, this);

		//collison detection between enemy bullets and the layer wall
		this.physics.add.collider(this.enemyBullets, this.wallLayer, this.disappear, null, this);

		//collison between player and the walls
		this.physics.add.collider(this.player, this.walls);

		//collision detection with enemy vs wall
		this.physics.add.collider(this.enemies, this.walls);

		// WASD controls
		this.keyboard = this.input.keyboard.addKeys("W, A, S, D");
	}

	/**The function that controls player shooting */
	playerShoot() {
		if (game.input.activePointer.isDown){
			if (this.time.now > this.nextFire){
				this.nextFire = this.time.now + this.fireRate;
				this.fire();
				this.bulletSound.play(this.bulletSoundConfig);
			}
		}
	}
	/** The function that changes the player from previous room to current room */
	roomChange() {
		if (this.player.roomChange) {
			this.cameras.main.setBounds(this.rooms[this.player.currentRoom].x,
										this.rooms[this.player.currentRoom].y,
										this.rooms[this.player.currentRoom].width,
										this.rooms[this.player.currentRoom].height,
										true);
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
		var bullet = new PlayerBullet(this, 100).setScale(.5);
		this.bulletSound.play(this.bulletSoundConfig);
	}

	/**When a bullet and a wall collides, the bullet entity will be deleted */
	disappear(bullet, wall){
		bullet.destroy();
	}
	

	enemyFire(x,y)
	{
		var bullet = new EnemyBullet(this, x, y, 100).setScale(.5);
		this.bulletSound.play(this.scene.bulletSoundConfig);
	}
}
