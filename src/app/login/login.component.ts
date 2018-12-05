import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { LoginService } from '../services/login.service'
declare var $: any;
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password = "";
  mailId = "";
  alerts: any[] = [];
  errorMessage = false;

  constructor(private http: HttpClient, private router: Router,private spinner: NgxSpinnerService, private service: LoginService) { }

  ngOnInit() {
    this.loginPopUp();

  }
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  loginSubmite() {
    window.sessionStorage.removeItem('salesdata');
    var data = {
      password: this.password,
      email_id: this.mailId
    }
    this.spinner.show();
    if (this.mailId && this.password) {
      this.service.dataLogin(data).subscribe(loginData => {
        if (loginData.json().status == false) {
          this.errorMessage = true;
          this.spinner.hide();
        }
        if (loginData.json().status == true) {
          sessionStorage.setItem('userSession', JSON.stringify(loginData.json()));
          this.router.navigate(['sale-dashboard']);
          $('#myModal').modal('hide');
        }
      });
    } else {
      this.spinner.hide();
      this.errorMessage = true;
    }
  }

  loginPopUp() {
    $('#myModal').modal('show');
  }
}
