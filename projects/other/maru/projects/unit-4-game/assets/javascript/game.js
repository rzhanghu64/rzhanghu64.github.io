
var targetNumber = 0;
var sum = 0;
var wins = 0;
var losses = 0;

$(document).ready(function () {

    targetNumber = Math.floor(Math.random() * (120 - 19)) + 19;
    sum = 0;
    $("#targetText").text("Target Number: " + targetNumber);
    $("#sumText").text("Current Number: " + sum);
    var gems = ["green-gem", "red-gem", "white-gem", "blue-gem"];
    $("#winsCount").text("Wins: " + wins);
    $("#lossesCount").text("Losses: " + losses);

   
    for (i = 0; i < gems.length; i++) {
        var gemsBtn = $("<button>");
        gemsBtn.addClass("gemsButton");
        gemsBtn.attr("value", (Math.floor(Math.random() * (12 - 1)) + 1));
        gemsBtn.append('<img src="assets/images/' + gems[i] + '.jpg">');
        $("#gemsButtons").append(gemsBtn);
    }

    $(".gemsButton").on("click", function () {
        sum = sum + parseInt($(this).attr("value"));
        $("#sumText").text("Current Number: " + sum);
        checkWinCondition();
    });
});

function checkWinCondition() {
    if (this.targetNumber == this.sum) {
        wins++;
        console.log(wins);
        $("#winsCount").text("Wins: " + wins);
        
        this.targetNumber = Math.floor(Math.random() * (120 - 19)) + 19;
        this.sum = 0;
        $("#targetText").text("Target Number: " + targetNumber);
        $("#sumText").text("Current Number: " + sum);
        $.each($(".gemButton"), function () {
            $(this).attr("value", (Math.floor(Math.random() * (12 - 1)) + 1));
        });
    }
    else if (this.targetNumber < this.sum) {
        losses++;
        $("#lossesCount").text("Losses: " + losses);
     
        this.goalNumber = Math.floor(Math.random() * (120 - 19)) + 19;
        this.sum = 0;
        $("#targetText").text("Goal Number: " + targetNumber);
        $("#sumText").text("Current Number: " + sum);
        $.each($(".gemButton"), function () {
            $(this).attr("value", (Math.floor(Math.random() * (12 - 1)) + 1));
        });
    }
}
