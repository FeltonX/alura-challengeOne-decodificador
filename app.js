let elements = {
  inputText: document.querySelector("#inputText"),
  encryptButton: document.querySelector("#encrypt"),
  decryptButton: document.querySelector("#decrypt"),
  outputArea: document.querySelector("#inputForm"),
  copyButton: document.querySelector("#buttonForm"),
  textOne: document.getElementById("textOne"),
  textTwo: document.getElementById("textTwo"),
  imgIcon: document.getElementById("imgIcon"),
};

const mappings = {
  encrypt: { e: "enter", i: "imes", a: "ai", o: "ober", u: "ufat" },
  decrypt: { enter: "e", imes: "i", ai: "a", ober: "o", ufat: "u" },
};

function mapWord(word, type) {
  for (let key in mappings[type]) {
    let regex = new RegExp(key, "g");
    word = word.replace(regex, mappings[type][key]);
  }
  return word;
}

function toggleDisplay(showOutput, text = "") {
  elements.outputArea.style.display = showOutput ? "block" : "none";
  elements.outputArea.textContent = text;
  elements.copyButton.style.display = showOutput ? "block" : "none";
  
  elements.textOne.style.display = showOutput ? "none" : "block";
  elements.textTwo.style.display = showOutput ? "none" : "block";
  elements.imgIcon.style.display = showOutput ? "none" : "block";
}

function processText(type) {
  let userInput = (type === "encrypt") ? elements.inputText.value.trim() : elements.outputArea.textContent.trim();

  if (userInput === "") {
    alert(type === "encrypt" ? "Por favor, insira um texto antes de criptografar." : "Nenhum texto para descriptografar.");
    return;
  }

  if (!/^[a-z ]+$/.test(userInput)) {
    alert(type === "encrypt" ? "Por favor, digite apenas letras minúsculas." : "Texto inválido para descriptografia. Use apenas letras minúsculas e os caracteres especiais usados na criptografia.");
    return;
  }

  let result = userInput.split(" ").map(word => mapWord(word, type)).join(" ");
  toggleDisplay(true, result);
}

elements.encryptButton.addEventListener("click", () => processText("encrypt"));
elements.decryptButton.addEventListener("click", () => processText("decrypt"));

elements.copyButton.addEventListener("click", () => {
  let tempTextArea = document.createElement("textarea");
  tempTextArea.value = elements.outputArea.textContent;
  document.body.appendChild(tempTextArea);
  
  tempTextArea.select();
  document.execCommand("copy");
  alert("Texto copiado para a área de transferência");
  
  document.body.removeChild(tempTextArea);
});
