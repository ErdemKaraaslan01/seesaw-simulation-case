const plank = document.getElementById("plank");

plank.addEventListener("click", () => {
  console.log("plank clicked");
});

function randomWeight() {
  return Math.floor(Math.random() * 10) + 1;
}