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
  Warranty: '';
  Accessories: '';
  HpTax: '';
  Discount: '';
  totalAmount: '';

  editPersonalInfo: any = [];
  newIndex:'';
  constructor(private router: Router) { }
  ngOnInit() {
    this.editPersonalInfo = JSON.parse(sessionStorage.getItem('userSaleData'));

    this.newIndex = JSON.parse(sessionStorage.getItem('indexValue'));
    console.log(this.newIndex)
    console.log(this.editPersonalInfo);
    this.firstName = this.editPersonalInfo[this.newIndex].firstname;
    this.nameOnRc = this.editPersonalInfo[this.newIndex].display_name_on_rc;
    this.Relation = this.editPersonalInfo[this.newIndex].relation;
    this.Address = this.editPersonalInfo[this.newIndex].address;
    this.Mandal = this.editPersonalInfo[this.newIndex].mandal;
    this.District = this.editPersonalInfo[this.newIndex].district;
    this.Mobile = this.editPersonalInfo[this.newIndex].mobile;
    this.proofType = this.editPersonalInfo[this.newIndex].proof_type;
    this.proofNum = this.editPersonalInfo[this.newIndex].proof_num;
    this.EngineNo = this.editPersonalInfo[this.newIndex].eng_no;
    this.FrameNo = this.editPersonalInfo[this.newIndex].frame_no;
    this.DcNo = this.editPersonalInfo[this.newIndex].dc_no;
    this.KeyNo = this.editPersonalInfo[this.newIndex].key_no;
    this.vehicleColor = this.editPersonalInfo[this.newIndex].vechicle_color;
    this.nomineeName = this.editPersonalInfo[this.newIndex].Nominee_name;
    this.basciPrice = this.editPersonalInfo[this.newIndex].basic_price;
    this.lifeTax = this.editPersonalInfo[this.newIndex].life_tax;
    this.Insurence = this.editPersonalInfo[this.newIndex].insurance;
    this.Handling = this.editPersonalInfo[this.newIndex].handling;
    this.Registration = this.editPersonalInfo[this.newIndex].registration;
    this.Warranty = this.editPersonalInfo[this.newIndex].Warranty;
    this.Accessories = this.editPersonalInfo[this.newIndex].accessories;
    this.HpTax = this.editPersonalInfo[this.newIndex].hp;
    this.Discount = this.editPersonalInfo[this.newIndex].discount;
    this.totalAmount = this.editPersonalInfo[this.newIndex].total_amt;
  }
  backsaleDetails() {
    this.router.navigate(['sale-details'])
  }
}
