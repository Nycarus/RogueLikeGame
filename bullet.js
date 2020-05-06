class Bullet extends Phaser.GameObjects.Sprite{
  constructor(scene){
    var x = scene.player.x;
    var y = scene.player.y - 16;
    super(scene, x, y, 'bullet');

    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
    scene.playerBullets.add(this);
    scene.physics.moveTo(this, scene.input.x + scene.cameras.main.scrollX, scene.input.y + scene.cameras.main.scrollY, 200, null);
  }

}
