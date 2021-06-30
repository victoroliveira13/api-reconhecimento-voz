document.addEventListener("DOMContentLoaded", function () {

  button = document.querySelector('button');
  text = document.querySelector(".text");

  const recognition = createRecognition();
  let listening = false;

  button.addEventListener('click', e => {
    if (!recognition) return;

    listening ? recognition.stop() : recognition.start();

    button.innerHTML = listening ? '<i class="fas fa-microphone-alt"></i> Começar a gravar...' : '<i class="fas fa-stop-circle"></i> Parar de gravar.'
    button.classList.toggle('btn-danger');
  });

  function createRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null;

    if (!recognition) {
      text.innerHTML = "Browser não suporta!";
      return null;
    }

    recognition.lang = "pt_BR";
    recognition.onstart = () => listening = true;
    recognition.onend = () => listening = false;
    recognition.onerror = e => console.log("erro:", e.error);
    recognition.onresult = e => {
      text.innerHTML = e.results[0][0].transcript;
      button.innerHTML = listening ? '<i class="fas fa-microphone-alt"></i> Começar a gravar...' : '<i class="fas fa-stop-circle"></i> Parar de gravar.'
      button.classList.remove('btn-danger');
    }

    return recognition;
  }

});