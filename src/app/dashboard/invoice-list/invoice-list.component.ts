import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  firstName: '';
  nameOnRc: '';
  Address: '';
  Dob: '';
  Relation: '';
  Mandal: '';
  District: '';
  Mobile: '';
  proofType: '';
  proofNum: '';
  EngineNo: '';
  FrameNo: '';
  DcNo: '';
  KeyNo: '';
  vehicleColor: '';
  nomineeName: '';
  basciPrice: '';
  lifeTax: '';
  Insurence: '';
  Handling: '';
  Registration: '';
  standardAcc: '';
  Accessories: '';
  HpTax: '';
  Discount: '';
  totalAmount: '';
  loginData:any=[];
  branchId:'';

  printStyle = "hidden";

  editPersonalInfo: any = [];
  newIndex: '';
  constructor(private router: Router) { }
  ngOnInit() {

    this.loginData = JSON.parse(sessionStorage.getItem('userSession'));
    this.branchId =this.loginData._results.employee_branch_id;
    console.log(this.branchId)

    this.editPersonalInfo = JSON.parse(sessionStorage.getItem('invoiceData'));
    console.log(this.editPersonalInfo);

    this.firstName = this.editPersonalInfo.firstname;
    this.nameOnRc = this.editPersonalInfo.display_name_on_rc;
    this.Relation = this.editPersonalInfo.relation;
    this.Address = this.editPersonalInfo.address;
    this.Mandal = this.editPersonalInfo.mandal;
    this.District = this.editPersonalInfo.district;
    this.Mobile = this.editPersonalInfo.mobile;
    console.log(this.Mobile)
    this.proofType = this.editPersonalInfo.proof_type;
    this.proofNum = this.editPersonalInfo.proof_num;
    this.EngineNo = this.editPersonalInfo.eng_no;
    this.FrameNo = this.editPersonalInfo.frame_no;
    console.log(this.editPersonalInfo.frame_no);
    console.log(this.FrameNo)
    this.DcNo = this.editPersonalInfo.dc_no;
    this.KeyNo = this.editPersonalInfo.key_no;
    this.vehicleColor = this.editPersonalInfo.vechicle_color;
    this.nomineeName = this.editPersonalInfo.Nominee_name;
    this.basciPrice = this.editPersonalInfo.basic_price;
    this.lifeTax = this.editPersonalInfo.life_tax;
    this.Insurence = this.editPersonalInfo.insurance;
    this.Handling = this.editPersonalInfo.handling;
    this.Registration = this.editPersonalInfo.registration;
    this.standardAcc = this.editPersonalInfo.standaccessories;
    this.Accessories = this.editPersonalInfo.accessories;
    this.HpTax = this.editPersonalInfo["HP Charges"];
    this.Discount = this.editPersonalInfo.discount;
    this.totalAmount = this.editPersonalInfo.total_amt;
  }
  backsaleDetails() {
    sessionStorage.removeItem('invoiceData');
    this.router.navigate(['sale-details'])
  }
  // printInvoice(printlist) {
  //   this.printStyle = "visible";
  //   let printContents = document.getElementById(printlist).innerHTML;
  //   let originalContents = document.body.innerHTML;
  //   document.body.innerHTML = printContents;
  //   window.print();
  //   document.body.innerHTML = originalContents;
  // }
  printInvoice(printlist) {
    this.printStyle = "visible";
    let printContents = document.getElementById(printlist).innerHTML;
    // let originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    // window.print();
    // document.body.innerHTML = originalContents;
    const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(  `
    <html>
        <head>
            <title>Print tab</title>           
            ^^^^^^^^^^^^^ add them as usual to the head
        </head>
        <body onload="window.print(); window.close()">
            ${printContents}
        </body>
    </html>
    `  );
    popupWin.document.close();
  }


}
