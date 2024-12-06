// Initialize Speech Synthesis
const textInput = document.getElementById("textInput");
const convertBtn = document.getElementById("convertBtn");
const voiceSelector = document.getElementById("voiceSelector");

const synth = window.speechSynthesis;

// Populate voices in the dropdown
function populateVoices() {
    const voices = synth.getVoices();
    voiceSelector.innerHTML = voices
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join("");
}

// Listen for voices change
synth.onvoiceschanged = populateVoices;

// Convert Text to Speech
convertBtn.addEventListener("click", () => {
    const text = textInput.value;
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoiceName = voiceSelector.value;

    // Set the selected voice
    const selectedVoice = synth.getVoices().find(voice => voice.name === selectedVoiceName);
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    synth.speak(utterance);
});

// Load voices when the page is ready
window.addEventListener("load", populateVoices);
