/** @class This class represents the character's bullets
*/
class PlayerBullet extends Bullet{

    /**Constructor method
      *@constructor
      */
    constructor(scene){
      // Sets the starting coordinates based on the player's location
      var x = scene.player.x;
      var y = scene.player.y - 16;
      super(scene, x, y, 'bullet');
      scene.playerBullets.add(this);
  
      // Moves the bullet from the player to the mouse cursor
      scene.physics.moveTo(this, scene.input.x + scene.cameras.main.scrollX, scene.input.y + scene.cameras.main.scrollY, playerSettings.bulletSpeed, null);
    }
  
  }