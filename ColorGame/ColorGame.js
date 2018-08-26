var squares = document.getElementsByClassName('square');
var answer = changeColors();
var gameWon = false;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function randomColor(){
  var arr = [];
  for (var i = 0; i < 3; i++) {
    arr.push(getRandomInt(0, 256)).toString();
  }
  var color = 'rgb('+arr[0]+', '+arr[1]+', '+arr[2]+')';
  return color;
}

function changeColors(){
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = randomColor();
  }
  var rgbDisplay = squares[getRandomInt(0, squares.length)].style.backgroundColor;
  document.querySelector('#rgbDisplay').textContent = 'RGB '+ rgbDisplay.slice(3);
  return rgbDisplay;
}

function changeSingle(index){
  squares[index].style.backgroundColor = randomColor();
}

function fadeOut(ele){
  var fadeEffect= setInterval(function(){
    if (!ele.style.opacity){
      ele.style.opacity = 1;
    }
    if (ele.style.opacity < 0.1){
      clearInterval(fadeEffect);
    }
    else {
      ele.style.opacity -= 0.1;
    }
  }, 30);
}

for (var i = 0; i< squares.length;i++){
  squares[i].addEventListener('click', function(){
    if (!gameWon){
      if (this.style.backgroundColor === answer){
        gameWon = true;
        console.log('gameWon');
        gameOver();
      }
      else{
        fadeOut(this);
        document.querySelector('#retry').style.visibility = 'visible';
      }
    }
  });
}

function gameOver(){
  for (var i = 0; i<squares.length; i++){
    fadeIn(squares[i]);
  }
  document.querySelector("#header").style.backgroundColor = answer;
  document.querySelector('#retry').textContent = 'Correct!';
  document.querySelector('#resetbtn').textContent = 'Play Again?';
}

function fadeIn(ele){
  if(gameWon){
    ele.style.backgroundColor = answer;
  }
  var fadeEffect= setInterval(function(){
    if (!ele.style.opacity){
      ele.style.opacity = 0;
    }
    if (ele.style.opacity > .9){
      clearInterval(fadeEffect);
    }
    else {
      ele.style.opacity = parseFloat(ele.style.opacity)+0.1;
    }
  }, 30);
}

function resetGame(){
  document.querySelector('#retry').style.visibility = 'hidden';
  document.querySelector('#retry').textContent = 'Try Again!';
  gameWon = false;
  document.querySelector('#header').style.backgroundColor = 'steelblue';
  answer = changeColors();
  document.querySelector('#resetbtn').textContent = 'New Colors';
  for (var i = 0; i<squares.length; i++){
    squares[i].style.opacity = '0';
  }
  for (var j = 0; j<squares.length; j++){
    fadeIn(squares[j]);
  }
}

document.querySelector('#resetbtn').addEventListener('click', resetGame);

document.querySelector('#hard').addEventListener('click', function(){
  document.querySelector('#easy').classList.remove('selected');
  if (this.classList.value.match(/selected/g)){
  }
  else{
    this.classList.add('selected');
  }
  squares = document.getElementsByClassName('square');
    for (var i = 3; i<squares.length; i++){
      squares[i].classList.remove('easyMode');
    }
  resetGame();
});

document.querySelector('#easy').addEventListener('click', function(){
  document.querySelector('#hard').classList.remove('selected');
  if (this.classList.value.match(/selected/g)){
  }
  else{
    this.classList.add('selected');
  }
    for (var i = 3; i<squares.length; i++){
      squares[i].classList.add('easyMode');
    }
  squares = document.getElementsByClassName('hardMode');
  resetGame();
});
