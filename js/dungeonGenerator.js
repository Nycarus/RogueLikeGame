class DungeonGenerator {
  constructor(scene) {
    this.scene = scene;
  }

  create(){
    this.hasPlayerReachedStairs = false
    this.dungeon = new Dungeon({
      width: 50,
      height: 50,
      doorPadding: 5,
      rooms: {
        width: { min: 10, max: 11, onlyOdd: true },
        height: { min: 10, max: 11, onlyOdd: true }
      }
    });

  // Creating a blank tilemap with dimensions matching the dungeon
  const map = this.scene.make.tilemap({
    tileWidth: 32,
    tileHeight: 32,
    width: this.dungeon.width,
    height: this.dungeon.height
  });

  const tileset = map.addTilesetImage("tiles", null, 32, 32, 0, 0);
  this.groundLayer = map.createBlankDynamicLayer("Ground", tileset).fill(TILES.BLANK);
  this.stuffLayer = map.createBlankDynamicLayer("Stuff", tileset);
  const shadowLayer = map.createBlankDynamicLayer("Shadow", tileset).fill(TILES.BLANK);

  this.tilemapVisibility = new TilemapVisibility(shadowLayer, this.scene);

  // Use the array of rooms generated to place tiles in the map
  // Note: using an arrow function here so that "this" still refers to our scene
  this.dungeon.rooms.forEach(room => {
    const { x, y, width, height, left, right, top, bottom } = room;

    // Fill the floor with mostly clean tiles, but occasionally place a dirty tile
    // See "Weighted Randomize" example for more information on how to use weightedRandomize.
    this.groundLayer.weightedRandomize(x + 1, y + 1, width - 2, height - 2, TILES.FLOOR);

    // Place the room corners tiles
    this.groundLayer.putTileAt(TILES.WALL.TOP_LEFT, left, top);
    this.groundLayer.putTileAt(TILES.WALL.TOP_RIGHT, right, top);
    this.groundLayer.putTileAt(TILES.WALL.BOTTOM_RIGHT, right, bottom);
    this.groundLayer.putTileAt(TILES.WALL.BOTTOM_LEFT, left, bottom);

    // Fill the walls with mostly clean tiles, but occasionally place a dirty tile
    this.groundLayer.weightedRandomize(left + 1, top, width - 2, 1, TILES.WALL.TOP);
    this.groundLayer.weightedRandomize(left + 1, bottom, width - 2, 1, TILES.WALL.BOTTOM);
    this.groundLayer.weightedRandomize(left, top + 1, 1, height - 2, TILES.WALL.LEFT);
    this.groundLayer.weightedRandomize(right, top + 1, 1, height - 2, TILES.WALL.RIGHT);

    // Dungeons have rooms that are connected with doors. Each door has an x & y relative to the
    // room's location
    var doors = room.getDoorLocations();
    for (var i = 0; i < doors.length; i++) {
      if (doors[i].y === 0) {
        this.groundLayer.putTilesAt(TILES.DOOR.TOP, x + doors[i].x - 1, y + doors[i].y);
      } else if (doors[i].y === room.height - 1) {
        this.groundLayer.putTilesAt(TILES.DOOR.BOTTOM, x + doors[i].x - 1, y + doors[i].y);
      } else if (doors[i].x === 0) {
        this.groundLayer.putTilesAt(TILES.DOOR.LEFT, x + doors[i].x, y + doors[i].y - 1);
      } else if (doors[i].x === room.width - 1) {
        this.groundLayer.putTilesAt(TILES.DOOR.RIGHT, x + doors[i].x, y + doors[i].y - 1);
      }
    }
  });

  // Separate out the rooms into:
  //  - The starting room (index = 0)
  //  - A random room to be designated as the end room (with stairs and nothing else)
  //  - An array of 90% of the remaining rooms, for placing random stuff (leaving 10% empty)
  const rooms = this.dungeon.rooms.slice();
  const startRoom = rooms.shift();
  const endRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
  const otherRooms = Phaser.Utils.Array.Shuffle(rooms).slice(0, rooms.length * 0.9);

  // Place the stairs
  this.stuffLayer.putTileAt(TILES.STAIRS, endRoom.centerX, endRoom.centerY);

  // Place stuff in the 90% "otherRooms"
  otherRooms.forEach(room => {
    var rand = Math.random();
    if (rand <= 0.25) {
      // 25% chance of chest
    } else if (rand <= 0.5) {
      // 50% chance of idk
      this.scene.enemy1 = new Enemy(this.scene, this.groundLayer.tileToWorldX(room.centerX), this.groundLayer.tileToWorldY(room.centerY), 'wall', room);
    } else {
      // 25% idk
    }
  });

  // Not exactly correct for the tileset since there are more possible floor tiles, but this will
  // do for the example.
  this.groundLayer.setCollisionByExclusion([1, 6, 32, 33, 34]);
  this.stuffLayer.setCollisionByExclusion([1, 6, 32, 33, 34]);

  this.stuffLayer.setTileIndexCallback(TILES.STAIRS, () => {
    this.stuffLayer.setTileIndexCallback(TILES.STAIRS, null);
    this.hasPlayerReachedStairs = true;
    this.scene.player.freeze();
    const cam = this.scene.cameras.main;
    cam.fade(250, 0, 0, 0);
    cam.once("camerafadeoutcomplete", () => {
      this.scene.music.stop();
      this.scene.scene.restart();
    });
  });

  // Place the player in the first room
  const playerRoom = startRoom;
  const x = map.tileToWorldX(playerRoom.centerX);
  const y = map.tileToWorldY(playerRoom.centerY);
  this.scene.player.setX(x);
  this.scene.player.setY(y);
  this.scene.player.setDepth(2);
}

  update(time, delta) {
    if (this.hasPlayerReachedStairs) return;

    // Find the player's room using another helper method from the dungeon that converts from
    // dungeon XY (in grid units) to the corresponding room object
    const playerTileX = this.groundLayer.worldToTileX(this.scene.player.x);
    const playerTileY = this.groundLayer.worldToTileY(this.scene.player.y);
    const playerRoom = this.dungeon.getRoomAt(playerTileX, playerTileY);

    this.tilemapVisibility.setActiveRoom(playerRoom);
  }
}
