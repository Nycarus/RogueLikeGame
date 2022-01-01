/** @class This class represents the character's bullets
*/
class EnemyBullet extends Bullet{

    /**Constructor method
      *@constructor
      */
    constructor(scene,x,y){
      // Sets the starting coordinates based on the enemy's location
      super(scene, x, y, 'bullet');
      scene.enemyBullets.add(this);
  
      // Moves the bullet from the player to the mouse cursor
      scene.physics.moveTo(this, scene.player.x, scene.player.y, playerSettings.bulletSpeed, null);
    }
  }