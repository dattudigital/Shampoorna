import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-setup-price-list',
  templateUrl: './setup-price-list.component.html',
  styleUrls: ['./setup-price-list.component.css']
})
export class SetupPriceListComponent implements OnInit {

  constructor(private router: Router) { }

  arrayBuffer:any;
  file:File;
  incomingfile(event) 
   {
    this.file= event.target.files[0]; 
   }


  ngOnInit() {
  }
  backToSetup() {
    this.router.navigate(['setup'])
  }

  Upload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result)
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      console.log(data)
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var list = XLSX.utils.sheet_to_json(worksheet, { raw: true })
      console.log(list);
    }
    fileReader.readAsArrayBuffer(this.file);
  }

}
