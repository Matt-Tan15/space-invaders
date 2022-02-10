loadSprite('hotdog', './sprites/newCar.png')

const player = add([
  sprite("hotdog"), // sprite() component makes it render as a sprite
  pos(width() / 2, height() - 100), // pos() component gives it position, also enables movement
  rotate(0), // rotate() component gives it rotation
  origin("center"), // origin() component defines the pivot point (defaults to "topleft")
  area(),
  solid(),
]);

const SPEED = 480;

onKeyDown("left", () => {
  // .move() is provided by pos() component, move by pixels per second
  player.move(-SPEED, 0);
});

onKeyDown("right", () => {
  player.move(SPEED, 0);
});

function spawnLeftBullet(p) {
  add([
    rect(12, 48),
    area(),
    pos(p),
    origin("center"),
    color(255, 0, 0),
    outline(4),
    move(UP, BULLET_SPEED),
    cleanup(),
    // strings here means a tag
    "bullet",
  ])
};

function spawnRightBullet(p) {
  add([
    rect(12, 48),
    area(),
    pos(p),
    origin("center"),
    color(255, 255, 10),
    outline(4),
    move(UP, BULLET_SPEED),
    cleanup(),
    // strings here means a tag
    "bullet",
  ])
};

const BULLET_SPEED = 1200;

onKeyDown("space", () => {
  spawnLeftBullet(player.pos.sub(16, 0));
  spawnRightBullet(player.pos.add(16, 0));
});

onCollide("bullet", "enemy", () => {
  addKaboom(enemy.pos);
  shake(10);
})