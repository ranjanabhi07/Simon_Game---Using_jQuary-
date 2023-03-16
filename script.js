
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

// function for keypress
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    
    //calling next Squence randomly generated 
    nextSequence();
    started = true;
  }
});

// jQuary for capturing click
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  
  // calling function to play sound
  playSound(userChosenColour);
  
  // calling animation - adding classes & removing it with time out
  animatePress(userChosenColour);
 // calling for checking answers 
  checkAnswer(userClickedPattern.length-1);
});

// for checking answers 
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          
          // calling next Squence randomly generated 
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      
      // to re-start
      startOver();
    }
}

// next Squence randomly generated 
function nextSequence() {
  
//    created empty user clicked pattern 
  // jQuary for capturing click
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); 
  // function to play sound
  playSound(randomChosenColour);
}

// animation - adding classes & removing it with time out
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// to re-start
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
