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
let Player = function(x, y, sprite) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-princess-girl.png';
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
  new Enemy(0,0,10),
  new Enemy(0,0,10),
  new Enemy(0,0,10)
];
console.dir(allEnemies);
// Place the player object in a variable called player
var player = new Player(0,0);
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
