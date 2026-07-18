const hexText = document.getElementById("hexCode");
const rgbText = document.getElementById("rgbCode");
const colorInput = document.getElementById("colorInput");
const generateBtn = document.getElementById("generateBtn");
const swatches = document.querySelectorAll(".swatch");
const codeTexts = document.querySelectorAll(".code-text");

// Helper function to convert HEX to RGB
function hexToRgb(hex) {
  // Remove the # if it's there
  hex = hex.replace(/^#/, "");

  // Parse the string into Red, Green, and Blue integers
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  return `rgb(${r}, ${g}, ${b})`;
}

// Master function to update the page
function updateColor(newColor) {
  const upperColor = newColor.toUpperCase();
  const rgbString = hexToRgb(upperColor);

  document.body.style.backgroundColor = upperColor;

  hexText.textContent = upperColor;
  rgbText.textContent = rgbString;
  colorInput.value = upperColor;
}

// Random Hex Generator
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// --- Event Listeners ---

generateBtn.addEventListener("click", function () {
  updateColor(getRandomColor());
});

colorInput.addEventListener("input", function (event) {
  updateColor(event.target.value);
});

swatches.forEach(function (swatch) {
  swatch.addEventListener("click", function (event) {
    const selectedColor = event.target.getAttribute("data-color");
    updateColor(selectedColor);
  });
});

// Click-to-Copy Feature
codeTexts.forEach(function (element) {
  element.addEventListener("click", function (event) {
    const textToCopy = event.target.textContent;

    // Write the text to the system clipboard
    navigator.clipboard.writeText(textToCopy).then(() => {
      // Temporarily change the text to show it worked
      const originalText = event.target.textContent;
      event.target.textContent = "Copied! ✔";

      // Change it back after 1 second
      setTimeout(() => {
        event.target.textContent = originalText;
      }, 1000);
    });
  });
});
