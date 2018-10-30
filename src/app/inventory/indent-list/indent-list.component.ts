import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndentService } from '../../services/indent.service'
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import * as moment from 'moment';

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

  shipId: any;

  vehicleTypeFilter = "";
  vehicleModelFilter = "";
  vehicleColorFilter = "";
  vehicleMakeFilter = "";
  fromDate = "";
  toDate = "";

  editData: any = [];
  temp: any;

  // shippedBy= "";
  // shippedIn= "";
  // shipStatus="";


  constructor(private router: Router, private service: IndentService, private dp: DatePipe, private http: Http) { }

  ngOnInit() {

    this.service.getIndentList().subscribe(res => {
      console.log(res.json().result)
      this.indents = res.json().result
    })

    this.http.get(environment.host + 'vehicle-makes').subscribe(data => {
      console.log(data.json())
      this.makeData = data.json().result;
    });

    this.http.get(environment.host + 'vehicle-models').subscribe(data => {
      console.log(data.json())
      this.modelData = data.json().result;
    });

    this.http.get(environment.host + 'vehicle-colors').subscribe(data => {
      console.log(data.json())
      this.colorData = data.json().result;
    });

    this.http.get(environment.host + 'vehicle-types').subscribe(data => {
      console.log(data.json())
      this.typeData = data.json().result;
    });

    this.cols = [
      { field: 'indent_req_id', header: 'Indent Req ID' },
      { field: 'color_name', header: 'Color' },
      { field: 'type_name', header: 'Type' },
      { field: 'make_name', header: 'Make' },
      { field: 'model_name', header: 'Model' },
      { field: 'req_qty', header: 'Required Qty' },
      { field: 'assigned_qty', header: 'Assaigned Qty.' },
      { field: 'req_on_date', header: 'Req. On Date', type: this.dp },
      { field: 'assigned_on', header: 'Assaigned On', type: this.dp },
      { field: 'updated_on', header: 'Updated On', type: this.dp },
      { field: 'assignedby', header: 'Assaigned By' },
      { field: 'updatedby', header: 'Updated By' },
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
  indent_id ='';
  indent_req_id = '';
  emp_id ='';
  br_id ='';
  veh_color = '';
  veh_type = '';
  veh_make = '';
  veh_model = '';
  req_qty = '';
  assigned_qty = '';
  req_on_date = '';
  assigned_on = '';
  // updated_on = '';
  assignedby = '';
  status ='';
  shipping_status='';
  shipped_vechile_no='';
  shipped_by='';
  // updatedby = '';


  editIndent(data, index){
    console.log(data)
    console.log(index)
    this.editData = data;
    data.index = index;
    this.temp = index;
    console.log(this.editData[index].veh_color)
    this.indent_id = this.editData[index].indent_id
    this.indent_req_id = this.editData[index].indent_req_id;
    this.emp_id=this.editData[index].emp_id;
    this.br_id=this.editData[index].br_id;
    this.veh_color = this.editData[index].veh_color;
    this.veh_type = this.editData[index].veh_type;
    this.veh_make = this.editData[index].veh_make;
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

  updateIndent(){
    var data = {
      indent_id:this.indent_id,
      indent_req_id: this.indent_req_id,
      emp_id: this.emp_id,
      br_id:this.br_id,
      veh_type: this.veh_type,
      veh_color: this.veh_color,
      veh_make: this.veh_make,
      veh_model: this.veh_model,
      req_qty: this.req_qty,
      assigned_qty: this.assigned_qty,
      //req_on_date: this.req_on_date,
      shippind_id: this.shipId,
      shipped_by: this.shipped_by,
      shipped_vechile_no: this.shipped_vechile_no,
      shipping_status:this.shipping_status,
      status:"0"
    }
    console.log(data)
    this.service.addIndent(data).subscribe(res => {
      console.log(res.json())
      console.log(res.json().result)
      console.log(this.temp)
      this.indents.splice(this.temp, 1)
      //this.indents.push(res,this.temp)
      //this.indents[this.temp].indent_req_id = data.indent_req_id;
    })
  }

  detailsGo() {
    var url = '';
    if (this.fromDate) {
      url = url + 'startdate=' + this.fromDate;
    }
    if (this.toDate) {
      url = url + '&enddate=' + this.toDate;
    }
    if (this.vehicleTypeFilter) {
      url = url + '&type=' + this.vehicleTypeFilter;
    }
    if (this.vehicleMakeFilter) {
      url = url + '&make=' + this.vehicleMakeFilter;
    }
    if (this.vehicleModelFilter) {
      url = url + '&model=' + this.vehicleModelFilter;
    }
    if (this.vehicleColorFilter) {
      url = url + '&color=' + this.vehicleColorFilter;
    }
    console.log(this.vehicleMakeFilter);
    console.log(url)
    this.service.getIndentFilter(url).subscribe(res => {
      console.log(res.json());
      console.log("*******")
      console.log(res)
      console.log(res.json().status)

      if (res.json().status == true) {
        this.indents = res.json().result;
        console.log(this.indents)
      }
      else {
        this.indents = res.json()._body;

        //     this.notif.error(
        //       'Error',
        //       'No Records Found',
        //       {
        //         timeOut: 3000,           
        //         showProgressBar: true,
        //         pauseOnHover: false,
        //         clickToClose: true,
        //         maxLength: 50
        //       })
      }
    })
  }
  detailsReset() {
    this.service.getIndentList().subscribe(res => {
      console.log(res.json().result)
      this.indents = res.json().result
    });
    this.vehicleTypeFilter = " ";
    this.vehicleModelFilter = " ";
    this.vehicleColorFilter = " ";
    this.vehicleMakeFilter = " ";
    this.fromDate = " ";
    this.toDate = " ";
  }


}
