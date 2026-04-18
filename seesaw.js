const plank = document.getElementById("plank");
const seesaw = document.getElementById("seesaw");

const PLANK_WIDTH = 400;
const CENTER = PLANK_WIDTH / 2;

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
        Math.min(30, (rightTorque - leftTorque)/100)
    );

    seesaw.style.transform = `rotate(${angle}deg)`;

    leftDisplay.innerText = `${leftWeight} kg`; 
    rightDisplay.innerText = `${rightWeight} kg`;  
    tiltDisplay.innerText = `${angle.toFixed(1)}°`;
}