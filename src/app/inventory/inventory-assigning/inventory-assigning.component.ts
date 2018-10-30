import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import _ from 'lodash';
import { FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryAssigningService } from '../../services/inventory-assigning.service'
import { InventoryListPipe } from '../../pipe/inventory-list.pipe';
import { InventoryAddPipe } from '../../pipe/inventory-add.pipe'
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

  newDate: any;
  newDate2: any;



  vehicles: any = [
    {
      engineno: "",
      chassisno: "",
      frameno: "",
      color: "",
      make: "",
      model: "",
    }
  ];
  constructor(private router: Router, private http: Http, private service: InventoryAssigningService, private formBuilder: FormBuilder, private pipe: InventoryListPipe, private addInvPipe: InventoryAddPipe) {
    console.log("test");
  }

  ngOnInit() {
    this.http.get(environment.host + 'indents').subscribe(res => {
      console.log(res.json().result);
      this.indentData = res.json().result;
    });
    this.http.get(environment.host + 'branches').subscribe(res => {
      console.log(res.json().result);
      this.branchData = res.json().result;
    });
    this.http.get(environment.host + 'employees').subscribe(res => {
      console.log(res.json().result);
      this.employeedata = res.json().result;
    });

    this.InventoryAssignForm = this.formBuilder.group({
      indentId: ['', Validators.required],
      branchId: ['', Validators.required],
      empId: ['', Validators.required],
      shippedBy: ['', Validators.required],
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
    this.vehicles.push(
      {
        engineno: "",
        chassisno: "",
        frameno: "",
        color: "",
        make: "",
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
    var data: any = {
      indent_id: this.indentId,
      branch_id: this.branchId,
      shipped_by: this.shippedBy,
      shipped_vechile_no: this.shippedIn,
      assign_qty: this.assQuantity,
      br_mgr_ack: this.managerAck,
      br_mgr_comment: this.managerNote,     
      generated_shipping_id:this.generatedShippedId, 
      status: this.status,      
      vechile_details: JSON.stringify(this.vehicles)
    }
    console.log(data);
    console.log("***************")
    var finalData = this.addInvPipe.transform(data);
    console.log(finalData);
    this.service.addInventoryAssign(finalData).subscribe(res => {
      console.log(res.json().result);
    })

  }

}
