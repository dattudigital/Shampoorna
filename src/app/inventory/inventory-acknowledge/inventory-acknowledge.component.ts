import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { InventoryAssigningService } from '../../services/inventory-assigning.service'
import { InventoryListPipe } from '../../pipe/inventory-list.pipe';

@Component({
  selector: 'app-inventory-acknowledge',
  templateUrl: './inventory-acknowledge.component.html',
  styleUrls: ['./inventory-acknowledge.component.css']
})
export class InventoryAcknowledgeComponent implements OnInit {

  inventoryData: any[];
  cols: any[];



  constructor(private router:Router, private service: InventoryAssigningService,private invAssignService: InventoryListPipe) { }

  ngOnInit() {
    this.service.getAcknowledgeList().subscribe(res => {
      console.log(res.json().result)
      //this.inventoryData = this.invAssignService.transform(res.json().result);
      this.inventoryData = res.json().result
     
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
