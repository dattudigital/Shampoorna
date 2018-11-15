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
  constructor(private router: Router, private service: DashboardServiceService, private spinner: NgxSpinnerService, private loginservice: LoginService) { }

  ngOnInit() {
    this.loginPopUp();
    sessionStorage.removeItem('secondaryLoginData');
    sessionStorage.removeItem('secondaryLoginData1');
    sessionStorage.removeItem('backBtnInventory');
    sessionStorage.removeItem('backBtnManager');

    this.service.getTodaySale().subscribe(res => {
      this.todaySaleCount = res.json().result.length;
      console.log(this.todaySaleCount);
    });
  
    this.service.getTotalSale().subscribe(response => {
      this.totalsaleCount = response.json().result.length;
      console.log(this.totalsaleCount)
    })
  }
  saleReportClick() {
    console.log('came')
    this.titleStyle = "visible";
    this.inventoryStyle = "hidden";
  }
  viewInventoryClick() {
    console.log('inventory');
    this.inventoryStyle = "visible";
    this.titleStyle = "hidden";
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
    if (sessionStorage.backBtnReports) {
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
        }
        this.test1 = loginData.json()._results;

        if (loginData.json().status == true && this.test1.emp_type_id == 1 || this.test1.emp_type_id == 2) {
          //console.log(loginData.json().result[0])
          sessionStorage.setItem('secondaryLoginData2', JSON.stringify(loginData.json()));
          sessionStorage.setItem('backBtnReports', 'Y');
          $('#myModal').modal('hide');
          this.reportStyle = "visible";
        } else {
          this.errorMessage = true;
        }
      });
    }
  }
}
