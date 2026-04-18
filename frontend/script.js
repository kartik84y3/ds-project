const BASE_URL = "https://ds-backend-vp3d.onrender.com";

async function operate(op) {
    let type = document.getElementById("type").value;
    let value = document.getElementById("value").value;
    let multi = document.getElementById("multiValues").value;
    let pos = document.getElementById("position").value;

    let requests = [];

    // MULTIPLE INSERT
    if (op == 1 && multi) {
        let values = multi.trim().split(/\s+/);

        for (let v of values) {
            let url = `${BASE_URL}/operate?type=${type}&op=1&value=${v.trim()}`;
            await fetch(url);
        }

        Promise.all(requests).then(() => {
            document.getElementById("result").innerText =
                `Inserted ${values.length} elements successfully`;
        });

        return;
    }
function updateVisual(type, data) {
    let visual = document.getElementById("visual");

    if (!data) return;

    let items = data.trim().split(" ");

    visual.innerHTML = "";

    // STACK
    if (type == 1) {
        visual.style.flexDirection = "column";
        items = items.reverse();  // ONLY stack
    }

    // QUEUE
    else if (type == 2) {
        visual.style.flexDirection = "row";
    }

    // LINKED LIST
    else {
        visual.style.flexDirection = "column";
    }

    items.forEach((val, index) => {
        if (val === "") return;

        let div = document.createElement("div");
        div.className = "block";
        div.innerText = val;

        visual.appendChild(div);
        if (type == 3 && index < items.length - 1) {
            let arrow = document.createElement("div");
            arrow.innerText = "↓";
            arrow.style.fontSize = "20px";
            arrow.style.margin = "5px";
            visual.appendChild(arrow);
        }
    });
}
    // NORMAL OPERATION
    let url = `${BASE_URL}/operate?type=${type}&op=${op}&value=${value}&pos=${pos}`;

    document.getElementById("visual").innerHTML = "";

    fetch(url)
        .then(res => res.text())
        .then(data => {
            document.getElementById("result").innerText = data;

            if (op == 3) {  // only when PRINT is clicked
                updateVisual(type, data);
            }
        })
        .catch(() => {
            document.getElementById("result").innerText = "Error connecting to server";
        });
}