import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-inventory-details-list',
  templateUrl: './inventory-details-list.component.html',
  styleUrls: ['./inventory-details-list.component.css']
})
export class InventoryDetailsListComponent implements OnInit {
  cols: any[];
  inventoryData: any[];

  constructor(private router:Router) { }

  ngOnInit() {
    this.cols = [
      { field: 'branch_name', header: 'Branch' },
      { field: 'indent_req_id', header: 'Indent ID' },
      { field: 'employee_firstname', header: 'Assaigned By' },
      { field: 'generated_shipping_id', header: 'Shipping ID' },
      { field: 'shipped_by', header: 'Shipped By' },
      { field: 'vechile_no', header: 'Vehicle No.' },
      { field: 'br_mgr_ack', header: 'Manager ACk' },
      { field: 'br_mgr_comment', header: 'Manager Comment'},
      { field: 'chassisno', header: 'Chasis No.' },
      { field: 'color', header: 'Color' },
      { field: 'engineno', header: 'Engine No.' },
      { field: 'frameno', header: 'Frame No.' },
      { field: 'make', header: 'Make.' },
      { field: 'model', header: 'Model' }
    ];
    // this.service.getInventoryList(brurl).subscribe(res =>   {
    //   console.log(res.json().result)
    //   this.inventoryData = res.json().result;     
    // });
  }
  backToReports() {
    this.router.navigate(['reports']);
  }

}
