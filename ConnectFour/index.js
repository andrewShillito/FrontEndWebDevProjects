$(document).ready(function(){

  var pOne = prompt("Player One enter your name.  You will be Blue");
  var pOneColor = 'rgb(86, 151, 255)';
  if (pOne === null || pOne === ""){
    pOne = 'Player One';
  }
  var pTwo = prompt("Player Two enter your name.  You will be Red");
  var pTwoColor = 'rgb(237, 45, 73)';
  if (pTwo === null || pTwo === ""){
    pTwo = 'Player Two';
  }

  var activePlayer = pOne;
  var headingPromptColor = "Blue";
  $('h3').text(activePlayer +' (Blue): it is your turn!');

  var table = $('tr');
  var gameWon = false;

  function returnColor(rowIndex, colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
  }

  function changeColor(rowIndex, colIndex, color){
    let temp;
    let tempColor;
    for (let i = 5; i>-1; i--){
      temp = table.eq(i).find('td').eq(colIndex).find('button');
      tempColor = temp.css("background-color");
      if (temp.is(":hover") && tempColor==="rgb(192, 192, 192)" || tempColor==="rgb(128, 128, 128)"){
        temp.css("background-color", color);
        return true;
      }
    }
    return false;
  }

  document.addEventListener('click', function(e){
    if (gameWon){
      if ($(e.target)['0']===$("#resetBtn")['0']){
        resetGame();
      }
      return false;
    }

    if($(e.target)["0"].tagName==="BUTTON"){
      for (let i = 0; i<7; i++){
        for (let j = 0; j<7; j++){
          // console.log(e.target)
          // console.log(table.eq(i).find('td').eq(j).find('button')['0']);
          // console.log(e.target);
          // console.log(table.eq(i).find('td').eq(j).find('button')['0']===e.target);
          if (table.eq(i).find('td').eq(j).find('button')['0']===e.target){
            // console.log("Success:", table.eq(i).eq(j));
            if (changeColor(i, j, getActivePlayerColor())){
              gameWon = horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck();
              if (gameWon){
                allowReset();
              }
              else {
                changeActivePlayer();
              }
              return true;
            }
            return false;
          }
        }
      }
    }
  });

  function getActivePlayerColor(){
    if (activePlayer === pOne){
      return 'rgb(86, 151, 255)';
    } else {
      return 'rgb(237, 45, 73)';
    }
  }

  function changeActivePlayer(){
    if (activePlayer === pOne){
      activePlayer = pTwo;
    } else {
      activePlayer = pOne;
    }
    updatePrompt(activePlayer);
  }

  function updatePrompt(activePlayer){
    if (activePlayer===pOne){
      headingPromptColor = "Blue";
    }
    else {
      headingPromptColor = "Red";
    }
    $('h3').text(activePlayer + " (" + headingPromptColor + ")" + ': it is your turn!');
  }

  function reportWin(row, col, player, dir){
    let loc = "(" + row + ", " + col + ")";
    $('h2').text(player + ' won ' + dir + ' at ' + loc);
  }

  function colorMatchCheck(one, two, three, four){
    return (one == two && one == three && one == four && one !== 'rgb(128, 128, 128)' && one !== undefined);
  }

  function horizontalWinCheck(){
    for (var row = 0; row < 6; row++) {
      for (var col = 0; col < 4; col++){
        if (colorMatchCheck(returnColor(row, col), returnColor(row, col+1), returnColor(row, col+2), returnColor(row, col+3))){
          reportWin(row, col, activePlayer, 'horizontally');
          return true;
        }
      }
    }
    return false;
  }

  function verticalWinCheck(){
    for (let row = 0; row<4; row++){
      for (let col = 0; col<7; col++){
        if (colorMatchCheck(returnColor(row, col), returnColor(row+1, col), returnColor(row+2, col), returnColor(row+3, col))){
          reportWin(row, col, activePlayer, "vertically");
          return true;
        }
      }
    }
    return false;
  }

  function diagonalWinCheck(){
    for (let row = 0; row<4; row++){
      for (let col = 0; col<4; col++){
        if (colorMatchCheck(returnColor(row, col), returnColor(row+1, col+1), returnColor(row+2, col+2), returnColor(row+3, col+3))){
          reportWin(row, col, activePlayer, "diagonally");
          return true;
        }
      }
      for (let col_ = 6; col_>2; col_--){
        if (colorMatchCheck(returnColor(row, col_), returnColor(row+1, col_-1), returnColor(row+2, col_-2), returnColor(row+3, col_-3))){
          reportWin(row, col_, activePlayer, "diagonally");
          return true;
        }
      }
    }
    return false;
  }

  function allowReset(){
    $('h3').replaceWith("<h3><button type='button' id='resetBtn'>Reset</button></h3>");
    $("#resetBtn").css("background-color", getActivePlayerColor());
  }

  function resetGame(){
    activePlayer = pOne;
    let tempText = "<h3>"+ activePlayer + " (Blue): it is your turn!</h3>";
    $('#resetBtn').replaceWith(tempText);
    $('td button').css("background-color", "rgb(128, 128, 128)");
    $("h2").text("The object of this game is to connect four of your chips in a row");
    gameWon = false;
  }
});
