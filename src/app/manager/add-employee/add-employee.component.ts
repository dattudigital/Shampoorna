import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ManagerServiceService } from '../../services/manager-service.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  cols: any[];
  employees: any[];
  employeeForm: FormGroup;
  submitted = false;
  editData: any = [];
  deleteData:any=[];
  temp: any;
  temp1:any;

  employee_id: '';
  employee_firstname: '';
  employee_lastname: '';
  employee_branch: '';
  employee_address: '';
  employee_pincode: '';
  email_id: '';
  phone: '';
  password: '';
  rec_status: '';

  firstName: '';
  lastName: '';
  branch: '';
  address: '';
  pincode: '';
  emailId: '';
  Phone: '';
  Password: '';

  constructor(private http: Http, private service: ManagerServiceService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    sessionStorage.removeItem('secondaryLoginData');  
    sessionStorage.removeItem('backBtnInventory');  
    this.service.getEmployeeDetails().subscribe(res => {
      this.employees = res.json().result;
      console.log(this.employees);
    })
    this.cols = [
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
      Password: ['', Validators.required]

    });
  }


  get f() { return this.employeeForm.controls; }

  addEmployee() {
    this.submitted = true;

    if (this.employeeForm.invalid) {
      return;
    }
    var data = {
      employee_firstname: this.firstName,
      employee_lastname: this.lastName,
      employee_branch: this.branch,
      employee_address: this.address,
      employee_pincode: this.pincode,
      email_id: this.emailId,
      phone: this.Phone,
      password: this.Password,
      rec_status: 1
    }
    console.log(data);
    this.service.saveEmployeeDetails(data).subscribe(res => {
      console.log(res.json());
      this.employees.push(res.json().result);
      console.log(this.employees);
      
    })
  }

  backToManager() {
    this.router.navigate(['sale-dashboard']);
  }

  editEmployee(data, index) {
    console.log('**********')
    console.log(data)
    this.editData = data;
    data.index = index;
    this.temp = index;
    console.log(this.editData[index].employee_id)
    this.employee_id = this.editData[index].employee_id,
      this.employee_firstname = this.editData[index].employee_firstname,
      this.employee_lastname = this.editData[index].employee_lastname,
      this.employee_branch = this.editData[index].employee_branch,
      this.employee_address = this.editData[index].employee_address,
      this.employee_pincode = this.editData[index].employee_pincode,
      this.email_id = this.editData[index].email_id,
      this.phone = this.editData[index].phone,
      this.password = this.editData[index].password
    this.rec_status = this.editData[index].rec_status
  }

  updateEmployee() {
    this.submitted = true;

    if (this.employeeForm.invalid) {
      return;
    }

    var data = {
      employee_id: this.employee_id,
      employee_firstname: this.employee_firstname,
      employee_lastname: this.employee_lastname,
      employee_branch: this.employee_branch,
      employee_address: this.employee_address,
      employee_pincode: this.employee_pincode,
      email_id: this.email_id,
      phone: this.phone,
      password: this.password,
      rec_status: this.rec_status
    }
    this.service.saveEmployeeDetails(data).subscribe(res => {
      console.log(res.json());
      console.log('********')
      console.log(this.temp)
      this.employees[this.temp].employee_firstname = data.employee_firstname;
      this.employees[this.temp].employee_lastname = data.employee_lastname;
      this.employees[this.temp].employee_branch = data.employee_branch;
      this.employees[this.temp].employee_address = data.employee_address;
      this.employees[this.temp].employee_pincode = data.employee_pincode;
      this.employees[this.temp].email_id = data.email_id;
      this.employees[this.temp].phone = data.phone;
      this.employees[this.temp].password = data.password;
      this.employees[this.temp].rec_status = data.rec_status;
      this.temp = " ";
    })
  }

  deleteEmployee(val,index){
    this.temp1 = index;
    console.log(index)
    this.deleteData = val;
    console.log(this.deleteData)
    val.index = index;
    console.log("***")
    this.employee_id = this.deleteData[index].employee_id;
  }

  yesEmployeeDelete(){
    this.employees.splice(this.temp1, 1)
    console.log(this.temp1)
    var data = {
      employee_id: this.employee_id,
      rec_status: "0"
    }
    console.log(data)
    this.service.saveEmployeeDetails(data).subscribe(res => {
      console.log(res.json());
    })
  }
}
