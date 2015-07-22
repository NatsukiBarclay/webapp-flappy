// the Game object used by the phaser.io library


$.get("/score", function (scores) {
    console.log(scores)
    scores.sort(function (scoreA, scoreB) {
        var difference = scoreB.score - scoreA.score;
        return difference;
    });
    for (var i = 0; i < 5; i++) {
        if (i <= scores.length) {
            $("#scoreBoard").append(
                "<li>" +
                scores[i].name + ": " + scores[i].score +
                "</li>");
        }

    }
});


var deathPlayer1 = false;
var deathPlayer2 = false;
var stateActions = {preload: preload, create: create, update: update};
var player;
var player2;

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var width = 790;
var height = 400;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'info', stateActions);
game.started = false;
var score = 0;
var score1 = 0;
var labelScore;
var labelScore1;
var splashDisplay;

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
    game.load.image("popup", "../assets/popup.jpg");
    game.load.image("popup", "../assets/popup.jpg");
    game.load.image("popup2", "../assets/popup2.jpg");

}
/*/
 * Initialises the game. This function is only called once.
 */
jQuery("#greeting-form").on("submit", function (event_details) {
        var greeting = "Hello ";
        var name = jQuery("#fullName").val();
        var greeting_message = greeting + name;
        jQuery("#reading-form").hide();
        jQuery("#greeting").append("<p>" + greeting_message + "</p>");
        //event_details.preventDefault();
    }
);
function create() {

    //game.add.sprite(250,250, "playerImg");

}


function start() {

    game.started = true;
    game.stage.setBackgroundColor("#33ADAD");
    game.physics.startSystem(Phaser.Physics.ARCADE);
    splashDisplay = game.add.text(100, 200, "press SPACEBAR to start, SPACEBAR to jump");


    player = game.add.sprite(100, 200, "playerImg");
    player.anchor.setTo(0, 0);
    player.scale.setTo(0.5, 0.4 );
    game.physics.arcade.enable(player);
    player.body.velocity.y = -100;
    player.body.gravity.y = 400;
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);


    player2 = game.add.sprite(100, 200, "player1Img");
    player2.anchor.setTo(0, 0);
    player2.scale.setTo(0.25, 0.25);
    game.physics.arcade.enable(player2);
    player2.body.velocity.y = -100;
    player2.body.gravity.y = 400;
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(playerJump1);


    //var canvas = jQuery("canvas").get(0);

    //canvas.width = 3000;

    //console.log();


    //game.add.sprite(10, 10, "playerImg1");
    //game.add.sprite(730, 10, "playerImg");
    //game.add.sprite(730, 340, "playerImg");
    //game.add.sprite(10, 345, "playerImg1");

    //var score = 0;
    // alert(score);
    var greeting = game.add.text(200, 130, "Keep on Frogging",
        {font: "50px Times New Roman", fill: "#FFFFFF"});


    splashDisplay.destroy();

    setTimeout(function () {
        greeting.destroy();
    }, 2000);


    labelScore = game.add.text(25, 10, "0");
    labelScore1 = game.add.text(760, 10, "0");


    //generatePipe();


    var pipeInterval = 1.75;
    game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, generatePipe);
    game.time.events.loop(Phaser.Timer.SECOND, changeScore);
    game.time.events.loop(Phaser.Timer.SECOND, changeScore1);

}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {


    if (!game.started) return;

    player.rotation = Math.atan(player.body.velocity.y / 800);
    game.physics.arcade.overlap(player, pipes, gameOver1);
    //player.checkWorldBounds = true;
   // player.events.onOutOfBounds.add(gameOver1);
   // deathPlayer1 = player.events.onOutOfBounds;


    player2.rotation = Math.atan(player2.body.velocity.y / 800);
    game.physics.arcade.overlap(player2, pipes, gameOver2);
    //player2.checkWorldBounds = true;
    //player2.events.onOutOfBounds.add(gameOver2);
    //deathPlayer2 = player2.events.onOutOfBounds;
    //deathPlayer2 = player2.events.onOutOfBounds;


    if (deathPlayer1 == true && deathPlayer2 == true) {
        game.destroy();
    }

    if (player.y > 400 || player.y < 0)
    {
       // console.log("out of bounds")
        gameOver1();
    }
    if (player2.y > 400 || player2.y < 0)
    {
       // console.log("out of bounds");
        gameOver2();
    }



}

//function clickhandler(event)  {
//alert("You are our 1 millionth viewer click ok to recieve your million dollar cash prize!");
  //  game.sound.play("sound");
//}
function spaceHandler(event) {
    //game.add.sprite( Math.floor ((Math.random() * 750) + 1), Math.floor((Math.random() * 380) + 1), "playerImg");
    //game.add.sprite( Math.floor ((Math.random() * 750) + 1), Math.floor((Math.random() * 380) + 1), "player1Img");
}


function changeScore() {

    if (!deathPlayer1) {
        score = score + 1;
        labelScore.setText(score.toString());
    }


  }

function changeScore1() {
    if (!deathPlayer2) {
        score1 = score1 + 1;
        labelScore1.setText(score1.toString());
    }

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
    var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);

    addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart - pipeEndHeight);
    for (var y = gapStart - pipeEndHeight; y > 0; y -= blockHeight) {
        addPipeBlock(width, y - blockHeight);
    }

    addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart + gapSize + gapMargin);
    for (var y = gapStart + gapSize + pipeEndHeight; y < height; y += blockHeight) {
        addPipeBlock(width, y);
    }


}

var pipes = [];

function addPipeEnd(x, y) {
    console.log("add pipe end");
    var block = game.add.sprite(x, y, "pipeEnd");
    pipes.push(block);
    game.physics.arcade.enable(block);
    block.body.velocity.x = -200;
}

function playerJump() {
    player.body.velocity.y = -200;

}


function playerJump1() {
    player2.body.velocity.y = -200;

}


function addPipeBlock(x, y) {
    var pipeBlock = game.add.sprite(x, y, "pipe");
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -200;
    //pipeBlock.scale.setTo(0.06, 0.06);
    //player.scale.setTo(0.45, 0.45);
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
function gameOver1() {



    deathPlayer1 = true;
    player.kill();
    $("#score").val(score.toString());
    $("#greeting").show();
}


function gameOver2() {



    deathPlayer2 = true;
    player2.kill();
    $("#score").val(score.toString());
    $("#greeting").show();
}

