window.onload = () => {

  "use strict";

  const colorPicker = document.getElementById("color-picker");
  let td = document.querySelectorAll(".pixel-grid td");

  class Active {
    constructor (element) {
      this.element = element;
    }
    holdClicking(color) {
      td = document.querySelectorAll(".pixel-grid td");
      // Continue Action when hold clicking
      window.onmousedown = () => {
        td.forEach((elem) => {
          elem.onmousemove = () => elem.style.backgroundColor = color;
        });
      };
      // Stop Action when stop clicking
      window.onmouseup = () => {
        td.forEach((elem) => {
          elem.onmousemove = () => {};
        });
      };
    }
    toggleActive(color) {
      let sieblings = Array.from(this.element.parentElement.children); // Convert constructor from HTMLCollection to Array
      if (this.element.classList.contains("active") === false) {
        sieblings.forEach((elem) => {
          elem.classList.remove("active"); // Remove class active from all sieblings
        });
        this.element.classList.add("active"); // Add class active to the specified button
        this.holdClicking(color);
      } else {
        this.element.classList.remove("active");
        window.onmousedown = () => {};
      }
    }
  }

  const drawButton = new Active(document.getElementById("draw-button"));

  // Click on pen icon make you draw
  drawButton.element.onclick = () => {
    drawButton.toggleActive(colorPicker.value);
    colorPicker.addEventListener("change", () => drawButton.toggleActive(colorPicker.value));
    colorInput.addEventListener("input", () => drawButton.toggleActive(colorPicker.value));
  };

  const eraserButton = new Active(document.getElementById("eraser-button"));

  // Click on it make you erase
  eraserButton.element.onclick = () => {
    eraserButton.toggleActive("#ffffff");
  };

};