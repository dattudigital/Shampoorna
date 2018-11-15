import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { ManagerServiceService } from '../../services/manager-service.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { LoginService } from '../../services/login.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';
declare var $: any;

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
  deleteData: any = [];
  temp: any;
  temp1: any;
  empData: any;

  employee_id: '';
  employee_firstname: '';
  employee_lastname: '';
  employee_branch: '';
  employee_address: '';
  employee_pincode: '';
  email_id: '';
  phone: '';
  password: '';
  emp_type_id: '';
  rec_status: '';

  firstName: '';
  lastName: '';
  branch: '';
  address: '';
  pincode: '';
  emailId: '';
  Phone: '';
  Password: '';
  employeeType: '';

  passwordLogin = "";
  mailId = "";
  titleStyle = "hidden";
  errorMessage = false;
  btnDisable = true;
  test1: any;



  constructor(private cdr: ChangeDetectorRef, private http: Http, private spinner: NgxSpinnerService, private service: ManagerServiceService, private formBuilder: FormBuilder, private router: Router, private loginservice: LoginService) { }

  ngAfterViewChecked() {

    this.cdr.detectChanges();
  }
  ngOnInit() {

    sessionStorage.removeItem('secondaryLoginData');
    sessionStorage.removeItem('secondaryLoginData2'); 
    sessionStorage.removeItem('backBtnInventory');
    sessionStorage.removeItem('inventory-routing');
    sessionStorage.removeItem('backBtnReports'); 

    this.loginPopUp();
    this.service.getEmployeeDetails().subscribe(res => {
      this.employees = res.json().result;
      console.log(this.employees);
    })

    this.http.get(environment.host + 'emp-types').subscribe(data => {
      console.log(data.json())
      this.empData = data.json().result;
    });


    this.cols = [
      { field: 'employee_firstname', header: 'First Name' },
      { field: 'employee_lastname', header: 'Last Name' },
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
      empType: ['', Validators.required],
      Email: ['', Validators.required],
      Phone: ['', Validators.required],
      Password: ['', Validators.required]

    });
  }

  errorClear() {
    this.errorMessage = false;
    if (this.passwordLogin && this.mailId) {
      this.btnDisable = false;
    }
    else {
      this.btnDisable = true;
    }
  }

  loginPopUp() {
    if (sessionStorage.backBtnManager) {
      $('#myModal').modal('hide');
      this.titleStyle = "visible";
    }
    else {
      $('#myModal').modal('show');
    }
  }

  loginSubmite() {
    if (sessionStorage.secondaryLoginData) {
      window.sessionStorage.removeItem('secondaryLoginData');
      //console.log('secondaryLoginData')
    }
    var data = {
      password: this.passwordLogin,
      email_id: this.mailId
    }
    this.spinner.show();
    if (this.mailId && this.passwordLogin) {
      this.loginservice.dataLogin(data).subscribe(loginData => {
        console.log(loginData)
        console.log(loginData.json().status)
        this.spinner.hide();
        if (loginData.json().status == false) {
          this.errorMessage = true;
        }
        this.test1 = loginData.json()._results;

        if (loginData.json().status == true && this.test1.emp_type_id == 1 || this.test1.emp_type_id ==2 ) {
          //console.log(loginData.json().result[0])
          sessionStorage.setItem('secondaryLoginData1', JSON.stringify(loginData.json()));
          sessionStorage.setItem('backBtnManager', 'Y');
          $('#myModal').modal('hide');
          this.titleStyle = "visible";
        } else {
          this.errorMessage = true;
        }
      });
    }
  }

  RedirectToHome() {
    this.router.navigate(['dashboard']);
  }
  removeFields() {
    this.firstName = '',
      this.lastName = '',
      this.email_id = '',
      this.password = '',
      this.employeeType = '',
      this.branch = '',
      this.phone = '',
      this.address = '',
      this.pincode = '',
      this.employeeType = ''
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
      emp_type_id: this.employeeType,
      phone: this.Phone,
      password: this.Password,
      rec_status: 1
    }
    console.log(data);
    this.service.saveEmployeeDetails(data).subscribe(res => {
      console.log(res.json());
      this.employees.push(res.json().result);
      console.log(this.employees);
      $('#addEmployee').modal('hide');

    });
    this.removeFields()
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
      this.emp_type_id = this.editData[index].emp_type_id,
      this.password = this.editData[index].password,

      this.rec_status = this.editData[index].rec_status
  }

  updateEmployee() {
    var data = {
      employee_id: this.employee_id,
      employee_firstname: this.employee_firstname,
      employee_lastname: this.employee_lastname,
      employee_branch: this.employee_branch,
      employee_address: this.employee_address,
      employee_pincode: this.employee_pincode,
      email_id: this.email_id,
      phone: this.phone,
      emp_type_id: this.emp_type_id,
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
      this.employees[this.temp].emp_type_id = data.emp_type_id
      this.employees[this.temp].rec_status = data.rec_status;
      this.temp = " ";
    });
    this.removeFields();
    $('#editEmployee').modal('hide')
  }

  deleteEmployee(val, index) {
    this.temp1 = index;
    console.log(index)
    this.deleteData = val;
    console.log(this.deleteData)
    val.index = index;
    console.log("***")
    this.employee_id = this.deleteData[index].employee_id;
  }

  yesEmployeeDelete() {
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
    //this method  allow alphabets 
    omit_special_char(event) {
      console.log('key press');
      var k;
      k = event.charCode;  //  k = event.keyCode;  (Both can be used)
      return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 0 || k == 32);
    }
    //This Method  allow Numbers
    only_allow_number(event) {
      console.log('only number');
      var n;
      n = event.charCode
      return (n == 8 || n == 0 || n == 32 || (n >= 48 && n <= 57))
    }
    //this method allow bothe numbers and alphabets
    allow_numbers_alphabets(event) {
      var a;
      a = event.charCode
      return ((a > 64 && a < 91) || (a > 96 && a < 123) || a == 8 || a == 0 || (a >= 48 && a <= 57));
    }
}
