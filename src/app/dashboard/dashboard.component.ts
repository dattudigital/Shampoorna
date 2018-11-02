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
  userImage = '';
  userImageName = '';
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

  discountApprovedBy: ''; handlingC: number;
  vehicleReg: '';
  vehicleWarranty: '';
  vehicleAcc: '';
  Hp: '';
  discount: any = '';
  totalAmount: '';
  lifeTaxAmount: number;
  vehicleInsuAmount: number;
  taxAmount: number;
  basicwithTax: number;

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
    'paymentMode': '',
    'financialName': '',
    'downPayment': '',
    'addressProof': null,
    'addressFileName': '',
    'idProof': '',
    'idProofName': '',
    'bankStatement': [],
    'cheque': '',
    'chequeFileName': '',
    'chequeSelect': '',
    'chequeNo': '',
    'chequeAmount': '',
    'chequeDate': '2018-10-15',
    'cashSelect': '',
    'cashAmount': '',
    'creditcardSelect': '',
    'creditTransId': '',
    'creditAmount': '',
    'accountTranferSelect': '',
    'accounttranferAmount': '',
    'accountTranferId': '',
    'othersSelect': '',
    'othersAmount': '',
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

  constructor(private saleUserService: SaleUserService, private http: Http, private router: Router, ) { }

  ngOnInit() {
    this.saleUserService.getTax().subscribe(res => {
      this.taxData = res.json().result;
      this.lifeTax = this.taxData[0].life_tax;
      this.VehicleInsu = this.taxData[0].insurance;
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
    console.log(this.paymentEmi.chequeSelect)
    if (this.paymentEmi.chequeSelect == false) {
      this.isDisabled = 'hidden';
      this.paymentEmi.chequeAmount = null;
    } else {
      this.isDisabled = 'visible';
    }
  }

  cashChangeEvent() {
    console.log(this.paymentEmi.cashSelect);
    if (this.paymentEmi.cashSelect == false) {
      this.disableCash = 'hidden';
      this.paymentEmi.cashAmount = null;
    } else {
      this.disableCash = 'visible';
    }
  }

  creditCardEvent() {
    if (this.paymentEmi.creditcardSelect == false) {
      this.disableCredit = 'hidden';
      this.paymentEmi.creditcardAmount = null
    } else {
      this.disableCredit = 'visible';
    }
  }

  tranferEvent() {
    if (this.paymentEmi.accountTransferSelect == false) {
      this.disableTransfer = 'hidden';
      this.paymentEmi.accountTransferAmount = null
    } else {
      this.disableTransfer = 'visible';
    }
  }

  otherEvent() {
    if (this.paymentEmi.othersSelect == false) {
      this.disableOther = 'hidden';
      this.paymentEmi.othersAmount = null;
    } else {
      this.disableOther = 'visible';
    }
  }

  newUserClick() {
    console.log(this.exchange);
    this.newUser = true;
    this.exchangeUser = false;
    this.csdUser = false;
  }
  exchange: '';

  exchangeUserClick() {
    console.log(this.exchange);
    this.newUser = false;
    this.exchangeUser = true;
    this.csdUser = false;
  }

  csdUserClick() {
    console.log(this.exchange);
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
    let newDate = moment(this.dob).format('YYYY-MM-DD').toString();
    this.dob = newDate;
    console.log(this.dob)
  }
  //complete sale details
  saveUserDeatils(val) {
    console.log(val)
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
      user_image: this.userImage,
      user_image_name: this.userImageName,
      user_type: val,
      sale_status: "1"
    }
    console.log(data)
    this.saleUserService.saveSalesUser(data).subscribe(response => {
      console.log(response.json().status);
      console.log(response.json().result.sale_user_id);
      // vehicle information send to sale-user api
      if (response.json().status == true) {
        var vehicledetails = {
          vech_sale_user_id: response.json().result.sale_user_id,
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
          total_amt: this.basicwithTax,
          discount_approved_by: this.discountApprovedBy,
          sale_user_vechile_status: 1

        }
        console.log(vehicledetails)
        this.saleUserService.saveSalesVehicle(vehicledetails).subscribe(res => {
          console.log(res.json());
        });

        if (val == '1') {
          var exchangeDetails = {
            exc_sale_user_id: response.json().result.sale_user_id,
            exc_vechile_no: this.exchangevehicleNo,
            exc_eng_no: this.exchangeEngineNo,
            exc_frame_no: this.exchangeFrameNo,
            exc_vechile_color: this.exchangeVehicleColor,
            exc_vechile_mode: this.exchangeVehicleModel,
            exc_customer_name: this.vehiclecustomerName,
            exchange_amt: this.exchangeAmount,
            exchange_amt_approval_by: this.exchangeAmountApprovedBy,
            exc_sale_exchange_status: 1
          }
          console.log(exchangeDetails);
          this.saleUserService.saveExchangeVehicle(exchangeDetails).subscribe(res => {
            console.log(res.json())
          })
        }
        let chequeSelect;
        let cashSelect;
        let creditcardSelect;
        let accountSelect;
        let otherSelect;
        console.log(this.paymentEmi.chequeSelect)
        if (this.paymentEmi.chequeSelect == true) {
          chequeSelect = '1'
        } else {
          chequeSelect = '0'
        }

        if (this.paymentEmi.cashSelect == true) {
          cashSelect = '1'
        } else {
          cashSelect = '0'
        }
        if (this.paymentEmi.credicardSelect == true) {
          creditcardSelect = '1'
        } else {
          creditcardSelect = '0'
        }
        if (this.paymentEmi.accountTransferSelect == true) {
          accountSelect = '1'
        } else {
          accountSelect = '0'
        }
        if (this.paymentEmi.othersSelect.toString() == 'true') {
          otherSelect = '1'
        } else {
          otherSelect = '0'
        }
        var paymentDetails = {
          pay_sale_user_id: response.json().result.sale_user_id,
          mode_of_payment: this.paymentEmi.paymentmode,
          emi_financial_name: this.paymentEmi.financialName,
          emi_financial_down_payment: this.paymentEmi.downPayment,
          emi_addresss_proof: this.paymentEmi.addressProof,
         // address_name: this.paymentEmi.addressFileName,
          emi_id_proof: this.paymentEmi.idProof,
          //id_name: this.paymentEmi.idProofName,
          emi_cheque: this.paymentEmi.cheque,
          //cheque_name: this.paymentEmi.chequeFileName,
          cheque: chequeSelect,
          cheque_no: this.paymentEmi.chequeNo,
          cheque_date: this.paymentEmi.chequeDate,
          cheque_amt: this.paymentEmi.chequeAmount,
          cash: cashSelect,
          cash_amount: this.paymentEmi.cashAmount,
          credit_card: creditcardSelect,
          credit_card_tranactionid: this.paymentEmi.creditTransId,
          credit_card_amt: this.paymentEmi.creditcardAmount,
          account_transfer: accountSelect,
          account_trasaction_id: this.paymentEmi.accountTranferId,
          account_transfer_amt: this.paymentEmi.accounttranferAmount,
          others: otherSelect,
          others_amt: this.paymentEmi.othersAmount,
          total: this.cashTotal
          //bank_statement: this.paymentEmi.bankStatement
        }
        console.log(paymentDetails);
        this.saleUserService.addPaymentEmi(paymentDetails).subscribe(response => {
          console.log(response.json());
        })
      }
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
    this.vehicleColor = this.selectedOption.color_name;
    this.nomineeName = this.selectedOption.Nominee_name;
    this.vehicleBasic = this.selectedOption.vehicle_cost;
    //calculate onroadprice with only tax
    if (this.vehicleBasic) {
      this.onRoadPrice = 0;
      this.lifeTaxAmount = 0;
      this.vehicleInsuAmount = 0;
      this.taxAmount = 0;

      console.log(this.vehicleBasic)
      this.lifeTaxAmount = this.lifeTaxAmount + this.vehicleBasic * (this.lifeTax / 100);
      console.log(this.lifeTaxAmount)

      this.vehicleInsuAmount = this.vehicleInsuAmount + this.vehicleBasic * (this.VehicleInsu / 100);
      console.log(this.vehicleInsuAmount);

      this.taxAmount = this.lifeTaxAmount + this.vehicleInsuAmount;
      console.log(this.taxAmount)

      this.onRoadPrice = parseInt(this.vehicleBasic) + this.taxAmount;
      console.log(this.onRoadPrice)

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
  addressPreview: any;
  idpreview: any;
  chequepreview: any;
  userimagePreview: any;
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
      reader.readAsDataURL(event.target.files[0]);
      this.paymentEmi.addressFileName = file.name;
      console.log(this.paymentEmi.addressFileName)
      reader.onload = (event) => {
        this.addressPreview = event.target;
      }
    }
    //for image preview
    if (event.target.files && event.target.files[0] && this.currentImage === 'i') {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.paymentEmi.idProofName = file.name;
      console.log(this.paymentEmi.idProofName)
      reader.onload = (event) => {
        this.idpreview = event.target;
      }
    }
    if (event.target.files && event.target.files[0] && this.currentImage === 'c') {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.paymentEmi.chequeFileName = file.name;
      console.log(this.paymentEmi.chequeFileName);
      reader.onload = (event) => {
        this.chequepreview = event.target;
      }
    }
    if (event.target.files && event.target.files[0] && this.currentImage === 'p') {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.userImageName = file.name;
      console.log(this.userImageName);
      reader.onload = (event) => {
        this.userimagePreview = event.target;
      }
    }
  }
  //image base64 format
  _handleReaderLoaded(readerEvt) {
    if (this.currentImage === 'a') {
      var binaryString = readerEvt.target.result;
      this.paymentEmi.addressProof = btoa(binaryString);
    }

    if (this.currentImage === 'i') {
      var binaryString = readerEvt.target.result;
      this.paymentEmi.idProof = btoa(binaryString);
    }
    if (this.currentImage === 'c') {
      var binaryString = readerEvt.target.result;
      this.paymentEmi.cheque = btoa(binaryString);
    }

    if (this.currentImage === 'p') {
      var binaryString = readerEvt.target.result;
      this.userImage = btoa(binaryString);
      console.log(this.userImage)
    }
    this.currentImage = ''
  }



  isNumber(value: string | number): boolean {
    if (value) {
      return !isNaN(Number(value.toString()));
    } else {
      return false;
    }
  }

  //calculate onroad price 
  handlingAmount: number = 0
  addTotalTax() {
    console.log("********")
    let sum = 0;
    if (this.isNumber(this.handlingC)) {
      sum = sum + this.handlingC
    }
    if (this.isNumber(this.vehicleReg)) {
      sum = sum + parseInt(this.vehicleReg)
    }
    if (this.isNumber(this.vehicleWarranty)) {
      sum = sum + parseInt(this.vehicleWarranty)
    }
    if (this.isNumber(this.vehicleAcc)) {
      sum = sum + parseInt(this.vehicleAcc)
    }
    if (this.isNumber(this.Hp)) {
      sum = sum + parseInt(this.Hp)
    }
    if (this.isNumber(this.discount)) {
      sum = sum - this.discount;
    }
    if (sum) {
      this.basicwithTax = this.onRoadPrice + sum;
    }
    console.log("**********");
    console.log(this.basicwithTax);
  }

  addTotalAmount() {
    this.cashTotal = 0;
    console.log("***************")
    console.log(this.chequeAmount);
    console.log(this.cashAmount);
    // console.log(this.cashTotal);
    if (this.paymentEmi.chequeAmount && this.paymentEmi.chequeSelect) {
      this.cashTotal = this.cashTotal + this.paymentEmi.chequeAmount;
    }
    if (this.paymentEmi.cashAmount && this.paymentEmi.cashSelect) {
      this.cashTotal = this.cashTotal + this.paymentEmi.cashAmount
    }
    if (this.paymentEmi.creditcardAmount && this.paymentEmi.creditcardSelect) {
      this.cashTotal = this.cashTotal + this.paymentEmi.creditcardAmount
    }

    if (this.paymentEmi.accounttranferAmount && this.paymentEmi.accountTranferSelect) {
      console.log('account tranfer')
      this.cashTotal = this.cashTotal + this.paymentEmi.accounttranferAmount;
    }

    if (this.paymentEmi.othersAmount && this.paymentEmi.othersSelect) {
      this.cashTotal = this.cashTotal + this.paymentEmi.othersAmount
    }
    console.log(this.cashTotal);
  }
  omit_special_char(event) {
    console.log('kay press')
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }


}
