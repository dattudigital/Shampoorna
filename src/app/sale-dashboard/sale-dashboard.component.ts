import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sale-dashboard',
  templateUrl: './sale-dashboard.component.html',
  styleUrls: ['./sale-dashboard.component.css']
})
export class SaleDashboardComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit() {
    sessionStorage.removeItem('secondaryLoginData');  
    sessionStorage.removeItem('backBtnInventory');  
    sessionStorage.removeItem('backBtnManager'); 

  }
  todaySaleClick()
{

}
newSaleClick(){
  this.router.navigate(['dashboard']);
}
viewSalesClick(){
  this.router.navigate(['sale-details']);
}

}
