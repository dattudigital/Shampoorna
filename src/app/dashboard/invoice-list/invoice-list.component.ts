import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  backsaleDetails(){
    this.router.navigate(['sale-details'])
      }
}
