import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../services/department.service';
import { Department } from '../models/department';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  department = {} as Department;
  departments: Department[];

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  saveDepartment(form: NgForm) {
    if (this.department.department_id !== undefined) {
      this.departmentService.updateDepartment(this.department).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.departmentService.saveDepartment(this.department).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }


  getDepartments() {
    this.departmentService.getDepartments().subscribe((departments: Department[]) => {
      this.departments = departments;
    });
  }

  deleteDepartment(department: Department) {
    this.departmentService.deleteDepartment(department).subscribe(() => {
      this.getDepartments();
    });
  }


  editDepartment(department: Department) {
    this.department = { ...department };
  }

  cleanForm(form: NgForm) {
    this.getDepartments();
    form.resetForm();
    this.department = {} as Department;
  }

}
