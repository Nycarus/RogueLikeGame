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

			this.player = new Player(this, 500, 500, 'player', 'player01.png');
			this.player.create(this);

			this.enemies = this.add.group();
			this.enemyBullets = this.add.group();
			this.dungeonGenerator = new DungeonGenerator(this);
			this.dungeonGenerator.create();

			game.scene.start('playerHUD', { prevScene : this});

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
			this.camera = this.cameras.main;
			this.cameras.main.startFollow(this.player);
			this.cameras.main.stopFollow(this.player);
			//Set camera inside starting room
			//this.cameras.main.setZoom(1.7);

			//bullet sound config
			this.bulletSound = this.sound.add("shootSound");
			this.bulletSoundConfig = {
				mute: true,
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
			this.physics.add.overlap(this.enemyBullets, this.player, this.playerHit, null, this);

			//collision detection with player vs enemy
			this.physics.add.collider(this.player, this.enemies);

			// WASD controls
			this.keyboard = this.input.keyboard.addKeys("W, A, S, D");
		}

		cameraSet() {
        this.camera.setScroll(this.dungeonGenerator.playerRoom.x *32 - (config.width/2 - 5.5*32),
        this.dungeonGenerator.playerRoom.y *32 - (config.height/2 - 5.5*32));
    }

    /**This function pans the camera to the current player room if the room has changed */
    cameraPan() {
            this.player.freeze();
            this.camera.pan((this.dungeonGenerator.playerRoom.centerX)*32,(this.dungeonGenerator.playerRoom.centerY)*32, 250);
            this.camera.once("camerapancomplete", () => {
                this.player.unfreeze();
                this.roomNumberX = this.dungeonGenerator.playerRoom.x;
                this.roomNumberY = this.dungeonGenerator.playerRoom.y;
            });
    }

	/**The function called per frame to update every object */
	update() {
		this.player.update();
		this.player.getRoom();
		this.dungeonGenerator.update();
	}

	/**Creates a bullet class */
	fire(){
		var bullet = new PlayerBullet(this, this.player.getCenter().x, this.player.getCenter().y, 100).setScale(.5);
		this.bulletSound.play(this.bulletSoundConfig);
	}

	/**When a bullet and a wall collides, the bullet entity will be deleted */
	disappear(bullet, wall){
		bullet.destroy();
	}

	playerHit(bullet, player){
		player.health -= 10;
		bullet.destroy();
	}


	enemyFire(x,y)
	{
		var bullet = new EnemyBullet(this, x, y, 100).setScale(.5);
		this.bulletSound.play(this.scene.bulletSoundConfig);
	}
}
