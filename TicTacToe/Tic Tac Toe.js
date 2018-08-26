var tableRows = document.getElementsByTagName('tr');
var tableData = document.getElementsByTagName('td');
var currentPlayer = true; //P1 == true P2 == False
var gameWon = false;
var btn = document.getElementsByName('button')[0];

btn.addEventListener('click', function(){
  for (var x = 0; x<tableData.length; x++){
    tableData[x].textContent = '';
    tableData[x].classList.remove('p1');
    tableData[x].classList.remove('p2');
  }
  currentPlayer = true;
  gameWon = false;
  var endText = document.getElementsByTagName('h1');
  if (endText.length>1){
    document.body.removeChild(endText[1]);
  }
});

for (var i = 0; i < tableData.length; i++) {
  tableData[i].addEventListener('click', function(){
    if (gameWon){
      //
    }
    else if (this.textContent === ''){
      if (currentPlayer){
        this.textContent = 'X';
        this.classList.add("p1");
        currentPlayer=!currentPlayer;
      }
      else if (!currentPlayer){
        this.textContent = 'O';
        this.classList.add("p2");
        currentPlayer=!currentPlayer;
      }
      gameWon = checkWin()[0];
      if (gameWon){
        var winType = checkWin()[1];
        var h1 = document.createElement('h1');
        if (!currentPlayer){
          h1.textContent = 'Player One "X" '+winType;
          h1.classList.add('p1WinText');
        }
        else{
          h1.textContent = 'Player Two "O" '+winType;
          h1.classList.add('p2WinText');
        }
        document.body.appendChild(h1);
      }
    }
  });
}

function horizWin(){
  for (var i = 0; i<tableData.length; i+=3){
    if (tableData[i].textContent === ''){
      //
    }
    else if (tableData[i].textContent === tableData[i+1].textContent && tableData[i].textContent === tableData[i+2].textContent){
      return true;
    }
  }
  return false;
}

function vertWin(){
  for (var i = 0; i < 3; i++) {
    if (tableData[i].textContent === ''){
      //
    }
    else if (tableData[i].textContent === tableData[i+3].textContent && tableData[i].textContent === tableData[i+6].textContent){
      return true;
    }
  }
  return false;
}

function diagWin(){
  if (tableData[4].textContent === ''){
    return false;
  }
  else if ((tableData[0].textContent === tableData[4].textContent && tableData[0].textContent === tableData[8].textContent) || (tableData[2].textContent === tableData[4].textContent && tableData[2].textContent === tableData[6].textContent)){
    return true;
  }
}

function checkWin(){
  if (horizWin()){
    return [true, 'Horizontal Win'];
  }
  else if (vertWin()){
    return [true, 'Vertical Win'];
  }
  else if (diagWin()){
    return [true, 'Diagonal Win'];
  }
  return [false, 'No Win'];
}
