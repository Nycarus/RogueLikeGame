/** @class This class represents the general bullet class
*/
class Bullet extends Phaser.GameObjects.Sprite{

  /**Constructor method
  *@constructor
  *@param {Scene} scene - The scene where the bullet is placed
  *@param {number} x - The desired x location of the bullet
  *@param {number} y - The desired y location of the bullet
  *@param {string} frame - The starting sprite frame of the bullet
	*/
  constructor(scene, x, y, frame){
    super(scene, x, y, frame);

    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
<<<<<<< Updated upstream
    scene.playerBullets.add(this);

    // Moves the bullet from the player to the mouse cursor
    scene.physics.moveTo(this, scene.input.x + scene.cameras.main.scrollX, scene.input.y + scene.cameras.main.scrollY, 200, null);
=======
>>>>>>> Stashed changes
  }
}