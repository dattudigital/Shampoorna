import { Component, OnInit } from '@angular/core';
import { SaleUserService } from '../services/sale-user.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedValue = '';
  selectedRadio = '';
  newUser = true;
  exchangeUser = false;
  csdUser = false;
  isDisabled = 'hidden';
  disableCash = 'hidden';
  disableCredit = 'hidden';
  disableTransfer = 'hidden';
  disableOther = 'hidden';
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


  banks: any = [{
    bankStatement: ''
  }]

  constructor(private saleUserService: SaleUserService) { }

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

}
