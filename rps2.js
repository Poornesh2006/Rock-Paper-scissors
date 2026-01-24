let score={
    wins : 0,
    losses : 0,
    tie : 0      }

let result = '';
let autoPlaying = false;
let intervalId;
let auto_play_button = document.querySelector('.auto-play-button');
let overall = document.getElementById('overall');
let instruct = document.getElementById('instructions');
let bo=false;
let best3=document.querySelector('.b3');
let remove_text = document.getElementById('removeText');

function toogleDiv(){
    if(instruct.style.display === "none" || instruct.style.display === ""){
        instruct.style.display = "block";
        overall.style.opacity="0";
    }
    else{
        instruct.style.display = "none";
        overall.style.opacity="1";
    }
}

function normal(){
    instruct.style.display = "none";
    overall.style.opacity="1";
}

function autoplay(){
    if (!autoPlaying){
        intervalId = setInterval(function(){
            const playerMove = pickComputerMove();
            playGame(playerMove);
        },1000);
        autoPlaying = true;
        auto_play_button.innerHTML = "AutoPlaying";
        auto_play_button.style.backgroundColor='white';
        auto_play_button.style.color="hsl(211, 77.10%, 57.30%)";
        auto_play_button.style.borderColor="hsl(211, 77.10%, 57.30%)";
    }
    else{
        clearInterval(intervalId);
        autoPlaying=false;
        auto_play_button.innerHTML = "Auto Play";
        auto_play_button.style.backgroundColor='hsl(211, 98.60%, 72.90%)';
        auto_play_button.style.borderColor="hsl(211, 98.60%, 72.90%)";
        auto_play_button.style.color="white"
    }
}

document.body.addEventListener('keydown',(event)=>{
    if(event.key == 'r'){
        playGame('rock');
    }
    else if(event.key == 'p'){
        playGame('paper');
    }
    else if(event.key == 's'){
        playGame('scissors');
    }
})

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
    }

    return computerMove;
}

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }
    }
    else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        }
    } 
    else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        }
    }

    if(result === 'You win.'){
        score.wins += 1
    }
    else if(result ==='You lose.'){
        score.losses += 1
    }
    else{
        score.tie += 1
    }
              
    document.querySelector('.black-background-one').src=`pics/cropped-${playerMove}.jpg`;
    document.querySelector('.black-background-two').src=`pics/cropped-${computerMove}.jpg`;

    scoreDisplay();    

    remove_text.innerText = `${result}`;

    if (bo){
        let tot=score.wins+score.losses+score.tie;
        if(tot >= 3){
            if(score.wins === 2 || score.losses === 2 ){
                if (score.wins === 2){
                    remove_text.innerHTML ="You won in best of 3 !";
                    scoreReset()
                }
            else if(score.losses === 2){
                    remove_text.innerHTML ="You lost in best of 3 !";
                    scoreReset()
                }
            }
        }
    }
}

function scoreDisplay(){
    document.querySelector('.wins-display').innerHTML = `Wins : ${score.wins}`;
    document.querySelector('.tie-display').innerHTML = `Tie : ${score.tie}`;
    document.querySelector('.losses-display').innerHTML = `Losses : ${score.losses}`;
}

function scoreReset(){
    setTimeout(display, 1500);
    setTimeout(b3Style,1500);
}

function display(){
    score.wins=0;
    score.losses=0;
    score.tie=0;

    scoreDisplay();

    document.querySelector('.black-background-one').src=`pics/cropped-black.jpg`;
    document.querySelector('.black-background-two').src=`pics/cropped-black.jpg`;

    remove_text.innerText = " ";
}

function bo3(){
    display();
    bo = (bo !== true) ? true : false;
    b3Style();
}
function b3Style(){
    if(bo){
        best3.style.backgroundColor='white';
        best3.style.color='hsl(300, 87.10%, 54.50%)';
        best3.style.borderColor='hsl(300, 87.10%, 54.50%)';
        remove_text.innerText = "BEST OF THREE";
    }
    else{
        best3.style.backgroundColor= 'hsl(300, 94%, 72%)';
        best3.style.borderColor='hsl(300, 94%, 72%)'
        best3.style.color='rgb(255, 255, 255)';
    }
}
