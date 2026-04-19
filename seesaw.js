const plank = document.getElementById("plank");
const seesaw = document.getElementById("seesaw");

const leftDisplay = document.getElementById("leftWeight");
const rightDisplay = document.getElementById("rightWeight");
const tiltDisplay = document.getElementById("tiltAngle");
const nextDisplay = document.getElementById("nextWeight");

const logDiv = document.getElementById("log");
const resetBtn = document.getElementById("resetBtn");

const PLANK_WIDTH = 400;
const CENTER = PLANK_WIDTH / 2;

let objects = JSON.parse(localStorage.getItem("seesaw")) || [];
let logs = JSON.parse(localStorage.getItem("seesawLogs")) || [];

let nextWeight = randomWeight();
nextDisplay.innerText = `${nextWeight} kg`;


plank.addEventListener("click", (element) => {
    const rect = plank.getBoundingClientRect();
    const x = element.clientX - rect.left;

    objects.push({
        x: x,
        weight: nextWeight
    });

    log(`${nextWeight}kg dropped at ${Math.round(x - CENTER)}px`);

    nextWeight = randomWeight();
    nextDisplay.innerText = `${nextWeight} kg`;


    render();
});

resetBtn.addEventListener("click", () => {

    objects = [];
    logs = [];
    localStorage.removeItem("seesaw");
    localStorage.removeItem("seesawLogs");

    logDiv.innerHTML = "";

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
        el.style.pointerEvents = "none";

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

    saveState();
}

function saveState() {
    localStorage.setItem("seesaw", JSON.stringify(objects));
    localStorage.setItem("seesawLogs", JSON.stringify(logs));
}

function log(text, isInitial = false) {
    const div = document.createElement("div");
    div.innerText = text;
    logDiv.prepend(div);

    if (!isInitial) {
        logs.push(text);
        saveState();
    }
}


function randomWeight() {
    return Math.floor(Math.random() * 10) + 1;
}

function init() {
    logs.forEach(msg => log(msg, true));
    render();
}

init();
