import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { VehicleDetailService } from '../../services/vehicle-detail.service';
declare var jsPDF: any;
import { ExcelServiceService } from '../../services/excel-service.service';
@Component({
  selector: 'app-vehicle-details-list',
  templateUrl: './vehicle-details-list.component.html',
  styleUrls: ['./vehicle-details-list.component.css']
})
export class VehicleDetailsListComponent implements OnInit {

  bikes: any[];
  cols: any[];

  constructor(private router: Router, private service: VehicleDetailService, private excelService: ExcelServiceService) { }

  ngOnInit() {
    this.cols = [
      { field: 'vehicle_engineno', header: 'Engine No.' },
      { field: 'vehicle_name', header: 'Name' },
      { field: 'color_name', header: 'Color' },
      { field: 'type_name', header: 'Type' },
      { field: 'make_name', header: 'Make' },
      { field: 'model_name', header: 'Model' },
      { field: 'vehicle_cost', header: 'Cost' },
      { field: 'vechile_key', header: 'Key No.' },
      { field: 'vechicle_dcno', header: 'DC No.' },
      { field: 'vehicle_frameno', header: 'Frame No.' },
      { field: 'vechicle_invoiceno', header: 'Invoice No.' },
    ];

    this.service.getVehicleDetails().subscribe(res => {
      if (res.json().status == true) {
        this.bikes = res.json().result
      } else {
        this.bikes = [];
      }
    });
  }

  backToReports() {
    this.router.navigate(['reports']);
  }

  pdfDownload() {
    var columns = [
      { title: "EngineNo", dataKey: "vehicle_engineno" },
      { title: "Vehicle Name", dataKey: "vehicle_name" },
      { title: "Color", dataKey: "color_name" },
      { title: "Type", dataKey: "type_name" },
      { title: "MakeName", dataKey: "make_name" },
      { title: "Model Name", dataKey: "model_name" },
      { title: "Vehicle Cost", dataKey: "vehicle_cost" },
      { title: "KeyNo", dataKey: "vechile_key" },
      { title: "Vehicle DcNo", dataKey: "vechicle_dcno" },
      { title: "Vehicle FrameNo", dataKey: "vehicle_frameno" },
      { title: "Vehicle InvoiceNo", dataKey: "vechicle_invoiceno" },
    ];

    var rows = this.bikes;
    var doc = new jsPDF('');
    doc.autoTable(columns, rows, {
      styles: { fillColor: [100, 255, 255] },
      columnStyles: {
        id: { fillColor: [255, 0, 0] }
      },
      margin: { top: 50 },
      addPageContent: function () {
        doc.text("VehicleDetails", 30, 30);
      }
    });
    doc.save('Vehicledetails.pdf');
  }

  xlDownload() {
    this.excelService.exportAsExcelFile(this.bikes, 'inventoryData');
  }

}
