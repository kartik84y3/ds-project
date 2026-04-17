const BASE_URL = "https://ds-backend-vp3d.onrender.com";

function operate(op) {
    let type = document.getElementById("type").value;
    let value = document.getElementById("value").value;
    let pos = document.getElementById("position").value;

    let url = `${BASE_URL}/operate?type=${type}&op=${op}&value=${value}&pos=${pos}`;

    fetch(url)
        .then(res => res.text())
        .then(data => {
            document.getElementById("result").innerText = data;
        })
        .catch(err => {
            document.getElementById("result").innerText = "Error connecting to server";
        });
}