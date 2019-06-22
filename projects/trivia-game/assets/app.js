var defaultTime = 30;
var score = 0;
var questionId = -1;
var correctAnswer;
var intervalId;

var questionDB = [
  {
    question: "super",
    choice1: "bad, poor",
    choice2: "backward",
    choice3: "within, inside",
    choice4: "above, greater",
    answer: "above, greater",
  },
  {
    question: "anti",
    choice1: "before, earlier",
    choice2: "against",
    choice3: "not",
    choice4: "new",
    answer: "against",
  },
  {
    question: "ob, obs, op",
    choice1: "around, both",
    choice2: "good, well",
    choice3: "against, over",
    choice4: "bad, wrong, poor",
    answer: "against, over",
  },
  {
    question: "se",
    choice1: "across, through",
    choice2: "apart, away",
    choice3: "first, chief",
    choice4: "with, at once",
    answer: "apart, away",
  },
];

function displayQuestion() {
    questionId++;
    if (questionId >= questionDB.length) {
        $(".question-container").hide();
        $(".time-remaining").show();
        $(".answer-container").hide();
        $(".display-score").text("Score: " + score);
        $(".score-container").show();
        clearInterval(intervalId);
        $("#retry-button").show();
    }
    else {
        $(".start-container").hide();
        $(".answer-container").hide();
        $(".question-container").show();
        $(".time-remaining").show();
        $(".question").html("<h1>" + questionDB[questionId].question + "</h1>");
        $("#choice1").html(questionDB[questionId].choice1);
        $("#choice2").html(questionDB[questionId].choice2);
        $("#choice3").html(questionDB[questionId].choice3);
        $("#choice4").html(questionDB[questionId].choice4);
        timeRemaining = defaultTime;
        $(".time-remaining").html("Time Remaining: " + timeRemaining);
        $(".score-container").show();
        $(".display-score").text("Score: " + score);
        $("#retry-button").hide();
    }
}

function countdownTimer() {
    timeRemaining--;
    $(".time-remaining").html("Time Remaining: " + timeRemaining);
    if (timeRemaining <= 0) {
        timeRemaining = defaultTime;
        $(".question-container").hide();
        $(".answer-container").show();
        $(".display-answer").text("The answer is " + questionDB[questionId].answer);
        setTimeout(displayQuestion, 5000);
    }
}

$(".question-container").hide();
$(".answer-container").hide();
$(".score-container").hide();
$(".answer").click(function () {
    var selectedAnswer = "#" + $(this).attr('id');
    if ($(selectedAnswer).text() == questionDB[questionId].answer) {
        score++;
    }
    $(".time-remaining").hide();
    $(".answer-container").show();
    $(".display-answer").text('Answer is ' + questionDB[questionId].answer);
    $(".display-score").show();
    setTimeout(displayQuestion, 5000);
});

$(".start-button").click(function () {
    $(".start-container").hide();
    $(".question-container").show();
    intervalId = setInterval(countdownTimer, 1000);
    displayQuestion();
});