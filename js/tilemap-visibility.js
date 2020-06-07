/**
 * A small helper class that can take control of our shadow tilemap layer. It keeps track of which
 * room is currently active.
 */
class TilemapVisibility {
  constructor(shadowLayer, scene) {
    this.shadowLayer = shadowLayer;
    this.activeRoom = null;
    this.scene = scene;
  }

  setActiveRoom(room) {
    // We only need to update the tiles if the active room has changed
    if (room !== this.activeRoom) {
      this.setRoomAlpha(room, 0); // Make the new room visible
      if (this.activeRoom) {
        this.setRoomAlpha(this.activeRoom, 0.5);
        this.deactivate();
      }
      this.activeRoom = room;
      this.scene.cameraPan();
    }
    this.activate();
    this.toGrid(this.activeRoom);
  }

  // Helper to set the alpha on all tiles within a room
  setRoomAlpha(room, alpha) {
    this.shadowLayer.forEachTile(
      t => (t.alpha = alpha),
      this,
      room.x,
      room.y,
      room.width,
      room.height
    );
  }

  // Only update the enemies in the active room
  activate(){
    var eachEnemy = this.activeRoom.enemies;
    for (var i = 0; i < eachEnemy.length; i++) {
      eachEnemy[i].visible = true;
      eachEnemy[i].update();
    }
  }

  deactivate(){
    var eachEnemy = this.activeRoom.enemies;
    for (var i = 0; i < eachEnemy.length; i++) {
      eachEnemy[i].visible = false;
    }
  }

  create2DArray(width, height, value){
    return [...Array(height)].map(() => Array(width).fill(value));
  }

  toGrid(room){
    var c = Object.assign({}, {
        empty: " ",
        emptyColor: "rgb(0, 0, 0)",
        wall: "#",
        wallColor: "rgb(255, 0, 0)",
        floor: "_",
        floorColor: "rgb(210, 210, 210)",
        door: ".",
        doorColor: "rgb(0, 0, 255)",
        fontSize: "15px",
        player: "P",
        enemy: "E"
    });

    var string = "";
    var styles = [];
    var graph = this.create2DArray(room.width, room.height, null);
    const playerCoordinateX = ((this.scene.dungeonGenerator.groundLayer.worldToTileX(this.scene.player.x) + 2) % 11);
    const playerCoordinateY = ((this.scene.dungeonGenerator.groundLayer.worldToTileY(this.scene.player.y) + 2) % 11);
    var checkedPlayer = false;
    styles.push(`font-size: ${c.fontSize}`);

    for (let y = 0; y < room.height; y += 1) {
      for (let x = 0; x < room.width; x += 1) {
        const tile = room.tiles[y][x];
        var checkedEnemy = false;
        if (!checkedPlayer){
          if (x == playerCoordinateX && y == playerCoordinateY){
            graph[y][x] = c.player;
            string += `%c${c.player}`;
            styles.push(`color: ${c.emptyColor}; font-size: ${c.fontSize}`);
            string += " ";
            checkedPlayer = true;
            continue;
          }
        }

        var eachEnemy = room.enemies;
        for (var i = 0; i < eachEnemy.length; i++) {
          const enemyX = ((this.scene.dungeonGenerator.groundLayer.worldToTileX(eachEnemy[i].x) + 2) % 11);
          const enemyY = ((this.scene.dungeonGenerator.groundLayer.worldToTileX(eachEnemy[i].y) + 2) % 11);
          if (x == enemyX && y == enemyY){
              graph[y][x] = c.enemy;
              string += `%c${c.enemy}`;
              styles.push(`color: ${c.emptyColor}; font-size: ${c.fontSize}`);
              string += " ";
              checkedEnemy = true;
              break;
          }
        }

        if (checkedEnemy){
          continue;
        }


        if (tile === 0) {
          graph[y][x] = c.empty;
          string += `%c${c.empty}`;
          styles.push(`color: ${c.emptyColor}; font-size: ${c.fontSize}`);
        } else if (tile === 1) {
          graph[y][x] = c.wall;
          string += `%c${c.wall}`;
          styles.push(`color: ${c.emptyColor}; font-size: ${c.fontSize}`);
        } else if (tile === 2) {
          graph[y][x] = c.floor;
          string += `%c${c.floor}`;
          styles.push(`color: ${c.emptyColor}; font-size: ${c.fontSize}`);
        } else if (tile === 3) {
          graph[y][x] = c.door;
          string += `%c${c.door}`;
          styles.push(`color: ${c.emptyColor}; font-size: ${c.fontSize}`);
        }
        string += " ";
      }
      string += "\n";
    }

    //console.log(string, ...styles);
  }

  update(){
    this.deActivate();
  }
}
