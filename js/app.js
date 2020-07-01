$(function(){

  // Animacion titulo
  setInterval(() => {
    if ($('.main-titulo').css('color') == 'rgb(220, 255, 14)') {
      $('.main-titulo').css('color', 'rgb(255, 255, 255)')
    } else {
      $('.main-titulo').css('color', 'rgb(220, 255, 14)')
    }    
  }, 1000);

  function iniciar_tablero(){
    nuevo_tablero()
    iniciar_cronometro()
    setTimeout(() => {      
      verificar_tablero()
    }, 2000);
  }
  
  function nuevo_tablero(){
    for (let index = 0; index < 7; index++) {
      nuevos_dulces(index+1, 1)
    }
  }

  function nuevos_dulces(columna, fila){
    for (let index = fila; index < 8; index++) {     
      $('.col-'+columna).prepend('<img src="image/' + numero_aleatorio() + '.png" width="100%" id="imagen-' + String(columna-1) + String(index-1) +'" ondrop="drop(event)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)">').hide().slideDown(1000)
    }
  }

  function eliminar_dulce(columna, fila) {
    let tiempo = 200
    $('#imagen-'+columna+fila).fadeOut(tiempo, function(){
      $(this).fadeIn(tiempo, function(){
        $(this).fadeOut(tiempo, function(){
          $(this).fadeIn(tiempo, function(){
            $(this).fadeOut(tiempo, function(){
              $(this).fadeIn(tiempo, function(){
                $(this).fadeOut(tiempo, function(){
                  $(this).fadeIn(tiempo, function(){
                    $(this).remove()
                    nuevos_dulces(columna+1, 7)
                  })
                })
              })
            })
          })
        })
      })
    })
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

  function verificar_tablero() {    
    let existen_combinaciones = true
    let matriz = []
    let continua = true
    // Ejecutar hasta que no haya combinaciones
    //while (existen_combinaciones) {
      matriz = []
      for (let columna = 0; columna < 7; columna++) {
        let aux_matriz = []
        for (let fila = 0; fila < 7; fila++) {
          aux_matriz.push({imagen: $('#imagen-'+fila+columna).attr('src'), arriba: false, derecha: false})        
        }
        matriz.push(aux_matriz)
      }
      
      let posiciones = barrido_tablero(matriz)
      
      if (posiciones.length == 0) {
        existen_combinaciones = false
      } else {
        posiciones.forEach(element => {
          eliminar_dulce(element.columna, element.fila)
        });
        sobreescribir_ids()  
      }
    //}
  }

  function sobreescribir_ids(){
    for (let index = 1; index < 8; index++) {
      let columna_div = 
      $.each($('.col-'+index).children(), function(index2, value) {
        console.log($(this).attr('id', 'imagen-' + String(index-1) + String(7-index2-1)))
      })      
    }
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("imagen_origen", ev.target.src);
    ev.dataTransfer.setData("id_origen", ev.target.id);   
  }
  
  function drop(ev) {
    ev.preventDefault();
    var imagen_origen = ev.dataTransfer.getData("imagen_origen");
    var id_origen = ev.dataTransfer.getData("id_origen")
    $('#'+id_origen).attr("src", ev.target.src())
    ev.target.src(imagen_origen);
  }

  function barrido_tablero(matriz){
    // matriz = [fila, columna]
    let posiciones = []
    let puntuacion = parseInt($('#score-text').text())
    // DE ARRIBA A ABAJO
    for (let index = 0; index < 7; index++) {
      // Arriba desde 0
      if (matriz[0][index].arriba == false) {
        if (matriz[0][index].imagen == matriz[1][index].imagen && matriz[0][index].imagen == matriz[2][index].imagen && matriz[0][index].imagen == matriz[3][index].imagen && matriz[0][index].imagen == matriz[4][index].imagen && matriz[0][index].imagen == matriz[5][index].imagen && matriz[0][index].imagen == matriz[6][index].imagen){      
          puntuacion += 5
          posiciones.push({fila: 0, columna: index})
          posiciones.push({fila: 1, columna: index})
          posiciones.push({fila: 2, columna: index})
          posiciones.push({fila: 3, columna: index})
          posiciones.push({fila: 4, columna: index})
          posiciones.push({fila: 5, columna: index})
          posiciones.push({fila: 6, columna: index})
          matriz[0][index].arriba = true
          matriz[1][index].arriba = true
          matriz[2][index].arriba = true
          matriz[3][index].arriba = true
          matriz[4][index].arriba = true
          matriz[5][index].arriba = true
          matriz[6][index].arriba = true
        } else if(matriz[0][index].imagen == matriz[1][index].imagen && matriz[0][index].imagen == matriz[2][index].imagen && matriz[0][index].imagen == matriz[3][index].imagen && matriz[0][index].imagen == matriz[4][index].imagen && matriz[0][index].imagen == matriz[5][index].imagen){
          puntuacion += 4
          posiciones.push({fila: 0, columna: index})
          posiciones.push({fila: 1, columna: index})
          posiciones.push({fila: 2, columna: index})
          posiciones.push({fila: 3, columna: index})
          posiciones.push({fila: 4, columna: index})
          posiciones.push({fila: 5, columna: index})
          matriz[0][index].arriba = true
          matriz[1][index].arriba = true
          matriz[2][index].arriba = true
          matriz[3][index].arriba = true
          matriz[4][index].arriba = true
          matriz[5][index].arriba = true
        } else if(matriz[0][index].imagen == matriz[1][index].imagen && matriz[0][index].imagen == matriz[2][index].imagen && matriz[0][index].imagen == matriz[3][index].imagen && matriz[0][index].imagen == matriz[4][index].imagen){
          puntuacion += 3
          posiciones.push({fila: 0, columna: index})
          posiciones.push({fila: 1, columna: index})
          posiciones.push({fila: 2, columna: index})
          posiciones.push({fila: 3, columna: index})
          posiciones.push({fila: 4, columna: index})
          matriz[0][index].arriba = true
          matriz[1][index].arriba = true
          matriz[2][index].arriba = true
          matriz[3][index].arriba = true
          matriz[4][index].arriba = true
        } else if(matriz[0][index].imagen == matriz[1][index].imagen && matriz[0][index].imagen == matriz[2][index].imagen && matriz[0][index].imagen == matriz[3][index].imagen){
          puntuacion += 2
          posiciones.push({fila: 0, columna: index})
          posiciones.push({fila: 1, columna: index})
          posiciones.push({fila: 2, columna: index})
          posiciones.push({fila: 3, columna: index})
          matriz[0][index].arriba = true
          matriz[1][index].arriba = true
          matriz[2][index].arriba = true
          matriz[3][index].arriba = true
        } else if(matriz[0][index].imagen == matriz[1][index].imagen && matriz[0][index].imagen == matriz[2][index].imagen){
          puntuacion += 1
          posiciones.push({fila: 0, columna: index})
          posiciones.push({fila: 1, columna: index})
          posiciones.push({fila: 2, columna: index})
          matriz[0][index].arriba = true
          matriz[1][index].arriba = true
          matriz[2][index].arriba = true
        }
      }
      
      // Arriba desde 1
      if (matriz[1][index].arriba == false) {
        if(matriz[1][index].imagen == matriz[2][index].imagen && matriz[1][index].imagen == matriz[3][index].imagen && matriz[1][index].imagen == matriz[4][index].imagen && matriz[1][index].imagen == matriz[5][index].imagen && matriz[1][index].imagen == matriz[6][index].imagen){
          puntuacion += 4
          posiciones.push({fila: 1, columna: index})
          posiciones.push({fila: 2, columna: index})
          posiciones.push({fila: 3, columna: index})
          posiciones.push({fila: 4, columna: index})
          posiciones.push({fila: 5, columna: index})
          posiciones.push({fila: 6, columna: index})
          matriz[1][index].arriba = true
          matriz[2][index].arriba = true
          matriz[3][index].arriba = true
          matriz[4][index].arriba = true
          matriz[5][index].arriba = true
          matriz[6][index].arriba = true
        } else if(matriz[1][index].imagen == matriz[2][index].imagen && matriz[1][index].imagen == matriz[3][index].imagen && matriz[1][index].imagen == matriz[4][index].imagen && matriz[1][index].imagen == matriz[5][index].imagen){
          puntuacion += 3
          posiciones.push({fila: 1, columna: index})
          posiciones.push({fila: 2, columna: index})
          posiciones.push({fila: 3, columna: index})
          posiciones.push({fila: 4, columna: index})
          posiciones.push({fila: 5, columna: index})
          matriz[1][index].arriba = true
          matriz[2][index].arriba = true
          matriz[3][index].arriba = true
          matriz[4][index].arriba = true
          matriz[5][index].arriba = true
        } else if(matriz[1][index].imagen == matriz[2][index].imagen && matriz[1][index].imagen == matriz[3][index].imagen && matriz[1][index].imagen == matriz[4][index].imagen){
          puntuacion += 2
          posiciones.push({fila: 1, columna: index})
          posiciones.push({fila: 2, columna: index})
          posiciones.push({fila: 3, columna: index})
          posiciones.push({fila: 4, columna: index})
          matriz[1][index].arriba = true
          matriz[2][index].arriba = true
          matriz[3][index].arriba = true
          matriz[4][index].arriba = true
        } else if(matriz[1][index].imagen == matriz[2][index].imagen && matriz[1][index].imagen == matriz[3][index].imagen){
          puntuacion += 1
          posiciones.push({fila: 1, columna: index})
          posiciones.push({fila: 2, columna: index})
          posiciones.push({fila: 3, columna: index})
          matriz[1][index].arriba = true
          matriz[2][index].arriba = true
          matriz[3][index].arriba = true
        }
      }
      // Arriba desde 2
      if (matriz[2][index].arriba == false) {
        if(matriz[2][index].imagen == matriz[3][index].imagen && matriz[2][index].imagen == matriz[4][index] && matriz[2][index].imagen == matriz[5][index].imagen && matriz[2][index].imagen == matriz[6][index].imagen){
          puntuacion += 3
          posiciones.push({fila: 2, columna: index})
          posiciones.push({fila: 3, columna: index})
          posiciones.push({fila: 4, columna: index})
          posiciones.push({fila: 5, columna: index})
          posiciones.push({fila: 6, columna: index})
          matriz[2][index].arriba = true
          matriz[3][index].arriba = true
          matriz[4][index].arriba = true
          matriz[5][index].arriba = true
          matriz[6][index].arriba = true
        } else if(matriz[2][index].imagen == matriz[3][index].imagen && matriz[2][index].imagen == matriz[4][index].imagen && matriz[2][index].imagen == matriz[5][index].imagen){
          puntuacion += 2
          posiciones.push({fila: 2, columna: index})
          posiciones.push({fila: 3, columna: index})
          posiciones.push({fila: 4, columna: index})
          posiciones.push({fila: 5, columna: index})
          matriz[2][index].arriba = true
          matriz[3][index].arriba = true
          matriz[4][index].arriba = true
          matriz[5][index].arriba = true
        } else if(matriz[2][index].imagen == matriz[3][index].imagen && matriz[2][index].imagen == matriz[4][index].imagen){
          puntuacion += 1
          posiciones.push({fila: 2, columna: index})
          posiciones.push({fila: 3, columna: index})
          posiciones.push({fila: 4, columna: index})
          matriz[2][index].arriba = true
          matriz[3][index].arriba = true
          matriz[4][index].arriba = true
        }
      }
      // Arriba desde 3
      if (matriz[3][index].arriba == false) {
        if(matriz[3][index].imagen == matriz[4][index].imagen && matriz[3][index].imagen == matriz[5][index].imagen && matriz[3][index].imagen == matriz[6][index].imagen){
          puntuacion += 2
          posiciones.push({fila: 3, columna: index})
          posiciones.push({fila: 4, columna: index})
          posiciones.push({fila: 5, columna: index})
          posiciones.push({fila: 6, columna: index})
          matriz[3][index].arriba = true
          matriz[4][index].arriba = true
          matriz[5][index].arriba = true
          matriz[6][index].arriba = true
        } else if(matriz[3][index].imagen == matriz[4][index].imagen && matriz[3][index].imagen == matriz[5][index].imagen){
          puntuacion += 1
          posiciones.push({fila: 3, columna: index})
          posiciones.push({fila: 4, columna: index})
          posiciones.push({fila: 5, columna: index})
          matriz[3][index].arriba = true
          matriz[4][index].arriba = true
          matriz[5][index].arriba = true
        }
      }
      // Arriba desde 4
      if (matriz[3][index].arriba == false) {
        if(matriz[4][index].imagen == matriz[5][index].imagen && matriz[4][index].imagen == matriz[6][index].imagen){
          puntuacion += 1
          posiciones.push({fila: 4, columna: index})
          posiciones.push({fila: 5, columna: index})
          posiciones.push({fila: 6, columna: index})
          matriz[4][index].arriba = true
          matriz[5][index].arriba = true
          matriz[6][index].arriba = true
        }
      }
    }

    // DE IZQUIERDA A DERECHA
    for (let index = 0; index < 7; index++) {
      // Derecha desde 0
      if (matriz[index][0].derecha == false) {
        if (matriz[index][0].imagen == matriz[index][1].imagen && matriz[index][0].imagen == matriz[index][2].imagen && matriz[index][0].imagen == matriz[index][3].imagen && matriz[index][0].imagen == matriz[index][4].imagen && matriz[index][0].imagen == matriz[index][5].imagen && matriz[index][0].imagen == matriz[index][6].imagen){
          puntuacion += 5
          posiciones.push({fila: index, columna: 0})
          posiciones.push({fila: index, columna: 1})
          posiciones.push({fila: index, columna: 2})
          posiciones.push({fila: index, columna: 3})
          posiciones.push({fila: index, columna: 4})
          posiciones.push({fila: index, columna: 5})
          posiciones.push({fila: index, columna: 6})
          matriz[index][0].derecha = true
          matriz[index][1].derecha = true
          matriz[index][2].derecha = true
          matriz[index][3].derecha = true
          matriz[index][4].derecha = true
          matriz[index][5].derecha = true
          matriz[index][6].derecha = true
        } else if(matriz[index][0].imagen == matriz[index][1].imagen && matriz[index][0].imagen == matriz[index][2].imagen && matriz[index][0].imagen == matriz[index][3].imagen && matriz[index][0].imagen == matriz[index][4].imagen && matriz[index][0].imagen == matriz[index][5].imagen){
          puntuacion += 4
          posiciones.push({fila: index, columna: 0})
          posiciones.push({fila: index, columna: 1})
          posiciones.push({fila: index, columna: 2})
          posiciones.push({fila: index, columna: 3})
          posiciones.push({fila: index, columna: 4})
          posiciones.push({fila: index, columna: 5})
          matriz[index][0].derecha = true
          matriz[index][1].derecha = true
          matriz[index][2].derecha = true
          matriz[index][3].derecha = true
          matriz[index][4].derecha = true
          matriz[index][5].derecha = true
        } else if(matriz[index][0].imagen == matriz[index][1].imagen && matriz[index][0].imagen == matriz[index][2].imagen && matriz[index][0].imagen == matriz[index][3].imagen && matriz[index][0].imagen == matriz[index][4].imagen){
          puntuacion += 3
          posiciones.push({fila: index, columna: 0})
          posiciones.push({fila: index, columna: 1})
          posiciones.push({fila: index, columna: 2})
          posiciones.push({fila: index, columna: 3})
          posiciones.push({fila: index, columna: 4})
          matriz[index][0].derecha = true
          matriz[index][1].derecha = true
          matriz[index][2].derecha = true
          matriz[index][3].derecha = true
          matriz[index][4].derecha = true
        } else if(matriz[0][index].imagen == matriz[1][index].imagen && matriz[0][index].imagen == matriz[2][index].imagen && matriz[0][index].imagen == matriz[3][index].imagen){
          puntuacion += 2
          posiciones.push({fila: index, columna: 0})
          posiciones.push({fila: index, columna: 1})
          posiciones.push({fila: index, columna: 2})
          posiciones.push({fila: index, columna: 3})
          matriz[index][0].derecha = true
          matriz[index][1].derecha = true
          matriz[index][2].derecha = true
          matriz[index][3].derecha = true
        } else if(matriz[index][0].imagen == matriz[index][1].imagen && matriz[index][0].imagen == matriz[index][2].imagen){
          puntuacion += 1
          posiciones.push({fila: index, columna: 0})
          posiciones.push({fila: index, columna: 1})
          posiciones.push({fila: index, columna: 2})
          matriz[index][0].derecha = true
          matriz[index][1].derecha = true
          matriz[index][2].derecha = true
        }
      }
      
      // Derecha desde 1
      if (matriz[index][1].derecha == false) {
        if(matriz[index][1].imagen == matriz[index][2].imagen && matriz[index][1].imagen == matriz[index][3].imagen && matriz[index][1].imagen == matriz[index][4].imagen && matriz[index][1].imagen == matriz[index][5].imagen && matriz[index][1].imagen == matriz[index][6].imagen){
          puntuacion += 4
          posiciones.push({fila: index, columna: 1})
          posiciones.push({fila: index, columna: 2})
          posiciones.push({fila: index, columna: 3})
          posiciones.push({fila: index, columna: 4})
          posiciones.push({fila: index, columna: 5})
          posiciones.push({fila: index, columna: 6})
          matriz[index][1].derecha = true
          matriz[index][2].derecha = true
          matriz[index][3].derecha = true
          matriz[index][4].derecha = true
          matriz[index][5].derecha = true
          matriz[index][6].derecha = true
        } else if(matriz[index][1].imagen == matriz[index][2].imagen && matriz[index][1].imagen == matriz[index][3].imagen && matriz[index][1].imagen == matriz[index][4].imagen && matriz[index][1].imagen == matriz[index][5].imagen){
          puntuacion += 3
          posiciones.push({fila: index, columna: 1})
          posiciones.push({fila: index, columna: 2})
          posiciones.push({fila: index, columna: 3})
          posiciones.push({fila: index, columna: 4})
          posiciones.push({fila: index, columna: 5})
          matriz[index][1].derecha = true
          matriz[index][2].derecha = true
          matriz[index][3].derecha = true
          matriz[index][4].derecha = true
          matriz[index][5].derecha = true
        } else if(matriz[index][1].imagen == matriz[index][2].imagen && matriz[index][1].imagen == matriz[index][3].imagen && matriz[index][1].imagen == matriz[index][4].imagen){
          puntuacion += 2
          posiciones.push({fila: index, columna: 1})
          posiciones.push({fila: index, columna: 2})
          posiciones.push({fila: index, columna: 3})
          posiciones.push({fila: index, columna: 4})
          matriz[index][1].derecha = true
          matriz[index][2].derecha = true
          matriz[index][3].derecha = true
          matriz[index][4].derecha = true
        } else if(matriz[index][1].imagen == matriz[index][2].imagen && matriz[index][1].imagen == matriz[index][3].imagen){
          puntuacion += 1
          posiciones.push({fila: index, columna: 1})
          posiciones.push({fila: index, columna: 2})
          posiciones.push({fila: index, columna: 3})
          matriz[index][1].derecha = true
          matriz[index][2].derecha = true
          matriz[index][3].derecha = true
        }
      }
      // Derecha desde 2
      if (matriz[index][2].derecha == false) {
        if(matriz[index][2].imagen == matriz[index][3].imagen && matriz[index][2].imagen == matriz[index][4] && matriz[index][2].imagen == matriz[index][5].imagen && matriz[index][2].imagen == matriz[index][6].imagen){
          puntuacion += 3
          posiciones.push({fila: index, columna: 2})
          posiciones.push({fila: index, columna: 3})
          posiciones.push({fila: index, columna: 4})
          posiciones.push({fila: index, columna: 5})
          posiciones.push({fila: index, columna: 6})
          matriz[index][2].derecha = true
          matriz[index][3].derecha = true
          matriz[index][4].derecha = true
          matriz[index][5].derecha = true
          matriz[index][6].derecha = true
        } else if(matriz[index][2].imagen == matriz[index][3].imagen && matriz[index][2].imagen == matriz[index][4].imagen && matriz[index][2].imagen == matriz[index][5].imagen){
          puntuacion += 2
          posiciones.push({fila: index, columna: 2})
          posiciones.push({fila: index, columna: 3})
          posiciones.push({fila: index, columna: 4})
          posiciones.push({fila: index, columna: 5})
          matriz[index][2].derecha = true
          matriz[index][3].derecha = true
          matriz[index][4].derecha = true
          matriz[index][5].derecha = true
        } else if(matriz[index][2].imagen == matriz[index][3].imagen && matriz[index][2].imagen == matriz[index][4].imagen){
          puntuacion += 1
          posiciones.push({fila: index, columna: 2})
          posiciones.push({fila: index, columna: 3})
          posiciones.push({fila: index, columna: 4})
          matriz[index][2].derecha = true
          matriz[index][3].derecha = true
          matriz[index][4].derecha = true
        }
      }
      // Derecha desde 3
      if (matriz[index][3].derecha == false) {
        if(matriz[index][3].imagen == matriz[index][4].imagen && matriz[index][3].imagen == matriz[index][5].imagen && matriz[index][3].imagen == matriz[index][6].imagen){
          puntuacion += 2
          posiciones.push({fila: index, columna: 3})
          posiciones.push({fila: index, columna: 4})
          posiciones.push({fila: index, columna: 5})
          posiciones.push({fila: index, columna: 6})
          matriz[index][3].derecha = true
          matriz[index][4].derecha = true
          matriz[index][5].derecha = true
          matriz[index][6].derecha = true
        } else if(matriz[index][3].imagen == matriz[index][4].imagen && matriz[index][3].imagen == matriz[index][5].imagen){
          puntuacion += 1
          posiciones.push({fila: index, columna: 3})
          posiciones.push({fila: index, columna: 4})
          posiciones.push({fila: index, columna: 5})
          matriz[index][3].derecha = true
          matriz[index][4].derecha = true
          matriz[index][5].derecha = true
        }
      }
      // Derecha desde 4
      if (matriz[index][3].derecha == false) {
        if(matriz[index][4].imagen == matriz[index][5].imagen && matriz[index][4].imagen == matriz[index][6].imagen){
          puntuacion += 1
          posiciones.push({fila: index, columna: 4})
          posiciones.push({fila: index, columna: 5})
          posiciones.push({fila: index, columna: 6})
          matriz[index][4].derecha = true
          matriz[index][5].derecha = true
          matriz[index][6].derecha = true
        }
      }
    }
    $('#score-text').text(puntuacion)
    return posiciones
  }

});