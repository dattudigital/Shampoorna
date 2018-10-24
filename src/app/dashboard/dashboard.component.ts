import { Component, OnInit } from '@angular/core';
import { SaleUserService } from '../services/sale-user.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Http } from '@angular/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedOption: any = '';
  selectedRadio = '';
  newUser = true;
  exchangeUser = false;
  csdUser = false;
  isDisabled = 'hidden';
  disableCash = 'hidden';
  disableCredit = 'hidden';
  disableTransfer = 'hidden';
  disableOther = 'hidden';
  disableApprovedBy = 'hidden';
  public date1: any;
  uploadedFiles: any[] = [];

  cheque: any = '';
  cash: any = '';
  creditCard: any = '';
  accountTranfer: any = '';
  other: any = ''
  slika: any = ''

  name = '';
  nameOnRc = ''
  dob = '';
  relationName = '';
  address = '';
  mandal = '';
  districtName = '';
  mobile = '';
  addressProof = '';
  addressProofNo = '';

  vehicleEngineNo = '';
  vehicleFrameNo = '';
  vehicleDcNo = '';
  vehicleKeyNo = ''
  vehicleColor = '';
  nomineeName = '';
  vehicleBasic: '';
  lifeTax: '';
  VehicleInsu: '';
  handlingC: '';
  vehicleReg: '';
  vehicleWarranty: '';
  vehicleAcc: '';
  Hp: '';
  discount: any = '';
  totalAmount: '';
  discountApprovedBy: '';


  selectedValue: string;
  temp: any[] = new Array();
  vehicleInfo: any[] = new Array();



  banks: any = [{
    bankStatement: ''
  }]


  constructor(private saleUserService: SaleUserService, private http: Http) { }

  ngOnInit() {
  }

 

  triggerSomeEvent() {
    console.log(this.cheque)
    if (this.cheque == false) {
      this.isDisabled = 'hidden';
    } else {
      this.isDisabled = 'visible';
    }
  }

  cashChangeEvent() {
    if (this.cash == false) {
      this.disableCash = 'hidden';
    } else {
      this.disableCash = 'visible';
    }
  }

  creditCardEvent() {
    if (this.creditCard == false) {
      this.disableCredit = 'hidden';
    } else {
      this.disableCredit = 'visible';
    }
  }

  tranferEvent() {
    if (this.accountTranfer == false) {
      this.disableTransfer = 'hidden';
    } else {
      this.disableTransfer = 'visible';
    }
  }

  otherEvent() {
    if (this.other == false) {
      this.disableOther = 'hidden';
    } else {
      this.disableOther = 'visible';
    }
  }

  newUserClick() {
    this.newUser = true;
    this.exchangeUser = false;
    this.csdUser = false;
  }
  exchangeUserClick() {
    this.newUser = false;
    this.exchangeUser = true;
    this.csdUser = false;
  }
  csdUserClick() {
    this.newUser = false;
    this.exchangeUser = false;
    this.csdUser = true;
  }

  addBankStatement(data, index) {
    console.log(index)
    if (index !== 5) {
      this.banks.push({
        bankStatement: ''
      })
    }

  }
  deleteBankStatement(index) {
    console.log(index);
    this.banks.splice(index, 1)
  }

  saveUserDeatils() {
    console.log("came")
    console.log(this.dob)
    var date = new Date(this.dob);
    this.dob = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDay();
    console.log(this.dob);
    var data = {
      firstname: this.name,
      email_id: this.nameOnRc,
      display_name_on_rc: this.nameOnRc,
      dob: this.dob,
      relation: this.relationName,
      address: this.address,
      mobile: this.mobile,
      mandal: this.mandal,
      district: this.districtName,
      proof_type: this.addressProof,
      proof_num: this.addressProofNo,
      sale_status: "1"
    }
    console.log(data)
    this.saleUserService.saveSalesUser(data).subscribe(responce => {
      console.log(responce.json())
    })

  }

  saveVehicleDetails() {
    var vehicledetails = {
      eng_no: this.vehicleEngineNo,
      frame_no: this.vehicleFrameNo,
      dc_no: this.vehicleDcNo,
      key_no: this.vehicleKeyNo,
      vechicle_color: this.vehicleColor,
      Nominee_name: this.nomineeName,
      basic_price: this.vehicleBasic,
      life_tax: this.lifeTax,
      insurance: this.VehicleInsu,
      handling: this.handlingC,
      registration: this.vehicleReg,
      warranty: this.vehicleWarranty,
      accessories: this.vehicleAcc,
      hp: this.Hp,
      discount: this.discount,
      total_amt: this.totalAmount,
      discount_approved_by: this.discountApprovedBy,
      sale_user_vechile_status: 1
    }
    console.log(vehicledetails)
    this.saleUserService.saveSalesVehicle(vehicledetails).subscribe(res => {
      console.log(res.json());
    })
  }
  engineSearch(val) {
    if (val.length >= 2) {
      this.saleUserService.searchEngine(val).subscribe(data => {
        this.temp.push(data.json().result);
        this.vehicleInfo = this.temp.pop()
      })

    } else {
      this.vehicleInfo = [];
    }
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    console.log(this.selectedOption);
    this.vehicleFrameNo = this.selectedOption.vehicle_frameno;
    this.vehicleDcNo = this.selectedOption.vechicle_dcno;
    this.vehicleKeyNo = this.selectedOption.key_no;
    this.vehicleColor = this.selectedOption.vehicle_color;
    this.nomineeName = this.selectedOption.Nominee_name;
    this.vehicleBasic = this.selectedOption.vehicle_cost;
    this.lifeTax = this.selectedOption.life_tax;
    this.VehicleInsu = this.selectedOption.insurance;
    this.handlingC = this.selectedOption.handling;
    this.vehicleReg = this.selectedOption.registration;
    this.vehicleWarranty = this.selectedOption.warranty;
    this.vehicleAcc = this.selectedOption.accessories;
    this.Hp = this.selectedOption.hp;
  }

  approvedEmpEnable() {

    if (this.discount >= 1) {
      this.disableApprovedBy = 'visible'
    } else {
      this.disableApprovedBy = 'hidden'
    }
  }
}
