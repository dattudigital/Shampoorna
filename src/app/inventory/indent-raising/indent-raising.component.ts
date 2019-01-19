import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { IndentService } from '../../services/indent.service'
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { AllVehicleService } from '../../services/all-vehicle.service';
import { CompleteVehicleService } from '../../services/complete-vehicle.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-indent-raising',
  templateUrl: './indent-raising.component.html',
  styleUrls: ['./indent-raising.component.css']
})
export class IndentRaisingComponent implements OnInit {
  public date1: any;
  public date2: any;
  public date3: any;

  IndentRaisingForm: FormGroup;
  submitted = false;
  indentId: any;
  vehicleColor = '';
  vehicleModel = '';
  vehicleType = '';
  vehicleVariant = '';
  reqQuantity = '';
  reqDate = '';
  brComment = '';

  typeData: any[];
  makeData: any[];
  modelData: any[];
  colorData: any[];
  variantData: any[];
  // empData: any[];
  public options = { position: ["top", "right"] }

  constructor(private router: Router, private allvehicleservice: AllVehicleService, private completevehicle: CompleteVehicleService, private http: Http, private service: IndentService, private formBuilder: FormBuilder, private notif: NotificationsService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    let _color = this.completevehicle.getColor();
    if (Object.keys(_color).length) {
      this.colorData = _color
    } else {
      this.allvehicleservice.getColor().subscribe(data => {
        if (data.json().status == true) {
          this.colorData = data.json().result;
          this.completevehicle.addColor(data.json().result)
        } else {
          this.colorData = [];
        }
      });
    }

    let _category = this.completevehicle.getType();
    if (Object.keys(_category).length) {
      this.typeData = _category
    } else {
      this.allvehicleservice.getCategory().subscribe(data => {
        if (data.json().status == true) {
          this.typeData = data.json().result;
          this.completevehicle.addType(data.json().result)
        } else {
          this.typeData = [];
        }
      });
    }

    let _model = this.completevehicle.getModel();
    if (Object.keys(_model).length) {
      this.modelData = _model
    } else {
      this.allvehicleservice.getModel().subscribe(data => {
        if (data.json().status == true) {
          this.modelData = data.json().result;
          this.completevehicle.addModel(data.json().result)
        } else {
          this.modelData = [];
        }
      });
    }

    let _variant = this.completevehicle.getVariant();
    if (Object.keys(_variant).length) {
      this.variantData = _variant
    } else {
      this.spinner.show();
      this.allvehicleservice.getVariant().subscribe(data => {
        if (data.json().status == true) {
          this.variantData = data.json().result;
          this.completevehicle.addVariant(data.json().result)
        } else {
          this.variantData = [];
        }
        this.spinner.hide();
      })
    }
    // this.http.get(environment.host + 'employees').subscribe(data => {
    //   if (data.json().status == true) {
    //     this.empData = data.json().result;
    //   } else {
    //     this.empData = [];
    //   }
    // });

    this.IndentRaisingForm = this.formBuilder.group({
      vehicleColor: ['', Validators.required],
      vehicleModel: ['', Validators.required],
      vehicleType: ['', Validators.required],
      vehicleVariant: ['', Validators.required],
      reqQuantity: ['', Validators.required],
    });
  }

  backToInventory() {
    this.router.navigate(['inventory']);
  }

  get f() { return this.IndentRaisingForm.controls; }

  addIndent() {
    this.submitted = true;
    if (this.IndentRaisingForm.invalid) {
      return;
    }
    let loginData = JSON.parse(sessionStorage.getItem('secondaryLoginData'));
    this.indentId = "IND" + Math.round((Math.random() * 36 ** 7)).toString(36);
    var data = {
      indent_req_id: this.indentId,
      emp_id: loginData._results.employee_id,
      br_id: loginData._results.employee_branch_id,
      veh_color: this.vehicleColor,
      veh_type: this.vehicleType,
      veh_variant: this.vehicleVariant,
      veh_model: this.vehicleModel,
      req_qty: this.reqQuantity,
      req_on_date: this.reqDate,
      assigned_by: loginData._results.employee_id,
      updated_by: loginData._results.employee_id,
      status: "1"
    }
    this.service.addIndent(data).subscribe(res => {
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Indent Raised Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      this.cancelIndent()
    })
  }

  getreqDate() {
    let newDate = moment(this.reqDate).format('YYYY-MM-DD').toString();
    this.reqDate = newDate;
  }

  cancelIndent() {
    this.indentId = " ";
    this.vehicleColor = " ";
    this.vehicleModel = " ";
    this.vehicleType = " "
    this.vehicleVariant = " "
    this.reqQuantity = " "
    this.reqDate = " "
  }

  only_allow_number(event) {
    var n;
    n = event.charCode
    return (n == 8 || n == 0 || n == 32 || (n >= 48 && n <= 57))
  }
}
