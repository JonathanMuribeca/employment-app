import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employee = {} as Employee;
  employees: Employee[];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  saveEmployee(form: NgForm) {
    if (this.employee.employee_id !== undefined) {
      this.employeeService.updateEmployee(this.employee).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.employeeService.saveEmployee(this.employee).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }


  getEmployees() {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
  }

  deleteEmployee(employee: Employee) {
    this.employeeService.deleteEmployee(employee).subscribe(() => {
      this.getEmployees();
    });
  }


  editEmployee(employee: Employee) {
    this.employee = { ...employee };
  }

  cleanForm(form: NgForm) {
    this.getEmployees();
    form.resetForm();
    this.employee = {} as Employee;
  }

}
