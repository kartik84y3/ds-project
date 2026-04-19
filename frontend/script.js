document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("type").addEventListener("change", () => {
        let type = document.getElementById("type").value;
        let insertType = document.getElementById("insertType");

        if (type == 3) {
            insertType.style.display = "block";
        } else {
            insertType.style.display = "none";
        }
    });

});
document.getElementById("insertType").addEventListener("change", () => {
    let insertType = document.getElementById("insertType").value;
    let position = document.getElementById("position");

    if (insertType === "pos") {
        position.style.display = "block";
    } else {
        position.style.display = "none";
    }
});

const BASE_URL = "https://ds-backend-vp3d.onrender.com";

async function operate(op) {
    let type = document.getElementById("type").value;
    let value = document.getElementById("value").value;
    let multi = document.getElementById("multiValues").value;
    let pos = document.getElementById("position").value;

    // ===== MULTIPLE INSERT =====
    if (op == 1 && multi) {
        let values = multi.trim().split(/\s+/);

        for (let v of values) {
            let url = `${BASE_URL}/operate?type=${type}&op=1&value=${v.trim()}`;
            await fetch(url);
        }

        document.getElementById("result").innerText =
            `Inserted: ${values.join(" ")}`;

        return;
    }

    // ===== NORMAL OPERATION =====
    let url = `${BASE_URL}/operate?type=${type}&op=${op}&value=${value}&pos=${pos}`;

    document.getElementById("visual").innerHTML = "";

    fetch(url)
        .then(res => res.text())
        .then(data => {
            document.getElementById("result").innerText = data;

            // Only visualize on PRINT
            if (op == 3) {
                updateVisual(type, data);
            }
        })
        .catch(() => {
            document.getElementById("result").innerText = "Error connecting to server";
        });
}


// ===== VISUALIZATION FUNCTION =====
function updateVisual(type, data) {
    let visual = document.getElementById("visual");

    if (!data) return;

    let items = data.trim().split(" ").filter(x => x !== "");

    visual.innerHTML = "";

    // ===== STACK =====
    if (type == 1) {
        visual.style.display = "flex";
        visual.style.flexDirection = "column";

        items.forEach((val, index) => {
            let div = document.createElement("div");
            div.className = "block";
            div.innerText = val;

            // Mark TOP
            if (index === 0) {
                div.style.background = "#ff6b6b";
                div.innerText = val + " (TOP)";
            }

            visual.appendChild(div);
        });
    }

    // ===== QUEUE =====
    else if (type == 2) {
        visual.style.display = "flex";
        visual.style.flexDirection = "row";
        visual.style.alignItems = "center";

        items.forEach((val, index) => {
            let div = document.createElement("div");
            div.className = "block";
            div.innerText = val;

            visual.appendChild(div);

            if (index < items.length - 1) {
                let arrow = document.createElement("div");
                arrow.innerText = "→";
                arrow.style.margin = "0 8px";
                visual.appendChild(arrow);
            }
        });
    }

    // ===== LINKED LIST =====
    else {
        visual.style.display = "flex";
        visual.style.flexDirection = "column";
        visual.style.alignItems = "center";

        items.forEach((val, index) => {
            let div = document.createElement("div");
            div.className = "block";
            div.innerText = val;

            visual.appendChild(div);

            if (index < items.length - 1) {
                let arrow = document.createElement("div");
                arrow.innerText = "↓";
                arrow.style.margin = "5px";
                visual.appendChild(arrow);
            }
        });
    }
}