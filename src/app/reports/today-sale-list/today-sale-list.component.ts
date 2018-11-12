import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { DashboardServiceService } from '../../services/dashboard-service.service';
declare var jsPDF: any;
import { ExcelServiceService } from '../../services/excel-service.service';
@Component({
  selector: 'app-today-sale-list',
  templateUrl: './today-sale-list.component.html',
  styleUrls: ['./today-sale-list.component.css']
})
export class TodaySaleListComponent implements OnInit {
  todaySaleList: any = [];
  cols: any[];
  constructor(private router: Router, private service: DashboardServiceService, private excelService: ExcelServiceService) { }

  ngOnInit() {

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
      { field: 'user_type', header: 'User Type' },
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
    var rows = this.todaySaleList;
    var doc = new jsPDF('');
    doc.autoTable(columns, rows, {
      styles: { fillColor: [100, 255, 255] },
      columnStyles: {
        id: { fillColor: [255, 0, 0] }
      },
      margin: { top: 50 },
      addPageContent: function () {
        doc.text("Todaysale", 30, 30);
      }
    });
    doc.save('Todaysale.pdf');
  }
  xlDownload() {
    this.excelService.exportAsExcelFile(this.todaySaleList, 'TodaySalesList');
  }

}
