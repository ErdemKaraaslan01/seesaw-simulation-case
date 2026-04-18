const plank = document.getElementById("plank");
let objects = []; 

plank.addEventListener("click", (e) => {
  const weight = randomWeight();

  objects.push({
    x: e.clientX,
    weight: weight
  });

  console.log(objects);
});

function randomWeight() {
  return Math.floor(Math.random() * 10) + 1;
}