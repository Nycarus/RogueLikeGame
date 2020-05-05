var player;
var pointer;


class GameScene extends Phaser.Scene {


	constructor() {
		super({key:'gameScene'});
	}

	preload() {
		//Loading atlas and images used for the game
		this.load.image('gameBackground', 'images/hahaa.jpg');
		this.load.atlas('player', 'images/player.png', 'images/player.json');
	}

	create() {
			// Use the crosshair as a cursor
			this.input.setDefaultCursor('url(/images/crosshair.cur), pointer');

			// set the background image
		 	var bg = this.add.sprite(0,0,'gameBackground');
		  bg.setOrigin(0,0);

			// create player class
			player = new Player(this, 100, 100, 'player', 'player01.png');
			player.create(this);


			// WASD controls
			this.keyboard = this.input.keyboard.addKeys("W, A, S, D");

			// draw line between cursor and player, THIS SHIT I NEED HELP WITH
			//pointer = this.input.activePointer;
			//this.input.on("pointermove", () => this.add.line(0,0,pointer.x,pointer.y,player.x,player.y, 0xff0000));
	}
	update() {

		// THIS SECTION IS JUST FOR THE CONTROLS
		if(this.keyboard.D.isDown === true){
			player.right();
		}
		if(this.keyboard.A.isDown === true){
			player.left();
		}

		if(this.keyboard.A.isUp === true && this.keyboard.D.isUp === true){
			player.idleX();
		}

		if(this.keyboard.S.isDown === true){
			player.down();
		}
		if(this.keyboard.W.isDown === true){
			player.up();
		}

		if(this.keyboard.S.isUp === true && this.keyboard.W.isUp === true){
			player.idleY();
		}

	}

}
