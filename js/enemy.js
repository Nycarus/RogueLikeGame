/** @class This class represents an Enemy.
*/
class Enemy extends Phaser.Physics.Arcade.Sprite{

  /**Constructor method
  *@constructor
  *@param {Scene} scene - The scene where the enemy is placed
  *@param {number} x - The desired x location of the enemy
  *@param {number} y - The desired y location of the enemy
  *@param {string} frame - The starting sprite frame of the enemy
  */
  constructor(scene, x, y, frame){
    super(scene, x, y, frame);
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
    scene.enemies.add(this);

    this.setScale(0.25);
    this.setImmovable(true);
    this.scene = scene;

    this.fireRate = 1500;
    this.nextFire = 0;
    this.playerInSight = true;
    this.scene.addLineOfSight(this, scene.player);
  }

  preUpdate(time,delta)
  {
    if (this.scene.time.now > this.nextFire && this.playerInSight){
      this.nextFire = this.scene.time.now + this.fireRate;
      this.scene.enemyFire(this.x, this.y);
    }
  }

  setPlayerInSight(condition)
  {
    this.playerInSight = condition;
  }
}