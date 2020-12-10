const _startBtn = document.getElementById('start');
const _menu = document.getElementById('menu');
const _play = document.getElementById('play');
const _object = document.getElementById('object');
const _score = document.getElementById('score');
const _end = document.getElementById('end');
const _finalScore = document.getElementById('finalScore');
const _bestScore = document.getElementById('bestScore');
const _playAgain = document.getElementById('playAgain');
const _timer = document.getElementById('timer');

const width = window.innerWidth;
const height = window.innerHeight;

let game = {
  difficulty: 'easy',
  time: 5
}
let score = 0;
let time = game.time;

let tick = () => {
  if(time > 0){
     time -= 1;
    _timer.style.width = (time/game.time) * 100 + '%';
    setTimeout(tick, 1000);
  } else{
    endGame();
  }
}

let startGame = () => {
  score = 0;
  _score.innerHTML = score;
  time = game.time;
  moveObject();

  _menu.style.display = 'none';
  _end.style.display = 'none';
  _play.style.display = 'block';

  setTimeout(tick, 1000);
}

let endGame = () => {
  _play.style.display = 'none';
  _finalScore.innerHTML = score;
  _end.style.display = 'block';
  _timer.style.width = '100%';
  let sessionScore = sessionStorage.getItem('score');
  if(sessionScore != null && score > parseInt(sessionScore))
  {
    sessionScore = score;
    sessionStorage.setItem('score', sessionScore);
  }
  else{
    sessionStorage.setItem('score', score);
  }
  _bestScore.innerHTML = sessionScore;
}

let moveObject = () => {
  let randomWidth = Math.floor(Math.random() * (width - 50));
  let randomHeight = Math.floor(Math.random() * (height - 50));
    
  _object.style.transform =  "translate(" + randomWidth + "px, "  + randomHeight + "px)";
}

let clickObject = () => {
  moveObject();
  score++;
  _score.innerHTML = score;
}

_startBtn.onclick = startGame;
_playAgain.onclick = startGame;
_object.onclick = clickObject;

