export class Patient {
    reports =[];
    constructor(id, reports) {
        this.id = id;
        this.reports.push(reports);
    }
}
