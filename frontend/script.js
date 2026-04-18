const BASE_URL = "https://ds-backend-vp3d.onrender.com";

function operate(op) {
    let type = document.getElementById("type").value;
    let value = document.getElementById("value").value;
    let multi = document.getElementById("multiValues").value;
    let pos = document.getElementById("position").value;

    let requests = [];

    // MULTIPLE INSERT
    if (op == 1 && multi) {
        let values = multi.trim().split(/\s+/);

        values.forEach(v => {
            let url = `${BASE_URL}/operate?type=${type}&op=1&value=${v.trim()}`;
            requests.push(fetch(url).then(res => res.text()));
        });

        Promise.all(requests).then(() => {
            document.getElementById("result").innerText =
                `Inserted ${values.length} elements successfully`;
        });

        return;
    }

    // NORMAL OPERATION
    let url = `${BASE_URL}/operate?type=${type}&op=${op}&value=${value}&pos=${pos}`;

    document.getElementById("visual").innerHTML = "";
    
    fetch(url)
        .then(res => res.text())
        .then(data => {
            document.getElementById("result").innerText = data;
        })
        .catch(() => {
            document.getElementById("result").innerText = "Error connecting to server";
        });
}