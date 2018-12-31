import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllVehicleService } from '../../services/all-vehicle.service';
import { NotificationsService } from 'angular2-notifications';
import { ReversalInventoryService } from '../../services/reversal-inventory.service'
import { DatePipe } from '@angular/common';
import { InventoryAssigningService } from '../../services/inventory-assigning.service'

@Component({
  selector: 'app-inventory-reversal-list',
  templateUrl: './inventory-reversal-list.component.html',
  styleUrls: ['./inventory-reversal-list.component.css'],
  providers: [
    DatePipe
  ]
})
export class InventoryReversalListComponent implements OnInit {

  reversal: any[];
  inventoryData: any[];
  cols: any[];
  columns: any[];
  reversalTo: any[];

  typeData: any[];
  makeData: any[];
  modelData: any[];
  colorData: any[];
  variantData: any[];
  editData: any = [];


  vehicleTypeFilter = "0";
  vehicleModelFilter = "0";
  vehicleColorFilter = "0";
  vehicleVariantFilter = "0";
  fromDate = "";
  toDate = "";

  public options = { position: ["top", "right"] }

  constructor(private router: Router, private allvehicleservice: AllVehicleService, private notif: NotificationsService, private reversalservice:ReversalInventoryService , private Invassaignservice: InventoryAssigningService, private dp: DatePipe) { }

  ngOnInit() {
    let loginData = JSON.parse(sessionStorage.getItem('secondaryLoginData'));
    var brurl = '';
    brurl = brurl + '?status=1';
    brurl = brurl + '&branchid=' + loginData._results.employee_branch_id;
    this.reversalservice.getReversalInventory(brurl).subscribe(reversalData => {
      if (reversalData.json().status == true) {  
      this.reversal = reversalData.json().result
      this.reversalTo = reversalData.json().result.variant_name
      console.log(this.reversalTo)
      console.log(this.reversal)
      }else{
        this.reversal = [];
      }
    })

    var url = '';
    url = url + '&branchid=' + loginData._results.employee_branch_id;
    // url = url + '&model=' + this.reversalTo;
    this.Invassaignservice.getInventoryList(url).subscribe(res => {
      // console.log(res.json())
      if (res.json().status == true) {
        this.inventoryData = res.json().result;
      }else{
        this.inventoryData = [];
      }
    });

    this.allvehicleservice.getColor().subscribe(data => {
      if (data.json().status == true) {
        this.colorData = data.json().result;
      } else {
        this.colorData = [];
      }
    });

    this.allvehicleservice.getCategory().subscribe(data => {
      if (data.json().status == true) {
        this.typeData = data.json().result;
      } else {
        this.typeData = [];
      }
    });

    this.allvehicleservice.getModel().subscribe(data => {
      if (data.json().status == true) {
        this.modelData = data.json().result;
      } else {
        this.modelData = [];
      }
    });

    this.allvehicleservice.getVariant().subscribe(data => {
      if (data.json().status == true) {
        this.variantData = data.json().result;
      } else {
        this.variantData = [];
      }
    })

    this.cols = [
      { field: 'branch_name', header: 'Branch Name' },
      { field: 'type_name', header: 'Type' },
      { field: 'model_name', header: 'Model' },
      { field: 'variant_name', header: 'Variant' },
      { field: 'color_name', header: 'Color' },
      { field: 'req_qty', header: 'Required Qty' },
      { field: 'req_on_date', header: 'Estimsted Date', type: this.dp },
    ];

    this.columns = [
      { field: 'branch_name', header: 'Branch' },
      { field: 'indent_req_id', header: 'Indent ID' },
      { field: 'generated_shipping_id', header: 'Shipping ID' },
      { field: 'shipped_by', header: 'Shipped By' },
      { field: 'shipped_vechile_no', header: 'Vehicle No.' },
      { field: 'br_mgr_ack', header: 'Manager ACk' },
      { field: 'br_mgr_comment', header: 'Manager Comment' },
      { field: 'color', header: 'Color' },
      { field: 'engineno', header: 'Engine No.' },
      { field: 'frameno', header: 'Frame No.' },
      { field: 'model', header: 'Model' }
    ];
  }

  backToInventory() {
    this.router.navigate(['inventory']);
  }

  
  status = '';
  return_inventory_id = '';
  branch_id = '';



  // yesReversal(data, index) {
  //   //this.inventoryData.splice(index,1)
  //   this.editData = data;
  //   this.return_inventory_id = this.editData[index].return_inventory_id;
  //   this.branch_id = this.editData[index].branch_id
  //   this.status = this.editData[index].status;
  //   var val = {
  //     return_inventory_id: this.return_inventory_id,
  //     status: "2"
  //   }
  //   this.reversal.splice(index, 1)
  //   this.reversalservice.addReversalInventory(val).subscribe(res => {
  //     if (res.json().status == true) {
  //       this.notif.success(
  //         'Success',
  //         'Added Successfully',
  //         {
  //           timeOut: 3000,
  //           showProgressBar: true,
  //           pauseOnHover: false,
  //           clickToClose: true,
  //           maxLength: 50
  //         }
  //       )
  //     }
  //   });
  // }

  // noReversal(data, index) {
  //   this.editData = data;
  //   this.return_inventory_id = this.editData[index].return_inventory_id;
  //   this.branch_id = this.editData[index].branch_id
  //   this.status = this.editData[index].status;
  //   var val = {
  //     return_inventory_id: this.return_inventory_id,
  //     status: "3"
  //   }
  //   this.reversal.splice(index, 1)
  //   this.reversalservice.addReversalInventory(val).subscribe(res => {
  //     if (res.json().status == true) {
  //       this.notif.success(
  //         'Success',
  //         'Added Successfully',
  //         {
  //           timeOut: 3000,
  //           showProgressBar: true,
  //           pauseOnHover: false,
  //           clickToClose: true,
  //           maxLength: 50
  //         }
  //       )
  //     }
  //   });
  // }

}
