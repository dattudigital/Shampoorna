import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndentService } from '../../services/indent.service'
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { AllVehicleService } from '../../services/all-vehicle.service';

@Component({
  selector: 'app-indent-list',
  templateUrl: './indent-list.component.html',
  styleUrls: ['./indent-list.component.css'],
  providers: [
    DatePipe
  ]
})
export class IndentListComponent implements OnInit {
  public date1: any;
  public date2: any;

  indents: any[];
  cols: any[];

  typeData: any[];
  makeData: any[];
  modelData: any[];
  colorData: any[];
  variantData: any[];

  shipId: any;
  vehicleTypeFilter = "0";
  vehicleModelFilter = "0";
  vehicleColorFilter = "0";
  vehicleVariantFilter = "0";
  fromDate = "";
  toDate = "";

  editData: any = [];
  temp: any;
  public options = { position: ["top", "right"] }
  // shippedBy= "";
  // shippedIn= "";
  // shipStatus="";

  constructor(private router: Router, private allvehicleservice: AllVehicleService, private service: IndentService, private dp: DatePipe, private http: Http, private notif: NotificationsService) { }

  ngOnInit() {
    let loginData = JSON.parse(sessionStorage.getItem('secondaryLoginData'));

    console.log("#####")
    console.log(loginData._results.employee_branch_id)
    var brurl = '';
    brurl = brurl + '?status=1';
    brurl = brurl + '&branchid=' + loginData._results.employee_branch_id;
    this.service.getIndentList(brurl).subscribe(res => {
      if (res.json().status == true) {  
      console.log(res.json().result)
      this.indents = res.json().result
      }
    })

    this.allvehicleservice.getColor().subscribe(data => {
      console.log(data.json())
      this.colorData = data.json().result;
    });
    this.allvehicleservice.getCategory().subscribe(data => {
      console.log(data.json())
      this.typeData = data.json().result;
    });
    this.allvehicleservice.getModel().subscribe(data => {
      this.modelData = data.json().result;
      console.log(this.modelData)
    });
    this.allvehicleservice.getVariant().subscribe(data => {
      this.variantData = data.json().result;
      console.log(this.variantData)
    })

    this.cols = [
      { field: 'indent_req_id', header: 'Indent Req ID' },
      { field: 'type_name', header: 'Type' },
      { field: 'model_name', header: 'Model' },
      { field: 'variant_name', header: 'Variant' },
      { field: 'color_name', header: 'Color' },
      { field: 'req_qty', header: 'Required Qty' },
      // { field: 'assigned_qty', header: 'Assaigned Qty.' },
      { field: 'req_on_date', header: 'Req. On Date', type: this.dp },
      // { field: 'assigned_on', header: 'Assaigned On', type: this.dp },
      // { field: 'updated_on', header: 'Updated On', type: this.dp },
      { field: 'createdemp', header: 'Assaigned By' },
      { field: 'updatedemp', header: 'Updated By' },
    ];
  }

  fromDa() {
    let newDate = moment(this.fromDate).format('YYYY-MM-DD').toString();
    this.fromDate = newDate;
    console.log(this.fromDate)
  }

  toDa() {
    let newDate1 = moment(this.toDate).format('YYYY-MM-DD').toString();
    this.toDate = newDate1;
    console.log(this.toDate)
  }

  backToInventory() {
    this.router.navigate(['inventory']);
  }

  indent_id = '';
  indent_req_id = '';
  emp_id = '';
  br_id = '';
  veh_color = '';
  veh_type = '';
  veh_variant = '';
  veh_model = '';
  req_qty = '';
  assigned_qty = '';
  req_on_date = '';
  assigned_on = '';
  // updated_on = '';
  assignedby = '';
  status = '';
  shipping_status = '';
  shipped_vechile_no = '';
  shipped_by = '';
  // updatedby = '';

