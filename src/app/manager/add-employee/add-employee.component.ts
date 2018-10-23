import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {ManagerServiceService} from '../../services/manager-service.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
   cols:any[];
   employees:any[];
   employeeForm: FormGroup;
   submitted = false;

   firstName:'';
   lastName:'';
   branch:'';
   address:'';
   pincode:'';
   emailId:'';
   phone:'';
   password:'';

  constructor(private http:Http,private service:ManagerServiceService,private formBuilder: FormBuilder) { }

  ngOnInit() {
this.service.getEmployeeDetails().subscribe(res=>{
  this.employees=res.json().result;
  console.log(this.employees);
})

    this.cols=[
      { field: 'employee_firstname', header: 'FirstName' },
      { field: 'employee_lastname', header: 'LastName' },
      { field: 'employee_branch', header: 'Branch' },
      { field: 'employee_address', header: 'Address' },
      { field: 'email_id', header: 'Email' },
      { field: 'phone', header: 'Phone' },

    ];
    this.employeeForm = this.formBuilder.group({
      employeeFirstName: ['', Validators.required],
      employeeLastName: ['', Validators.required],
      employeeBranch: ['', Validators.required],
      employeeAddress: ['', Validators.required],
      employeePinCode: ['', Validators.required],
      Email: ['', Validators.required],
      Phone: ['', Validators.required],
      Password:['', Validators.required]

    });
  }


  get f() { return this.employeeForm.controls; }

  addEmployee(){
    this.submitted=true;

    if(this.employeeForm.invalid){
      return;
    }

    var data={
      employee_firstname:this.firstName,
      employee_lastname:this.lastName,
      employee_branch:this.branch,
      employee_address:this.address,
      employee_pincode:this.pincode,
      email_id:this.emailId,
      phone:this.phone,
      password:this.password,
      rec_status:1
    }
    console.log(data);
  this.service.saveEmployeeDetails(data).subscribe(res=>{
    console.log(res.json());
  })
  }
}
