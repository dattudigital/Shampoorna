import { Component, OnInit } from '@angular/core';
import { SaleUserService } from '../services/sale-user.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryAssigningService } from '../services/inventory-assigning.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  selectedOption: any = '';
  selectedRadio = '';
  newUser = true;
  noResult = false;
  exchangeUser = false;
  csdUser = false;
  isDisabled = 'hidden';
  disableCash = 'hidden';
  disableCredit = 'hidden';
  disableTransfer = 'hidden';
  disableOther = 'hidden';
  disableApprovedBy = 'hidden';
  public date1: any;
  public date2: any;
  public date3: any;
  uploadedFiles: any[] = [];
  personalinfoForm: FormGroup;
  cheque: any = '';
  cash: any = '';
  creditCard: any = '';
  accountTranfer: any = '';
  other: any = ''
  slika: any = ''
  //personal information
  name = '';
  nameOnRc = ''
  dob: any;
  relationName = '';
  address = '';
  mandal = '';
  pincode = '';
  districtName = '';
  mobile = '';
  email = '';
  addressProof = '';
  addressProofNo = '';
  userImage = '';
  userImageName = '';
  payOrder = '';
  payOrderName = '';
  deliveryFromShowroom = '';
  deliveryFileName = '';
  bankStatementname = '';
  //vehicle information
  vehicleEngineNo = '';
  vehicleFrameNo = '';
  vehicleDcNo = '';
  vehicleKeyNo = ''
  vehicleColor = '';
  vehicleModel = '';
  vehicleVariant = '';
  nomineeName = '';
  nomineeDob = '';
  secondVehicle = '';
  vehicleBasic: number;
  lifeTax: number;
  VehicleInsu: number;
  HandlingC: number;
  Registration: number;
  StandardAcc: number;
  VehicleHp: number;
  discountApprovedBy: any;
  handlingC: number;
  vehicleReg: '';
  vehicleWarranty: '';
  vehicleAcc: number;
  Hp: '';
  discount = 0;
  totalAmount: '';
  vehicleInsuAmount: number;
  taxAmount: number;
  basicwithTax: number;
  //typeahead
  selectedValue: string;
  temp: any[] = new Array();
  vehicleInfo: any[] = new Array();
  pdfName: any;
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
    'downPayment': 0,
    'addressProof': '',
    'addressFileName': '',
    'idProof': '',
    'idProofName': '',
    'bankStatement': [],
    'cheque': '',
    'chequeFileName': '',
    'chequeSelect': '',
    'chequeNo': '',
    'chequeAmount': '',
    'chequeDate': null,
    'bankName': '',
    'cashSelect': '',
    'cashAmount': 0,
    'creditcardSelect': '',
    'creditTransId': '',
    'creditcardAmount': 0,
    'accountTranferSelect': '',
    'accounttranferAmount': 0,
    'accountTranferId': '',
    'othersSelect': '',
    'mobileWallet': null,
    'othersAmount': 0,
  }

  submitted = false;
  banks: any = [
    {
      name: '',
      bankStatement: ''
    }
  ];
  cashTotal = 0;
  selectedAmountOption: any;
  //exchangevehicle details
  exchangevehicleNo: '';
  exchangeEngineNo: '';
  exchangeFrameNo: '';
  exchangeVehicleColor: '';
  exchangeVehicleModel: '';
  vehiclecustomerName: '';
  exchangeAmount: any;
  exchangeAmountApprovedBy: '';
  taxData: any;
  employeedata: any;
  branchManagerData: any = [];
  amount: number;
  onRoadPrice: number;
  roadTax: number = 0;
  tempAmount: number = 0;
  taxCount: number = 0
  bankStatemet: any;
  loginData: any = [];
  branchName: '';
  empTypeId: '';
  prYesChecked = '';
  accessriesYes = '';
  branchId = '';
  fieldsData: any = [];
  exchange: '';
  total: any = '';
  //afterSelectedEngine remove that engine number to after select
  selectedVehicleNo: '';
  SelectedAssignNo: '';
  // files upload and preview
  addressPreview: any;
  idpreview: any;
  chequepreview: any;
  userimagePreview: any;
  payOrderPerview: any;
  deliveryFormPreview: any;

  userId: '';

  constructor(private saleUserService: SaleUserService, private invetoryAssign: InventoryAssigningService, private formBuilder: FormBuilder, private http: Http, private router: Router, ) { }

  ngOnInit() {
    this.loginData = JSON.parse(sessionStorage.getItem('userSession'));
    this.branchName = this.loginData._results.branch_name
    this.branchId = this.loginData._results.employee_branch_id

    if (sessionStorage.salesdata) {
      this.fieldsData = JSON.parse(sessionStorage.getItem('salesdata'))
      this.name = this.fieldsData.name;
      this.nameOnRc = this.fieldsData.nameOnRc;
      let newDate1 = moment(this.fieldsData.nameOnRc).format('DD-MM-YYYY').toString();
      this.dob = newDate1;
      this.relationName = this.fieldsData.relationName;
      this.address = this.fieldsData.address;
      this.pincode = this.fieldsData.pincode;
      this.mandal = this.fieldsData.mandal;
      this.districtName = this.fieldsData.districtName;
      this.email = this.fieldsData.email;
      this.mobile = this.fieldsData.mobile;
      this.addressProof = this.fieldsData.addressProof;
      this.addressProofNo = this.fieldsData.addressProofNo
    }
    this.http.get(environment.host + 'employees').subscribe(employeedata => {
      this.employeedata = employeedata.json().result;
      for (var i = 0; i < this.employeedata.length; i++) {
        if (this.employeedata[i].emp_type_id == 2) {
          this.branchManagerData.push(this.employeedata[i])
        }
      }
    });
    this.personalinfoForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      nameRc: ['', Validators.required],
      relation: ['', Validators.required],
      custAddress: ['', Validators.required],
      custMandal: ['', Validators.required],
      custPinecode: ['', Validators.required],
      custDistrict: ['', Validators.required],
      custMobile: ['', Validators.required],
      custEmail: ['', [Validators.required, Validators.email]],
      addressProof: ['', Validators.required],
      addressProofNo: ['', Validators.required]
    });
  }

  redirectToSalesDetails() {
    this.router.navigate(['sale-details'])
  }

  triggerSomeEvent() {
    if (this.paymentEmi.chequeSelect == false) {
      this.isDisabled = 'hidden';
      this.paymentEmi.chequeAmount = null;
      this.paymentEmi.chequeNo = null;
    } else {
      this.isDisabled = 'visible';
    }
  }

  cashChangeEvent() {
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
      this.paymentEmi.creditcardAmount = null;
      this.paymentEmi.creditTransId = null
    } else {
      this.disableCredit = 'visible';
    }
  }

  tranferEvent() {
    if (this.paymentEmi.accountTranferSelect == false) {
      this.disableTransfer = 'hidden';
      this.paymentEmi.accounttranferAmount = null
      this.paymentEmi.accountTranferId = null
    } else {
      this.disableTransfer = 'visible';
    }
  }

  otherEvent() {
    if (this.paymentEmi.othersSelect == false) {
      this.disableOther = 'hidden';
      this.paymentEmi.othersAmount = null;
      this.paymentEmi.othersSelect = '';
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
    if (index !== 5) {
      this.banks.push({
        name: this.pdfName,
        bankStatement: this.bankStatemet
      })
    }
  }

  deleteBankStatement(index) {
    this.banks.splice(index - 1, 1)
  }

  getreqDate() {
    let newDate = moment(this.dob).format('YYYY-MM-DD').toString();
    this.dob = newDate;
  }

  getNomineeDate() {
    let newDate = moment(this.nomineeDob).format('YYYY-MM-DD').toString();
    this.nomineeDob = newDate;
  }

  getChequedate() {
    let newDate = moment(this.paymentEmi.chequeDate).format('YYYY-MM-DD').toString();
    this.paymentEmi.chequeDate = newDate;
  }

  prChecked() {
    console.log(this.prYesChecked);
  }
  accessriesChecked() {
    console.log(this.accessriesYes)
  }

  //complete sale details
  get f() { return this.personalinfoForm.controls; }

  saveUserDeatils(val) {
    this.submitted = true;
    if (this.personalinfoForm.invalid) {
      return;
    }
    var data = {
      firstname: this.name,
      email_id: this.email,
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
      branchid: this.branchId,
      sale_status: "1"
    }
    this.saleUserService.saveSalesUser(data).subscribe(response => {
      this.userId = response.json().result.sale_user_id
      // vehicle information send to sale-user api
      if (response.json().status == true) {
        var vehicledetails = {
          vech_sale_user_id: response.json().result.sale_user_id,
          eng_no: this.vehicleEngineNo,
          frame_no: this.vehicleFrameNo,
          dc_no: this.vehicleDcNo,
          vechile_gatepass: this.vehicleKeyNo,
          vechicle_color: this.vehicleColor,
          Nominee_name: this.nomineeName,
          nomine_dob: this.nomineeDob,
          second_vechile: this.secondVehicle,
          pr: this.prYesChecked,
          accessries_radio: this.accessriesYes,
          basic_price: this.vehicleBasic,
          life_tax: this.lifeTax,
          insurance: this.VehicleInsu,
          handling: this.handlingC,
          registration: this.Registration,
          standaccessories: this.StandardAcc,
          accessories: this.vehicleAcc,
          hp: this.VehicleHp,
          discount: this.discount,
          total_amt: this.onRoadPrice,
          discount_approved_by: this.discountApprovedBy.employee_id,
          sale_user_vechile_status: 1
        }
        this.saleUserService.saveSalesVehicle(vehicledetails).subscribe(vehicle => {
          console.log(vehicle.json().result);
        });
      }
      //csd files send to api
      if (response.json().result.user_type == 2) {
        var csdDetails = {
          vech_sale_user_id: response.json().result.sale_user_id,
          user_type: response.json().result.user_type,
          csd_pay_order: this.payOrder,
          csd_pay_order_name: this.payOrderName,
          csd_delivery_showroom: this.deliveryFromShowroom,
          csd_delivery_showroom_name: this.deliveryFileName,
        }
        this.saleUserService.addPaymentEmi(csdDetails).subscribe(response => {
          console.log(response.json());
        })
      }
      //exchange vehicle information send to api
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
          exchange_amt_approval_by: this.discountApprovedBy.employee_id,
          exc_sale_exchange_status: 1
        }
        this.saleUserService.saveExchangeVehicle(exchangeDetails).subscribe(res => {
          console.log(res.json());
        })
      }
      //Payment Details send to api
      if (val == 0 || val == 1) {
        let chequeSelect;
        let cashSelect;
        let creditcardSelect;
        let accountSelect;
        let otherSelect;
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
        if (this.paymentEmi.creditcardSelect == true) {
          creditcardSelect = '1'
        } else {
          creditcardSelect = '0'
        }
        if (this.paymentEmi.accountTransferSelect == true) {
          accountSelect = '1'
        } else {
          accountSelect = '0'
        }

        if (this.paymentEmi.othersSelect == true) {
          otherSelect = '1'
        } else {
          otherSelect = '0'
        }

        if (!this.paymentEmi.creditAmount) {
          this.paymentEmi.creditAmount = 0;
        }
        var paymentDetails = {
          pay_sale_user_id: response.json().result.sale_user_id,
          mode_of_payment: this.paymentEmi.paymentmode,
          emi_financial_name: this.paymentEmi.financialName,
          emi_financial_down_payment: this.paymentEmi.downPayment,
          emi_addresss_proof: this.paymentEmi.addressProof,
          address_name: this.paymentEmi.addressFileName,
          emi_id_proof: this.paymentEmi.idProof,
          id_name: this.paymentEmi.idProofName,
          emi_cheque: this.paymentEmi.cheque,
          cheque_name: this.paymentEmi.chequeFileName,
          cheque: chequeSelect,
          cheque_no: this.paymentEmi.chequeNo,
          cheque_date: this.paymentEmi.chequeDate,
          cheque_amt: this.paymentEmi.chequeAmount,
          cheque_bank: this.paymentEmi.bankName,
          cash: cashSelect,
          cash_amount: this.paymentEmi.cashAmount,
          credit_card: creditcardSelect,
          credit_card_tranactionid: this.paymentEmi.creditTransId,
          credit_card_amt: this.paymentEmi.creditcardAmount,
          account_transfer: accountSelect,
          account_trasaction_id: this.paymentEmi.accountTranferId,
          account_transfer_amt: this.paymentEmi.accounttranferAmount,
          other: otherSelect,
          others_type: this.paymentEmi.mobileWallet,
          others_amt: this.paymentEmi.othersAmount,
          total: this.cashTotal,
          emi_bank_stmt: '',
          bank_statement: this.banks
        }
        if (this.paymentEmi.mobileWallet) {
          delete paymentDetails.others_type;
        }
        this.saleUserService.addPaymentEmi(paymentDetails).subscribe(response => {
        })
      }
    });
    // var vehicleremoveData = {
    //   vehicle_id: this.selectedVehicleNo,
    //   status: "0"
    // }
    // this.saleUserService.saveSalesVehicle(vehicleremoveData).subscribe(res => {
    //   console.log(res.json());
    // });
    // var AssignData = {
    //   inventory_assign_id: this.SelectedAssignNo,
    //   status: "0"
    // }
    // this.invetoryAssign.addInventoryAssign(AssignData).subscribe(response => {
    //   console.log(response.json())
    // });
    window.sessionStorage.removeItem('salesdata');
  }

  engineSearch(val) {
    if (val.length > 2) {
      this.saleUserService.searchEngine(this.branchId, val).subscribe(data => {
        this.temp = [];
        this.temp.push(data.json().result);
        if (data.json().status == false) {
          this.vehicleInfo = [];
          this.noResult = true;
        } else {
          this.noResult = false;
          this.vehicleInfo = this.temp.pop();
        }
      })
    } else {
      this.noResult = false;
      this.vehicleInfo = [];
    }
  }

  secondVehicleClick() {
    this.total = 0;
    if (this.secondVehicle.toString() == 'true') {
      this.total = this.total + this.vehicleBasic * (5 / 100)
      if (this.total) {
        this.total = this.total * 1 + this.lifeTax * 1;
      }
    }
  }

  tempOnRoadPrice: number;
  onSelect(event: TypeaheadMatch): void {
    this.onRoadPrice = 0
    this.selectedOption = event.item;
    this.selectedVehicleNo = this.selectedOption.vehicle_id;
    this.SelectedAssignNo = this.selectedOption.inventory_assign_id;
    this.vehicleFrameNo = this.selectedOption["Frame No"];
    this.vehicleDcNo = this.selectedOption["TVS-M Invoice No"];
    this.vehicleKeyNo = this.selectedOption.vechile_gatepass;
    this.vehicleColor = this.selectedOption.color_name;
    this.vehicleModel = this.selectedOption.model_name;
    if (this.selectedOption.vehicle_variant) {
      this.saleUserService.getPriceList(this.selectedOption.vehicle_variant).subscribe(res => {
        this.vehicleVariant = res.json().result[0].variant_name;
        this.vehicleBasic = res.json().result[0]["EX.PRICE"];
        this.lifeTax = res.json().result[0]["LTAX & TR"];
        this.VehicleInsu = res.json().result[0]["INS - 1 Yr Comprehensive and 5 Yr Third Party"];
        this.HandlingC = res.json().result[0]["FACILIATION CHARGES"];
        this.Registration = res.json().result[0]["Permantent Registation Cost"];
        this.StandardAcc = res.json().result[0]["STD ACC"];
        this.VehicleHp = res.json().result[0][" HP Charges"];
        if (this.vehicleBasic) {
          this.onRoadPrice = this.onRoadPrice + this.vehicleBasic;
        }
        if (this.onRoadPrice) {
          this.onRoadPrice = this.onRoadPrice * 1 + this.lifeTax * 1
        }
        if (this.onRoadPrice) {
          this.onRoadPrice = this.onRoadPrice * 1 + this.VehicleInsu * 1
        }
        if (this.onRoadPrice) {
          this.onRoadPrice = this.onRoadPrice * 1 + this.Registration * 1
        }
        if (this.onRoadPrice) {
          this.onRoadPrice = this.onRoadPrice * 1 + this.HandlingC * 1
        }
        if (this.onRoadPrice) {
          this.onRoadPrice = this.onRoadPrice * 1 + this.StandardAcc * 1
        }
        if (this.onRoadPrice) {
          this.onRoadPrice = this.onRoadPrice * 1 + this.VehicleHp * 1
        }
        this.tempOnRoadPrice = this.onRoadPrice;
      });
    }
  }

  approvedEmpEnable() {
    if (this.discount >= 1) {
      this.disableApprovedBy = 'visible'
    } else {
      this.disableApprovedBy = 'hidden'
    }
  }

  getFileDetails(event, text1) {
    this.currentImage = text1;
    var files = event.target.files;
    var file = files[0];

    for (var i = 0; i < files.length; i++) {
      this.uploadedFiles = files.name;
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
      reader.onload = (event) => {
        this.addressPreview = event.target;
      }
    }
    //for image preview
    if (event.target.files && event.target.files[0] && this.currentImage === 'i') {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.paymentEmi.idProofName = file.name;
      reader.onload = (event) => {
        this.idpreview = event.target;
      }
    }
    if (event.target.files && event.target.files[0] && this.currentImage === 'c') {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.paymentEmi.chequeFileName = file.name;
      reader.onload = (event) => {
        this.chequepreview = event.target;
      }
    }
    if (event.target.files && event.target.files[0] && this.currentImage === 'p') {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.userImageName = file.name;
      reader.onload = (event) => {
        this.userimagePreview = event.target;
      }
    }
    if (event.target.files && event.target.files[0] && this.currentImage === 'b') {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.pdfName = file.name;
      reader.onload = (event) => {
      }
    }
    if (event.target.files && event.target.files[0] && this.currentImage === 'pay') {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.payOrderName = file.name;
      reader.onload = (event) => {
        this.payOrderPerview = event.target;
      }
    }
    if (event.target.files && event.target.files[0] && this.currentImage === 'delivery') {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.deliveryFileName = file.name;
      reader.onload = (event) => {
        this.deliveryFormPreview = event.target;
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
    }
    if (this.currentImage === 'b') {
      var binaryString = readerEvt.target.result;
      this.bankStatemet = btoa(binaryString);
      this.data.push(this.bankStatemet);
      this.paymentEmi.bank_statement = this.data;
    }
    if (this.currentImage === 'pay') {
      var binaryString = readerEvt.target.result;
      this.payOrder = btoa(binaryString);
    }
    if (this.currentImage === 'delivery') {
      var binaryString = readerEvt.target.result;
      this.deliveryFromShowroom = btoa(binaryString);
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

  withAcc: number;
  addTotalTax() {
    let sum = 0;
    let temp1 = 0;
    this.withAcc = 0;
    temp1 = this.tempOnRoadPrice;
    if (this.isNumber(this.vehicleAcc)) {
      sum = sum + this.vehicleAcc
    }
    if (this.isNumber(this.total)) {
      temp1 = temp1 - this.lifeTax;
      sum = sum + this.total
    }
    if (this.isNumber(this.discount)) {
      sum = sum - this.discount
    }
    if (this.isNumber(this.exchangeAmount)) {
      sum = sum - this.exchangeAmount;
    }
    if (sum) {
      this.withAcc = temp1 * 1 + sum * 1;
      this.onRoadPrice = this.withAcc;
    } else {
      this.onRoadPrice = this.tempOnRoadPrice;
    }
  }
  finalSubmit: boolean = true;
  addTotalAmount() {
    this.cashTotal = 0;
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
      this.cashTotal = this.cashTotal + this.paymentEmi.accounttranferAmount;
    }
    if (this.paymentEmi.othersAmount && this.paymentEmi.othersSelect) {
      this.cashTotal = this.cashTotal + this.paymentEmi.othersAmount
    }

    if (this.nomineeName && this.nomineeDob) {
      if (this.selectedAmountOption == 1) {
        this.finalSubmit = false;
      }
      if (this.selectedAmountOption == 0) {
        this.finalSubmit = true;
      }
      if (this.onRoadPrice == this.cashTotal && this.otpNumber == this.otp) {
        this.finalSubmit = false;
      }
      // console.log(this.otp);
      // if (this.otpNumber == this.otp) {
      //   this.finalSubmit = false;
      // } else {
      //   this.finalSubmit = true;
      // }

    }
  }
  //this method  allow alphabets 
  omit_special_char(event) {
    var k;
    k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 0 || k == 32);
  }

  //This Method  allow Numbers
  only_allow_number(event) {
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

  leaveFields() {
    var data = {
      name: this.name,
      nameOnRc: this.nameOnRc,
      dob: this.dob,
      relationName: this.relationName,
      address: this.address,
      mandal: this.mandal,
      pincode: this.pincode,
      districtName: this.districtName,
      mobile: this.mobile,
      email: this.email,
      addressProof: this.addressProof,
      addressProofNo: this.addressProofNo,
    }
    sessionStorage.setItem('salesdata', JSON.stringify(data))
  }
  discountEnable: boolean = false;
  selectedManager() {
    if (this.discountApprovedBy) {
      this.discountEnable = true;
    }
    if (this.discountApprovedBy == '0') {
      this.discountEnable = false;
    }
  }
  otpDate: any;
  otpNumber: '';
  otpButton: boolean = true;
  otp: '';

  sendOtp() {
    this.otpDate = new Date()
    let newDate1 = moment(this.otpDate).format('YYYY-MM-DD').toString();
    this.otpDate = newDate1;
    var data = {
      branch_id: this.discountApprovedBy.employee_branch_id,
      employee_id: this.discountApprovedBy.employee_id,
      sale_user_id: this.userId,
      mobile: this.discountApprovedBy.phone,
      discount_amount: this.discount,
      otp_date: this.otpDate,
      status: 1
    }
    this.saleUserService.sendOtpToManager(data).subscribe(res => {
      this.otpNumber = res.json().result
    })
  }
} 
