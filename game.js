var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var started = false;
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
async function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    //play and mark all the buttons in the sequence so far
    
    gamePattern.push(randomChosenColor);
    level++;
    $('#level-title').text('Level ' + level);
    for(var i=0; i<gamePattern.length; i++){
       
        $('#' + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(gamePattern[i]);
        await sleep(500);
    }
        
    
}



$(".btn").click(function(){
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $('#' + currentColor).addClass('pressed');
    //remove the pressed class after 100 milliseconds
    setTimeout(function(){
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }

});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log('success');
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    }
    else{
        console.log('wrong');
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 200);
        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

function startOver(){
    started=false;
    userClickedPattern = [];
    gamePattern = [];
    level=0;
}


