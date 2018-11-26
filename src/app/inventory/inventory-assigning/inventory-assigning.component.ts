import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import _ from 'lodash';
import { FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryAssigningService } from '../../services/inventory-assigning.service'
import { InventoryListPipe } from '../../pipe/inventory-list.pipe';
import { InventoryAddPipe } from '../../pipe/inventory-add.pipe';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';

@Component({
  selector: 'app-inventory-assigning',
  templateUrl: './inventory-assigning.component.html',
  styleUrls: ['./inventory-assigning.component.css']
})
export class InventoryAssigningComponent implements OnInit {
  indentData: any = [];
  branchData: any = [];
  employeedata: any = [];
  InventoryAssignForm: FormGroup;
  submitted = false;

  indentId = '';
  branchId = '';
  empId = '';
  generatedShippedId: any = '';
  shippedBy = '';
  shippedIn = '';
  managerAck = '';
  managerNote = '';
  status = '';
  assQuantity = '';
  assDate = '';
  updateBy = '';
  updateDate = '';
  loginData:any;
  _indentData:any ;
  newDate: any;
  newDate2: any;
  public options = { position: ["top", "right"] }

  vehicles: any = [
    {
      engineno: "",
      chassisno: "",
      frameno: "",
      color: "",
      variant: "",
      model: "",
    }
  ];
  constructor(private router: Router, private http: Http, private service: InventoryAssigningService, private formBuilder: FormBuilder, private pipe: InventoryListPipe, private addInvPipe: InventoryAddPipe, private notif: NotificationsService) {
    console.log("test");
  }

  ngOnInit() {

    this._indentData = JSON.parse(sessionStorage.getItem('indentData'));
    this.branchId = this._indentData.br_id;
    this.indentId = this._indentData.indent_id;
    setTimeout(() => {
      this.shippedBy = this._indentData.shipped_by;
      this.shippedIn = this._indentData.shipped_vechile_no;
    }, 1);  
    this.assQuantity = this._indentData.assigned_qty
    this.http.get(environment.host + 'indents').subscribe(res => {
      if (res.json().status == true) {
        console.log(res.json().result);
        this.indentData = res.json().result;
      }
    });
    this.http.get(environment.host + 'branches').subscribe(res => {
      if (res.json().status = true) {
        console.log(res.json().result);
        this.branchData = res.json().result;
      }
    });
    this.http.get(environment.host + 'employees').subscribe(res => {
      if (res.json().status == true) {
        console.log(res.json().result);
        this.employeedata = res.json().result;
      }
    });

    this.InventoryAssignForm = this.formBuilder.group({
      indentId: ['', Validators.required],
      branchId: ['', Validators.required],
      empId: ['', Validators.required],
      shippedBy: ['', Validators.required],
      shippedIn: ['', Validators.required],
      managerAck: ['', Validators.required],
      managerNote: ['', Validators.required],
      status: ['', Validators.required],
      assQuantity: ['', Validators.required],
      updateBy: ['', Validators.required]
    });
  }

  deleteInventoryAssign(index) {
    console.log(index);
    this.vehicles.splice(index, 1)
  }

  addInventoryAssign(data, i) {
    console.log('add')
    this.vehicles.push(
      {
        engineno: "",
        chassisno: "",
        frameno: "",
        color: "",
        variant: "",
        model: "",
      })
    console.log(this.vehicles);
  }

  backToInventory() {
    this.router.navigate(['inventory']);
  }
  getassDate() {
    let newDate1 = moment(this.assDate).format('YYYY-MM-DD').toString();
    this.assDate = newDate1;
    console.log(this.assDate)
  }

  getupdDate() {
    let newDate2 = moment(this.updateDate).format('YYYY-MM-DD').toString();
    this.updateDate = newDate2;
    console.log(this.updateDate)
  }


  get f() { return this.InventoryAssignForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    // if (this.InventoryAssignForm.invalid) {
    //   return;
    // }

    this.generatedShippedId = Math.floor(Math.random() * 899999 + 100000);
    this.loginData = JSON.parse(sessionStorage.getItem('userSession'));
    var data: any = {
      indent_id: this.indentId,
      employee_branch_id: this.loginData._results.employee_branch_id,
      shipped_by: this.shippedBy,
      shipped_vechile_no: this.shippedIn,
      assign_qty: this.assQuantity,
      br_mgr_ack: this.managerAck,
      br_mgr_comment: this.managerNote,
      generated_shipping_id: this.generatedShippedId,
      status: this.status,
      vechile_details: JSON.stringify(this.vehicles)
    }
    console.log(data);
    console.log("***************")
    var finalData = this.addInvPipe.transform(data);
    console.log(finalData);
    this.service.addInventoryAssign(finalData).subscribe(res => {
      console.log(res.json().result);
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Inventory Assaigned Successfully',
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
