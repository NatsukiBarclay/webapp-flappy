/**
 * Created by v3491 on 22/07/2015.
 */
// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var player;
var player1;

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var width = 790;
var height = 400;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);
var score = 0;
var labelScore;
var splashDisplay;
var pipeInterval = 1.75;


var gapMargin = 30;
var pipeEndExtraWidth = 10;
var pipeHeight = 50;
var pipeEndHeight = 50;
var blockHeight = 50;

/*
 * Loads all resources for the game and gives them names.
 */

function preload() {
    //game.add.text(280, 230, "Ribbet....Cough",
    //    {font: "30px Times New Roman", fill: "#FFFFFF"});

    game.load.image("playerImg", "../assets/raoul2.jpg");
    //game.load.audio("sound", "../assets/point.ogg");
    game.load.image("pipe", "../assets/pipe_green.png");
    game.load.image("pipeEnd", "../assets/pipe-end.png");
    game.load.image("player1Img", "../assets/ben.jpg");
}
/*/
 * Initialises the game. This function is only called once.
 */

function create() {
    game.stage.setBackgroundColor("#33ADAD");
    game.stage.startSystem(Phaser.Physics.ARCADE)
    player = game.add.sprite(50, 50, "player1Img");
    player.anchor.setTo(0, 0);
    player.checkWorldBounds = true;
    player.events.onOutOfBounds.add(gameOver);
    //player.body.velocity.x = 100;
    player.body.velocity.y = -100;
    player.body.gravity.y = 400;
    game.physics.arcade.enable(player);
}


/*
 * This function updates the scene. It is called for every new frame.
 */
function update(){
    if (player) {
        player.rotation = Math.atan(player.body.velocity.y / 800);
        game.physics.arcade.overlap(player, pipes, gameOver);
    }

    if (player1) {
        player1.rotation = Math.atan(player1.body.velocity.y / 800);
        game.physics.arcade.overlap(player1, pipes, gameOver);
    }

}

//function clickhandler(event)  {
//   alert("You are our 1 millionth viewer click ok to recieve your million dollar cash prize!");
//    game.sound.play("sound");
//}

//function spaceHandler (event) {
//    game.add.sprite( Math.floor ((Math.random() * 750) + 1), Math.floor((Math.random() * 380) + 1), "playerImg");
//}

function changeScore() {
    score = score + 1;
    labelScore.setText(score.toString());
}

//function moveRight(){
//    player.x = player.x + 15;
//}
//function moveLeft() {
//    player.x = player.x - 15;
//}
//
//function moveUp() {
//    player.y = player.y - 15;
//}
//function moveDown() {
//    player.y = player.y + 15;
//}

function generatePipe() {
    var gapSize = game.rnd.integerInRange(50, 100);
    var gapStart = game.rnd.integerInRange(gapMargin, height-gapSize-gapMargin);

    addPipeEnd(width-(pipeEndExtraWidth/2), gapStart-pipeEndHeight);
    for(var y=gapStart-pipeEndHeight; y>0 ; y-=blockHeight) {
        addPipeBlock(width,y - blockHeight);
    }

    addPipeEnd(width-(pipeEndExtraWidth/2), gapStart+gapSize+gapMargin);
    for(var y=gapStart+gapSize+pipeEndHeight; y<height; y+=blockHeight) {
        addPipeBlock(width,y);
    }

    changeScore();
}

var pipes = [];

function addPipeEnd(x, y) {
    console.log("add pipe end")
    var block = game.add.sprite(x,y, "pipeEnd");
    pipes.push(block);
    game.physics.arcade.enable(block);
    block.body.velocity.x = -200;
}

function playerJump () {
    player.body.velocity.y = -200;

}

function playerJump1()
{
    player1.body.velocity.y = -200;


}

function addPipeBlock(x, y){
    var pipeBlock = game.add.sprite(x,y,"pipe");
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -200;
    //pipeBlock.scale.setTo(0.06, 0.06);

}
//function generatePipe() {
//    var gap = game.rnd.integerInRange(1 ,5);
//    for (var count = 0; count < 8; count++) {
//        if (count != gap && count != gap+1) {
//            addPipeBlock(750, count * 50);
//        }
//    }
//    changeScore();
//}
function gameOver() {
    //score = 0
    game.state.restart();
    //game.destroy();
    $("#score").val(score.toString());
    //$("#greeting").show();
}

