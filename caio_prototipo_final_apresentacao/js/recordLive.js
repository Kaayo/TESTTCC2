var audio_context,
    recorder,
    volume,
    volumeLevel = 0,
    currentEditedSoundIndex;

  $('#frac').hide(); //Oculta 'div' (HTML5)
 
function startUserMedia(stream) { //Verifica é possível utilizar o microfone
  var input = audio_context.createMediaStreamSource(stream);
  console.log('Objeto de Media Stream Criado com Sucesso!.'); //Exibe Mensagem na tela

  volume = audio_context.createGain();
  volume.gain.value = volumeLevel;
  input.connect(volume);
  volume.connect(audio_context.destination);
  console.log('Entrada de Áudio Conectada com Sucesso!.');
  
  recorder = new Recorder(input); //Declarando novo objeto de Áudio (entrada)
  console.log('Gravação Iniciada!.');
}

// function changeVolume(value) { //Elemento de Volume
//   if (!volume) return;
//   volumeLevel = value;
//   volume.gain.value = value;
// }

function startRecording(button) { //Função para Gravação de Áudio
  
  if ( ($('#comboData').val() == "") || ($('#comboHora').val() == "Horário") ) { //Caso não seja setado um horário e data antes da gravação, faça...

    $('#MensagemCamposInvalidos').show(); //Exibe Mensagem de campos inválidos
  
    $("#MensagemCamposInvalidos" ).delay(650).fadeOut( "slow", function() {
    // Animation complete.
  });

  } else {

    $('#MensagemCamposInvalidos').hide(); //Oculta Mensagem de campos inválidos

    recorder && recorder.record(); //objetivo de som

    $('#rec').hide(); //Esconde elemento HTML
    $('#stop').show(); //Exibe Elemento HTML

    $('#frac').fadeTo('slow', 0.5).fadeTo('slow', 1.0); //Faz a Imagem do Menu de Gravação Esmaecer

    console.log('Gravando...');
  }
}

function stopRecording(button) { //Salvando Gravação
  recorder && recorder.stop();
  
  $('#stop').hide(); //Esconde elemento HTML
  $('#rec').show(); //Exibe Elemento HTML
  
  $('#frac').fadeTo('slow', 0.5).fadeTo('slow', 1.0); //Faz a Imagem do Menu de Gravação Esmaecer

  console.log('Gravação Finalizada!');
  
  // create WAV download link using audio data blob
  createDownloadLink(); //funcionando!!!
  
  recorder.clear(); //limpa o objeto
}

function createDownloadLink() {
  currentEditedSoundIndex = -1;
  recorder && recorder.exportWAV(handleWAV.bind(this));
}

function handleWAV(blob) {
  var tableRef = document.getElementById('recordingslist');
  if (currentEditedSoundIndex !== -1) {

    $('#recordingslist tr:nth-child(' + (currentEditedSoundIndex + 1) + ')').remove();

  }

  var url = URL.createObjectURL(blob);
  var newRow   = tableRef.insertRow(currentEditedSoundIndex);
  newRow.className = 'soundBite';
  var audioElement = document.createElement('audio'); //criar um eleemnt HTML de audio

  var downloadAnchor = document.createElement('a');
   
  audioElement.controls = true;
  audioElement.src = url;

  downloadAnchor.href = url;
  downloadAnchor.download = new Date().toISOString() + '.wav';
  downloadAnchor.innerHTML = 'Download';
  downloadAnchor.className = 'btn btn-primary';

  //adiciona um novo audio no array
  addGravacao(audioElement); // joga elemento HTML dentro do Array 
}

window.onload = function init() {
  try {
    // Verificar o Tipo de Microfone
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.mozURL;
    
    audio_context = new AudioContext();
    console.log('Entrada de Audio OK!.');
    console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
  } catch (e) {
    console.warn('Dispositivo Não tem Suporte a Microfone!');
  }
  
  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
    console.warn('Sem Áudio: ' + e);
  });
};