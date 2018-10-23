import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { IndentService } from '../../services/indent.service'
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';

@Component({
  selector: 'app-indent-list',
  templateUrl: './indent-list.component.html',
  styleUrls: ['./indent-list.component.css'],
  providers: [
    DatePipe
  ]
})
export class IndentListComponent implements OnInit {

  indents:any[];
  cols: any[];

  typeData: any[];
  makeData: any[];
  modelData: any[];
  colorData: any[];

  vehicleTypeFilter="";
  vehicleModelFilter="";
  vehicleColorFilter="";
  vehicleMakeFilter="";
  fromDate="";
  toDate="";

  constructor(private router:Router,private service:IndentService,private dp: DatePipe, private http: Http) { }

  ngOnInit() {

    this.service.getIndentList().subscribe(res=>{
      console.log(res.json().result)
      this.indents=res.json().result
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

    this.cols=[
      { field: 'indent_req_id', header: 'Indent Req ID' },
      { field: 'color_name', header: 'Color' },
      { field: 'type_name', header: 'Type' },
      { field: 'make_name', header: 'Make' },
      { field: 'model_name', header: 'Model' },
      { field: 'req_qty', header: 'Required Qty' },
      { field: 'assigned_qty', header: 'Assaigned Qty.' },
      { field: 'req_on_date', header: 'Req. On Date',type: this.dp},
      { field: 'assigned_on', header: 'Assaigned On',type: this.dp  },
      { field: 'updated_on', header: 'Updated On',type: this.dp },
      { field: 'assignedby', header: 'Assaigned By' },
      { field: 'updatedby', header: 'Updated By' },
    ];
  }

  backToInventory() {
    this.router.navigate(['inventory']);

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
    this.vehicleModelFilter=" ";
    this.vehicleColorFilter=" ";
    this.vehicleMakeFilter=" ";
    this.fromDate=" ";
    this.toDate=" ";
  }


}
