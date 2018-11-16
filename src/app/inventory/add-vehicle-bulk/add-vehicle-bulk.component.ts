import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-vehicle-bulk',
  templateUrl: './add-vehicle-bulk.component.html',
  styleUrls: ['./add-vehicle-bulk.component.css']
})
export class AddVehicleBulkComponent implements OnInit {

  constructor(private router: Router) { }
  arrayBuffer:any;
  file:File;
  incomingfile(event) 
   {
    this.file= event.target.files[0]; 
   }


  ngOnInit() {
  }

  backToVehicleDetails() {
    this.router.navigate(['inventory/vehicle-details']);
  }

  Upload() {
    let fileReader = new FileReader();
      fileReader.onload = (e) => {
        console.log(fileReader.result)
          this.arrayBuffer = fileReader.result;
          var data = new Uint8Array(this.arrayBuffer);
          console.log(data)
          var arr = new Array();
          for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          var workbook = XLSX.read(bstr, {type:"binary"});
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
          var list =XLSX.utils.sheet_to_json(worksheet,{raw:true})
          console.log(list);
      }
      fileReader.readAsArrayBuffer(this.file);
}

}
