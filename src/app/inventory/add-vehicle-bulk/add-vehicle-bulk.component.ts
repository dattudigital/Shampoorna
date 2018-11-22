import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { AllVehicleService } from '../../services/all-vehicle.service';
import { VehicleDetailService } from '../../services/vehicle-detail.service';

@Component({
  selector: 'app-add-vehicle-bulk',
  templateUrl: './add-vehicle-bulk.component.html',
  styleUrls: ['./add-vehicle-bulk.component.css']
})
export class AddVehicleBulkComponent implements OnInit {

  constructor(private router: Router, private http: Http, private service: AllVehicleService, private vehicleservice: VehicleDetailService) { }
  arrayBuffer: any;
  file: File;
  colorData: any[];
  typeData: any[];
  modelData: any[];
  variantData: any[];
  incomingfile(event) {
    this.file = event.target.files[0];
  }


  ngOnInit() {
    this.service.getColor().subscribe(data => {
      console.log(data.json())
      this.colorData = data.json().result;
    });
    this.service.getCategory().subscribe(data => {
      console.log(data.json())
      this.typeData = data.json().result;
    });
    this.service.getModel().subscribe(data => {
      this.modelData = data.json().result;
      console.log(this.modelData)
    });
    this.service.getVariant().subscribe(data => {
      this.variantData = data.json().result;
      console.log(this.variantData)
    })
  }

  backToVehicleDetails() {
    this.router.navigate(['inventory/vehicle-details']);
  }
  list: any = [];
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
      this.list = XLSX.utils.sheet_to_json(worksheet, { raw: false })
      // console.log(list); // list.Colour
      // this.colorData.color_name
      this.list.map(item => {
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
        });
        this.modelData.map(model => {
          console.log("model id")
          if (item["Model"] == null) {

          } else {
            if (item["Model"].toLowerCase() == model.model_name.toLowerCase()) {
              console.log(model.vehicle_model_id);
              item["vehicle_model"] = model.vehicle_model_id;
              delete item["Model"];
            }
          }
        });
        this.variantData.map(variant => {
          console.log("variant id")
          if (item["Variant"] == null) {

          } else {
            if (item["Variant"].toLowerCase() == variant.variant_name.toLowerCase()) {
              console.log(variant.variant_name);
              item["vehicle_variant"] = variant.vehicle_variant_id;
              delete item["variant"]
            }
          }
        })
      });
      console.log(this.list)
    }
    fileReader.readAsArrayBuffer(this.file);
  }

  addBulkVehicles() {
    this.vehicleservice.addVehicleDetails(this.list).subscribe(res => {
      console.log(res.json());
    })
  }

}
