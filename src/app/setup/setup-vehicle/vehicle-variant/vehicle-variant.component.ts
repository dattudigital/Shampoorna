import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
declare var $: any;
@Component({
  selector: 'app-vehicle-variant',
  templateUrl: './vehicle-variant.component.html',
  styleUrls: ['./vehicle-variant.component.css']
})
export class VehicleVariantComponent implements OnInit {
  variantData: any = [];
  cols: any = [];
  variantName: '';
  editVariantData: any = []
  temp: any;
  variant_name: '';
  vehicle_variant_id: '';
  status: '';
  temp1: any;
  variantDeleteData: any = []

  constructor(private router: Router, private http: Http) { }

  ngOnInit() {
    this.cols = [
      { field: 'variant_name', header: 'Variant' }
    ];

    this.http.get(environment.host + 'vehicle-variants').subscribe(data => {
      if (data.json().status == true) {
        this.variantData = data.json().result;
      } else {
        this.variantData = [];
      }
    });
  }

  backToSetup() {
    this.router.navigate(['vehicle-setup'])
  }

  addVariant() {
    var data = {
      variant_name: this.variantName,
      status: 1
    }
    this.http.post(environment.host + 'vehicle-variants', data).subscribe(res => {
      this.variantData.push(res.json().result);
      $('#addVariant').modal('hide');
    })
  }

  removeFields() {
    this.variant_name = '';
  }

  editVariant(data, index) {
    this.editVariantData = data;
    data.index = index;
    this.temp = index;
    this.vehicle_variant_id = this.editVariantData[index].vehicle_variant_id;
    this.variant_name = this.editVariantData[index].variant_name;
    this.status = this.editVariantData[index].status
  }

  updateVariant() {
    var data = {
      vehicle_variant_id: this.vehicle_variant_id,
      variant_name: this.variant_name,
      status: this.status
    }
    this.http.post(environment.host + 'vehicle-variants', data).subscribe(res => {
      this.editVariantData[this.temp].variant_name = data.variant_name;
      this.temp = " ";
    })
    this.removeFields();
    $('#editVehicleVariant').modal('hide')
  }

  deleteVariant(val, index) {
    this.temp1 = index;
    this.variantDeleteData = val;
    val.index = index;
    this.vehicle_variant_id = this.variantDeleteData[index].vehicle_variant_id;
  }

  yesVehicleVariant() {
    this.variantData.splice(this.temp1, 1)
    var data = {
      vehicle_variant_id: this.vehicle_variant_id,
      status: "0"
    }
    this.http.post(environment.host + 'vehicle-variants', data).subscribe(res => {
    })
  }

}
