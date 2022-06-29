// const JSONData={"id":"1","reports":[{"startDate":"2022-10-01","endDate":"2022-10-02","city":"jerusalem","location":"hotel"},
// {"startDate":"2022-10-01","endDate":"2022-10-02","city":"jerusalem","location":"Mamilla hotel"}]};

var allReports = [{ "id": "1", "reports": [{ "startDate": "2022-10-01", "endDate": "2022-10-02", "city": "jerusalem", "location": "hotel" }, { "startDate": "2023-10-01", "endDate": "2023-10-02", "city": "TLV", "location": "hotel" }] }
    , { "id": "2", "reports": [{ "startDate": "2021-10-01", "endDate": "2021-10-02", "city": "jerusalem", "location": "hotel1" }, { "startDate": "2024-10-01", "endDate": "2023-10-02", "city": "TLV", "location": "hotel" }] }]

window.onpageshow = onPageLoad();



function onPageLoad() {
    //adding an event to the search input
    var input = document.getElementById('search');
    input.addEventListener("focusout", search);
    // adding an event to the view button
    var btn = document.getElementById("view");
    btn.addEventListener("click", viewLocations);
    sortByDate();

}
function search() {
    let searchReports = [];
    var input = document.getElementById('search');
    var searchData = input.value.toLowerCase();
    //  input.addEventListener('click', () => {

    allReports.forEach(patient => {
        patient.reports.filter(report => {
            if (report.city.toLowerCase().includes(searchData)) {
                searchReports.push(report);
            }
        })
    });
    cleanTable();
    uploadData(searchReports);
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
    else {
        //alert('Ther is no location')
    }
};
// || student.lName.toLowerCase().includes(searchData)
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