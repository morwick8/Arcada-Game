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
Enemy.prototype.update = function(dt) {
    //Movement is along the value x, and every millisecond
    // (incremented with dt, it will add some value based on speed
    this.x = this.x*this.speed*dt;
};

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
    //this is a placeholder for the player update until I can figure it out
    //
    console.log('rendered player update');
};
//this is a placeholder render for player until I can figure this out
Player.prototype.render = function() {
    console.log(this.sprite);
    console.log(this.x);
    console.log(this.y);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This is a placeholder for handling input for player until I figure this computer
Player.prototype.handleInput = function(keyPress) {
  if (keyPress === 'up'){
    console.log('up pressed');
  } else if (keyPress === 'down'){
    console.log('down pressed');
  } else if (keyPress === 'left'){
    console.log('left pressed');
  } else if (keyPress === 'right'){
    console.log('right pressed');
  }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
  new Enemy(0,65,10),
  new Enemy(0,145,10),
  new Enemy(0,230,10)
];
console.dir(allEnemies);
// Place the player object in a variable called player
var player = new Player(210, 310);
console.dir(player);

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
