import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
declare var $: any;
@Component({
  selector: 'app-vehicle-made',
  templateUrl: './vehicle-made.component.html',
  styleUrls: ['./vehicle-made.component.css']
})
export class VehicleMadeComponent implements OnInit {
  madeData:any=[];
  cols:any=[];
  madeName: '';
  editMadeData: any = [];
  vehicle_make_id: '';
  temp: any;
  make_name: '';
  status: '';
  temp1: any
  typeDeleteData: any = [];


  constructor(private router:Router,private http:Http) { }

  ngOnInit() {
    this.cols = [
      { field: 'vehicle_make_id', header: ' Id' },
      { field: 'make_name', header: ' Name' }
    ];

    this.http.get(environment.host + 'vehicle-makes').subscribe(data => {
      console.log(data.json())
      this.madeData = data.json().result;
      console.log(this.madeData);
    });
  }
  backToSetup(){
    this.router.navigate(['vehicle-setup'])
  }

  addMade() {
    var data = {
      make_name: this.madeName,
      status: 1
    }
    console.log(data);
    this.http.post(environment.host + 'vehicle-makes', data).subscribe(res => {
      console.log(res.json());
      this.madeData.push(res.json().result);
      console.log(this.madeData);
      $('#addMade').modal('hide');
    })
  }

  removeFields() {
    this.make_name = '';
  }

  editMade(data, index) {
    console.log('**********')
    console.log(data)
    this.editMadeData = data;
    data.index = index;
    this.temp = index;
    console.log(this.editMadeData[index].make_name);
    this.vehicle_make_id = this.editMadeData[index].vehicle_make_id;
    this.make_name = this.editMadeData[index].make_name;
    this.status = this.editMadeData[index].status;

  }

  updateMade() {
    var data = {
      vehicle_make_id: this.vehicle_make_id,
      make_name: this.make_name,
      status: this.status
    }
    console.log(data);
    this.http.post(environment.host + 'vehicle-makes', data).subscribe(res => {
      console.log(res.json());
      this.editMadeData[this.temp].make_name = data.make_name;
      this.temp = " ";
    })
    this.removeFields();
    $('#editVehicleMade').modal('hide')
  }

  deleteVehicleMade(val, index) {
    this.temp1 = index;
    console.log(index)
    this.typeDeleteData = val;
    console.log(this.typeDeleteData)
    val.index = index;
    this.vehicle_make_id = this.typeDeleteData[index].vehicle_make_id;
  }

  yesVehicleMade() {
    this.madeData.splice(this.temp1, 1)
    console.log(this.temp1)
    var data = {
      vehicle_make_id: this.vehicle_make_id,
      status: "0"
    }
    console.log(data)
    this.http.post(environment.host + 'vehicle-makes', data).subscribe(res => {
      console.log(res.json());
    })
  }
}
