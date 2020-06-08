class LineOfSight extends Phaser.GameObjects.Line 
{
    constructor(scene, enemy, player) {
        super(scene, 0, 0, enemy.x, enemy.y, player.x, player.y, 0xff0000);
        
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        scene.physics.world.enableBody(this);
        scene.linesOfSight.add(this);

        this.player = player;
        this.enemy = enemy;
        this.sightBlocked = false;
    }

    preUpdate(time, delta) 
    {
        this.setTo(this.enemy.x, this.enemy.y, this.player.x, this.player.y);
        this.enemy.setPlayerInSight(!this.sightBlocked);
        this.sightBlocked = false;
    }

    setSightBlocked(condition)
    {
        this.sightBlocked = condition;
        console.log("intersect");
    }
}