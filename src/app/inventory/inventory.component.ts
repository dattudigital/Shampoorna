import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  vehicleDetailClick(){
    this.router.navigate(['inventory/vehicle-details']);

  }

  inventoryListClick(){
    this.router.navigate(['inventory/inventory-list'])
  }

  indentRaiseClick(){
    this.router.navigate(['inventory/indent-raising'])
  }

  indentListClick(){
    this.router.navigate(['inventory/indent-list'])
  }

  invAssaignClick(){
    this.router.navigate(['inventory/inventory-assigning'])
  }

  InventoryAckClick(){
    this.router.navigate(['inventory/inventory-acknowledge'])
  }

}
