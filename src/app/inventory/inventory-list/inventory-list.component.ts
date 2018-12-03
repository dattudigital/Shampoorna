import { Component, OnInit, Testability } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Http } from '@angular/http'
import { environment } from '../../../environments/environment';
import { InventoryAssigningService } from '../../services/inventory-assigning.service'
import { InventoryListPipe } from '../../pipe/inventory-list.pipe';
import * as moment from 'moment';
import { NotificationsService } from 'angular2-notifications';
import { AllVehicleService } from '../../services/all-vehicle.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {
  cols: any[];
  inventoryData: any[];
  typeData: any[];
  makeData: any[];
  modelData: any[];
  colorData: any[];
  variantData: any[];
  vehicleModelFilter = "";
  vehicleColorFilter = "";
  vehicleVariantFilter = "";
  fromDate = "";
  toDate = "";
  public options = { position: ["top", "right"] }


  constructor(private router: Router, private allvehicleservice: AllVehicleService, private service: InventoryAssigningService, private http: Http, private invAssignService: InventoryListPipe, private notif: NotificationsService) { }

  ngOnInit() {
    let loginData = JSON.parse(sessionStorage.getItem('secondaryLoginData'));
    var brurl = '';
    //if (loginData._results.branch_id==999) {
    brurl = brurl + '&branchid=' + loginData._results.employee_branch_id;
    //}
    // }else if (loginData._results.branch_id==1) {
    //   brurl = brurl + '&branchid='+loginData._results.branch_id;
    // }else if (loginData._results.branch_id==2) {
    //   brurl = brurl + '&branchid='+loginData._results.branch_id;
    // }
    this.service.getInventoryList(brurl).subscribe(res => {
      if (res.json().status == true) {
        this.inventoryData = res.json().result;
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

  fromDa() {
    let newDate = moment(this.fromDate).format('YYYY-MM-DD').toString();
    this.fromDate = newDate;
  }

  toDa() {
    let newDate1 = moment(this.toDate).format('YYYY-MM-DD').toString();
    this.toDate = newDate1;

  }

  detailsGo() {
    let loginData = JSON.parse(sessionStorage.getItem('secondaryLoginData'));
    var url = '';
    if (this.fromDate) {
      url = url + '&startdate=' + this.fromDate;
    }
    if (this.toDate) {
      url = url + '&enddate=' + this.toDate;
    }
    if (this.vehicleVariantFilter) {
      url = url + '&variant=' + this.vehicleVariantFilter;
    }
    if (this.vehicleModelFilter) {
      url = url + '&model=' + '"' + this.vehicleModelFilter + '"';
    }
    if (this.vehicleColorFilter) {
      url = url + '&color=' + '"' + this.vehicleColorFilter + '"';
    }
    url = url + '&branchid=' + loginData._results.employee_branch_id;
    this.service.getInventoryFilter(url).subscribe(res => {
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Filter Applied Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      } else {
        this.notif.warn(
          'OOPS',
          'NO Records Found',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      if (res.json().status == true) {
        this.inventoryData = res.json().result;
      }
      else {
        this.inventoryData = res.json()._body;
      }
    })
  }

  detailsReset() {
    let loginData = JSON.parse(sessionStorage.getItem('secondaryLoginData'));
    var brurl = '';
    brurl = brurl + '&branchid=' + loginData._results.employee_branch_id;
    this.service.getInventoryList(brurl).subscribe(res => {
      this.inventoryData = res.json().result
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Reset Applied Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
    });
    this.vehicleModelFilter = " ";
    this.vehicleColorFilter = " ";
    this.vehicleVariantFilter = " ";
    this.fromDate = " ";
    this.toDate = " ";
  }
}

