const plank = document.getElementById("plank");
const seesaw = document.getElementById("seesaw");

let objects = [];

plank.addEventListener("click", (e) => {
    const rect = plank.getBoundingClientRect();
    const x = e.clientX - rect.left;

    const weight = randomWeight();

    objects.push({
        x: x,
        weight: weight
    });

    render();
});

function randomWeight() {
    return Math.floor(Math.random() * 10) + 1;
}

function render() {
    document.querySelectorAll(".weight").forEach(el => el.remove());

    objects.forEach(obj => {
        const el = document.createElement("div");
        el.className = "weight";
        el.style.left = obj.x + "px";
        el.innerText = obj.weight + "kg";

        seesaw.appendChild(el);
    });
}