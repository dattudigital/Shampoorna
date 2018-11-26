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
  loginData: any = [];
  branchId: '';

  printStyle = "hidden";

  editPersonalInfo: any = [];
  newIndex: '';
  words:any;
  constructor(private router: Router) { }
  ngOnInit() {

    this.loginData = JSON.parse(sessionStorage.getItem('userSession'));
    this.branchId = this.loginData._results.employee_branch_id;
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
    if(this.totalAmount){
  this.words =this.convertNumberToWords(this.totalAmount)
    }
  }
  backsaleDetails() {
    sessionStorage.removeItem('invoiceData');
    this.router.navigate(['sale-details'])
  }
  value: any;
  convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
      var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
      var received_n_array = new Array();
      for (var i = 0; i < n_length; i++) {
        received_n_array[i] = number.substr(i, 1);
      }
      for (var i = 9 - n_length, j = 0; i < 9; i++ , j++) {
        n_array[i] = received_n_array[j];
      }
      for (var i = 0, j = 1; i < 9; i++ , j++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          if (n_array[i] == 1) {
            n_array[j] = 10 + (n_array[j]);
            n_array[i] = 0;
          }
        }
      }
      this.value = "";
      for (var i = 0; i < 9; i++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          this.value = n_array[i] * 10;
        } else {
          this.value = n_array[i];
        }
        if (this.value != 0) {
          words_string += words[this.value] + " ";
        }
        if ((i == 1 && this.value != 0) || (i == 0 && this.value != 0 && n_array[i + 1] == 0)) {
          words_string += "Crores ";
        }
        if ((i == 3 && this.value != 0) || (i == 2 && this.value != 0 && n_array[i + 1] == 0)) {
          words_string += "Lakhs ";
        }
        if ((i == 5 && this.value != 0) || (i == 4 && this.value != 0 && n_array[i + 1] == 0)) {
          words_string += "Thousand ";
        }
        if (i == 6 && this.value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
          words_string += "Hundred and ";
        } else if (i == 6 && this.value != 0) {
          words_string += "Hundred ";
        }
      }
      words_string = words_string.split("  ").join(" ");
    }
    return words_string;
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
    const popupWin = window.open();
    popupWin.document.open();
    popupWin.document.write(`
    <html>
        <head>
            <title>INVOICE FORM</title>           
        </head>
        <body onload="window.print(); window.close()">
            ${printContents}
        </body>
    </html>
    `  );
    popupWin.document.close();
    this.printStyle ="hidden";
  }


}