  editIndent(data, index) {
    console.log(data)
    console.log(index)
    this.editData = data;
    data.index = index;
    this.temp = index;
    console.log(this.editData[index].veh_color)
    this.indent_id = this.editData[index].indent_id
    this.indent_req_id = this.editData[index].indent_req_id;
    this.emp_id = this.editData[index].emp_id;
    this.br_id = this.editData[index].br_id;
    this.veh_color = this.editData[index].veh_color;
    this.veh_type = this.editData[index].veh_type;
    this.veh_variant = this.editData[index].veh_variant;
    this.veh_model = this.editData[index].veh_model;
    this.req_qty = this.editData[index].req_qty;
    this.assigned_qty = this.editData[index].assigned_qty;
    this.req_on_date = this.editData[index].req_on_date;
    this.assigned_on = this.editData[index].assigned_on;
    this.shipping_status = this.editData[index].shipping_status;
    this.shipped_vechile_no = this.editData[index].shipped_vechile_no;
    this.shipped_by = this.editData[index].shipped_by;
    this.status = this.editData[index].status;
    // this.updated_on = this.editData[index].updated_on;
    this.assignedby = this.editData[index].assignedby;
    // this.updatedby = this.editData[index].updatedby;
    this.shipId = "SHP" + Math.floor(Math.random() * 899999 + 100000);
    console.log(this.shipId)
  }

  // redirctToInvAssn(){

  //   this.router.navigate(['inventory/inventory-assigning']);
  // }

  updateIndent() {
    var data = {
      indent_id: this.indent_id,
      indent_req_id: this.indent_req_id,
      emp_id: this.emp_id,
      br_id: this.br_id,
      veh_type: this.veh_type,
      veh_color: this.veh_color,
      veh_variant: this.veh_variant,
      veh_model: this.veh_model,
      req_qty: this.req_qty,
      assigned_qty: this.assigned_qty,
      //req_on_date: this.req_on_date,
      shippind_id: this.shipId,
      shipped_by: this.shipped_by,
      shipped_vechile_no: this.shipped_vechile_no,
      shipping_status: this.shipping_status,
      status: "0"
    }
    console.log(data)
    this.service.addIndent(data).subscribe(res => {
      console.log(res.json())
      console.log(res.json().result)
      console.log(this.temp)
      
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Inventory Assaigned Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )        
        sessionStorage.setItem('indentData',JSON.stringify(this.indents[this.temp]))
        setTimeout(() => {
          this.router.navigate(['inventory/inventory-assigning']);
        }, 1000);
        this.indents.splice(this.temp, 1)
      }
    })
  }

  detailsGo() {
    var url = '';
    let loginData = JSON.parse(sessionStorage.getItem('secondaryLoginData'));
    url = url + '&branchid=' + loginData._results.employee_branch_id;
    if (this.fromDate) {
      url = url + '&startdate=' + this.fromDate;
    }
    if (this.toDate) {
      url = url + '&enddate=' + this.toDate;
    }
    if (this.vehicleTypeFilter != "0" ) {
      url = url + '&type=' + this.vehicleTypeFilter;
    }
    if (this.vehicleVariantFilter != "0") {
      url = url + '&variant=' + this.vehicleVariantFilter;
    }
    if (this.vehicleModelFilter != "0") {
      url = url + '&model=' + this.vehicleModelFilter;
    }
    if (this.vehicleColorFilter != "0") {
      url = url + '&color=' + this.vehicleColorFilter;
    }
    // console.log(this.vehicleVariantFilter);
    console.log(url)
    this.service.getIndentFilter(url).subscribe(res => {
      console.log(res.json());
      console.log("*******")
      console.log(res)
      console.log(res.json().status)

      if (res.json().status == true) {
        this.indents = res.json().result;
        console.log(this.indents)
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
      }
      else {
        this.indents = res.json()._body;
        this.notif.warn(
          'Sorry',
          'No Records Found',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
    })
  }
  detailsReset() {
    let loginData = JSON.parse(sessionStorage.getItem('secondaryLoginData'));
    var brurl = '';
    brurl = brurl + '?status=1';
    brurl = brurl + '&branchid=' + loginData._results.employee_branch_id;
    this.service.getIndentList(brurl).subscribe(res => {
      console.log(res.json().result)
      this.indents = res.json().result
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
    this.vehicleTypeFilter = "0";
    this.vehicleModelFilter = "0";
    this.vehicleColorFilter = "0";
    this.vehicleVariantFilter = "0";
    this.fromDate = " ";
    this.toDate = " ";
  }
}
