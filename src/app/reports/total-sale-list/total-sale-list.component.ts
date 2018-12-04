import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardServiceService } from '../../services/dashboard-service.service';
declare var jsPDF: any;
import { ExcelServiceService } from '../../services/excel-service.service';
import * as moment from 'moment';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-total-sale-list',
  templateUrl: './total-sale-list.component.html',
  styleUrls: ['./total-sale-list.component.css']
})
export class TotalSaleListComponent implements OnInit {
  cols: any[];
  totalSaleList: any = [];
  public date1: any;
  public date2: any;
  fromDate = "";
  toDate = "";
  vehicleTypeFilter = "";
  loginData: any = [];

  public options = { position: ["top", "right"] }
  constructor(private router: Router, private notif: NotificationsService, private service: DashboardServiceService, private excelService: ExcelServiceService) { }

  ngOnInit() {
    this.loginData = JSON.parse(sessionStorage.getItem('userSession'));
    console.log(this.loginData);
    var branchId = this.loginData._results.employee_branch_id;
    console.log(branchId)
    this.service.getSaleAndInventoryCount(branchId).subscribe(response => {
      console.log(response.json().result);
      this.totalSaleList = response.json().result;
    });
    this.cols = [
      { field: 'firstname', header: 'First Name' },
      // { field: 'email_id', header: 'Email' },
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
    this.router.navigate(['reports']);
  }
  pdfDownload() {
    var columns = [
      { title: "First Name", dataKey: "firstname" },
      { title: "Email", dataKey: "email_id" },
      { title: "Address", dataKey: "address" },
      { title: "EngineNo", dataKey: "eng_no" },
      { title: "FrameNo", dataKey: "frame_no" },
      { title: "DcNo", dataKey: "dc_no" },
      { title: "Total Amount", dataKey: "total_amt" }
    ];
    var rows = this.totalSaleList;
    var doc = new jsPDF('');
    doc.autoTable(columns, rows, {
      styles: { fillColor: [100, 255, 255] },
      columnStyles: {
        id: { fillColor: [255, 0, 0] }
      },
      margin: { top: 50 },
      addPageContent: function () {
        doc.text("Totalsale", 30, 30);
      }
    });
    doc.save('Totalsale.pdf');
  }
  xlDownload() {
    this.excelService.exportAsExcelFile(this.totalSaleList, 'TotalSalesList');
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
  detailsReset() {
    this.service.getTotalSale().subscribe(res => {
      console.log(res.json().result)
      this.totalSaleList = res.json().result
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
    this.vehicleTypeFilter = "";
    this.date1 = "";
    this.date1 = "";
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
}
