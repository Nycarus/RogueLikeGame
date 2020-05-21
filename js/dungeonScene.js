/**
* @class This class represents the actual game screen.
*/
class DungeonScene extends Phaser.Scene {

	/**Constructor method
	*@constructor
	*/
	constructor() {
		super({key:'dungeonScene'});
	}

	/**Loads assets used for the scene
	*/
	create() {

			// create placeholder bullets to test out spawning multiple objects, .5 second delay
			this.playerBullets = this.add.group();
			this.fireRate = 500;
			this.nextFire = 0;

			this.player = new Player(this, 500, 500, 'player', 'player01.png')
			this.player.create(this);

			this.enemies = this.add.group();
			this.enemyBullets = this.add.group();
			this.dungeonGenerator = new DungeonGenerator(this);
			this.dungeonGenerator.create();

			// Music config
			this.music = this.sound.add("music");
			var musicConfig = {
				mute: false,
				volume: 0.2,
				rate: 1,
				detune: 0,
				seek: 0,
				loop: true,
				delay: 0
			}

			this.music.play(musicConfig);

			// Use the crosshair as a cursor
			this.input.setDefaultCursor('url(../images/crosshair.cur), pointer');

	    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
	    this.cameras.main.startFollow(this.player);

			//bullet sound config
			this.bulletSound = this.sound.add("shootSound");
			this.bulletSoundConfig = {
				mute: false,
				volume: 0.2,
			}

			//make player and certain ground tiles uanble to collide
			this.physics.add.collider(this.player, this.dungeonGenerator.groundLayer);

			//make player and the walls unable to collide
		  this.physics.add.collider(this.player, this.dungeonGenerator.stuffLayer);

			//when bullets hit the wall, dissappear
		  this.physics.add.collider(this.playerBullets, this.dungeonGenerator.groundLayer, this.disappear, null, this);
		  this.physics.add.collider(this.enemyBullets, this.dungeonGenerator.groundLayer, this.disappear, null, this);

			//make bullets disappear if hit an enemy
			this.physics.add.overlap(this.playerBullets, this.enemies, this.disappear, null, this);

			//make enemy bullets disappear if hit an player
			this.physics.add.overlap(this.enemyBullets, this.player, this.disappear, null, this);

			//collision detection with player vs enemy
			this.physics.add.collider(this.player, this.enemies);

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

	/**The function called per frame to update every object */
	update() {
		this.player.update();
		this.playerShoot();
		this.player.getRoom();
		this.dungeonGenerator.update();
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
