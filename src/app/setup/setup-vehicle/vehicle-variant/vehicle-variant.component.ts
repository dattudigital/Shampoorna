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
  status:'';
  temp1:any;
  variantDeleteData: any =[ ]

  constructor(private router: Router, private http: Http) { }

  ngOnInit() {
    this.cols = [
      // { field: 'vehicle_variant_id', header: ' Id' },
      { field: 'variant_name', header: 'Variant' }
    ];

    this.http.get(environment.host + 'vehicle-variants').subscribe(data => {
      console.log(data.json())
      this.variantData = data.json().result;
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
    console.log(data);
    this.http.post(environment.host + 'vehicle-variants', data).subscribe(res => {
      console.log(res.json());
      this.variantData.push(res.json().result);
      console.log(this.variantData);
      $('#addVariant').modal('hide');
    })
  }

  removeFields() {
    this.variant_name = '';
  }

  editVariant(data, index) {
    console.log('**********')
    console.log(data)
    this.editVariantData = data;
    data.index = index;
    this.temp = index;
    console.log(this.editVariantData[index].variant_name);
    this.vehicle_variant_id = this.editVariantData[index].vehicle_variant_id;
    this.variant_name = this.editVariantData[index].variant_name;
    this.status=this.editVariantData[index].status
  }

  updateVariant() {
    var data = {
      vehicle_variant_id: this.vehicle_variant_id,
      variant_name: this.variant_name,
      status:this.status
    }
    console.log(data);
    this.http.post(environment.host + 'vehicle-variants', data).subscribe(res => {
      console.log(res.json());
      this.editVariantData[this.temp].variant_name = data.variant_name;
      this.temp = " ";
    })
    this.removeFields();
    $('#editVehicleVariant').modal('hide')
  }

  deleteVariant(val, index) {
    this.temp1 = index;
    console.log(index)
    this.variantDeleteData = val;
    console.log(this.variantDeleteData)
    val.index = index;
    this.vehicle_variant_id = this.variantDeleteData[index].vehicle_variant_id;
  }

  yesVehicleVariant(){
    this.variantData.splice(this.temp1, 1)
    console.log(this.temp1)
    var data = {
      vehicle_variant_id: this.vehicle_variant_id,
      status: "0"
    }
    console.log(data)
    this.http.post(environment.host + 'vehicle-variants', data).subscribe(res => {
      console.log(res.json());
    })
  }

}
