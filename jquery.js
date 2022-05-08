var playing = false;
var score;
var trialsLeft;
var step;
var action;
$(document).ready(function(){
    //click on start btn
    $(".btn").click(function(){
        if(playing == true){
            location.reload(); //if we are playing
        }else{                 //if we are not playing
            playing = true;
            $("#header").hide();
            score = 0;
            $("#scorevalue").html(score);
            $("#lives").css("visibility", "visible");
            $("#scores").css("visibility", "visible");
            trialsLeft = 3;
            addHearts();
            $("#gameOver").hide();
            $(".btn").attr("value", "Reset");
            startAction();
        }
    });
    
    $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").html(score);
        document.getElementById("sliceSound").play();
        clearInterval(action);
        $("#fruit1").hide();
        setTimeout(startAction(), 2000);
    });
    



//functions
function addHearts(){
    $("#lives").empty();
    for(var i=0; i < trialsLeft; i++){
                $("#lives").append("<img src='images/heart.png' class='imgLives'>");
            }
}

function startAction(){
    $("#fruit1").show();
    chooseFruit();
    $("#fruit1").css({'left' : Math.round(($("#fruitsContainer").width()-$("#fruit1").width())*Math.random()), 'top' : -50});
    step = 2 + Math.floor(Math.random() * 3);
    action = setInterval(function(){
                $("#fruit1").css("top", $("#fruit1").position().top + step);

        if($("#fruit1").position().top > $("#fruitsContainer").height()){
            if(trialsLeft > 1){
                $("#fruit1").show();
                chooseFruit();
                $("#fruit1").css({'left' : Math.round(($("#fruitsContainer").width()-$("#fruit1").width())*Math.random()), 'top' : -50});
                step = 2 + Math.floor(Math.random() * 3);
                trialsLeft--;
                addHearts();
            }else{
                playing = false;
                $(".btn").attr("value", "Start");
                $("#gameOver").show();
                $("#gameOver").html("<p>Gameover</p><p>Your score is "+ score +"</p>");
                clearInterval(action);
                $("#fruit1").hide();
                $("#lives").css("visibility", "hidden");
                $("#scores").css("visibility", "hidden");
                
            }
        }
    }, 10);
}

function chooseFruit(){
    $(".fruit").attr("src", "images/" + Math.round(9*Math.random()) +".png");
}

});