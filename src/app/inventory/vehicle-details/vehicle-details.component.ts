import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleDetailService } from '../../services/vehicle-detail.service';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
declare var $: any;
import { AllVehicleService } from '../../services/all-vehicle.service';
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
  public date3: any;

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
  // invoiceNumber = "";
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
  vehicleVariantFilter = "";
  fromDate = "";
  toDate = "";
  public options = { position: ["top", "right"] }
  // addnewvehicle = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef, private allvehicleservice: AllVehicleService, private service: VehicleDetailService, private http: Http, private formBuilder: FormBuilder, private notif: NotificationsService) { }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    // this.roleLogin1();

    this.service.getVehicleDetails().subscribe(res => {
      if (res.json().status == true) {
        console.log(res.json().result)
        this.bikes = res.json().result
      }

    });
    this.vehicleForm = this.formBuilder.group({
      engineNumber: ['', Validators.required],
      vehicleType: ['', Validators.required],
      vehicleColor: ['', Validators.required],
      vehicleModel: ['', Validators.required],
      frameNumber: ['', Validators.required],
      vehicleVariant: ['', Validators.required],
      sourcedFrom: ['', Validators.required],
    });

    this.cols = [
      { field: 'TVS-M Invoice No', header: 'Invoice No' },
      // { field: 'vehicle_invoice_date', header: 'Invoice Date' },
      { field: 'Sourced from', header: 'Sorce From' },
      { field: 'type_name', header: 'Category' },
      { field: 'model_name', header: 'Model' },
      { field: 'color_name', header: 'Color' },
      { field: 'variant_name', header: 'Variant' },
      { field: 'Engine No', header: 'Engine No' },
      { field: 'Frame No', header: 'Frame No' },
    ];
    this.allvehicleservice.getColor().subscribe(data => {
      console.log(data.json())
      this.colorData = data.json().result;
    });
    this.allvehicleservice.getCategory().subscribe(data => {
      console.log(data.json())
      this.typeData = data.json().result;
    });
    this.allvehicleservice.getModel().subscribe(data => {
      this.modelData = data.json().result;
      console.log(this.modelData)
    });
    this.allvehicleservice.getVariant().subscribe(data => {
      this.variantData = data.json().result;
      console.log(this.variantData)
    })
    this.http.get(environment.host + 'vehicle-makes').subscribe(data => {
      console.log(data.json())
      this.makeData = data.json().result;
    });
  }
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

  removeFields() {
    console.log('remove ngmodel')
    this.submitted = false;
    this.invoiceNum = '';
    this.invoiceDate = '';
    this.sourcedFrom = '';
    this.vehicleType = '';
    this.vehicleModel = '';
    this.vehicleVariant = '';
    this.vehicleColor = '';
    this.engineNumber = '';
    this.frameNumber = '';
    this.gateNumber = '';
    this.dcNumber = '';
  }
  addVehicle() {
    this.submitted = true;
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
      "TVS-M Invoice No": this.invoiceNum,
      "TVS-M Invoice Date": this.invoiceDate,
      "Sourced from": this.sourcedFrom,
      vehicle_type: this.vehicleType.vehicle_type_id,
      vehicle_model: this.vehicleModel.vehicle_model_id,
      vehicle_variant: this.vehicleVariant.vehicle_variant_id,
      vehicle_color: this.vehicleColor.vehicle_color_id,
      "Engine No": this.engineNumber,
      "Frame No": this.frameNumber,
      "Gate Pass": this.gateNumber,
      "DC No": this.dcNumber,
      "Engine #1": this.engineNum1,
      "Engine #2": this.engineNum2,
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
      this.bikes.push(res.json().result)
      $('#addVehicle').modal('hide');
    });
  }

  vehicle_id = '';
  vechicle_invoiceno: any;
  vehicle_invoice_date = '';
  vehicle_source_from = '';
  vehicle_type = '';
  vehicle_model = '';
  vehicle_color = '';
  vehicle_variant = '';
  vehicle_engineno = '';
  vehicle_frameno = '';
  vechicle_dcno = '';
  vechile_gatepass = '';
  status = '';
  temp: any;

  VehicleInvoiceDate: any;

  editVehicle(data, index) {
    console.log("******************")
    console.log(data);
    this.editData = data;
    data.index = index;
    this.temp = index;
    console.log(this.editData[index].vehicle_id)
    console.log()
    let newDate = moment(this.editData[index].vehicle_invoice_date).format('DD-MM-YYYY').toString();
    this.VehicleInvoiceDate = newDate;
    console.log(this.VehicleInvoiceDate);
    console.log(this.editData[index].vechicle_invoiceno)
    this.vehicle_id = this.editData[index].vehicle_id;
    this.vechicle_invoiceno = this.editData[index]["TVS-M Invoice No"];
    this.vehicle_source_from = this.editData[index]["Sourced from"]
    this.vehicle_type = this.editData[index].vehicle_type;
    this.vehicle_model = this.editData[index].vehicle_model;
    this.vehicle_color = this.editData[index].vehicle_color;
    this.vehicle_variant = this.editData[index].vehicle_variant;
    this.vehicle_engineno = this.editData[index]["Engine No"];
    this.vehicle_frameno = this.editData[index]["Frame No"];
    this.vechicle_dcno = this.editData[index]["DC No"];
    this.vechile_gatepass = this.editData[index]["Gate Pass"];
    this.status = this.editData[index].status;
  }
  update: any;
  getInvoiceDate() {
    let newdate = new Date(this.VehicleInvoiceDate)
    console.log(newdate)

    this.update = newdate.getFullYear() + '-' + (newdate.getMonth() + 1) + '-' + newdate.getDate();
    console.log(this.update)
  }

  updateVehicle() {
    //console.log(val);
    if (this.vehicle_engineno) {
      var number = this.vehicle_engineno;
      this.engineNum1 = number.substring(0, 5);
      this.engineNum2 = number.substring(5, 12);
      console.log(this.engineNum1);
      console.log(this.engineNum2)
    }
    var data = {
      vehicle_id: this.vehicle_id,
      "TVS-M Invoice No": this.vechicle_invoiceno,
      "TVS-M Invoice Date": this.update,
      "Sourced from": this.vehicle_source_from,
      vehicle_type: this.vehicleType,
      vehicle_model: this.vehicleModel,
      vehicle_variant: this.vehicleVariant,
      vehicle_color: this.vehicleColor,
      "Engine No": this.vehicle_engineno,
      "Frame No": this.vehicle_frameno,
      "Gate Pass": this.gateNumber,
      "DC No": this.dcNumber,
      "Engine #1": this.engineNum1,
      "Engine #2": this.engineNum2,
      status: "1"
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
      this.bikes[this.temp].vehicle_id = data.vehicle_id;
      this.bikes[this.temp]["TVS-M Invoice No"] = data["TVS-M Invoice No"];
      this.bikes[this.temp]["TVS-M Invoice Date"] = data["TVS-M Invoice Date"];
      this.bikes[this.temp]["Sourced from"] = data["Sourced from"];
      this.bikes[this.temp].vehicle_color = data.vehicle_color;
      this.bikes[this.temp].vehicle_type = data.vehicle_type;
      this.bikes[this.temp].vehicle_model = data.vehicle_model;
      this.bikes[this.temp].vehicle_variant = data.vehicle_variant;
      this.bikes[this.temp]["Frame No"] = data["Frame No"];
      this.bikes[this.temp]["Engine No"] = data["Engine No"];
      this.bikes[this.temp]["DC No"] = data["DC No"];
      this.bikes[this.temp]["Gate Pass"] = data["Gate Pass"];
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
    if (this.vehicleVariantFilter) {
      url = url + '&variant=' + this.vehicleVariantFilter;
    }
    if (this.vehicleModelFilter) {
      url = url + '&model=' + this.vehicleModelFilter;
    }
    if (this.vehicleColorFilter) {
      url = url + '&color=' + this.vehicleColorFilter;
    }
    console.log(this.vehicleVariantFilter);
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
    this.vehicleVariantFilter = " ";
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
