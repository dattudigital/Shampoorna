import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardServiceService } from '../services/dashboard-service.service';

@Component({
  selector: 'app-sale-dashboard',
  templateUrl: './sale-dashboard.component.html',
  styleUrls: ['./sale-dashboard.component.css']
})
export class SaleDashboardComponent implements OnInit {
  todaySaleCount: '';
  totalsaleCount: '';
  loginData: any = [];
  errorMessage = false;
  errorMessage2 =false;


  constructor(private router: Router, private service: DashboardServiceService) { }

  ngOnInit() {
    sessionStorage.removeItem('secondaryLoginData');
    sessionStorage.removeItem('secondaryLoginData1');
    sessionStorage.removeItem('backBtnInventory');
    sessionStorage.removeItem('backBtnManager');

    this.loginData = JSON.parse(sessionStorage.getItem('userSession'));
    console.log(this.loginData._results.emp_type_id);

    this.service.getTodaySale().subscribe(res => {
      this.todaySaleCount = res.json().result.length;
      console.log(this.todaySaleCount);
    });
    this.service.getTotalSale().subscribe(response => {
      this.totalsaleCount = response.json().result.length;
      console.log(this.totalsaleCount)
    })

  }


  todaySaleClick() {
    if (this.loginData._results.emp_type_id == 2 || this.loginData._results.emp_type_id == 1) {
      this.router.navigate(['reports/today-sale']);
    } else {
      this.errorMessage = true;

      setTimeout(() => {
        this.errorMessage = false;
      }, 3000);
    }
  }
  totalSaleClick() {
    if (this.loginData._results.emp_type_id == 2 || this.loginData._results.emp_type_id == 1) {
      this.router.navigate(['reports/total-sale']);
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
