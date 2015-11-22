var gracacao = [];



function addGravacao(item , del) {

	gracacao.push(item);

}


function getGravacao() {

	return gracacao ;

}


function mostraGravacao() {

	for (var i = gracacao.length - 1; i >= 0; i--) {

		$('#testea').append(gracacao[i]);

	};

}
function delAdio(ele){
	ele.hide();
}
