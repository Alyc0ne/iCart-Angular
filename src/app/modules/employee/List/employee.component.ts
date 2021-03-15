import { Component } from '@angular/core';
import { EmployeeService } from '../Shared/employee.service'

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})

export class EmployeeListComponent {
    
    constructor(
        public employeeService: EmployeeService
    ) { }

    ngOnInit(): void {
        this.employeeService.getEmployees()
    }

    public employees = {
        
    }
}