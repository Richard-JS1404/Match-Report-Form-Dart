const canvas = document.querySelector("canvas");
const form = document.querySelector(".submit-btn");
const closeBtn = document.querySelector(".close-btn");
const clearButton = document.querySelector(".clear-btn");
const ctx = canvas.getContext("2d");
let writingMode = false;
const body = document.querySelector("body");

const openDialog = document.querySelectorAll(".signature");
const dialogPad = document.querySelector(".signatureDialog");

openDialog.forEach((el) => {
  el.addEventListener("click", () => {
    dialogPad.showModal();
    appendImage(el);
    console.log(el);
  });
});

function appendImage(targetEl) {
  form.addEventListener("click", (event) => {
    event.preventDefault();

    const imageURL = canvas.toDataURL();
    const image = document.createElement("img");
    image.src = imageURL;
    image.height = "50";
    image.width = "250";
    image.style.backgroundColor = "none";

    // image.style.display = "flex";
    targetEl.appendChild(image);
    clearPad();
    dialogPad.close();
  });
}
// close Button
closeBtn.addEventListener("click", () => {
  dialogPad.close();
});

const clearPad = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
};

clearButton.addEventListener("click", (event) => {
  event.preventDefault();
  clearPad();
});

const getTargetPosition = (event) => {
  const positionX = event.clientX - event.target.getBoundingClientRect().x;
  const positionY = event.clientY - event.target.getBoundingClientRect().y;

  return [positionX, positionY];
};

const handlePointerMove = (event) => {
  if (!writingMode) return;

  const [positionX, positionY] = getTargetPosition(event);
  ctx.lineTo(positionX, positionY);
  ctx.stroke();
};
const handlePointerUp = () => {
  writingMode = false;
};

const handlePointerDown = (event) => {
  writingMode = true;
  ctx.beginPath();

  const [positionX, positionY] = getTargetPosition(event);
  ctx.moveTo(positionX, positionY);
};

ctx.lineWidth = 3;
ctx.lineJoin = ctx.lineCap = "round";

canvas.addEventListener("pointerdown", handlePointerDown);
canvas.addEventListener("pointerup", handlePointerUp);
canvas.addEventListener("pointermove", handlePointerMove);
