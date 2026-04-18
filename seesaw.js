const plank = document.getElementById("plank");
const seesaw = document.getElementById("seesaw");

let objects = []; 

plank.addEventListener("click",  (e) => {
  const weight = randomWeight();

  objects.push({
    x: e.clientX,
    weight: weight
  });

  render();
});

function randomWeight() {
  return Math.floor(Math.random() * 10) + 1;
}

function render() {
  objects.forEach(obj => {
    const el = document.createElement("div");
    el.className = "weight";
    el.style.left = obj.x + "px";
    el.innerText = obj.weight + "kg";

    seesaw.appendChild(el);
  });
}