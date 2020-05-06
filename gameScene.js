class GameScene extends Phaser.Scene {

	constructor() {
		super({key:'gameScene'});
	}

	preload() {
		//Loading atlas and images used for the game
		this.load.image('gameBackground', 'images/hahaa.jpg');
		this.load.image('wall', 'images/wall.png');
		this.load.image('bullet', 'images/bullet.png');
		this.load.atlas('player', 'images/player.png', 'images/player.json');
	}

	create() {
			// Use the crosshair as a cursor
			this.input.setDefaultCursor('url(/images/crosshair.cur), pointer');

			// set the background image
		 	var bg = this.add.sprite(0,0,'gameBackground');
		  bg.setOrigin(0,0);

			// create player class
			this.player = new Player(this, 400, 300, 'player', 'player01.png');
			this.player.create(this);


			// create placeholder walls to test collison out
			this.wallOne = this.physics.add.sprite(100, 100, 'wall').setScale(.25);
			this.wallTwo = this.physics.add.sprite(200, 200, 'wall').setScale(.25);
			this.walls = this.add.group();

			this.walls.add(this.wallOne);
			this.walls.add(this.wallTwo);

			//walls.setAll('body.immovable', true);
			//Looking for a way to make this more efficient

			for (var i = 0; i < this.walls.getChildren().length; i++) {
	      var wall = this.walls.getChildren()[i];
	      wall.setImmovable(true);
	    }


			// create placeholder bullets to test out spawning multiple objects, .5 second delay
			this.playerBullets = this.add.group();
			this.fireRate = 500;
			this.nextFire = 0;

			//make bullets disappear if hit wall
			this.physics.add.overlap(this.playerBullets, this.walls, this.disappear, null, this);

			//collison between player and the walls
			this.physics.add.collider(this.player, this.walls);

			// WASD controls
			this.keyboard = this.input.keyboard.addKeys("W, A, S, D");

	}
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

	fire(){
		var bullet = new Bullet(this, 100).setScale(.5);
	}

	disappear(bullet, wall){
		bullet.destroy();
	}

}
