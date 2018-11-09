import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import { NotificationsService } from 'angular2-notifications';
import { DashboardServiceService } from '../../services/dashboard-service.service'
@Component({
  selector: 'app-today-sale',
  templateUrl: './today-sale.component.html',
  styleUrls: ['./today-sale.component.css']
})
export class TodaySaleComponent implements OnInit {
  cols: any[];
  todaySaleList: any = [];
  branchData: any = [];
  fromDa = '';
  toDate = '';
  public date1: any;
  public date2: any;
  typeData: any[];
  makeData: any[];
  modelData: any[];
  colorData: any[];
  vehicleTypeFilter = "";

  constructor(private router: Router, private http: Http,private notif: NotificationsService, private service: DashboardServiceService) { }

  ngOnInit() {
    this.http.get(environment.host + 'branches').subscribe(res => {
      this.branchData = res.json().result;
      console.log(this.branchData)
    });
    
  


    this.service.getTodaySale().subscribe(res => {
      console.log(res.json().result);
      this.todaySaleList = res.json().result;
      console.log(this.todaySaleList);
    });
    this.cols = [
      { field: 'firstname', header: 'First Name' },
      { field: 'email_id', header: 'Email' },
      { field: 'address', header: 'Address' },
      { field: 'mandal', header: 'Mandal' },
      { field: 'district', header: 'District' },
      { field: 'proof_type', header: 'Proof Type' },
      {field: 'user_type',header:'User Type'},
      { field: 'eng_no', header: 'EngineNo' },
      { field: 'frame_no', header: 'FrameNo' },
      { field: 'dc_no', header: 'DcNo' },
      { field: 'total_amt', header: 'Total Amount' }
    ];
  }
  backToReports() {
    this.router.navigate(['sale-dashboard']);
  }

  fromDate() {
    let newDate = moment(this.fromDa).format('YYYY-MM-DD').toString();
    this.fromDa = newDate;
    console.log(this.fromDa)
  }
  toDateDisplay() {
    let newDate = moment(this.toDate).format('YYYY-MM-DD').toString();
    this.toDate = newDate;
    console.log(this.toDate)
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
      url = url + '&user_type=' + this.vehicleTypeFilter;
    }

    console.log(url)
    this.service.getTodayFilter(url).subscribe(res => {
      console.log(res.json());
      console.log("*******")
      console.log(res)
      console.log(res.json().status)

      if (res.json().status == true) {
        this.todaySaleList = res.json().result;
        console.log(this.todaySaleList)
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
        this.todaySaleList = res.json()._body;
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
}
