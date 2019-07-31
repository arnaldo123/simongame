var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var randomChosenColour;

var userClickedPattern=[];

var started=false;
var level=0;

$(document).keydown(function(){
  if(!started){
    started=true;
    $("#level-title").text("Level "+level);
    nextSequence();
  }
});

function nextSequence(){

  userClickedPattern=[];

  level++;
  $("#level-title").text("Level "+level);

  randomNumber=Math.floor(Math.random()*4);
  randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

}

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);

}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length==gamePattern.length){
      setTimeout(function(){nextSequence();},1000);
    }
  }
  else{
    var gameOver="wrong";
    playSound(gameOver);
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
