import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../services/login.service';
declare var $: any;
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {


  titleStyle = "hidden";
  inventoryStyle = "hidden";
  reportStyle = "hidden";
  todaySaleCount = '';
  totalsaleCount = '';
  passwordLogin = "";
  mailId = "";
  errorMessage = false;
  btnDisable = true;
  test1: any;
  loginData: any = [];

  constructor(private router: Router, private service: DashboardServiceService, private spinner: NgxSpinnerService, private loginservice: LoginService) { }

  ngOnInit() {
    this.loginPopUp();
    sessionStorage.removeItem('secondaryLoginData');
    sessionStorage.removeItem('secondaryLoginData1');
    sessionStorage.removeItem('secondaryLoginData3');
    // sessionStorage.removeItem('backBtnInventory');
    // sessionStorage.removeItem('backBtnManager');
  }
  saleReportClick() {
    this.titleStyle = "visible";
    //this.inventoryStyle = "hidden";
  }
  viewInventoryClick() {
    console.log('inventory');
    this.inventoryStyle = "visible";
    //this.titleStyle = "hidden";
  }
  todaySaleClick() {
    this.router.navigate(['reports/today-sale-list']);
  }
  totalSaleClick() {
    this.router.navigate(['reports/total-sale-list']);
  }
  vehicleDetailsClick() {
    this.router.navigate(['reports/vehicle-details-list']);
  }
  inventorydetailsClick() {
    this.router.navigate(['reports/inventory-list']);
  }
  loginPopUp() {
    if (sessionStorage.secondaryLoginData2) {
      $('#myModal').modal('hide');
      this.reportStyle = "visible";
    }
    else {
      $('#myModal').modal('show');
    }
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
  RedirectToHome() {
    this.router.navigate(['sale-dashboard'])
  }
  loginSubmite() {
    // console.log("*******")
    // console.log(sessionStorage)
    // console.log(sessionStorage.secondaryLoginData)
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
          return;
        } else {
          this.test1 = loginData.json()._results;
          sessionStorage.setItem('secondaryLoginData2', JSON.stringify(loginData.json()));
          $('#myModal').modal('hide');
          this.reportStyle = "visible";
          this.loginData = JSON.parse(sessionStorage.getItem('secondaryLoginData2'));
          console.log(this.loginData);
          if (this.loginData) {
            var branchId = this.loginData._results.employee_branch_id;
            console.log(branchId)
          }
          this.service.getSaleAndInventoryCount(branchId).subscribe(res => {
            console.log(res.json().result);
            this.todaySaleCount = res.json().result.todaysale;
            console.log(this.todaySaleCount);
            this.totalsaleCount = res.json().result.totalsale;
            console.log(this.totalsaleCount)
          });
        }
      });
    }
  }
}
