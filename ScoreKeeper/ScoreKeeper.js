var numInput = document.getElementsByName('num')[0];
var btnList = document.querySelectorAll('button');
var pOneBtn = btnList[0];
var pTwoBtn = btnList[1];
var reset = btnList[2];
var pScores = document.querySelector('h1');
var pOneScore = 0
var pTwoScore = 0
// var pTwoCount = document.querySelectorAll()
var h2 = document.querySelector('h2');
var numLimitDisplay = document.querySelector('span');
var numLimit = 5;
var gameWon = false;
var limitChange = false;

pOneBtn.addEventListener('click', function(){
  if (!(pOneScore >= numLimit || pTwoScore >= numLimit)){
    pOneScore+=1
    pScores.textContent = pOneScore.toString()+" to "+pTwoScore.toString();
    if (!gameWon && pOneScore>=numLimit){
      gameWon = true;
      var temp = '<span class="golden">'+pOneScore.toString()+'</span>'
      pScores.innerHTML = pScores.innerHTML.replace(pOneScore.toString(), temp);
      gameEnd('Player One');
    }
  }
});

pTwoBtn.addEventListener('click', function(){
  if (!(pOneScore >= numLimit || pTwoScore >= numLimit)){
    pTwoScore+=1
    pScores.textContent = pOneScore.toString()+" to "+pTwoScore.toString();
    if(!gameWon && pTwoScore>=numLimit){
      gameWon = true;
      var temp = '<span class="golden">'+pTwoScore.toString()+'</span>'
      pScores.innerHTML = pScores.innerHTML.replace(pTwoScore.toString(), temp);
      gameEnd('Player Two')
    }
  }
});

reset.addEventListener('click', function(){
  // resetGame();
  reset2()
});

// function resetGame(){
//   h2.innerHTML = "Playing to: <span id=\"numLimitDisplay\">5</span>"
//   pScores.textContent = "0 to 0";
//   pOneScore = 0;
//   pTwoScore = 0;
//   gameWon = false;
//   var end = document.getElementById('end');
//   var winName = document.getElementById('winName');
//   if (end){
//     document.body.removeChild(end);
//   }
//   if (winName){
//     document.body.removeChild(winName);
//   }
//   if (limitChange){
//     limitChange = false;
//     numLimit = 5;
//   }
// }

function reset2(){
  window.location.reload();
}

// function reset3(){
//   h2.textContent = "Playing to: 5";
//   pScores.textContent = "0 to 0";
//   pOneScore = 0;
//   pTwoScore = 0;
//   gameWon = false;
//   var end = document.getElementById('end');
//   var winName = document.getElementById('winName');
//   if (end){
//     document.body.removeChild(end);
//   }
//   if (winName){
//     document.body.removeChild(winName);
//   }
//   if (limitChange){
//     var temp = numInput.innerHTML;
//     numInput.innerHTML = "";
//     numInput.innerHTML = temp;
//     numInput.value = '';
//     limitChange = false;
//     numLimit = 5;
//   }
// }

numInput.addEventListener("change", function(){
  if (this.value !== undefined){
    numLimit = parseInt(this.value);
    numLimitDisplay.textContent = this.value;
    limitChange = true;
  }
});

function gameEnd(winner){
  var end = document.createElement("h1");
  var node = document.createTextNode("Final Score: "+pOneScore.toString()+' to '+pTwoScore.toString());
  end.appendChild(node);
  end.classList = 'display-1 text-center';
  end.id = 'end';
  var winName = document.createElement("h1");
  var node2 = document.createTextNode(winner+' Wins!');
  winName.appendChild(node2);
  winName.classList = 'display-1 text-center golden';
  winName.id = 'winName';
  document.body.appendChild(end);
  document.body.appendChild(winName);
};
