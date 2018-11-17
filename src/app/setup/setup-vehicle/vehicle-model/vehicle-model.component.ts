import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
declare var $: any;
@Component({
  selector: 'app-vehicle-model',
  templateUrl: './vehicle-model.component.html',
  styleUrls: ['./vehicle-model.component.css']
})
export class VehicleModelComponent implements OnInit {
  modelData: any = [];
  cols: any = [];
  modelName: '';
  editModelData: any = [];
  temp: any;
  vehicle_model_id: '';
  model_name: '';
  temp1: any;
  modeldeleteData: any = [];
  constructor(private router: Router, private http: Http) { }

  ngOnInit() {
    this.cols = [
      { field: 'vehicle_model_id', header: ' Id' },
      { field: 'model_name', header: ' Name' }
    ];
    this.http.get(environment.host + 'vehicle-models').subscribe(data => {
      console.log(data.json())
      this.modelData = data.json().result;
    });
  }
  backToSetup() {
    this.router.navigate(['vehicle-setup'])
  }
  addModel() {
    var data = {
      model_name: this.modelName,
      status: 1
    }
    this.http.post(environment.host + 'vehicle-models', data).subscribe(res => {
      console.log(res.json());
      this.modelData.push(res.json().result);
      console.log(this.modelData);
      $('#addNewModel').modal('hide');
    })
    console.log(data);
  }
  removeFields() {
    this.model_name = '';
  }
  editModel(data, index) {
    console.log('**********')
    console.log(data)
    this.editModelData = data;
    data.index = index;
    this.temp = index;
    this.vehicle_model_id = this.editModelData[index].vehicle_model_id;
    this.model_name = this.editModelData[index].model_name;
  }

  updateModel() {
    var data = {
      vehicle_model_id: this.vehicle_model_id,
      model_name: this.model_name,
      status: 1
    }
    console.log(data);
    this.http.post(environment.host + 'vehicle-models', data).subscribe(res => {
      this.editModelData[this.temp].model_name = data.model_name;
      this.temp = " ";
    });
    this.removeFields();
    $('#editVehicleModel').modal('hide')
  }

  deleteModel(val, index) {
    this.temp1 = index;
    console.log(index)
    this.modeldeleteData = val;
    console.log(this.modeldeleteData)
    val.index = index;
    this.vehicle_model_id = this.modeldeleteData[index].vehicle_model_id;
  }
  yesDeleteModel() {
    this.modelData.splice(this.temp1, 1)
    console.log(this.temp1)
    var data = {
      vehicle_model_id: this.vehicle_model_id,
      status: "0"
    }
    console.log(data)
    this.http.post(environment.host + 'vehicle-models', data).subscribe(res => {
      console.log(res.json());
    })
  }
}
