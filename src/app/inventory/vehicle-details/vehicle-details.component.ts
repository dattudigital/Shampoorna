import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleDetailService } from '../../services/vehicle-detail.service'
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  bikes: any[];
  cols: any[];
  deleteData: any = [];
  editData: any = [];
  public date1: any;
  public date2:any;


  typeData: any[];
  makeData: any[];
  modelData: any[];
  colorData: any[];

  engineNumber = "";
  vehicleName = "";
  vehicleType = "";
  vehicleColor = "";
  vehicleMake = "";
  vehicleModel = "";
  vehicleCost = "";
  frameNumber = "";
  dcNumber = "";
  invoiceNumber = "";
  disableSave: boolean = true;
  vehicleForm: FormGroup;
  submitted = false;

  vehicleTypeFilter="";
  vehicleModelFilter="";
  vehicleColorFilter="";
  vehicleMakeFilter="";
  fromDate="";
  toDate="";


  constructor(private router: Router, private service: VehicleDetailService, private http: Http, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.service.getVehicleDetails().subscribe(res => {
      console.log(res.json().result)
      this.bikes = res.json().result
    });
    this.vehicleForm = this.formBuilder.group({
      engineNumber: ['', Validators.required],
      vehicleName: ['', Validators.required],
      vehicleType: ['', Validators.required],
      vehicleColor: ['', Validators.required],
      vehicleMake: ['', Validators.required],
      vehicleModel: ['', Validators.required],
      vehicleCost: ['', Validators.required],
      frameNumber: ['', Validators.required],
      dcNumber: ['', Validators.required],
      invoiceNumber: ['', Validators.required],

    });

    this.cols = [
      { field: 'vehicle_engineno', header: 'Engine No.' },
      { field: 'vehicle_name', header: 'Name' },
      { field: 'color_name', header: 'Color' },
      { field: 'type_name', header: 'Type' },
      { field: 'make_name', header: 'Make' },
      { field: 'model_name', header: 'Model' },
      { field: 'vehicle_cost', header: 'Cost' },
      { field: 'vehicle_frameno', header: 'Frame No.' },
      { field: 'vechicle_dcno', header: 'DC No.' },
      { field: 'vechicle_invoiceno', header: 'Invoice No.' },

    ];

    this.http.get(environment.host + 'vehicle-makes').subscribe(data => {
      console.log(data.json())
      this.makeData = data.json().result;
    });

    this.http.get(environment.host + 'vehicle-models').subscribe(data => {
      console.log(data.json())
      this.modelData = data.json().result;
    });

    this.http.get(environment.host + 'vehicle-colors').subscribe(data => {
      console.log(data.json())
      this.colorData = data.json().result;
    });

    this.http.get(environment.host + 'vehicle-types').subscribe(data => {
      console.log(data.json())
      this.typeData = data.json().result;
    });



    // this.bikes=[
    //   { "name": "Apache RR 310", "type":" Motor Cycle", "colour":"Red" ,"make":"2017","engine no.":"Ch10008956","frame no.":"258522","dc no.":"dcap1258526","invoice":"Apac20170251"},
    //   { "name": "Jupitor", "type":" Mopad", "colour":"Blue" ,"make":"2018","engine no.":"Ch10008956","frame no.":"258522","dc no.":"dcap1258526","invoice":"Apac20170252"},
    //   { "name": "Apache RTR 180", "type":" Motor Cycle", "colour":"Red" ,"make":"2017","engine no.":"Ch10008956","frame no.":"258522","dc no.":"dcap1258526","invoice":"Apac20170253"},
    //   { "name": "Apache RTR 160", "type":" Motor Cycle", "colour":"Red" ,"make":"2017","engine no.":"Ch10008956","frame no.":"258522","dc no.":"dcap1258526","invoice":"Apac20170254"},
    //   { "name": "Apache RR 310", "type":" Motor Cycle", "colour":"Red" ,"make":"2017","engine no.":"Ch10008956","frame no.":"258522","dc no.":"dcap1258526","invoice":"Apac20170255"},
    //   { "name": "Apache RR 310", "type":" Motor Cycle", "colour":"Red" ,"make":"2017","engine no.":"Ch10008956","frame no.":"258522","dc no.":"dcap1258526","invoice":"Apac20170256"}

    // ]
  }

  backToInventory() {
    this.router.navigate(['inventory']);
  }

  enableSave() {
    this.disableSave = false;
  }

  get f() { return this.vehicleForm.controls; }

  addVehicle() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.vehicleForm.invalid) {
      return;
    }
    var data = {
      vehicle_engineno: this.engineNumber,
      vehicle_name: this.vehicleName,
      vehicle_color: this.vehicleColor,
      vehicle_type: this.vehicleType,
      vehicle_make: this.vehicleMake,
      vehicle_model: this.vehicleModel,
      vehicle_cost: this.vehicleCost,
      vehicle_frameno: this.frameNumber,
      vechicle_dcno: this.dcNumber,
      vechicle_invoiceno: this.invoiceNumber,
      status: "1"
    }
    console.log(data)
    this.service.addVehicleDetails(data).subscribe(res => {
      console.log(res.json());
      console.log(res.json().result);
    })

    this.engineNumber = " ";
    this.vehicleName = " ";
    this.vehicleType = " ";
    this.vehicleColor = " ";
    this.vehicleMake = " ";
    this.vehicleModel = " ";
    this.vehicleCost = " ";
    this.frameNumber = " ";
    this.dcNumber = " ";
    this.invoiceNumber = " ";

  }
  vehicle_id = '';
  vehicle_engineno = '';
  vehicle_name = '';
  vehicle_type = '';
  vehicle_color = '';
  vehicle_make = '';
  vehicle_model = '';
  vehicle_cost = '';
  vehicle_frameno = '';
  vechicle_dcno = '';
  vechicle_invoiceno = '';
  status = '';
  temp: any;



  editVehicle(data, index) {
    console.log("******************")
    console.log(data);
    this.editData = data;
    data.index = index;
    this.temp = index;
    console.log(this.editData[index].vehicle_id)
    this.vehicle_id = this.editData[index].vehicle_id;
    this.vehicle_name = this.editData[index].vehicle_name;
    this.vehicle_type = this.editData[index].vehicle_type;
    this.vehicle_engineno = this.editData[index].vehicle_engineno;
    this.vehicle_color = this.editData[index].vehicle_color;
    this.vehicle_model = this.editData[index].vehicle_model;
    this.vehicle_make = this.editData[index].vehicle_make;
    this.vehicle_cost = this.editData[index].vehicle_cost;
    this.vehicle_frameno = this.editData[index].vehicle_frameno;
    this.vechicle_dcno = this.editData[index].vechicle_dcno;
    this.vechicle_invoiceno = this.editData[index].vechicle_invoiceno;
    this.status = this.editData[index].status;


  }

  updateVehicle() {
    //console.log(val);
    var data = {
      vehicle_id: this.vehicle_id,
      vehicle_engineno: this.vehicle_engineno,
      vehicle_name: this.vehicle_name,
      vehicle_color: this.vehicle_color,
      vehicle_type: this.vehicle_type,
      vehicle_make: this.vehicle_make,
      vehicle_model: this.vehicle_model,
      vehicle_cost: this.vehicle_cost,
      vehicle_frameno: this.vehicle_frameno,
      vechicle_dcno: this.vechicle_dcno,
      vechicle_invoiceno: this.vechicle_invoiceno,
      status: this.status
    }
    console.log(data)
    this.service.addVehicleDetails(data).subscribe(res => {
      console.log(res.json());
      console.log("*******")
      console.log(this.temp)
      // console.log(res.json().result);
      // this.bikes.push(res,this.temp)
      //this.temp.push(res)
      this.bikes[this.temp].vehicle_id = data.vehicle_id;
      this.bikes[this.temp].vehicle_engineno = data.vehicle_engineno;
      this.bikes[this.temp].vehicle_name = data.vehicle_name;
      this.bikes[this.temp].vehicle_color = data.vehicle_color;
      this.bikes[this.temp].vehicle_type = data.vehicle_type;
      this.bikes[this.temp].vehicle_make = data.vehicle_make;
      this.bikes[this.temp].vehicle_model = data.vehicle_model;
      this.bikes[this.temp].vehicle_cost = data.vehicle_cost;
      this.bikes[this.temp].vehicle_frameno = data.vehicle_frameno;
      this.bikes[this.temp].vechicle_dcno = data.vechicle_dcno;
      this.bikes[this.temp].vechicle_invoiceno = data.vechicle_invoiceno;
      this.bikes[this.temp].status = data.status;
      this.temp = " ";
    })

  }

  cancelVehicle() {
    //this.temp=" ";
  }

  temp1: any;

  deleteVehicle(val, index) {
    // this.bikes.splice(index,1)
    this.temp1 = index;
    console.log(index)
    this.deleteData = val;
    console.log(this.deleteData)
    val.index = index;
    console.log("***")
    console.log(this.deleteData[index].vehicle_id);
    this.vehicle_id = this.deleteData[index].vehicle_id;
    // var data = {
    //   vehicle_id:this.deleteData[index].vehicle_id,
    //   status:"0"
    // }
    // console.log(data)
    // this.service.addVehicleDetails(data).subscribe(res =>{
    //   console.log(res.json());
    // })

  }

  yesVehicle() {
    this.bikes.splice(this.temp1, 1)
    console.log(this.temp1)
    var data = {
      vehicle_id: this.vehicle_id,
      status: "0"
    }
    console.log(data)
    this.service.addVehicleDetails(data).subscribe(res => {
      console.log(res.json());
    })

  }

  fromDa() {
    let newDate = moment(this.fromDate).format('YYYY-MM-DD').toString();
    this.fromDate = newDate;
    console.log(this.fromDate)
  }

  toDa() {
    let newDate1 = moment(this.toDate).format('YYYY-MM-DD').toString();
    this.toDate = newDate1;
    console.log(this.toDate)

  }


  detailsGo() {
    var url = '';
    if (this.fromDate) {
      url = url + 'startdate=' + this.fromDate;
    }
    if (this.toDate) {
      url = url + '&enddate=' + this.toDate;
    }
    if (this.vehicleTypeFilter) {
      url = url + '&type=' + this.vehicleTypeFilter;
    }
    if (this.vehicleMakeFilter) {
      url = url + '&make=' + this.vehicleMakeFilter;
    }
    if (this.vehicleModelFilter) {
      url = url + '&model=' + this.vehicleModelFilter;
    }
    if (this.vehicleColorFilter) {
      url = url + '&color=' + this.vehicleColorFilter;
    }
    console.log(this.vehicleMakeFilter);
    console.log(url)
     this.service.getVehicleFilter(url).subscribe(res => {
     console.log(res.json());
     console.log("*******")
     console.log(res)
     console.log(res.json().status)

       if (res.json().status == true) {
         this.bikes = res.json().result;
        console.log(this.bikes)
     }
     else {
    this.bikes = res.json()._body;

    //     this.notif.error(
    //       'Error',
    //       'No Records Found',
    //       {
    //         timeOut: 3000,           
    //         showProgressBar: true,
    //         pauseOnHover: false,
    //         clickToClose: true,
    //         maxLength: 50
    //       })
      }
     })
  }
  detailsReset() {
    this.service.getVehicleDetails().subscribe(res => {
      console.log(res.json().result)
      this.bikes = res.json().result
    });
    this.vehicleTypeFilter = " ";
    this.vehicleModelFilter=" ";
    this.vehicleColorFilter=" ";
    this.vehicleMakeFilter=" ";
    this.fromDate=" ";
    this.toDate=" ";
  }

}
