const colors = ["green", "red", "yellow", "blue"];
var chosenColors = [];

var userColors = [];

var level = 0;
var started = false;
var wrong = false;
var buttonPressed = 0;

var wrongAudio = new Audio("/sounds/wrong.mp3");

$(document).keypress(() => {
    wrong = false;
    if (!started) {
        nextColor();

        started = true;
    }
});

const nextColor = () => {
    level++;
    $("h1").text(`Level ${level}`);

    var random = Math.floor(Math.random() * 4);
    var chosenColor = colors[random];
    chosenColors.push(chosenColor);

    animateLevel(0);
    // animateLevel(chosenColors.length - 1);   Show only last one
    userColors.length = 0;
};

const animateLevel = (i) => {
    $("#" + chosenColors[i])
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);

    playAudio(chosenColors[i]);
    if (i < chosenColors.length) {
        setTimeout(() => {
            i++;
            animateLevel(i);
        }, 500);
    }
};

const animatePress = (color) => {
    $("#" + color).addClass("pressed");
    setTimeout(() => {
        $("#" + color).removeClass("pressed");
    }, 20);
};

const playAudio = (color) => {
    if (!wrong) {
        var audio = new Audio("sounds/" + color + ".mp3");
        audio.play();
    } else wrongAudio.play();
};

const compareColors = () => {
    if (
        JSON.stringify(userColors) ===
        JSON.stringify(chosenColors.slice(0, userColors.length))
    ) {
        if (userColors.length == chosenColors.length) {
            setTimeout(() => {
                nextColor();
            }, 500);
        }
    } else {
        gameOver();
    }
};

const gameOver = () => {
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 500);
    $("h1").text("Game Over! Press a Key to Restart");

    started = false;
    wrong = true;
    level = 0;
    chosenColors.length = 0;
    userColors.length = 0;
    buttonPressed = 0;
};

$(".btn").click(function () {
    var chosenButton = $(this).attr("id");

    animatePress(chosenButton);

    if (started) {
        userColors.push(chosenButton);
        compareColors();
    }

    playAudio(chosenButton);
});
