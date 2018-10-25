import { Component, OnInit } from '@angular/core';
import { SaleUserService } from '../services/sale-user.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as moment from 'moment';

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
  //personal information
  name = '';
  nameOnRc = ''
  dob = '';
  relationName = '';
  address = '';
  mandal = '';
  pincode = '';
  districtName = '';
  mobile = '';
  addressProof = '';
  addressProofNo = '';
  //vehicle information
  vehicleEngineNo = '';
  vehicleFrameNo = '';
  vehicleDcNo = '';
  vehicleKeyNo = ''
  vehicleColor = '';
  nomineeName = '';
  vehicleBasic: '';
  lifeTax: number;
  VehicleInsu: number;
  handlingC: number;
  vehicleReg: '';
  vehicleWarranty: '';
  vehicleAcc: '';
  Hp: '';
  discount: any = '';
  totalAmount: '';
  discountApprovedBy: '';

  //typeahead
  selectedValue: string;
  temp: any[] = new Array();
  vehicleInfo: any[] = new Array();

  banks: any = [{
    bankStatement: ''
  }]
  //image uploads
  currentImage: any = '';
  bankuploadedFiles: any;
  myFiles: string[] = [];
  bankstmtImage: number = 0;
  data = []
  //paymentmode EMI
  paymentEmi: any = {
    'financialName': '',
    'downPayment': '',
    'addressProof': null,
    'idProof': '',
    'bankStatement': [],
    'cheque': '',
    'photo': ''
  }
  //paymentmode Cash
  cashAmount: number;
  chequeAmount: number;
  creditcardAmount: number;
  accountTransferAmount: number;
  otherAmount: number;
  cashTotal = 0;

  //exchangevehicle details
  exchangevehicleNo: '';
  exchangeEngineNo: '';
  exchangeFrameNo: '';
  exchangeVehicleColor: '';
  exchangeVehicleModel: '';
  vehiclecustomerName: '';
  exchangeAmount: '';
  exchangeAmountApprovedBy: '';
  taxData: any;
  employeedata: any;
  branchManagerData: any = [];
  amount: number;

  onRoadPrice: number = 0;
  roadTax: number = 0;
  tempAmount: number = 0;
  taxCount: number = 0
  constructor(private saleUserService: SaleUserService, private http: Http, private router: Router) { }

  ngOnInit() {

    this.saleUserService.getTax().subscribe(res => {
      this.taxData = res.json().result;
      this.lifeTax = this.taxData[0].life_tax;
      this.VehicleInsu = this.taxData[0].insurance;

      this.amount = this.taxCount + this.lifeTax + this.VehicleInsu;
      console.log(this.amount);
    });
    this.http.get(environment.host + 'employees').subscribe(employeedata => {
      console.log(employeedata.json().result);
      this.employeedata = employeedata.json().result;
      console.log(this.employeedata.length);
      for (var i = 0; i < this.employeedata.length; i++) {
        if (this.employeedata[i].emp_type_id == 2) {
          this.branchManagerData.push(this.employeedata[i])
        }
      }
      console.log(this.branchManagerData)
    });

  }

  redirectToSalesDetails() {
    this.router.navigate(['sale-details'])
  }
  triggerSomeEvent() {
    console.log(this.cheque)
    if (this.cheque == false) {
      this.isDisabled = 'hidden';
      this.chequeAmount = null;
    } else {
      this.isDisabled = 'visible';
    }
  }

  cashChangeEvent() {
    if (this.cash == false) {
      this.disableCash = 'hidden';
      this.cashAmount = null;
    } else {
      this.disableCash = 'visible';
    }
  }

  creditCardEvent() {
    if (this.creditCard == false) {
      this.disableCredit = 'hidden';
      this.creditcardAmount = null
    } else {
      this.disableCredit = 'visible';
    }
  }

  tranferEvent() {
    if (this.accountTranfer == false) {
      this.disableTransfer = 'hidden';
      this.accountTransferAmount = null
    } else {
      this.disableTransfer = 'visible';
    }
  }

  otherEvent() {
    if (this.other == false) {
      this.disableOther = 'hidden';
      this.otherAmount = null;
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

  getreqDate() {
    let newDate = moment(this.dob).format('YYYY-DD-MM').toString();
    this.dob = newDate;
    console.log(this.dob)
  }

  saveUserDeatils() {

    var data = {
      firstname: this.name,
      email_id: this.nameOnRc,
      display_name_on_rc: this.nameOnRc,
      dob: this.dob,
      relation: this.relationName,
      address: this.address,
      mobile: this.mobile,
      mandal: this.mandal,
      pincode: this.pincode,
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
    this.onRoadPrice = 0
    this.selectedOption = event.item;
    console.log(this.selectedOption);
    this.vehicleFrameNo = this.selectedOption.vehicle_frameno;
    this.vehicleDcNo = this.selectedOption.vechicle_dcno;
    this.vehicleKeyNo = this.selectedOption.key_no;
    this.vehicleColor = this.selectedOption.vehicle_color;
    this.nomineeName = this.selectedOption.Nominee_name;
    this.vehicleBasic = this.selectedOption.vehicle_cost;
    //calculate onroadprice with only tax
    if (this.vehicleBasic) {
      this.onRoadPrice = 0;
      console.log(this.vehicleBasic)
      console.log(this.amount);
      this.onRoadPrice = this.onRoadPrice + this.vehicleBasic * (this.amount / 100);
      console.log(this.onRoadPrice);
      this.tempAmount = this.onRoadPrice;
    }
  }

  approvedEmpEnable() {

    if (this.discount >= 1) {
      this.disableApprovedBy = 'visible'
    } else {
      this.disableApprovedBy = 'hidden'
    }
  }
  //for bank statement upload files
  getBankDetails(e) {
    console.log(e.target.files);
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
      console.log(this.myFiles);
    }
    this.uploadFiles(e);
    this.bankstmtImage = this.bankstmtImage + 1;
  }
  uploadFiles(val) {
    var frmData: any = '';
    console.log(this.myFiles.length);
    for (var i = 0; i < this.myFiles.length; i++) {
      this.bankuploadedFiles = this.myFiles[i];
      console.log(this.bankuploadedFiles);
    }
    if (this.uploadedFiles) {
      var reader = new FileReader();
      reader.onload = this._handleReader.bind(this);
      reader.readAsBinaryString(this.bankuploadedFiles);
    }
  }
  _handleReader(readerEvt) {

    var binaryString = readerEvt.target.result;
    this.paymentEmi.bank_statement = btoa(binaryString);
    this.data.push(this.paymentEmi.bank_statement);
    this.paymentEmi.bank_statement = this.data;
    console.log(this.paymentEmi.bank_statement);
  }
  //remaining files upload and preview
  addressPreview = '';
  idpreview = '';
  chequepreview = '';
  getFileDetails(event, text1) {
    this.currentImage = text1;
    console.log(this.currentImage);
    var files = event.target.files;
    var file = files[0];

    for (var i = 0; i < files.length; i++) {
      this.uploadedFiles = files.name;
      console.log(this.uploadedFiles);
    }

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
    if (event.target.files && event.target.files[0] && this.currentImage === 'a') {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // this.addressPreview = event.target.result;
      }
    }
    //for image preview
    if (event.target.files && event.target.files[0] && this.currentImage === 'i') {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        //this.idpreview = event.target.result;
      }
    }
    if (event.target.files && event.target.files[0] && this.currentImage === 'c') {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        //this.chequepreview = event.target.result;
      }
    }
  }
  //image base64 format
  _handleReaderLoaded(readerEvt) {
    if (this.currentImage === 'a') {
      var binaryString = readerEvt.target.result;
      this.paymentEmi.addressProof = btoa(binaryString);
      console.log(this.paymentEmi.addressProof)
    }

    if (this.currentImage === 'i') {
      var binaryString = readerEvt.target.result;
      this.paymentEmi.idProof = btoa(binaryString);
      console.log(this.paymentEmi.idProof)
    }
    if (this.currentImage === 'c') {
      var binaryString = readerEvt.target.result;
      this.paymentEmi.cheque = btoa(binaryString);
      console.log(this.paymentEmi.cheque)
    }

    if (this.currentImage === 'p') {
      var binaryString = readerEvt.target.result;
      this.paymentEmi.photo = btoa(binaryString);
      console.log(this.paymentEmi.photo)
    }
    this.currentImage = ''
  }

  savePaymentEmi() {
    var data = {
      fanancial_name: this.paymentEmi.financialName,
      down_payment: this.paymentEmi.downPayment,
      address_proof: this.paymentEmi.address_proof,
      id_proof: this.paymentEmi.idProof,
      payment_cheque: this.paymentEmi.cheque,
      passport_photo: this.paymentEmi.photo,
      bank_statement: this.paymentEmi.bankStatement
    }
  }


  //calculate onroad price 
  handlingAmount: number = 0
  addTotalTax() {
    this.onRoadPrice = 0;
    console.log("********")
    if (this.handlingC == null) {
      this.onRoadPrice = this.onRoadPrice + this.tempAmount;
    }
    if (this.handlingC) {
      this.onRoadPrice = this.tempAmount + this.handlingC;
     this.handlingAmount=this.handlingAmount+this.onRoadPrice
    }
    if (this.handlingC == null && this.vehicleReg == null) {
      this.onRoadPrice = this.onRoadPrice + this.tempAmount;
    }
    if (this.vehicleReg) {
      this.onRoadPrice = this.handlingAmount + this.vehicleReg
    }

    console.log('after')
    console.log(this.onRoadPrice)
  }

  addTotalAmount() {
    this.cashTotal = 0;
    console.log("***************")
    console.log(this.chequeAmount);
    console.log(this.cashAmount);
    // console.log(this.cashTotal);
    if (this.chequeAmount && this.cheque) {
      this.cashTotal = this.cashTotal + this.chequeAmount;
    }
    if (this.cashAmount && this.cash) {
      this.cashTotal = this.cashTotal + this.cashAmount
    }
    if (this.creditcardAmount && this.creditCard) {
      this.cashTotal = this.cashTotal + this.creditcardAmount
    }

    if (this.accountTransferAmount && this.accountTranfer) {
      this.cashTotal = this.cashTotal + this.accountTransferAmount
    }

    if (this.otherAmount && this.other) {
      this.cashTotal = this.cashTotal + this.otherAmount
    }
    console.log(this.cashTotal);
  }

  addExchangeVehicleDetails() {
    var data = {
      vechile_no: this.exchangevehicleNo,
      eng_no: this.exchangeEngineNo,
      frame_no: this.exchangeFrameNo,
      vechile_color: this.exchangeVehicleColor,
      vechile_mode: this.exchangeVehicleModel,
      customer_name: this.vehiclecustomerName,
      exchange_amt: this.exchangeAmount,
      exchange_amt_approval_by: this.exchangeAmountApprovedBy,
      sale_exchange_status: 1
    }
    console.log(data);
    this.saleUserService.saveExchangeVehicle(data).subscribe(res => {
      console.log(res.json())
    })
  }



}
