import { Report } from './report.js';
import { Patient } from './patient.js';
//import * as fs from 'http://example.com/fs';
// import { fs} from './fs.js';
//const fs = require('fs');

//DB array
var allPatients = [];
window.onpageshow = createTableReport();
async function createTableReport() {
    //  await readDb();
    //create a table for each patient with his reports - according his id
    var id = document.getElementById('id');
    //add event to the id input that clean the old data
    //and drow the data that bloungth the current patient
    id.addEventListener('change', () => {
        cleanTable();
        if (id.value) {
            //finding the current patient
            var patient = allPatients.find(patient => patient.id == id.value);
            //the patient has old reports
            if (patient)
                //drawing the old reports
                patient.reports.forEach(report => {
                    uploadData(report);
                })
            //adding an event to the add button
            var btn = document.getElementById("add");
            btn.addEventListener("click", addReport);

        }
    })
    // adding an event to the view button
    var btn = document.getElementById("view");
    btn.addEventListener("click", viewLocations);
}
// function readDb() {

//     fs.readFileSync('./db.json', 'utf-8', (err, data) => {
//         if (err) {
//             throw err;
//         }
//         // parse JSON object
//         allPatients = JSON.parse(data.toString());
//     });
// }
// function writeToDB(patient, report) {
//     try {
//         fs.readFile('./db.json', 'utf8', (err, data) => {

//             if (err) {
//                 console.log(`Error reading file from disk: ${err}`);
//             } else {

//                 // parse JSON string to JSON object
//                 const databases = JSON.parse(data);
//                 if (!report) {
//                     databases.push(patient);
//                 }
//                 else {
//                     databases[patient].reports.push(report);
//                 }
//                 // write new data back to the file
//                 fs.writeFile('./db.json', JSON.stringify(databases, null, 4), (err) => {
//                     if (err) {
//                         console.log(`Error writing file: ${err}`);
//                     }
//                 });
//             }

//         });
//     }
//     catch (error) {
//         console.error(err);
//     }

// }
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
        //finding whiche patient enter
        var patient = allPatients.find(patient => {
            if (patient.id == id)
                return patient;
        });
        if (patient) {
            //a old patient entered
            //adding the report to the reports list
            patient.reports.push(newReport);
            // writeToDB(patient, newReport);
            return patient;
        }
        else {
            // a new patient entered
            //creating a new patient and
            //adding the report to the reports list
            var newPatient = new Patient(id, newReport);
            allPatients.push(newPatient);
            // writeToDB(newPatient);
            return newPatient;
        }
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
    var patientIndex = allPatients.findIndex(ele => ele.id == id);
    if (patientIndex != -1) {
        var reportIndex = allPatients[patientIndex].reports.findIndex(ele => {
            ele.startDate == report.startDate &&
                ele.endDate == report.endDate &&
                ele.city == report.city &&
                ele.location == report.location
            return ele;
        })
    }
    if (reportIndex != -1) {
        allPatients[patientIndex].reports.splice(reportIndex, 1);
        console.log(allPatients);
    }
}
function viewLocations() {
    window.location.href = "./epidemiologyReport.html"
}



