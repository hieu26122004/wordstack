export const getPOS = (word) => [
  ...new Set(word.definitions.map((definition) => definition.partOfSpeech)),
];

export const getPageNumbers = (totalPages, currentPage, maxVisible = 5) => {
  const pages = [];

  if (totalPages < maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + maxVisible - 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (start > 1) {
    pages.unshift("...");
    pages.unshift(1);
  }

  if (end < totalPages) {
    pages.push("...");
    pages.push(totalPages);
  }

  return pages;
};

export const playPronunciation = (word) => {
  if (word.pronunciationUrl) {
    const audio = new Audio(word.pronunciationUrl);
    audio.play().catch((error) => {
      console.log("There is an error during playing audio", error);
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = "en-US";
      utterance.volume = 1;

      const voices = speechSynthesis.getVoices();
      utterance.voice = voices.find((voice) => voice.lang === "en-US");
      speechSynthesis.speak(utterance);
    });
  } else {
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = "en-US";
    utterance.volume = 1;

    const voices = speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => voice.lang === "en-US");
    speechSynthesis.speak(utterance);
  }
};
