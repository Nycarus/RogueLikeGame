var player;
var pointer;


class GameScene extends Phaser.Scene {


	constructor() {
		super({key:'gameScene'});
	}

	preload() {
		this.load.image('gameBackground', 'images/hahaa.jpg');
		this.load.spritesheet('boy', 'images/woof.png', { frameWidth: 32, frameHeight: 32 });
	}

	create() {
			// new cursor
			this.input.setDefaultCursor('url(/images/crosshair.cur), pointer');



			// background shit
		 	var bg = this.add.sprite(0,0,'gameBackground');
		  bg.setOrigin(0,0);

			player = this.physics.add.sprite(100, 100, 'boy');


			// controls
			this.keyboard = this.input.keyboard.addKeys("W, A, S, D");

			// draw line between cursor and player, THIS SHIT I NEED HELP WITH
			pointer = this.input.activePointer;

			this.input.on("pointermove", () => this.add.line(0,0,pointer.x,pointer.y,player.x,player.y, 0xff0000));
	}
	update() {

		if(this.keyboard.D.isDown === true){
			player.setVelocityX(80);
		}
		if(this.keyboard.A.isDown === true){
			player.setVelocityX(-80);
		}

		if(this.keyboard.A.isUp === true && this.keyboard.D.isUp === true){
			player.setVelocityX(0);
		}

		if(this.keyboard.S.isDown === true){
			player.setVelocityY(80);
		}
		if(this.keyboard.W.isDown === true){
			player.setVelocityY(-80);
		}

		if(this.keyboard.S.isUp === true && this.keyboard.W.isUp === true){
			player.setVelocityY(0);
		}
	}

}
