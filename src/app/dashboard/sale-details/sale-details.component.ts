import { Component, OnInit } from '@angular/core';
import { SaleUserService } from '../../services/sale-user.service'
import { DatePipe } from '@angular/common';
import { ClipboardService } from 'ngx-clipboard';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.css'],
  providers: [
    DatePipe
  ]
})
export class SaleDetailsComponent implements OnInit {

  lists: any[];
  cols: any[];
  editPersonalInfo: any = [];
  temp: any;
  public date1: any;

  constructor(private service: SaleUserService, private dp: DatePipe, private _clipboardService: ClipboardService, private router: Router) { }

  ngOnInit() {
    this.service.getListDetails().subscribe(res => {
      console.log(res.json().result)
      this.lists = res.json().result
      console.log(this.lists);
    });

    this.cols = [
      { field: 'firstname', header: 'First Name' },
      { field: 'display_name_on_rc', header: 'Display Name' },
      { field: 'email_id', header: 'Email' },
      { field: 'mobile', header: 'Mobile' },
      { field: 'gender', header: 'Gender' },
      { field: 'relation', header: 'Relation' },
      { field: 'password ', header: 'Password' },
      { field: 'city', header: 'City' },
      { field: 'address', header: 'Address' },
      { field: 'dob', header: 'DOB', type: this.dp },
      { field: 'mandal', header: 'Mandal' },
      { field: 'district', header: 'District' },
      { field: 'proof_type', header: 'Proof Type' }
    ];
  }

  sale_user_id: '';
  firstname: '';
  display_name_on_rc: '';
  email_id: '';
  mobile: '';
  relation: '';
  password; '';
  city: '';
  address: '';
  dob = '';
  mandal: '';
  district: '';
  proof_type: '';
  proof_num: '';

  newSaleClick() {
    this.router.navigate(['dashboard']);
  }

  editList(data, index) {
    console.log(index);
    this.editPersonalInfo = data;
    console.log(this.editPersonalInfo)
    data.index = index;
    this.temp = index;
    let newDate = moment(this.editPersonalInfo[index].dob).format('DD-MM-YYYY').toString();
    this.dob = newDate;
    console.log(this.dob);
    this.sale_user_id = this.editPersonalInfo[index].sale_user_id;
    this.firstname = this.editPersonalInfo[index].firstname;
    this.display_name_on_rc = this.editPersonalInfo[index].display_name_on_rc;
    this.email_id = this.editPersonalInfo[index].email_id;
    this.mobile = this.editPersonalInfo[index].mobile;
    this.relation = this.editPersonalInfo[index].relation;
    this.password = this.editPersonalInfo[index].password;
    this.city = this.editPersonalInfo[index].city;
    this.address = this.editPersonalInfo[index].address;
    this.mandal = this.editPersonalInfo[index].mandal;
    this.district = this.editPersonalInfo[index].district;
    this.proof_type = this.editPersonalInfo[index].proof_type;
    this.proof_num = this.editPersonalInfo[index].proof_num
  }

  getDob() {
    let newDate = moment(this.dob).format('YYYY-DD-MM').toString();
    this.dob = newDate;
    console.log(this.dob)
  }

  updatePersonInfo() {
    let newDate = moment(this.dob).format('YYYY-DD-MM').toString();
    this.dob = newDate;
    console.log(this.dob);
    var data = {
      sale_user_id: this.sale_user_id,
      firstname: this.firstname,
      display_name_on_rc: this.display_name_on_rc,
      dob: this.dob,
      email_id: this.email_id,
      mobile: this.mobile,
      relation: this.relation,
      password: this.password,
      city: this.city,
      address: this.address,
      mandal: this.mandal,
      district: this.district,
      proof_type: this.proof_type,
      proof_num: this.proof_num,
      sale_status: "1"
    }
    console.log(data)
    this.service.saveSalesUser(data).subscribe(responce => {
      console.log(responce.json());
      this.editPersonalInfo[this.temp].firstname = data.firstname;
      this.editPersonalInfo[this.temp].display_name_on_rc = data.display_name_on_rc;
      this.editPersonalInfo[this.temp].dob = data.dob;
      this.editPersonalInfo[this.temp].email_id = data.email_id;
      this.editPersonalInfo[this.temp].mobile = data.mobile;
      this.editPersonalInfo[this.temp].email_id = data.email_id;
      this.editPersonalInfo[this.temp].relation = data.relation;
      this.editPersonalInfo[this.temp].password = data.password;
      this.editPersonalInfo[this.temp].address = data.address;
      this.editPersonalInfo[this.temp].mandal = data.mandal;
      this.editPersonalInfo[this.temp].district = data.district;
      this.editPersonalInfo[this.temp].proof_type = data.proof_type;
      this.editPersonalInfo[this.temp].proof_num = data.proof_num;
      this.temp = " ";
    })
  }
  deleteList() { }
}
