
var allReports = [];
window.onpageshow = onPageLoad();

function onPageLoad() {
    fetch(`https://localhost:44374/api/Patient/location`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
        .then(data => {
            allReports = data;
        }).then(() => allReports.forEach(patient => uploadData(patient.reports)));
    //adding an event to the search input
    var input = document.getElementById('search');
    input.addEventListener("focusout", search);
    // adding an event to the view button
    var btn = document.getElementById("view");
    btn.addEventListener("click", viewLocations);
    sortByDate();

}
function search() {
    var searchReports = [];
    var input = document.getElementById('search');
    var city = input.value.toLowerCase();
    fetch(`https://localhost:44374/api/Patient/city/location?city=${city}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
        .then(data => {
            searchReports = data;
        })
        .then(() => {
            cleanTable();
            uploadData(searchReports);
        })
}

function cleanTable() {
    //finding the table
    var table = document.querySelector('table');
    //finding all the rows in the table
    var trs = document.querySelectorAll('tr');
    //delete all the rows from the table
    trs.forEach((tr, i) => {
        if (i != 0) {
            table.removeChild(tr);
        }
    })
}

function uploadData(allReports) {
    //finding the table
    if (allReports[0]) {
        var table = document.querySelector('table');
        //loop to load all the reports
        allReports.forEach(report => {
            //adding a row
            var row = document.createElement('tr');
            // adding a column startDate
            var startDate = document.createElement('td');
            var startDateNode = document.createTextNode(report.startDate);
            startDate.appendChild(startDateNode)
            row.appendChild(startDate);
            // adding a column endDate
            var endDate = document.createElement('td');
            var endDateNode = document.createTextNode(report.endDate);
            endDate.appendChild(endDateNode)
            row.appendChild(endDate);
            // adding a column location
            var location = document.createElement('td');
            var locationNode = document.createTextNode(report.location);
            location.appendChild(locationNode)
            row.appendChild(location);
            //adding the new row to the table
            table.appendChild(row);
        })
    }
};
function sortByDate() {
    let reportsToSort = []
    allReports.forEach(patient => {
        patient.reports.forEach(report => {
            reportsToSort.push(report)
        })
    })
    reportsToSort.sort(function (a, b) {
        return ((new Date(b.startDate).getTime() - new Date(a.startDate).getTime()))
    });
    console.log(reportsToSort);
    uploadData(reportsToSort);
}
function viewLocations() {
    window.location.href = "./viewPath.html"
}