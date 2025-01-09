
const input = document.querySelector("textarea");
const wordCount = document.querySelector("[data-word-count]");
const characterCount = document.querySelector("[data-character-count]");

input.addEventListener("input", function () {
  if (input.value) {

    const wordsArray = input.value.split(" ").filter((word) => word !== "");
    wordCount.innerText = wordsArray.length;

    characterCount.innerText = input.value.length;

  } else {
    wordCount.innerText =
    characterCount.innerText =
    0;
  }
});
