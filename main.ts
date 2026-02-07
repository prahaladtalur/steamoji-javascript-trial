import kaboom from "kaboom"
import "kaboom/global"

const FLOOR_HEIGHT = 100;
const JUMP_FORCE = 800;
const SPEED = 670;

// initialize context
kaboom();
kaboom({ background: [0, 255, 255] })

// load assets
loadSprite("SpriteOji", "sprites/SpriteOji.png/Steamoji-Code-TrialREMIX-THIS-FOR-TRIALS-DO-NOT-DELETE/SpriteOji.png")

scene("game", () => {

  // define gravity
  setGravity(1800);

  // add a game object to screen

  // list of components

  // list of components


  // floor
  add([
    rect(width(), FLOOR_HEIGHT),
    outline(4),
    pos(0, height()),
    anchor("botleft"),
    area(),
    body({ isStatic: true }),
    color(127, 200, 255),
  ]);

  function jump() {
    if (player.isGrounded())
      player.jump(JUMP_FORCE);

  }

  // jump when user press space


  // jump when user clicks


  function spawnTree() {

    // add tree obj
    add([
      rect(48, rand(100, 130)),
      area(),
      outline(4),
      pos(width(), height() - FLOOR_HEIGHT),
      anchor("botleft"),
      color(204, 108, 231),
      move(LEFT, SPEED),
      "tree",
    ]);

    // wait a random amount of time to spawn next tree

  }

  // start spawning trees
  spawnTree();

  // lose if player collides with any game obj with tag "tree"
  player.onCollide("tree", () => {
    // go to "lose" scene and pass the score
    go("lose", score);
    addKaboom(player.pos);
  });

  // keep track of score
  let score = 0;

  const scoreLabel = add([
    text(score),
    color(0, 0, 0),
    pos(24, 24),
  ]);

  // increment score every frame
  onUpdate(() => {
    score++;
    scoreLabel.text = score;
  });

});

scene("lose", (score) => {

  add([
    sprite("SpriteOji"),
    pos(width() / 2, height() / 2 - 80),
    scale(0.2),
    anchor("center"),
  ]);

  // display score
  add([
    text(score),
    pos(width() / 2, height() / 2 + 80),
    scale(2),
    color(0, 0, 0),
    anchor("center"),
  ]);

  // go back to game with space is pressed
  onKeyPress("space", () => go("game"));
  onClick(() => go("game"));

});

go("game");