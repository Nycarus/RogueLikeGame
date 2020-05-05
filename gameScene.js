var player;
var pointer;


class GameScene extends Phaser.Scene {


	constructor() {
		super({key:'gameScene'});
	}

	preload() {
		this.load.image('gameBackground', 'images/hahaa.jpg');
		//this.load.spritesheet('boy', 'images/woof.png', { frameWidth: 32, frameHeight: 32 });
		this.load.atlas('player', 'images/player.png', 'images/player.json');
		//Moving animations for the player
	}

	create() {
			// new cursor
			this.input.setDefaultCursor('url(/images/crosshair.cur), pointer');



			// background shit
		 	var bg = this.add.sprite(0,0,'gameBackground');
		  bg.setOrigin(0,0);

			player = this.physics.add.sprite(100, 100, 'player', 'player01.png');


			// controls
			this.keyboard = this.input.keyboard.addKeys("W, A, S, D");

			// draw line between cursor and player, THIS SHIT I NEED HELP WITH
			//pointer = this.input.activePointer;
			//this.input.on("pointermove", () => this.add.line(0,0,pointer.x,pointer.y,player.x,player.y, 0xff0000));
			this.anims.create({
				key: "left",
				frameRate: 5,
				frames: this.anims.generateFrameNames('player', {
					prefix: 'player',
					suffix: '.png',
					start: 3,
					end: 5,
					zeroPad: 2
				})
			});

			this.anims.create({
				key: "right",
				frameRate: 5,
				frames: this.anims.generateFrameNames('player', {
					prefix: 'player',
					suffix: '.png',
					start: 6,
					end: 8,
					zeroPad: 2
				})
			});

			this.anims.create({
				key: "up",
				frameRate: 5,
				frames: this.anims.generateFrameNames('player', {
					prefix: 'player',
					suffix: '.png',
					start: 9,
					end: 11,
					zeroPad: 3
				})
			});

			this.anims.create({
				key: "down",
				frameRate: 5,
				frames: this.anims.generateFrameNames('player', {
					prefix: 'player',
					suffix: '.png',
					start: 0,
					end: 2,
					zeroPad: 2
				})
			});

			this.anims.create({
				key: "idle",
				frameRate: 5,
				frames: this.anims.generateFrameNames('player', {
					prefix: 'player',
					suffix: '.png',
					start: 1,
					end: 1,
					zeroPad: 2
				})
			});

	}
	update() {

		if(this.keyboard.D.isDown === true){
			player.setVelocityX(80);
			player.play("right", true);
		}
		if(this.keyboard.A.isDown === true){
			player.setVelocityX(-80);
			player.play("left", true);
		}

		if(this.keyboard.A.isUp === true && this.keyboard.D.isUp === true){
			player.setVelocityX(0);
		}

		if(this.keyboard.S.isDown === true){
			player.setVelocityY(80);
			player.play("down", true);
		}
		if(this.keyboard.W.isDown === true){
			player.setVelocityY(-80);
			player.play("up", true);
		}

		if(this.keyboard.S.isUp === true && this.keyboard.W.isUp === true){
			player.setVelocityY(0);
		}
	}

}
