function onButtonClick() {
  const modal = document.getElementById('confirmationModal');
  modal.visible = true;
}

modal = document.querySelector("confirmation-modal");
modal.addEventListener("cancel", function () {
  const cancelText = document.getElementById('cancelText')
  cancelText.style = "display: block;"
  const yesText = document.getElementById('yesText')
  yesText.style = "display: none;"
});

modal.addEventListener("yes", function () {
  const yesText = document.getElementById('yesText')
  yesText.style = "display: block;"
  const cancelText = document.getElementById('cancelText')
  cancelText.style = "display: none;"
});
