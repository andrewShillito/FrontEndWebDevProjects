var numInput = document.getElementsByName('num')[0];
var btnList = document.querySelectorAll('button');
var pOneBtn = btnList[0];
var pTwoBtn = btnList[1];
var reset = btnList[2];
var pScores = document.querySelector('h1');
var pOneScore = 0
var pTwoScore = 0
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
  reset2()
});


function reset2(){
  window.location.reload();
}

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
