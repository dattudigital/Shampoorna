import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardServiceService } from '../services/dashboard-service.service';

@Component({
  selector: 'app-sale-dashboard',
  templateUrl: './sale-dashboard.component.html',
  styleUrls: ['./sale-dashboard.component.css']
})
export class SaleDashboardComponent implements OnInit {
  todaySaleCount = '';
  totalsaleCount = '';
  todaySaleData = '';
  loginData: any = [];
  errorMessage = false;
  errorMessage2 = false;

  constructor(private router: Router, private service: DashboardServiceService) { }

  ngOnInit() {
    sessionStorage.removeItem('secondaryLoginData');
    sessionStorage.removeItem('secondaryLoginData1');
    sessionStorage.removeItem('secondaryLoginData2');
    sessionStorage.removeItem('secondaryLoginData3');
    this.loginData = JSON.parse(sessionStorage.getItem('userSession'));
    this.service.getTodaySale().subscribe(res => {
      if (res.json().status == true) {
        this.todaySaleCount = res.json().result.length;
      } else {
        this.todaySaleCount = "0";
      }
    });
    this.service.getTotalSale().subscribe(response => {
      if (response.json().status == true) {
        this.totalsaleCount = response.json().result.length;
      } else {
        this.totalsaleCount = '0';
      }
    })
  }

  todaySaleClick() {
    if (this.loginData._results.emp_type_id == 2 || this.loginData._results.emp_type_id == 1) {
      this.router.navigate(['reports/today-sale-list']);
    } else {
      this.errorMessage = true;
      setTimeout(() => {
        this.errorMessage = false;
      }, 3000);
    }
  }
  totalSaleClick() {
    if (this.loginData._results.emp_type_id == 2 || this.loginData._results.emp_type_id == 1) {
      this.router.navigate(['reports/total-sale-list']);
    } else {
      this.errorMessage2 = true;
      setTimeout(() => {
        this.errorMessage2 = false;
      }, 3000);
    }
  }
  newSaleClick() {
    this.router.navigate(['dashboard']);
  }
  viewSalesClick() {
    this.router.navigate(['sale-details']);
  }

}
