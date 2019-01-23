import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
declare var $: any;
import { LoginService } from '../services/login.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  constructor(private http: Http, private router: Router, private spinner: NgxSpinnerService, private loginservice: LoginService) { }

  typeData: any[];
  makeData: any[];
  modelData: any[];
  colorData: any[];
  passwordLogin = "";
  mailId = "";
  titleStyle = "hidden";
  errorMessage = false;
  btnDisable = true;
  test1: any;

  ngOnInit() {
    sessionStorage.removeItem('secondaryLoginData');
    sessionStorage.removeItem('secondaryLoginData1');
    sessionStorage.removeItem('secondaryLoginData2');
    this.loginPopUp()
  }

  redirectToBranch() {
    this.router.navigate(['setup/branch'])
  }
  redirectToVehicle() {
    this.router.navigate(['vehicle-setup'])
  }
  redirectToPriceList() {
    this.router.navigate(['setup/price-list'])
  }
  redirectToSendOTPNo(){
    this.router.navigate(['setup/send-otp-no'])    
  }
  redirectToFinance(){
    this.router.navigate(['setup/finance-name'])    
  }
  redirectToWallet(){
    this.router.navigate(['setup/wallet'])    
  }
  redirectToHome() {
    this.router.navigate(['sale-dashboard'])
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
    if (sessionStorage.secondaryLoginData3) {
      $('#myModal').modal('hide');
      this.titleStyle = "visible";
    }
    else {
      $('#myModal').modal('show');
    }
  }

  loginSubmite() {
    console.log(window.sessionStorage)
    if (sessionStorage.secondaryLoginData) {
      window.sessionStorage.removeItem('secondaryLoginData1');
    }
    var data = {
      password: this.passwordLogin,
      email_id: this.mailId
    }
    this.spinner.show();
    if (this.mailId && this.passwordLogin) {
      this.loginservice.dataLogin(data).subscribe(loginData => {
        this.spinner.hide();
        if (loginData.json().status == false) {
          this.errorMessage = true;
        }
        this.test1 = loginData.json()._results;
        sessionStorage.setItem('secondaryLoginData3', JSON.stringify(loginData.json()));
        $('#myModal').modal('hide');
        this.titleStyle = "visible";
      });
    }
  }

}
