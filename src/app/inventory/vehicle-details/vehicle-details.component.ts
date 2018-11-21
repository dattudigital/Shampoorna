import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleDetailService } from '../../services/vehicle-detail.service'
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
declare var $: any;

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
  public date2: any;

  typeData: any[];
  makeData: any[];
  modelData: any[];
  colorData: any[];
  variantData: any[];

  invoiceNum = "";
  invoiceDate = "";
  sourcedFrom = "";
  engineNumber = "";
  vehicleName = "";
  vehicleType: any;
  vehicleColor: any;
  vehicleMake: any;
  vehicleModel: any;
  vehicleVariant: any;
  engineNum1 = '';
  engineNum2 = '';

  vehicleCost = "";
  gateNumber = "";
  frameNumber = "";
  dcNumber = "";
  invoiceNumber = "";
  vehicleLifeTax = "";
  vehicleInsurance = "";
  vehicleHandling = "";
  vehicleRegistration = "";
  vehicleHp = "";
  vehicleStandardAcc = "";

  disableSave: boolean = true;
  vehicleForm: FormGroup;
  submitted = false;

  vehicleTypeFilter = "";
  vehicleModelFilter = "";
  vehicleColorFilter = "";
  vehicleMakeFilter = "";
  fromDate = "";
  toDate = "";
  public options = { position: ["top", "right"] }
  // addnewvehicle = false;

  constructor(private router: Router, private service: VehicleDetailService, private http: Http, private formBuilder: FormBuilder, private notif: NotificationsService) { }

  ngOnInit() {
    // this.roleLogin1();

    this.service.getVehicleDetails().subscribe(res => {
      console.log(res.json().result)
      this.bikes = res.json().result
    });
    this.vehicleForm = this.formBuilder.group({
      engineNumber: ['', Validators.required],
      vehicleType: ['', Validators.required],
      vehicleColor: ['', Validators.required],
      vehicleModel: ['', Validators.required],
      gateNumber: ['', Validators.required],
      frameNumber: ['', Validators.required],
      vehicleVariant: ['', Validators.required],
      invoiceNum: ['', Validators.required],
      sourcedFrom: ['', Validators.required],
      dcNumber: ['', Validators.required]
    });

    this.cols = [
      { field: 'vechicle_invoiceno', header: 'Invoice No' },
      { field: 'vehicle_invoice_date', header: 'Invoice Date' },
      { field: 'vehicle_source_from', header: 'Sorce From' },
      { field: 'type_name', header: 'Type' },
      { field: 'model_name', header: 'Model' },
      { field: 'color_name', header: 'Color' },
      { field: 'variant_name', Hearer: 'Variant' },
      { field: 'vehicle_engineno', header: 'Engine No.' },
      { field: 'vehicle_frameno', header: 'Frame No.' },
      { field: 'vechile_gatepass', header: 'Gate Pass' },
    ];

    this.http.get(environment.host + 'vehicle-makes').subscribe(data => {
      console.log(data.json())
      this.makeData = data.json().result;
    });

    this.http.get(environment.host + 'vehicle-models').subscribe(data => {
      console.log(data.json())
      this.modelData = data.json().result;
    });

    this.http.get(environment.host + 'vehicle-variants').subscribe(data => {
      console.log(data.json())
      this.variantData = data.json().result;
    });

    this.http.get(environment.host + 'vehicle-colors').subscribe(data => {
      console.log(data.json())
      this.colorData = data.json().result;
    });

    this.http.get(environment.host + 'vehicle-types').subscribe(data => {
      console.log(data.json())
      this.typeData = data.json().result;
    });
  }

  // roleLogin1() {
  //   console.log("###111#####")
  //   let loginData1 = JSON.parse(sessionStorage.getItem('secondaryLoginData'));
  //   console.log(loginData1);
  //   if (loginData1.status == true && loginData1._results.emp_type_id == 1) {
  //     console.log("1111")
  //     this.addnewvehicle = true;
  //     sessionStorage.setItem('backBtnInventory', 'Y');
  //     // this.titleStyle = "visible";
  //   }else if (loginData1.status == true && loginData1._results.emp_type_id == 3) {
  //     console.log("33333")
  //     this.addnewvehicle = true;
  //     sessionStorage.setItem('backBtnInventory', 'Y');
  //     // this.titleStyle = "visible";
  //   }
  // }

  backToInventory() {
    this.router.navigate(['inventory']);
  }

  redirctToAddBulk() {
    this.router.navigate(['inventory/vehicle-details/bulk-import']);
  }

  enableSave() {
    this.disableSave = false;
  }

  get f() { return this.vehicleForm.controls; }

  addVehicle() {
    this.submitted = true;
    console.log(this.engineNumber,
      this.vehicleType.type_name,
      this.vehicleModel.model_name,
      this.vehicleColor.color_name,
      this.vehicleVariant.variant_name
    );
    if (this.vehicleForm.invalid) {
      return;
    }
    console.log(this.engineNumber);
    if (this.engineNumber) {
      var number = this.engineNumber;
      this.engineNum1 = number.substring(0, 5);
      this.engineNum2 = number.substring(5, 12);
      console.log(this.engineNum1);
      console.log(this.engineNum2)
    }
    var data = {
      vechicle_invoiceno: this.invoiceNum,
      vehicle_invoice_date: this.invoiceDate,
      vehicle_source_from: this.sourcedFrom,
      vehicle_type: this.vehicleType.vehicle_type_id,
      vehicle_model: this.vehicleModel.vehicle_model_id,
      vehicle_variant: this.vehicleVariant.vehicle_variant_id,
      vehicle_color: this.vehicleColor.vehicle_color_id,
      vehicle_engineno: this.engineNumber,
      vehicle_frameno: this.frameNumber,
      vechile_gatepass: this.gateNumber,
      vechicle_dcno: this.dcNumber,
      engine1: this.engineNum1,
      engine2: this.engineNum2,
      status: "1"
    }

    console.log(data);

    var insertData = {
      color_name: this.vehicleColor.color_name
    }

    this.service.addVehicleDetails(data).subscribe(res => {
      console.log(res.json().result);
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Vehicle Added Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      console.log(insertData);
      insertData = res.json().result;
      this.bikes.push(res.json().result)
      $('#addVehicle').modal('hide');

    })

    this.invoiceNum = '';
    this.invoiceDate = '';
    this.sourcedFrom = '';
    this.vehicle_type = '';
    this.vehicle_model = '';

  }
  vehicle_id = '';
  vehicle_engineno = '';
  vehicle_name = '';
  vehicle_type = '';
  vehicle_color = '';
  vehicle_make = '';
  vehicle_model = '';
  vehicle_cost = '';
  vechile_key = '';
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
    this.vechile_key = this.editData[index].vechile_key;
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
      vechile_key: this.vechile_key,
      vehicle_frameno: this.vehicle_frameno,
      vechicle_dcno: this.vechicle_dcno,
      vechicle_invoiceno: this.vechicle_invoiceno,
      status: this.status
    }
    console.log(data)
    this.service.addVehicleDetails(data).subscribe(res => {
      console.log(res.json());
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Vehicle Updated Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
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
      this.bikes[this.temp].vechile_key = data.vechile_key;
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
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Vehicle Deleted Successfully',
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
  invoiceDateFormat() {
    let newdate2 = moment(this.invoiceDate).format('YYYY-MM-DD').toString();
    this.invoiceDate = newdate2;
    console.log(this.invoiceDate)
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
      //  if(res.json().status ==true){
      //   this.notif.success(
      //     'Success',
      //     'Filter Applied Successfully',
      //     {
      //       timeOut: 3000,
      //       showProgressBar: true,
      //       pauseOnHover: false,
      //       clickToClose: true,
      //       maxLength: 50
      //     }
      //   )
      // }else{
      //   this.notif.warn(
      //     'Sorry',
      //     'No Records Found',
      //     {
      //       timeOut: 3000,
      //       showProgressBar: true,
      //       pauseOnHover: false,
      //       clickToClose: true,
      //       maxLength: 50
      //     }
      //   )    } 
      console.log("*******")
      console.log(res)
      console.log(res.json().status)

      if (res.json().status == true) {
        this.bikes = res.json().result;
        console.log(this.bikes)
        this.notif.success(
          'Success',
          'Filter Applied Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      else {
        this.bikes = res.json()._body;
        this.notif.warn(
          'Sorry',
          'No Records Found',
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
  detailsReset() {
    this.service.getVehicleDetails().subscribe(res => {
      console.log(res.json().result)
      this.bikes = res.json().result
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Reset Applied Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
    });
    this.vehicleTypeFilter = " ";
    this.vehicleModelFilter = " ";
    this.vehicleColorFilter = " ";
    this.vehicleMakeFilter = " ";
    this.fromDate = " ";
    this.toDate = " ";
  }

  //this method  allow alphabets 
  omit_special_char(event) {
    console.log('key press');
    var k;
    k = event.charCode;  //  k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 0 || k == 32);
  }
  //This Method  allow Numbers
  only_allow_number(event) {
    console.log('only number');
    var n;
    n = event.charCode
    return (n == 8 || n == 0 || n == 32 || (n >= 48 && n <= 57))
  }
  //this method allow bothe numbers and alphabets
  allow_numbers_alphabets(event) {
    var a;
    a = event.charCode
    return ((a > 64 && a < 91) || (a > 96 && a < 123) || a == 8 || a == 0 || (a >= 48 && a <= 57));
  }
}
