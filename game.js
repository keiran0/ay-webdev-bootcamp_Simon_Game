var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

function animateColor(colour) {
    $("#"+ colour).addClass("pressed");
    setTimeout(function() {
        $("#"+ colour).removeClass("pressed")
    },100)
}

function playAudio(colour) {
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}

function nextSequence() {
    userClickedPattern = []
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    setTimeout(function(){
        animateColor(randomChosenColour);
        playAudio(randomChosenColour);
    },500);
}

$(".btn").click(function(event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    animateColor(userChosenColour);
    playAudio(userChosenColour);


    if (userClickedPattern.length == gamePattern.length) {
        console.log("gamepattern is" + gamePattern);
        console.log("userpattern is" + userClickedPattern);
        checkAnswer();
        
    }
});

$("body").keypress(function(event) {
    console.log(event);
    if (gameStarted == false) {
        setTimeout(nextSequence(),1000);
        gameStarted = true;
    }
});

function checkAnswer() {
    if ((userClickedPattern.toString() === gamePattern.toString())== true) {  
        nextSequence();
    }
    else {
        restart();
    }
}

function restart() {

    playAudio("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over")
    },500);

    gameStarted = false;
    $("h1").text("Press A Key to Start");
    gamePattern = [];
    userClickedPattern = [];
    level = 0
}


