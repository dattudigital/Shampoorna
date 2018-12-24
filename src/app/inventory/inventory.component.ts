import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../services/login.service'
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  password = "";
  mailId = "";
  titleStyle = "hidden";
  errorMessage = false;
  btnDisable = true;
  alerts: any[] = [];
  test1: any;
  vehicledetails = false;
  inventorylist = false;
  indentraise = false;
  listindent = false;
  inventoryass = false;
  acknowledgement = false;
  reversal = false;
  reversallist = false;

  constructor(private router: Router, private spinner: NgxSpinnerService, private http: HttpClient, private service: LoginService) { }

  ngOnInit() {
    sessionStorage.removeItem('secondaryLoginData1');
    sessionStorage.removeItem('secondaryLoginData2');
    sessionStorage.removeItem('secondaryLoginData3');
    this.loginPopUp();
    this.roleLogin();
  }

  roleLogin() {
    let loginData = JSON.parse(sessionStorage.getItem('secondaryLoginData'));
    if (loginData) {
      if (loginData.status == true && loginData._results.emp_type_id == 1) {
        this.vehicledetails = true;
        this.inventorylist = true;
        this.indentraise = true;
        this.listindent = true;
        this.inventoryass = true;
        this.acknowledgement = true;
        this.reversal = true;
        this.reversallist = true;
        this.titleStyle = "visible";
        this.spinner.hide();
      } else if (loginData.status == true && loginData._results.emp_type_id == 2) {
        this.inventorylist = true;
        this.indentraise = true;
        this.acknowledgement = true;
        this.reversallist = true;
        this.titleStyle = "visible";
        this.spinner.hide();
      } else if (loginData.status == true && loginData._results.emp_type_id == 3) {
        this.vehicledetails = true;
        this.listindent = true;
        this.inventoryass = true;
        this.reversal = true;
        this.titleStyle = "visible";
        this.spinner.hide();
      }
      // else if (loginData.status == false ){
      //   this.errorMessage = true;
      // }
    }
  }

  errorClear() {
    this.errorMessage = false;
    if (this.password && this.mailId) {
      this.btnDisable = false;
    }
    else {
      this.btnDisable = true;
    }
  }

  loginPopUp() {
    if (sessionStorage.secondaryLoginData) {
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
    }
    var data = {
      password: this.password,
      email_id: this.mailId
    }
    this.spinner.show();
    if (this.mailId && this.password) {
      this.service.dataLogin(data).subscribe(inData => {
        this.test1 = inData.json()._results;
        sessionStorage.setItem('secondaryLoginData', JSON.stringify(inData.json()));
        if (inData.json().status == false) {
          this.errorMessage = true;
          this.spinner.hide();
        } else {
          this.roleLogin();
          $('#myModal').modal('hide');
        }
      });
    } else {
      this.spinner.hide();
      this.alerts = [{
        type: 'danger',
        msg: `Invalid credentials`,
        timeout: 1000
      }];
    }
  }

  redirectToVehicle() {
    this.router.navigate(['inventory/vehicle-details']);
  }

  redirectToInvList() {
    this.router.navigate(['inventory/inventory-list'])
  }

  redirectToIndent() {
    this.router.navigate(['inventory/indent-raising'])
  }

  redirectToInList() {
    this.router.navigate(['inventory/indent-list'])
  }

  redirectToInvAss() {
    sessionStorage.removeItem('indentData');
    this.router.navigate(['inventory/inventory-assigning'])
  }

  redirectToInvAck() {
    this.router.navigate(['inventory/inventory-acknowledge'])
  }

  redirectToInvReverse(){
    this.router.navigate(['inventory/inventory-reversal'])
  }

  redirectToInvReverseList(){
    this.router.navigate(['inventory/inventory-reversal-list'])
  }

  RedirectToHome() {
    this.router.navigate(['sale-dashboard']);
  }
}
