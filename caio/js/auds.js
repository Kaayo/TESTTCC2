var gracacao = [];
var b = 0;


function addGravacao(item , del) {

	gracacao.push(item);
}


function getGravacao() {

	return gracacao ;
}


function mostraGravacao() {

	for (var i = gracacao.length - 1; i >= 0; i--) {

		$('<div>', {
		    id: 'div'+i,
		    class: 'col-md-12',
		}).appendTo('#testea');

		$('<div>', {
		    id: 'div2'+i,
		    class: 'row',
		}).appendTo('#div'+i);

		$('#div2'+i).append(gracacao[i]);

		$('<button>', {
		    id: 'div'+i,
		    class: 'button-red button',
		    text: 'deletar',
		    'onClick':'delAdio("'+i+'")'
		}).appendTo('#div'+i);


	};

}
function delAdio(ele){
	$('div').remove('#div'+ele);
 	gracacao.splice(ele, 1);
}
 