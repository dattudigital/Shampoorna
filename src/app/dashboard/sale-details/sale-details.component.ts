import { Component, OnInit } from '@angular/core';
import { SaleUserService } from '../../services/sale-user.service'
import { DatePipe } from '@angular/common';
import { ClipboardService } from 'ngx-clipboard';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Http } from '@angular/http'
import { environment } from 'src/environments/environment';

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
  vehicles: any[];
  cols: any[];
  editPersonalInfo: any = [];
  invoiceInfo: any = [];
  branchData: any = [];
  temp: any;
  public date1: any;

  constructor(private service: SaleUserService, private dp: DatePipe, private _clipboardService: ClipboardService, private router: Router, private http: Http) { }

  ngOnInit() {
    this.service.getListDetails().subscribe(res => {
      console.log(res.json().status);
      if (res.json().status == true) {
        console.log('true')
        this.lists = res.json().result;
        console.log(this.lists);
      } else {
        console.log('false')
        this.lists = [];
      }
    });

    this.http.get(environment.host + 'branches').subscribe(res => {
      this.branchData = res.json().result;
      console.log(this.branchData)
    })



    this.cols = [
      { field: 'firstname', header: 'First Name' },
      { field: 'email_id', header: 'Email' },
      { field: 'mobile', header: 'Mobile' },
      { field: 'address', header: 'Address' },
      { field: 'mandal', header: 'Mandal' },
      { field: 'district', header: 'District' },
      { field: 'proof_type', header: 'Proof Type' },
      { field: 'eng_no', header: 'EngineNo' },
      { field: 'frame_no', header: 'FrameNo' },
      { field: 'frame_no', header: 'FrameNo' },
      { field: 'dc_no', header: 'DcNo' },
      { field: 'dc_no', header: 'DcNo' },
      { field: 'total_amt', header: 'Total Amount' }

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
  sale_status: '';
  sale_user_vechicle_id: '';
  eng_no: '';
  frame_no: '';
  dc_no: '';
  key_no: '';
  vechicle_color: '';
  Nominee_name: '';
  basic_price: '';
  life_tax: '';
  insurance: '';
  handling: '';
  registration: '';
  warranty: '';
  accessories: '';
  hp: '';
  discount: '';
  total_amt: '';
  discount_approved_by: ''
  sale_user_vechile_exchange_id: '';
  vechile_no: '';
  vechile_color: '';
  vechile_mode: '';
  customer_name: '';
  exchange_amt: '';
  exchange_amt_approval_by: '';


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
    this.proof_num = this.editPersonalInfo[index].proof_num;
    this.eng_no = this.editPersonalInfo[index].eng_no;
    this.frame_no = this.editPersonalInfo[index].frame_no;
    this.dc_no = this.editPersonalInfo[index].dc_no;
    this.key_no = this.editPersonalInfo[index].key_no;
    this.vechicle_color = this.editPersonalInfo[index].vechicle_color;
    this.Nominee_name = this.editPersonalInfo[index].Nominee_name;
    this.basic_price = this.editPersonalInfo[index].basic_price;
    this.life_tax = this.editPersonalInfo[index].life_tax;
    this.insurance = this.editPersonalInfo[index].insurance;
    this.handling = this.editPersonalInfo[index].handling;
    this.registration = this.editPersonalInfo[index].registration;
    this.warranty = this.editPersonalInfo[index].warranty;
    this.accessories = this.editPersonalInfo[index].accessories;
    this.hp = this.editPersonalInfo[index].hp;
    this.discount = this.editPersonalInfo[index].discount;
    this.total_amt = this.editPersonalInfo[index].total_amt;
    this.discount_approved_by = this.editPersonalInfo[index].discount_approved_by;
    this.vechile_no = this.editPersonalInfo[index].vechile_no;
    this.vechicle_color = this.editPersonalInfo[index].vechicle_color;
    this.vechile_mode = this.editPersonalInfo[index].vechile_mode;
    this.customer_name = this.editPersonalInfo[index].customer_name;
    this.exchange_amt = this.editPersonalInfo[index].exchange_amt;
    this.exchange_amt_approval_by = this.editPersonalInfo[index].exchange_amt_approval_by;
  }

  getDob() {
    let newDate = moment(this.dob).format('YYYY-DD-MM').toString();
    this.dob = newDate;
    console.log(this.dob)
  }

  invoiceList(data, index) {

    console.log(index);
    this.invoiceInfo = data;
    console.log(this.invoiceInfo)
    data.index = index;
    this.temp = index;
    sessionStorage.setItem('userSaleData', JSON.stringify(this.invoiceInfo));
    // let newDate = moment(this.invoiceInfo[index].dob).format('DD-MM-YYYY').toString();
    // this.dob = newDate;
    // console.log(this.dob);
    // this.sale_user_id = this.invoiceInfo[index].sale_user_id;
    // this.firstname = this.invoiceInfo[index].firstname;


  }

  updatePersonInfo() {
    var data = {
      sale_user_id: this.sale_user_id,
      firstname: this.firstname,
      display_name_on_rc: this.display_name_on_rc,
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
      sale_status: this.sale_status
    }
    this.service.saveSalesUser(data).subscribe(res => {
      console.log(res.json());
      console.log(this.temp);
      this.lists[this.temp].firstname = data.firstname;
      this.lists[this.temp].display_name_on_rc = data.display_name_on_rc;
      this.lists[this.temp].email_id = data.email_id;
      this.lists[this.temp].mobile = data.mobile;
      this.lists[this.temp].relation = data.relation;
      this.lists[this.temp].password = data.password;
      this.lists[this.temp].city = data.city;
      this.lists[this.temp].address = data.address;
      this.lists[this.temp].mandal = data.mandal;
      this.lists[this.temp].district = data.district;
      this.lists[this.temp].proof_type = data.proof_type;
      this.lists[this.temp].proof_num = data.proof_num;
      this.lists[this.temp].sale_status = data.sale_status;
      this.temp = " ";
    })

  }
  temp1: any;
  deleteData: any = [];
  deletePersonData(val, index) {
    this.temp1 = index;
    console.log(index)
    this.deleteData = val;
    console.log(this.deleteData)
    val.index = index;
    console.log("***")
    this.sale_user_id = this.deleteData[index].sale_user_id;
  }
  deletePerson() {
    this.lists.splice(this.temp1, 1)
    console.log(this.temp1)
    var data = {
      sale_user_id: this.sale_user_id,
      sale_status: "0"
    }
    console.log(data)
    this.service.saveSalesUser(data).subscribe(res => {
      console.log(res.json());
    })
  }
  editVehicle() {

  }



}
