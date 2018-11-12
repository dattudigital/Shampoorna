import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardServiceService } from '../services/dashboard-service.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {


  titleStyle = "hidden";
  inventoryStyle = "hidden";
  todaySaleCount = '';
  totalsaleCount = '';
  constructor(private router: Router, private service: DashboardServiceService) { }

  ngOnInit() {
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
  vehicleDetailsClick(){
    this.router.navigate(['reports/vehicle-details-list']);
  }
  inventorydetailsClick(){
    this.router.navigate(['reports/inventory-list']);
  }
}
