let drivers = [];

function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if(user === "admin" && pass === "1234") {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("rosterSection").style.display = "block";
        renderTable();
    } else {
        document.getElementById("loginError").innerText = "Invalid Username or Password";
    }
}

function logout() {
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("rosterSection").style.display = "none";
}

function saveDriver() {
    let name = document.getElementById("driverName").value;
    let vehicle = document.getElementById("vehicleNo").value;
    let route = document.getElementById("route").value;
    let shift = document.getElementById("shift").value;
    let editIndex = document.getElementById("editIndex").value;

    if(name === "" || vehicle === "" || route === "" || shift === "") {
        alert("Please fill all fields");
        return;
    }

    if(editIndex === "") {
        drivers.push({name, vehicle, route, shift});
    } else {
        drivers[editIndex] = {name, vehicle, route, shift};
        document.getElementById("editIndex").value = "";
    }

    clearForm();
    renderTable();
}

function renderTable() {
    let tbody = document.querySelector("#rosterTable tbody");
    tbody.innerHTML = "";

    drivers.forEach((driver, index) => {
        let row = `
            <tr>
                <td>${driver.name}</td>
                <td>${driver.vehicle}</td>
                <td>${driver.route}</td>
                <td>${driver.shift}</td>
                <td>
                    <button onclick="editDriver(${index})">Edit</button>
                    <button onclick="deleteDriver(${index})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function editDriver(index) {
    let driver = drivers[index];
    document.getElementById("driverName").value = driver.name;
    document.getElementById("vehicleNo").value = driver.vehicle;
    document.getElementById("route").value = driver.route;
    document.getElementById("shift").value = driver.shift;
    document.getElementById("editIndex").value = index;
}

function deleteDriver(index) {
    if(confirm("Are you sure you want to delete?")) {
        drivers.splice(index, 1);
        renderTable();
    }
}

function clearForm() {
    document.getElementById("driverName").value = "";
    document.getElementById("vehicleNo").value = "";
    document.getElementById("route").value = "";
    document.getElementById("shift").value = "";
}

function searchDriver() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let rows = document.querySelectorAll("#rosterTable tbody tr");

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    });
}

function downloadCSV() {
    let rows = document.querySelectorAll("#rosterTable tr");
    let csv = [];

    rows.forEach(row => {
        let cols = row.querySelectorAll("td, th");
        let rowData = [];
        cols.forEach(col => rowData.push(col.innerText));
        csv.push(rowData.join(","));
    });

    let blob = new Blob([csv.join("\n")], { type: "text/csv" });
    let link = document.createElement("a");
    link.download = "driver_roster.csv";
    link.href = window.URL.createObjectURL(blob);
    link.click();
}