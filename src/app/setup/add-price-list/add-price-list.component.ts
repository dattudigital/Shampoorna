import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import * as XLSX from 'xlsx';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';

@Component({
  selector: 'app-add-price-list',
  templateUrl: './add-price-list.component.html',
  styleUrls: ['./add-price-list.component.css']
})
export class AddPriceListComponent implements OnInit {

  constructor(private router: Router, private http: Http) {

  }
  varientList: any = [];
  arrayBuffer: any;
  file: File;
  list: any = [];
  incomingfile(event) {
    this.file = event.target.files[0];
  }

  ngOnInit() {
    this.http.get(environment.host + 'vehicle-variants').subscribe(res => {
      console.log(res.json().result)
      this.varientList = res.json().result
    });
  }

  Upload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.list = XLSX.utils.sheet_to_json(worksheet, { raw: true })
      console.log(this.list);
      this.list.map(item => {
        this.varientList.map(varient => {
          if (item["MODEL"] == varient.variant_name) {
            item["vehicle_variant_id"] = varient.vehicle_variant_id;
            delete item["MODEL"];
          } else { // REMOVE THIS ELSE 
            delete item["MODEL"];
            item["vehicle_variant_id"] = 1;
          }
        });
      })
    }
    // variant_name
    fileReader.readAsArrayBuffer(this.file);
  }

  backToPriceSetup() {
    this.router.navigate(['setup/price-list'])
  }
  submite() {
    this.http.post(environment.host + 'setup-price-lists/bulk', this.list).subscribe(res => {
      console.log(res.json().result)
    });
  }

}
