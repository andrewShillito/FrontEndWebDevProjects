$('div input[type="text"]').on('keypress', function(event){
  if (event.which === 13){
    newTodo($('div input[type="text"]').val());
    $(this).val('');
  }
});

function newTodo(text){
  var newElement = $('<li></li>').html('<span class="trashWrapper"><i class="fas fa-trash"></i></span> '+text);
  if ($("li:last-of-type").length){
    $("li:last-of-type").after(newElement);
  }
  else{
    $('ul').append(newElement);
  }
}


$('ul').on('click', '.trashWrapper', function(event){
  $(this).parent().fadeOut(400, function(){
    $(this).remove();
  });
  event.stopPropagation();
});

$('ul').on('click', 'li', function(){
  $(this).toggleClass('strikeOut');
});

$('.fa-plus').on('click', function(){
  $('div input[type="text"]').fadeToggle(function(){
    $('div input[type="text"]').val('');
  });
});
