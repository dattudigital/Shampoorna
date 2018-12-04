import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryAssigningService } from '../../services/inventory-assigning.service';
declare var jsPDF: any;
import { ExcelServiceService } from '../../services/excel-service.service';

@Component({
  selector: 'app-inventory-details-list',
  templateUrl: './inventory-details-list.component.html',
  styleUrls: ['./inventory-details-list.component.css']
})
export class InventoryDetailsListComponent implements OnInit {
  cols: any[];
  inventoryData: any[];

  constructor(private router: Router, private service: InventoryAssigningService, private excelService: ExcelServiceService) { }

  ngOnInit() {
    let loginData = JSON.parse(sessionStorage.getItem('secondaryLoginData'));
    if (loginData) {
      var brurl = '';
      brurl = brurl + '&branchid=' + loginData._results.branch_id;
      this.service.getInventoryList(brurl).subscribe(res => {
        console.log(res.json().result)
        if (res.json().status == true) {
          this.inventoryData = res.json().result;
        } else {
          this.inventoryData = [];
        }
      });
    }

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

  backToReports() {
    this.router.navigate(['reports']);
  }

  pdfDownload() {
    var columns = [
      { title: "Branch", dataKey: "branch_name" },
      { title: "Indent ID", dataKey: "indent_req_id" },
      { title: "Assaigned By", dataKey: "employee_firstname" },
      { title: "Shipping ID ", dataKey: "generated_shipping_id" },
      { title: "Shipped By ", dataKey: "shipped_by" },
      { title: " Generated Shipping Id ", dataKey: "generated_shipping_id" },
      { title: "Vehicle No ", dataKey: "vechile_no" },
      { title: " ChassisNo ", dataKey: "chassisno" },
      { title: " EngineNo ", dataKey: "engineno" },
    ]

    var rows = this.inventoryData;
    var doc = new jsPDF('');
    doc.autoTable(columns, rows, {
      styles: { fillColor: [100, 255, 255] },
      columnStyles: {
        id: { fillColor: [255, 0, 0] }
      },
      margin: { top: 50 },
      addPageContent: function () {
        doc.text("InventoryDetails", 30, 30);
      }
    });
    doc.save('Inventorydetails.pdf');
  }

  xlDownload() {
    this.excelService.exportAsExcelFile(this.inventoryData, 'inventoryData');
  }

}
