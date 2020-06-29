$(function(){

  // Animacion titulo
  setInterval(() => {
    if ($('.main-titulo').css('color') == 'rgb(220, 255, 14)') {
      $('.main-titulo').css('color', 'rgb(255, 255, 255)')
    } else {
      $('.main-titulo').css('color', 'rgb(220, 255, 14)')
    }    
  }, 1000);

  var matriz = []
  function iniciar_tablero(){    
    for (let index = 0; index < 7; index++) {
      matriz.push([
        'image/' + numero_aleatorio() + '.png',
        'image/' + numero_aleatorio() + '.png',
        'image/' + numero_aleatorio() + '.png',
        'image/' + numero_aleatorio() + '.png',
        'image/' + numero_aleatorio() + '.png',
        'image/' + numero_aleatorio() + '.png',
        'image/' + numero_aleatorio() + '.png'
      ])
    }
    let contenido_html
    for (let index = 0; index < matriz.length; index++) {
      contenido_html = ''
      contenido_html += '<div class="panel-contenedor">'
      for (let index2 = 0; index2 < matriz[index].length; index2++) {
        contenido_html += '<img src="' + matriz[index][index2] + '" id="tablero-' + index + index2 + '"  width="83%"></img>'
      }
      contenido_html += '</div>'
      $('.panel-tablero').find('div.col-'+ index).html(contenido_html)
    }
    $('.panel-tablero').children().hide()
    $('.panel-tablero').children().slideDown({ duration: 1000, queue: false })    
    iniciar_cronometro()
  }

  function numero_aleatorio(){
    return Math.floor(Math.random()*4+1)
  }

  function reiniciar_tablero(){
    window.location.reload()
  }

  function finalizar_partida(){
    $(".panel-tablero").animate({
      width: '0%'
    }, { duration: 900, queue: false });
    $(".panel-score").animate({
      width: '100%'
    }, { duration: 1000, queue: false });
    $(".panel-tablero").slideUp(800)
  }

  function set_cronometro(tiempo){
    $('#timer').text(("0" + tiempo[0]).slice(-2) + ":" + ("0" + tiempo[1]).slice(-2));
  }

  function iniciar_cronometro(){
    let tiempo = [2, 0]
    set_cronometro(tiempo)
    let cronometro = setInterval(() => {
      tiempo[1] -= 1
      if (tiempo[1] == -1) {
        tiempo[1] = 59
        tiempo[0] -= 1
      }
      set_cronometro(tiempo)
      if (tiempo[0] == 0 && tiempo[1] == 0) {
        clearInterval(cronometro)
        finalizar_partida()
      }
    }, 1000);
  }
  
  // Boton Iniciar/Reiniciar
  $('.btn-reinicio').click(function(){
    if ($(this).text() == 'Iniciar') {
      // Iniciar juego
      iniciar_tablero()
      $(this).text('Reiniciar')
    } else {
      // Reiniciar juego
      reiniciar_tablero()
    }
  });

});