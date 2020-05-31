class HudScene extends Phaser.Scene {

	/**Constructor method
	*@constructor
	*/
	constructor() {
		super({key:'hud'});
    }

    create() {
        var text = this.add.text(0,0, 'Doing your mom doing doing your mom');
        var room = this.add.sprite(config.width/8 * 7, config.height/6 * 1, 'room10');
        room.setOrigin(0,0);

        
    }

    update() {

    }
}