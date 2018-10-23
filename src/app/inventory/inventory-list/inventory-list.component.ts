import { Component, OnInit, Testability } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Http } from '@angular/http'
import { environment } from '../../../environments/environment';
import { InventoryAssigningService } from '../../services/inventory-assigning.service'
import { InventoryListPipe } from '../../pipe/inventory-list.pipe';


@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {
  cols: any[];
  inventoryData: any[];


  constructor(private router: Router, private service: InventoryAssigningService, private http: Http, private invAssignService: InventoryListPipe) { }

  ngOnInit() {
    this.service.getInventoryList().subscribe(res => {
      console.log(res.json().result)
      this.inventoryData = this.invAssignService.transform(res.json().result);
     
    });

    this.cols = [
      { field: 'branch_name', header: 'Branch' },
      { field: 'indent_req_id', header: 'Indent ID' },
      { field: 'employee_firstname', header: 'Assaigned By' },
      { field: 'generated_shipping_id', header: 'Shipping ID' },
      { field: 'shipped_by', header: 'Shipped By' },
      { field: 'vechile_no', header: 'Vehicle No.' },
      { field: 'br_mgr_ack', header: 'Manager ACk' },
      { field: 'br_mgr_comment', header: 'Manager Comment' },

      { field: 'chassisno', header: 'Chasis No.' },
      { field: 'color', header: 'Color' },
      { field: 'engineno', header: 'Engine No.' },
      { field: 'frameno', header: 'Frame No.' },
      { field: 'make', header: 'Make.' },
      { field: 'model', header: 'Model' }
    ];
  }
  backToInventory() {
    this.router.navigate(['inventory']);
  }





}

