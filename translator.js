// Function to translate text using Google Translation API
async function translate() {
    const inputText = document.getElementById('inputText').value;
    const targetLanguage = document.getElementById('targetLanguage').value;

    document.getElementById('output').innerText = 'Translating...';

    try {
        translatedText = await fetchTranslation(inputText, targetLanguage);
        document.getElementById('output').innerText = translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        document.getElementById('output').innerText = 'Translation error occurred. Please try again.';
    }
}

// Function to clear the translated output
function clearOutput() {
    document.getElementById('output').innerText = '';
    translatedText = '';
}

// Function to speak the translated text
function speak(text, language) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language; // Set the language for speech synthesis
    speechSynthesis.speak(utterance);
}

// Function to speak the translated text
function speakTranslatedText() {
    if (translatedText !== '') {
        const targetLanguage = document.getElementById('targetLanguage').value;
        speak(translatedText, targetLanguage);
    } else {
        alert('Please translate the text first.');
    }
}

// Function to fetch translation from Google Translation API
async function fetchTranslation(text, targetLanguage) {
    const apiKey = 'AIzaSyBdDQWJuV71QU-PY0Saqb3w06jA3PcU_TE'; // Replace with your Google Cloud Platform API key
    const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            q: text,
            target: targetLanguage,
        }),
    });

    const data = await response.json();
    if (data.error) {
        throw new Error(data.error.message);
    }

    return data.data.translations[0].translatedText;
}

// Event listeners for buttons
document.getElementById('translateButton').addEventListener('click', translate);
document.getElementById('speakButton').addEventListener('click', speakTranslatedText);
document.getElementById('clearButton').addEventListener('click', clearOutput);

let translatedText = ''; // Variable to store translated text
