import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  firstName:'';
  nameOnRc:'';
  editPersonalInfo: any = [];


  constructor(private router:Router) { }

  ngOnInit() {
    this.editPersonalInfo = JSON.parse(sessionStorage.getItem('userSaleData'));
    console.log(this.editPersonalInfo);
    this.firstName = this.editPersonalInfo[0].firstname;
    this.nameOnRc=this.editPersonalInfo[0].display_name_on_rc;
  }
  backsaleDetails(){
    this.router.navigate(['sale-details'])
      }
}
