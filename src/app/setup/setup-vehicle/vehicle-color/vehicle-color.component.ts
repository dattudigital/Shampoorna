import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
declare var $: any;
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-vehicle-color',
  templateUrl: './vehicle-color.component.html',
  styleUrls: ['./vehicle-color.component.css']
})
export class VehicleColorComponent implements OnInit {
  colorData: any = [];
  cols: any = [];
  colorName: '';
  editcolorData: any = []
  temp: any;
  color_name: '';
  vehicle_color_id: '';
  status: '';
  temp1: any
  colorDeleteData: any = [];

  public options = { position: ["top", "right"] }

  constructor(private router: Router, private http: Http, private notif: NotificationsService) { }

  ngOnInit() {
    this.cols = [
      { field: 'color_name', header: 'Color' }
    ];

    this.http.get(environment.host + 'vehicle-colors').subscribe(data => {
      if (data.json().status == true) {
        this.colorData = data.json().result;
      } else {
        this.colorData = [];
      }
    });
  }

  backToSetup() {
    this.router.navigate(['vehicle-setup'])
  }

  addColor() {
    var data = {
      color_name: this.colorName,
      status: 1
    }
    this.http.post(environment.host + 'vehicle-colors', data).subscribe(res => {
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Color Added Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      this.colorData.push(res.json().result);
      $('#addcolor').modal('hide');
    })
  }

  removeFields() {
    this.color_name = '';
  }
  editColor(data, index) {
    this.editcolorData = data;
    data.index = index;
    this.temp = index;
    this.vehicle_color_id = this.editcolorData[index].vehicle_color_id;
    this.color_name = this.editcolorData[index].color_name;
    this.status = this.editcolorData[index].status
  }

  updateColor() {
    var data = {
      vehicle_color_id: this.vehicle_color_id,
      color_name: this.color_name,
      status: this.status
    }
    this.http.post(environment.host + 'vehicle-colors', data).subscribe(res => {
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Color Updated Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      this.editcolorData[this.temp].color_name = data.color_name;
      this.temp = " ";
    })
    this.removeFields();
    $('#editVehicleColor').modal('hide')
  }

  deleteVehicleColor(val, index) {
    this.temp1 = index;
    this.colorDeleteData = val;
    val.index = index;
    this.vehicle_color_id = this.colorDeleteData[index].vehicle_color_id;
  }

  yesVehicleColor() {
    this.colorData.splice(this.temp1, 1)
    var data = {
      vehicle_color_id: this.vehicle_color_id,
      status: "0"
    }
    this.http.post(environment.host + 'vehicle-colors', data).subscribe(res => {
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Model Deleted Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
    })
  }
}
