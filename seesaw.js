const plank = document.getElementById("plank");
const seesaw = document.getElementById("seesaw");

const leftDisplay = document.getElementById("leftWeight");
const rightDisplay = document.getElementById("rightWeight");
const tiltDisplay = document.getElementById("tiltAngle");
const nextDisplay = document.getElementById("nextWeight");

const PLANK_WIDTH = 400;
const CENTER = PLANK_WIDTH / 2;

let objects = [];

let nextWeight = randomWeight();
nextDisplay.innerText = `${nextWeight} kg`;

function randomWeight() {
    return Math.floor(Math.random() * 10) + 1;
}

plank.addEventListener("click", (e) => {
    const rect = plank.getBoundingClientRect();
    const x = e.clientX - rect.left;

    const weight = nextWeight;

    objects.push({
        x: x,
        weight: weight
    });

    nextWeight = randomWeight();
    nextDisplay.innerText = `${nextWeight} kg`;

    render();
});


function render() {
    document.querySelectorAll(".weight").forEach(el => el.remove());

    let leftTorque = 0;
    let rightTorque = 0;
    let leftWeight = 0;
    let rightWeight = 0;

    objects.forEach(obj => {
        const el = document.createElement("div");
        el.className = "weight";
        el.style.left = obj.x + "px";
        el.innerText = obj.weight + "kg";

        seesaw.appendChild(el);

        const distance = Math.abs(obj.x - CENTER);

        if (obj.x < CENTER) {
            leftWeight += obj.weight;
            leftTorque += obj.weight * distance;
        } else {
            rightWeight += obj.weight;
            rightTorque += obj.weight * distance;
        }
    });

    const angle = Math.max(
        -30,
        Math.min(30, (rightTorque - leftTorque) / 100)
    );

    seesaw.style.transform = `rotate(${angle}deg)`;

    leftDisplay.innerText = `${leftWeight} kg`;
    rightDisplay.innerText = `${rightWeight} kg`;
    tiltDisplay.innerText = `${angle.toFixed(1)}°`;
}