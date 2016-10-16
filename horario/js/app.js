app = {
	dia: 'lunes', // Dia actual en palabra
	dias: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
	changePage: function (dia) {
		app.dia = dia;
		$(':mobile-pagecontainer')
		.pagecontainer('change', app.dia + '.html');
	},
	// Si recibe un numero devuelve una palabra:
	// 1 "lunes", 2 "martes",..., 5 "viernes"
	// Si recibe una palabra devuele el número:
	// "lunes" 1, .... "viernes" 5
	_dia: function (d) {
		if (typeof d == "number") {
			return app.dias[d-1];
		}
		for(i in app.dias) {
			if(app.dias[i] == d) {
				return parseInt(i)+1;
			}
		}
	},
	// Devuelve el nombre del siguiete dia.
	// lunes -> martes.
	//  viernes -> lunes
	siguiente: function(d) {
		console.log("dia actual"+app.dia);
		var diaNumero = app._dia(app.dia);
		console.log("dia actualNumero"+diaNumero);
		console.log("dia siguiente:"+app.dias[diaNumero%5]);
		return app.dias[diaNumero%5];
	},
	// Devuelve el nombre del siguiete previo
	// lunes -> viernes
	//  martes -> lunes
	//  viernes -> jueves
	previo: function(d) {
		var diaNumero = app._dia(app.dia) - 2;
		if(diaNumero == -1) { // lunes
			diaNumero = 4;
		}
		return app.dias[diaNumero];
	},
}


$(function() {
	// Muestra el dia actual
	var d = new Date();
	var numDiaSemana = d.getDay();
	var dia = 'lunes';
	if (numDiaSemana>1 && numDiaSemana<6) {
		dia = app._dia(numDiaSemana);
	}
	app.changePage(dia);
	// desplazamiento izquierdo (siguiente)
	$(document).on(
		'swipeleft',
		'div[data-role="page"]',
		function() {
			var sig = app.siguiente();
			app.changePage(sig);
	});
	// desplazamiento derecho (previo)
	$(document).on(
		'swiperight',
		'div[data-role="page"]',
		function() {
			var sig = app.previo();
			app.changePage(sig);
	});
	//Agregando evento cuando el usuario selecciona un día
	// en especifico
	$(document).on('change', '#diaMostrado', function() {
		app.changePage($(this).val());
	});
});
