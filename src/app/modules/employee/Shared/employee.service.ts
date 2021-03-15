import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    constructor(private http: HttpClient) {}
    readonly baseUrl = 'http://localhost:5000/api/'

    employees = []

    ngOnInit(): void {
        
    }

    getEmployees = async () => {
        this.employees = [
            { employeeID: '1', employeeNo: 'EMP-20200314-001', employeeFullName: 'สรวิศ ศิรินาม', employeeNickName: 'เต้', rowFlag: 1, workStartDate: new Date(), workingAge: null },
            { employeeID: '2', employeeNo: 'EMP-20200314-002', employeeFullName: 'น้องนาย น่ารักจัง', employeeNickName: 'นาย', rowFlag: 2, workStartDate: new Date(), workingAge: null },
            { employeeID: '3', employeeNo: 'EMP-20200314-003', employeeFullName: 'กก น่ากก', employeeNickName: 'กก', rowFlag: 1, workStartDate: new Date(), workingAge: null },
            { employeeID: '4', employeeNo: 'EMP-20200314-004', employeeFullName: 'Sexy Girls', employeeNickName: 'B1', rowFlag: 1, workStartDate: new Date(), workingAge: null },
            { employeeID: '5', employeeNo: 'EMP-20200314-005', employeeFullName: 'B น่าจัง', employeeNickName: 'B2', rowFlag: 3, workStartDate: new Date(), workingAge: null },
            { employeeID: '6', employeeNo: 'EMP-20200314-006', employeeFullName: 'Testing', employeeNickName: 'test', rowFlag: 1, workStartDate: new Date(), workingAge: null },
            { employeeID: '7', employeeNo: 'EMP-20200314-007', employeeFullName: 'ลูกชิ้นเนื้อ วัณนา', employeeNickName: 'วัณนา', rowFlag: 3, workStartDate: new Date(), workingAge: null },
        ]
    }
}