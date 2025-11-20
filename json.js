let speechKey = "";
let speechRegion = "";
let translatorKey = "";
let translatorRegion = "";
const translatorEndpoint =
  "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0";

let lastTranslatedText = "";
let translationTimeout = null;
let recognizer = null;
let isMicMuted = false;

function saveCredentials() {
  const configStatus = document.getElementById("configStatus");

  speechKey = document.getElementById("inputSpeechKey").value.trim();
  speechRegion = document.getElementById("inputSpeechRegion").value.trim();
  translatorKey = document.getElementById("inputTranslatorKey").value.trim();
  translatorRegion = document
    .getElementById("inputTranslatorRegion")
    .value.trim();

  // Validar que todos los campos estén llenos
  if (!speechKey || !speechRegion || !translatorKey || !translatorRegion) {
    configStatus.innerText = "❌ Por favor completa todos los campos";
    configStatus.style.color = "#f44336";
    return;
  }

  configStatus.innerText = "✓ Credenciales guardadas";
  configStatus.style.color = "#4CAF50";

  // Ocultar panel de configuración y mostrar controles
  setTimeout(() => {
    document.getElementById("configPanel").classList.add("hidden");
    document.getElementById("controlMenu").classList.remove("hidden");
  }, 1000);
}

function showConfig() {
  // Detener reconocimiento si está activo
  if (recognizer && !isMicMuted) {
    recognizer.stopContinuousRecognitionAsync();
  }

  // Mostrar panel de configuración
  document.getElementById("configPanel").classList.remove("hidden");
  document.getElementById("controlMenu").classList.add("hidden");

  // Restaurar valores en el formulario
  document.getElementById("inputSpeechKey").value = speechKey;
  document.getElementById("inputSpeechRegion").value = speechRegion;
  document.getElementById("inputTranslatorKey").value = translatorKey;
  document.getElementById("inputTranslatorRegion").value = translatorRegion;
}

async function translateText(text, toLang) {
  try {
    if (!translatorKey || translatorKey === "") {
      console.error("Credenciales no configuradas");
      return "[Configura las credenciales de Azure]";
    }

    const url = `${translatorEndpoint}&to=${toLang}`;
    console.log("Traduciendo:", text, "al idioma:", toLang);

    const headers = {
      "Ocp-Apim-Subscription-Key": translatorKey,
      "Content-Type": "application/json",
    };

    if (translatorRegion && translatorRegion !== "") {
      headers["Ocp-Apim-Subscription-Region"] = translatorRegion;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify([{ Text: text }]),
    });

    console.log("Status de respuesta:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error HTTP:", response.status, errorText);
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("Respuesta de traducción:", data);
    return data[0].translations[0].text;
  } catch (error) {
    console.error("Error detallado en traducción:", error);
    return `[Error: ${error.message}]`;
  }
}

async function start() {
  const startBtn = document.getElementById("startBtn");
  const statusDiv = document.getElementById("status");

  startBtn.disabled = true;
  statusDiv.innerText = "Iniciando...";

  try {
    // --- INICIAR CÁMARA ---
    const video = document.getElementById("cam");
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    video.srcObject = stream;

    // --- RECONOCIMIENTO DE VOZ ---
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      speechKey,
      speechRegion
    );
    speechConfig.speechRecognitionLanguage = "es-ES";

    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    // Evento para texto parcial (mientras hablas)
    recognizer.recognizing = (s, e) => {
      const text = e.result.text;
      if (text) {
        document.getElementById("original").innerText = text;

        if (translationTimeout) {
          clearTimeout(translationTimeout);
        }

        translationTimeout = setTimeout(async () => {
          if (text.length > 3) {
            const lang = document.getElementById("targetLang").value;
            const translated = await translateText(text, lang);
            document.getElementById("translated").innerText = translated;
          }
        }, 500);
      }
    };

    // Evento para texto final (cuando terminas de hablar)
    recognizer.recognized = async (s, e) => {
      if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
        const text = e.result.text;
        if (text && text !== lastTranslatedText) {
          document.getElementById("original").innerText = text;

          const lang = document.getElementById("targetLang").value;
          const translated = await translateText(text, lang);
          document.getElementById("translated").innerText = translated;

          lastTranslatedText = text;
        }
      }
    };

    recognizer.canceled = (s, e) => {
      console.error("Reconocimiento cancelado:", e.errorDetails);
      statusDiv.innerText = "Error: " + e.errorDetails;
    };

    recognizer.startContinuousRecognitionAsync(
      () => {
        statusDiv.innerText = "✓ Funcionando";
        document.getElementById("micBtn").disabled = false;
        console.log("Reconocimiento iniciado");
      },
      (err) => {
        statusDiv.innerText = "Error al iniciar";
        console.error("Error:", err);
        startBtn.disabled = false;
      }
    );
  } catch (error) {
    console.error("Error:", error);
    statusDiv.innerText = "Error: " + error.message;
    startBtn.disabled = false;
  }
}

function toggleMic() {
  const micBtn = document.getElementById("micBtn");

  if (!recognizer) {
    return;
  }

  if (isMicMuted) {
    // Activar micrófono
    recognizer.startContinuousRecognitionAsync(
      () => {
        isMicMuted = false;
        micBtn.innerText = "🎤 Mutear";
        micBtn.style.background = "#f44336";
        document.getElementById("status").innerText = "✓ Funcionando";
        console.log("Micrófono activado");
      },
      (err) => {
        console.error("Error al activar:", err);
      }
    );
  } else {
    // Desactivar micrófono
    recognizer.stopContinuousRecognitionAsync(
      () => {
        isMicMuted = true;
        micBtn.innerText = "🔇 Activar";
        micBtn.style.background = "#4CAF50";
        document.getElementById("status").innerText = "Micrófono muteado";
        document.getElementById("original").innerText = "";
        document.getElementById("translated").innerText = "";
        console.log("Micrófono muteado");
      },
      (err) => {
        console.error("Error al mutear:", err);
      }
    );
  }
}