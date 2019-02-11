
var crystals = ["fire-stone", "leaf-stone", "thunder-stone", "water-stone"];
var goalNumber = 0;
var sum = 0;
var wins = 0;
var losses = 0;
const goalMin = 19;
const goalMax = 120;
const crystalMin = 1;
const crystalMax = 12;

$(document).ready(function () {

    setGoalNumber();
    sum = 0;
    setGoalText();
    setSumText();
    setWinsText();
    setLossesText();

    //dynamically create buttons
    for (i = 0; i < crystals.length; i++) {
        var crystalBtn = $("<button>");
        crystalBtn.addClass("crystalButton");
        crystalBtn.attr("value", (Math.floor(Math.random() * (crystalMax - crystalMin)) + crystalMin));
        crystalBtn.append('<img src="assets/images/' + crystals[i] + '.png">');
        $("#crystalButtons").append(crystalBtn);
    }

    //attach on click events
    $(".crystalButton").on("click", function () {
        sum = sum + parseInt($(this).attr("value"));
        setSumText();
        checkWinCondition();
    });
});

function checkWinCondition() {
    if (goalNumber == sum) {
        wins++;
        setWinsText();
        setGoalNumber();
        sum = 0;
        setGoalText();
        setSumText();
        $.each($(".crystalButton"), function () {
            $(this).attr("value", (Math.floor(Math.random() * (crystalMax - crystalMin)) + crystalMin));
        });
    }
    if (goalNumber < sum) {
        losses++;
        setLossesText();
        setGoalNumber();
        sum = 0;
        setGoalText();
        setSumText();
        $.each($(".crystalButton"), function () {
            $(this).attr("value", (Math.floor(Math.random() * (crystalMax - crystalMin)) + crystalMin));
        });
    }
}

function setGoalNumber() {
    goalNumber = Math.floor(Math.random() * (goalMax - goalMin)) + goalMin;
}

function setGoalText() {
    $("#goalText").text("Goal Number: " + goalNumber);
}

function setSumText() {
    $("#sumText").text("Current Sum: " + sum);
}

function setLossesText() {
    $("#lossesCount").text("Losses: " + losses);
}

function setWinsText() {
    $("#winsCount").text("Wins: " + wins);
}


