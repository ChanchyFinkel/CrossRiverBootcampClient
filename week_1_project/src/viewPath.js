import { Report } from './report.js';
import { Patient } from './patient.js';
//import * as fs from 'http://example.com/fs';
// import { fs} from './fs.js';
//const fs = require('fs');

//DB array
var allPatients = [];
window.onpageshow = createTableReport();
async function createTableReport() {

    //create a table for each patient with his reports - according his id
    var id = document.getElementById('id');
    //add event to the id input that clean the old data
    //and drow the data that bloungth the current patient
    id.addEventListener('change', () => {
        cleanTable();
        if (id.value) {
            fetch(`https://localhost:44374/api/Patient/${id.value}/location`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(response => response.json())
                .then(data => {
                    allPatients.push(data);
                    data.reports.forEach(report => {
                        uploadData(report);
                    })
                });
            //adding an event to the add button
            var btn = document.getElementById("add");
            btn.addEventListener("click", addReport);

        }
    })
    // adding an event to the view button
    var btn = document.getElementById("view");
    btn.addEventListener("click", viewLocations);
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

function addReport() {
    // the patient want to add new report
    //creating a new report
    var currPatient = createReport();
    if (currPatient)
        //drowing the new report
        uploadData(currPatient.reports[currPatient.reports.length - 1]);
}

function createReport() {
    //finding all the details the patient enter
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    var city = document.getElementById('city').value;
    var location = document.getElementById('location').value;
    var id = document.getElementById('id').value;
    if (!id) {
        //not a valied action
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'you must enter id!!',
            showConfirmButton: false
        })
        document.getElementById("btn").display = true;
        return null;
    }
    else {
        //creting the report
        var newReport = new Report(startDate, endDate, city, location);
        var newPatient = new Patient(id, newReport);
        fetch(`https://localhost:44374/api/Patient/location`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPatient)
        }).then(response =>
            response.json())
            .then(data =>
                newPatient = data)
        return newPatient;      // //finding whiche patient enter
    }
}

function uploadData(report) {
    //finding the table
    var table = document.querySelector('table');
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
    // adding a column city
    var city = document.createElement('td');
    var cityNode = document.createTextNode(report.city);
    city.appendChild(cityNode)
    row.appendChild(city);
    // adding a column deleted 
    var deleted = document.createElement('td');
    var deletedbtn = document.createElement('button');
    var deleteNode = document.createTextNode("X");
    deleted.appendChild(deletedbtn)
    deletedbtn.appendChild(deleteNode);
    row.appendChild(deleted);
    // adding an event handler to the delete button
    deleted.addEventListener('click', (ele) => {
        // delete the selected  row from the table
        table.removeChild(ele.target.parentNode.parentNode);
        // delete the selected row from the DB
        deleteReport(report)
    });
    //adding the new row to the table
    table.appendChild(row);
}

function deleteReport(report) {
    //finding the id of the patient
    var id = document.getElementById('id').value;
    var newPatient = new Patient(id, report);
    fetch(`https://localhost:44374/api/Patient/location`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPatient)
    }).then(response =>
        response.json())
        .then(data => {
            if(data == -1)
            alert("Not Valid Action")
        })
}
function viewLocations() {
    window.location.href = "./epidemiologyReport.html"
}



