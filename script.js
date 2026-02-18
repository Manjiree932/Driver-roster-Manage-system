function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if(user === "admin" && pass === "1234") {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("rosterSection").style.display = "block";
    } else {
        document.getElementById("loginError").innerText = "Invalid Username or Password";
    }
}

function logout() {
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("rosterSection").style.display = "none";
}

function searchDriver() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let table = document.getElementById("rosterTable");
    let tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td");
        let found = false;

        for (let j = 0; j < td.length; j++) {
            if (td[j].innerText.toLowerCase().includes(input)) {
                found = true;
            }
        }

        tr[i].style.display = found ? "" : "none";
    }
}

function downloadCSV() {
    let table = document.getElementById("rosterTable");
    let rows = table.querySelectorAll("tr");
    let csv = [];

    rows.forEach(row => {
        let cols = row.querySelectorAll("td, th");
        let rowData = [];
        cols.forEach(col => rowData.push(col.innerText));
        csv.push(rowData.join(","));
    });

    let csvFile = new Blob([csv.join("\n")], { type: "text/csv" });
    let downloadLink = document.createElement("a");
    downloadLink.download = "driver_roster.csv";
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.click();
}