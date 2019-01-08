// Enemies our player must avoid
var Enemy = function(x, y, speed = 10, sprite) {
    //Enemies need variable speed, and location measured in this.x
    //and this.y.
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, sprite) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-princess-girl.png';
};

Player.prototype.update = function(dt) {
    var playerNowX = this.x;
    var playerNowY = this.y
};
//this is a placeholder render for player until I can figure this out
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This moves player one block at a time up, down, left, or right
// with keypresses.  Player cannot move beyond the board squares
Player.prototype.handleInput = function(keyPress) {
  if (keyPress === 'up'){
    this.y = this.y - 80;
    if (this.y < 0) {
      console.log("display you win modal");
      console.log('trigger end game');
    };
  } else if (keyPress === 'down'){
    if (this.y > 380) {
    console.log('ignore down press');
    } else {
      this.y = this.y + 80;
    };
  } else if (keyPress === 'left'){
    if (this.x < 10) {
    console.log('ignore left press');
    } else {
      this.x = this.x - 100;
    };
  } else if (keyPress === 'right'){
    if (this.x > 380) {
    console.log('ignore right press');
    } else {
      this.x = this.x + 100;
    };
  };
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
  new Enemy(0,70,75),
  new Enemy(0,150,200),
  new Enemy(0,230,120)
];
// Place the player object in a variable called player
var player = new Player(200, 390);

Enemy.prototype.update = function(dt) {
    //Movement is along the value x, and every millisecond
    // it will move some distance based on speed
    //Enemy needs to wrap back to the beginning after it reaches the right
    this.x = this.x+this.speed*dt;
    if (this.x > 450) {
      this.x = 0
    };
    this.checkCollisions(player.x, player.y);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

Enemy.prototype.checkCollisions = function() {
  //for each enemy check position against player position ,if in range
  //set Win to false and end the game
  //  console.log(this.y);
  //  console.log(playerNowY);
    allEnemies.forEach(function(Enemy) {
  //    console.log(player.x);
  //    console.log(Enemy.x);
      var locationDiffX = Math.abs(player.x - Enemy.x);
      var locationDiffY = player.y - Enemy.y;
//      console.log(locationDiffX);
      if (locationDiffX <= 2.0 && locationDiffY === 0) {
        console.log('end game');
        endGame(false);
      }

    })
};

function endGame(win) {
  if (win === false) {
      console.log('you lose');
//    modal says you lose
//    player(200, 390);
  }
};
