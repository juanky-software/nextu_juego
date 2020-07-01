self.addEventListener('message', function(e) {
  $('.col-'+columna).prepend('<img src="image/'+ numero_aleatorio() + '.png" width="100%" id="'+ columna + '-' + fila +'">').hide().slideDown({duration: 1000, queue: false});
}, false);