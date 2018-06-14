var bombs = [];
var idBombCounter = 0;
var timeClock = 20;

function removeFlames(_flames, _myInterval) {
    for(var k = 0; k < _flames.length; k++) {
        _flames[k].parentNode.removeChild(_flames[k]);
    }
    clearInterval(_myInterval);
}

function expandFlame(posX, posY, _power, _bomb) {
    var flames = [_power*4 + 1];
    flames[0] = _bomb;
	for(var i = 0; i < _power; i++) {
        createPlane(posX, posY, i, flames);
    }
    var myInterval = setInterval(removeFlames, 500, flames, myInterval);
}

function createPlane(posX, posY, _power, _flames) {
    var power = _power * 0.06;
	var moves = [[(posX - (window.screen.height * (0.03))), (posY - (window.screen.width * (0.09 + power)))],
				[(posX - (window.screen.height * (0.09 + power))), (posY - (window.screen.width * (0.03)))],
				[(posX + (window.screen.height * (0.03 + power))), (posY - (window.screen.width * (0.03)))],
                [(posX - (window.screen.height * (0.03))), (posY + (window.screen.width * (0.03 + power)))]];
	for(var j = 0; j < 4; j++) {
		var flame = document.createElement('img');
		flame.style.position = 'fixed';
		flame.src = "./sources/elements/explosion.png";
		flame.style.width = '6%'
		flame.style.height = '6%';
		var rect = flame.getBoundingClientRect();
		flame.style.top = moves[j][0] + 'px';
		flame.style.left = moves[j][1] + 'px';
        document.body.appendChild(flame);
        _flames[j + 4*_power + 1] = flame;
	}
}

function createPlayground() {
    myGameArea.start();
    fico = new createPlayer("./sources/players/fico.png", 10, 10);
}

function createBomb(posX, posY) {
    var counter = 3500; // 5s - time to bomb explosion
    var bomb = document.createElement('img');
    bomb.id = 'bomb' + (++idBombCounter);
    bomb.style.position = 'fixed';
    bomb.src = "./sources/elements/bomb.png";
    bomb.style.width = '6%'
    bomb.style.height = '6%';
    var rect = bomb.getBoundingClientRect();
    bomb.style.top = (posX - window.screen.height * 0.03) + 'px';
    bomb.style.left = (posY - window.screen.width * 0.03) + 'px';
    document.body.appendChild(bomb);

    var bomb_array = [bomb.id, counter];
	bombs.push(bomb_array);
}

function createPlayer(img_src, posX, posY) {
    var player = document.createElement('img');
    player.style.position = 'absolute';
    player.src = img_src;
    player.style.top = posX + 'px';
    player.style.left = posY + 'px';
    player.style.width = '10%'
    player.style.height = '10%';
    document.body.appendChild(player);

    var _posX = posX;
    var _posY = posY;

    this.move = function(xMove, yMove) {
        _posX += xMove;
        _posY += yMove;
        player.style.top = _posX + 'px'; 
        player.style.left = _posY + 'px'; 
    }

    this.launch = function() {
        var rect = player.getBoundingClientRect();
        var cy = rect.left + rect.width * 0.5;    // find center of first image
        var cx = rect.top + rect.height * 0.5;
        new createBomb(cx, cy);
    }
}

function updateGameArea() {
    if (myGameArea.launchKeyActive) {
		myGameArea.launchKeyActive = false;
        fico.launch();
    }

    x = 0;
    y = 0;
    if (myGameArea.key && myGameArea.key == 38) {x = -3; }
    else if (myGameArea.key && myGameArea.key == 40) {x = 3; }
    else if (myGameArea.key && myGameArea.key == 37) {y = -3; }
    else if (myGameArea.key && myGameArea.key == 39) {y = 3; }

    fico.move(x, y);

    for(var i = 0; i < bombs.length; i++) {
		bombs[i][1] -= timeClock;
		if(bombs[i][1] == 500) {
			var bomb = document.getElementById(bombs[i][0]);
            bomb.src = "./sources/elements/explosion.png";
            var _rect = bomb.getBoundingClientRect();
            var _cy = _rect.left + _rect.width * 0.5;    // find center of first image
            var _cx = _rect.top + _rect.height * 0.5;
            expandFlame(_cx, _cy, 3, bomb);
		}
		else if(bombs[i][1] <= 0) {
            bombs.shift();
            i--;
		}
	}
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        var pressed = false;
        this.interval = setInterval(updateGameArea, timeClock);
        window.addEventListener('keydown', function (e) {
            if(e.keyCode != 32) {
                myGameArea.key = e.keyCode;   
            }
        })
        window.addEventListener('keyup', function (e) {
            if(e.keyCode == myGameArea.key) {
                myGameArea.key = false;
            }
        })
        window.addEventListener('keypress', function (e) {
            if(e.keyCode == 32) {
                myGameArea.launchKeyActive = true;   
            }
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}