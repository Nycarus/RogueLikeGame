/** @class This class represents a wall.
*/
class Wall extends Phaser.Physics.Arcade.Sprite{

  /**Constructor method
  *@constructor
  *@param {Scene} scene - The scene where the wall is placed
  *@param {number} x - The desired x location of the wall
  *@param {number} y - The desired y location of the wall
  *@param {string} frame - The starting sprite frame of the wall
  */
  constructor(scene, x, y, frame){
    super(scene, x, y, frame);
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
    scene.walls.add(this);

    // Change the size of the wall and make sure the position is static
    this.setScale(0.25);
    this.setImmovable(true);
  }

}
