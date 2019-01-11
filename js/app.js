//Michelle Orwick's Frogger Arcade Game


//Sound files were made by Mike Koenig and are available at soundbible.com
var winSound;
winSound = new Audio("sound/Ta-Da-SoundBible.com-1884170640.mp3");
var loseSound;
loseSound = new Audio("sound/Aww-Sympathy-SoundBible.com-1207094748.mp3");

//Enemy class defined: they have variable speed, and location measured in this.x
//and this.y, and they use a sprite image.
var Enemy = function(x, y, speed = 10, sprite) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// This draws the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// This defines the Player class. It also has a sprite image,
//and location defined by this.x and this.y.
var Player = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-princess-girl.png';
};


Player.prototype.update = function(dt) {
};

//This redraws the changed location of player.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This moves player one block at a time up, down, left, or right
// with keypresses.  Player cannot move beyond the board squares
Player.prototype.handleInput = function(keyPress) {
    if (keyPress === 'up'){
        if (this.y === 70) {
            this.y = 0;
            endGame(true);
        } else {
            this.y = this.y - 80;
        };
    } else if (keyPress === 'down'){
        if (this.y === 390) {
        } else {
            this.y = this.y + 80;
        };
    } else if (keyPress === 'left'){
        if (this.x < 10) {
        } else {
            this.x = this.x - 100;
        };
    } else if (keyPress === 'right'){
        if (this.x > 380) {
        } else {
            this.x = this.x + 100;
        };
    };
};

//This sets up multiple Enemies class objects, and defines their starting
//location and speed.
var allEnemies = [
    new Enemy(0,70,100),
    new Enemy(0,150,200),
    new Enemy(0,230,120)
];

// This sets up a Player class object.
var player = new Player(200, 390);

//Enemy movement is along the value x, and every millisecond
// it will move some distance based on speed
//Enemy wraps back to the beginning after it reaches the right. On every move
//each enemy checks for collision with the player.
Enemy.prototype.update = function(dt) {
    this.x = this.x+this.speed*dt;
    if (this.x > 450) {
        this.x = 0
    };
    this.checkCollisions(player.x, player.y);
};

// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//For each enemy check position against player position ,if in range
//of the player position, set Win to false and end the game. Offset
// by the size of the bug from center so that a collision with the mouth
//or back end of the bug will trigger.
Enemy.prototype.checkCollisions = function() {
    allEnemies.forEach(function(Enemy) {
    var locationDiffX = Math.abs(player.x - Enemy.x);
        var locationDiffY = player.y - Enemy.y;
        if (locationDiffX <= 75.0 && locationDiffY === 0) {
            endGame(false);
        }
    })
};

//Reposition the player back to its starting position.
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 390;
};

//At the end of the game, if the player reaches water (or player.y = 0), it wins.
//If the player collides with an enemy, it loses.
//At a win or a loss, a modal appears with an appropriate message along with
//an appropriate sound.
function endGame(win) {
    if (endModal.open === false) {
        player.x = 200;
        player.y = 390;
        if (win === false) {
            document.getElementById('message').innerHTML = 'You were squashed like a Bug By a Bug!!';
            endModal.showModal();
            loseSound.play();
        } else {
            document.getElementById('message').innerHTML = 'Clearly you are smarter than a Bug!!';
            winSound.play();
            endModal.showModal();
        };
    };
};

//if a reset button were to be added, this would close the modal
function newGame () {
    endModal.close;
};
