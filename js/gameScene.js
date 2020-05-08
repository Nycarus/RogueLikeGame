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
		//Loading atlas and images used for the game
		this.load.image('gameBackground', '../images/hahaa.jpg');
		this.load.image('wall', '../images/wall.png');
		this.load.image('bullet', '../images/bullet.png');
		this.load.atlas('player', '../images/player.png', '../images/player.json');
	}

	/**Loads assets used for the scene
	*/
	create() {
			// Use the crosshair as a cursor
			this.input.setDefaultCursor('url(../images/crosshair.cur), pointer');

			// set the background image
		 	var bg = this.add.sprite(0,0,'gameBackground');
		  bg.setOrigin(0,0);

			// create player class
			this.player = new Player(this, 400, 300, 'player', 'player01.png');
			this.player.create(this);


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
	/**The function called per frame to update every object */
	update() {

		// THIS SECTION IS JUST FOR THE CONTROLS
		if(this.keyboard.D.isDown === true){
			this.player.right();
		}
		if(this.keyboard.A.isDown === true){
			this.player.left();
		}

		if(this.keyboard.A.isUp === true && this.keyboard.D.isUp === true){
			this.player.idleX();
		}

		if(this.keyboard.S.isDown === true){
			this.player.down();
		}

		if(this.keyboard.W.isDown === true){
			this.player.up();
		}

		if(this.keyboard.S.isUp === true && this.keyboard.W.isUp === true){
			this.player.idleY();
		}

		if (game.input.activePointer.isDown){
			console.log(this.input.y + " & " + this.cameras.main.scrollY);
			if (this.time.now > this.nextFire){
				this.nextFire = this.time.now + this.fireRate;
				this.fire();
			}
		}
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
