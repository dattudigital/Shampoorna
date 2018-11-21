import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-vehicle-bulk',
  templateUrl: './add-vehicle-bulk.component.html',
  styleUrls: ['./add-vehicle-bulk.component.css']
})
export class AddVehicleBulkComponent implements OnInit {

  constructor(private router: Router, private http: Http) { }
  arrayBuffer: any;
  file: File;
  colorData: any[];
  typeData: any[];
  incomingfile(event) {
    this.file = event.target.files[0];
  }


  ngOnInit() {
    this.http.get(environment.host + 'vehicle-colors').subscribe(data => {
      console.log(data.json())
      this.colorData = data.json().result;
    });
    this.http.get(environment.host + 'vehicle-types').subscribe(data => {
      console.log(data.json())
      this.typeData = data.json().result;
    });
  }

  backToVehicleDetails() {
    this.router.navigate(['inventory/vehicle-details']);
  }

  Upload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary", cellDates: true });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var list = XLSX.utils.sheet_to_json(worksheet, { raw: false })
      // console.log(list); // list.Colour
      // this.colorData.color_name
      list.map(item => {
        this.colorData.map(color => {
          if (item["Colour"] == color.color_name) {
            item["vehicle_color"] = color.vehicle_color_id;
            delete item["Colour"];
          }
        });
        this.typeData.map(type => {
          console.log("***********888")
          if (item["Category"] == null) {

          } else {
            if (item["Category"].toLowerCase() == type.type_name.toLowerCase()) {
              console.log(type.vehicle_type_id)
              item["vehicle_type"] = type.vehicle_type_id;
              delete item["Category"];
            }
          }
        })
      });
      console.log(list)
    }
    fileReader.readAsArrayBuffer(this.file);
  }

}
