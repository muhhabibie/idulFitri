function startWriting() {
  setTimeout(() => {
    fetch("./assets/data/arr_text.json")
      .then((res) => res.json())
      .then((arr_text) => {
        arr_text.unshift(getFirstGreetingText());
        let currentLetter = 0;
        let currentTextIndex = 0;
        let isChangedToNewTextIndex = false;
        writeText(arr_text, currentLetter, currentTextIndex, isChangedToNewTextIndex);
      })
      .catch(err => console.error("File JSON tidak ditemukan:", err));
  }, 1500);
}

function writeText(arr_text, currentLetter, currentTextIndex, isChangedToNewTextIndex) {
  const textWritingElement = document.querySelector(".text-writing");

  if (isChangedToNewTextIndex) {
    textWritingElement.innerHTML = "";
    currentLetter = 0;
    currentTextIndex = currentTextIndex == arr_text.length - 1 ? 0 : currentTextIndex + 1;
  }

  isChangedToNewTextIndex = false;
  const text = arr_text[currentTextIndex];

  if (currentLetter < text.length) {
    textWritingElement.innerHTML += text.charAt(currentLetter) == "|" ? "<br>" : text.charAt(currentLetter);

    if (currentLetter == text.length - 1) {
      isChangedToNewTextIndex = true;
    } else {
      currentLetter++;
    }
  }

  setTimeout(() => {
    writeText(arr_text, currentLetter, currentTextIndex, isChangedToNewTextIndex);
  }, isChangedToNewTextIndex ? 1500 : 100);
}

function getFirstGreetingText() {
  const name = getNameFromParam();
  return name ? `Saya ${name} |Mengucapkan` : "Ayang habibi Mengucapkan";
}

function getNameFromParam() {
  const params = new URL(document.location).searchParams;
  return params.get("name");
}

function closeEnvelope() {
  const envelopeWrapperElement = document.getElementById("envelope-wrapper");
  const textWritingElement = document.querySelector(".text-writing");
  const gifElement = document.getElementById("gif-lucu"); 
  
  const audio = new Audio("./assets/music/1.mp3");
  audio.loop = true;
  audio.play().catch(() => console.log("Audio play blocked."));

  if (gifElement) {
    gifElement.src = "./assets/images/bubu.gif";
    gifElement.classList.remove("d-none");
  }

  envelopeWrapperElement.style.display = 'none'; // Langsung hilangkan overlay
  textWritingElement.classList.remove("d-none");

  showKetupat();
  startWriting();
}

function showKetupat() {
  setTimeout(() => {
    const ketupatElements = document.querySelectorAll(".ketupat");
    ketupatElements.forEach(el => el.classList.add("show-ketupat"));
  }, 500);
}
