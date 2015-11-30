var gracacao = []; //Declarando Array
var b = 0; //Declarando Variável


function addGravacao(item) { //Função para Gravar Áudio

	var notificacao = {}; //Array
	notificacao['audio'] = item; //recebe Gravação
	notificacao['data'] = $('#comboData').val(); //Recebe o Valor da Data do Combobox
	notificacao['hora'] = $('#comboHora').val(); //Recebe o Valor da Hora do Combobox
	notificacao['hora'] += ':00'; //após receber a hora acrescenta os '00' atrás

	gracacao.push(notificacao); //método 'Push', adiciona um novo elemento ao Array
	console.log(notificacao); //Exibe gravação Armazenada e 
}							// suas respectivas Configurações (Data, Hora)		


function getGravacao() { //retorna os array com os audios

	return gracacao ;
}


function mostraGravacao() { //Função para retornar as Gravações de áudio

if (gracacao.length == 0) { //Verifica se o Array está vazio. Caso esteja exiba mensagem...
	
	MensagemSemArmazenaGravacao();//Exibem Mensagem

} else {		 

	MensagemHaGravacaoArmazenada(); //esconde mensagem...

	for (var i = gracacao.length - 1; i >= 0; i--) { //loop For

		$('<div>', {
		    id: 'div'+i,
		    class: 'col-md-12',
		}).appendTo('#testea'); //   JQuery cria elemento HTML e adiciona o mesmo 
								// dentro de outro elemento HTML de id "#testea"
		$('<div>', {
		    id: 'div2'+i,
		    class: 'center',
		    text:gracacao[i]['data']+" "+gracacao[i]['hora']
		}).appendTo('#div'+i);

		$('#div2'+i).append(gracacao[i]['audio']);

		$('<button>', {
		    id: 'div'+i,
		    class: 'button-red button font-google',
		    text: 'DELETAR',
		    'onClick':'delAdio("'+i+'")'
		}).appendTo('#div'+i);
	};
}
}

function delAdio(ele){ //função para Deletar Gravação
	$('div').remove('#div'+ele);
 	gracacao.splice(ele, 1);	
}
 
 function MensagemSemArmazenaGravacao(){
 	$('#MenssagensGravacoes').show();
 }

function MensagemHaGravacaoArmazenada(){
 	$('#MenssagensGravacoes').hide();
 }

