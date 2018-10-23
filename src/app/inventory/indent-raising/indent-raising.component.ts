import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { IndentService } from '../../services/indent.service'
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-indent-raising',
  templateUrl: './indent-raising.component.html',
  styleUrls: ['./indent-raising.component.css']
})
export class IndentRaisingComponent implements OnInit {
  IndentRaisingForm: FormGroup;
  submitted = false;
  indentId: any;
  vehicleColor = '';
  vehicleModel = '';
  vehicleType = '';
  vehicleMake = '';
  reqQuantity = '';
  assQuantity = '';
  reqDate = '';
  assDate = '';
  updateDate = '';
  assBy = '';
  updateBy = '';
  newDate: any;
  newDate2: any;


  typeData: any[];
  makeData: any[];
  modelData: any[];
  colorData: any[];
  empData: any[];



  constructor(private router: Router, private http: Http, private service: IndentService, private formBuilder: FormBuilder) { }

  ngOnInit() {
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
    this.http.get(environment.host + 'employees').subscribe(data => {
      console.log(data.json())
      this.empData = data.json().result;
    });
    this.IndentRaisingForm = this.formBuilder.group({
      vehicleColor: ['', Validators.required],
      vehicleModel: ['', Validators.required],
      vehicleType: ['', Validators.required],
      vehicleMake: ['', Validators.required],
      reqQuantity: ['', Validators.required],
      assQuantity: ['', Validators.required],
  
      assBy: ['', Validators.required],
      updateBy: ['', Validators.required],


    });
  }



  backToInventory() {
    this.router.navigate(['inventory']);

  }

  get f() { return this.IndentRaisingForm.controls; }

  addIndent() {
    console.log('***********')
    this.submitted = true;
    // stop here if form is invalid
    if (this.IndentRaisingForm.invalid) {
      return;
    }

    // var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    // var string_length = 8;
    // var letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!@#$%^&*"; 
    // for (var i = 0; i < 6; i++) 
    // this.indentId += letters[(Math.floor(Math.random() * 16))]; 
    // this.indentId ="IND"+ Math.floor(Math.random() * 899999 + 100000);
    // this.indentId ="IND"+ Math.random().toString(36).replace(/[! # $ % < > ( ) * + - _ ,.;:/\ += [] @]+/g, '').substr(0, 5);
    // this.indentId= "IND"+Math.random().toString(36).slice(2);
    //  this.indentId= "IND"+(Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
    //this.indentId= "IND"+(Math.random().toString(36).substr(2, 5)).toUpperCase()
    //  this.indentId= "IND"+(new Date().getTime()).toString(36)
    this.indentId = "IND" + Math.round((Math.random() * 36 ** 7)).toString(36);

    console.log(this.indentId)
    var data = {
      indent_req_id: this.indentId,
      emp_id: 6,
      br_id: 2,
      veh_color: this.vehicleColor,
      veh_type: this.vehicleType,
      veh_make: this.vehicleMake,
      veh_model: this.vehicleModel,
      req_qty: this.reqQuantity,
      assigned_qty: this.assQuantity,
      req_on_date: this.reqDate,
      assigned_on: this.assDate,
      updated_on: this.updateDate,
      assigned_by: this.assBy,
      updated_by: this.updateBy,
      status: "1"
    }
    console.log(data)
    this.service.addIndent(data).subscribe(res => {
      console.log(res.json());
      console.log(res.json().result);
    })
  }

  getreqDate() {
    let newDate = moment(this.reqDate).format('YYYY-MM-DD').toString();
    this.reqDate = newDate;
    console.log(this.reqDate)
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

  cancelIndent() {

    this.indentId = " ";
    this.vehicleColor = " ";
    this.vehicleModel = " ";
    this.vehicleType = " "
    this.vehicleMake = " "
    this.reqQuantity = " "
    this.assQuantity = " "
    this.reqDate = " "
    this.assDate = " "
    this.updateDate = " "
    this.assBy = " "
    this.updateBy = " "

  }






}
