import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { DashboardServiceService } from '../../services/dashboard-service.service';
import * as moment from 'moment';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-total-sale',
  templateUrl: './total-sale.component.html',
  styleUrls: ['./total-sale.component.css']
})
export class TotalSaleComponent implements OnInit {
  cols: any[];
  totalSaleList: any = [];
  fromDate = "";
  toDate = "";
  public options = { position: ["top", "right"] }
  
  constructor(private http: Http, private router: Router, private service: DashboardServiceService, private notif: NotificationsService) { }

  ngOnInit() {
    this.service.getTotalSale().subscribe(response => {
      console.log(response.json().result);
      this.totalSaleList = response.json().result;
    });
    this.cols = [
      { field: 'firstname', header: 'First Name' },
      { field: 'email_id', header: 'Email' },
      { field: 'address', header: 'Address' },
      { field: 'mandal', header: 'Mandal' },
      { field: 'district', header: 'District' },
      { field: 'proof_type', header: 'Proof Type' },
      { field: 'eng_no', header: 'EngineNo' },
      { field: 'frame_no', header: 'FrameNo' },
      { field: 'dc_no', header: 'DcNo' },
      { field: 'total_amt', header: 'Total Amount' }

    ];
  }
  backToReports() {
    this.router.navigate(['sale-dashboard']);
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
  vehicleTypeFilter = "";
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
    this.service.getTotalSalefilter(url).subscribe(res => {
      console.log(res.json());
      console.log(res.json().status);
      if (res.json().status == true) {
        this.totalSaleList = res.json().result;
        console.log(this.totalSaleList)
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
        this.totalSaleList = res.json()._body;
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

  detailsReset(){
    this.service.getTotalSale().subscribe(res=>{
      console.log(res.json().result);
      this.totalSaleList = res.json().result;
      if(res.json().status ==true){
        console.log('success')
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
    })
    this.vehicleTypeFilter = " ";
  }
}
