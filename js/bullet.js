/** @class This class represents the character's bullets
*/
class Bullet extends Phaser.GameObjects.Sprite{

  /**Constructor method
	*@constructor
	*/
  constructor(scene){
    // Sets the starting coordinates based on the player's location
    var x = scene.player.x;
    var y = scene.player.y - 16;
    super(scene, x, y, 'bullet');

    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
    scene.playerBullets.add(this);

    // Moves the bullet from the player to the mouse cursor
    scene.physics.moveTo(this, scene.input.x + scene.cameras.main.scrollX, scene.input.y + scene.cameras.main.scrollY, 200, null);
  }

}
