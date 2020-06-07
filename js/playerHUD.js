class PlayerHUD extends Phaser.Scene {

	/**Constructor method
	*@constructor
	*/
	constructor() {
		super({key:'playerHUD'});
    }

    create() {
        this.dungeonScene = this.scene.get('dungeonScene');
        console.log(this.dungeonScene.dungeonGenerator.dungeon.rooms);
        
        this.dungeonScene.dungeonGenerator.dungeon.rooms.forEach(room => {
            this.add.sprite(room.x * 3 + config.width/8 * 6, room.y * 3, 'room10').setOrigin(0,0);
        });    
    }

    playerLocation() {
        let graphics = this.add.graphics();
        
    }


    update() {
    }
}