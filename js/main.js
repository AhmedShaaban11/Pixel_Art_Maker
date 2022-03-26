window.onload = () => {
  
  "use strict";
  
  // Variables
  const pixelGrid = document.getElementById("pixel-grid"),
    heightPicker = document.getElementById("height-picker"),
    widthPicker = document.getElementById("width-picker"),
    colorInput = document.getElementById("color-input"),
    colorPicker = document.getElementById("color-picker"),
    makeButton = document.getElementById("make-button");
  let tr, td;

  // Prevent drag and drop to pixelGrid
  pixelGrid.ondragstart = () => false;
  pixelGrid.ondrop = () => false;

  // Change the default value of color-picker
  colorPicker.value = "#00ff00";

  // onchange in colorPicker value change the value of colorInput to colorPicker value
  colorPicker.onchange = () => colorInput.value = colorPicker.value;
  
  // oninput in colorInput change the value of colorPicker to colorInput value
  colorInput.oninput = () => colorPicker.value = colorInput.value;
  
  // Make the pixelGrid
  makeButton.onclick = () => {
    pixelGrid.innerHTML = ""; // Empty the PixelGrid from any child

    // Append tr elements in pixelGrid based on heightPicker value
    for (let h = 1; h <= heightPicker.value; h++) {
      pixelGrid.appendChild(document.createElement("tr"));
    }

    tr = document.querySelectorAll(".pixel-grid tr");
    
    // Append td elements in tr elements based on widthPicker value
    tr.forEach((elem) => {
      for(let w = 1; w <= widthPicker.value; w++) {
        elem.appendChild(document.createElement("td"));
      }
    });

    td = document.querySelectorAll(".pixel-grid td");

    // Change the background color of clicked td to colorPicker value or to white for dblclicked td
    td.forEach((elem) => {
      elem.onclick = () => elem.style.backgroundColor = colorPicker.value;
      elem.ondblclick = () => elem.style.backgroundColor = "#ffffff";
    });
  };
  
  // Toggle active function for draw and erase buttons
  const toggleActive = (buttonName) => {
    if (buttonName.classList.contains("active") === false) {
      document.querySelectorAll(".options-buttons").forEach((elem) => {
        elem.classList.remove("active"); // Remove class active from all sieblings
      });
      buttonName.classList.add("active"); // Add class active to the specified button
      return true;
    } else {
      buttonName.classList.remove("active");
      window.onmousedown = () => {};
      return false;
    }
  };

  // Hold clicking function for draw and erase buttons
  const holdClicking = (color) => {
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
  };

  const drawButton = document.getElementById("draw-button");

  // Click on pen icon make you draw
  drawButton.onclick = function () {
    if (toggleActive(this) === true) {
      holdClicking(colorPicker.value)
      colorPicker.addEventListener("change", () => holdClicking(colorPicker.value));
      colorInput.addEventListener("input", () => holdClicking(colorPicker.value));
    }
  };

  const eraserButton = document.getElementById("eraser-button");

  // Click on it make you erase
  eraserButton.onclick = function () {
    if (toggleActive(this) === true) {
      holdClicking("#ffffff");
    }
  };

  const eraseAllButton = document.getElementById("erase-all-button");

  // Erase all colors from all td elements
  eraseAllButton.onclick = () => {
    td.forEach((elem) => elem.style.backgroundColor = "#ffffff");
  };
  
  const root = document.documentElement,
    zoomIn = document.getElementById("zoom-in-button"),
    zoomOut = document.getElementById("zoom-out-button");
  let tdDimensions = parseInt(getComputedStyle(document.body).getPropertyValue("--td-dimensions"));
  
  // Increment the value of css variable (--td-dimensions) when click on zoom-in
  zoomIn.onclick = () => {
    tdDimensions++;
    root.style.setProperty("--td-dimensions", `${tdDimensions}px`);
  };

  // Decrement the value of css variable (--td-dimensions) when click on zoom-out
  zoomOut.onclick = () => {
    tdDimensions--;
    root.style.setProperty("--td-dimensions", `${tdDimensions}px`);
  };
  
  const downloadButton = document.getElementById("download-button"),
    downloadLink = document.getElementById("download-link");
  
  // convert the pixelGrid using html2canvas to image then download it
  downloadButton.onclick = () => {
    html2canvas(pixelGrid).then((canvas) => {
      downloadLink.href = canvas.toDataURL("image/png");
      downloadLink.click();
    });
  };
  
};
