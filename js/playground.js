function createPlayground() {
    myGameArea.start();
    fico = new createPlayer("./sources/players/fico.png", 10, 10);
}

function createPlayer(img_src, posX, posY) {
    var player = document.createElement('img');
    player.style.position = 'absolute';
    player.style.top = posX + 'px';
    player.style.left = posY + 'px';
    player.style.width = '10%'
    player.style.height = '10%';
    player.src = img_src;
    document.body.appendChild(player);

    this.posX = posX;
    this.posY = posY;

    this.move = function(xMove, yMove) {
        this.posX += xMove;
        this.posY += yMove;
        player.style.top = this.posX + 'px'; 
        player.style.left = this.posY + 'px'; 
    }
}

function updateGameArea() {
    x = 0;
    y = 0;
    if (myGameArea.key && myGameArea.key == 38) {x = -3; }
    if (myGameArea.key && myGameArea.key == 40) {x = 3; }
    if (myGameArea.key && myGameArea.key == 37) {y = -3; }
    if (myGameArea.key && myGameArea.key == 39) {y = 3; }
    fico.move(x, y);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        var pressed = false;
        /*this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);*/
        this.interval = setInterval(updateGameArea, 10);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            //if(e.keyCode == myGameArea.key) {
                myGameArea.key = false;   
            //}
        })
    }, 
    clear : function(){
        //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
