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
  constructor(private router: Router) { }
  ngOnInit() {
    this.editPersonalInfo = JSON.parse(sessionStorage.getItem('userSaleData'));
    console.log(this.editPersonalInfo);
    this.firstName = this.editPersonalInfo[0].firstname;
    this.nameOnRc = this.editPersonalInfo[0].display_name_on_rc;
    this.Relation = this.editPersonalInfo[0].relation;
    this.Address = this.editPersonalInfo[0].address;
    this.Mandal = this.editPersonalInfo[0].mandal;
    this.District = this.editPersonalInfo[0].district;
    this.Mobile = this.editPersonalInfo[0].mobile;
    this.proofType = this.editPersonalInfo[0].proof_type;
    this.proofNum = this.editPersonalInfo[0].proof_num;
    this.EngineNo = this.editPersonalInfo[0].eng_no;
    this.FrameNo = this.editPersonalInfo[0].frame_no;
    this.DcNo = this.editPersonalInfo[0].dc_no;
    this.KeyNo = this.editPersonalInfo[0].key_no;
    this.vehicleColor = this.editPersonalInfo[0].vechicle_color;
    this.nomineeName = this.editPersonalInfo[0].Nominee_name;
    this.basciPrice = this.editPersonalInfo[0].basic_price;
    this.lifeTax = this.editPersonalInfo[0].life_tax;
    this.Insurence = this.editPersonalInfo[0].insurance;
    this.Handling = this.editPersonalInfo[0].handling;
    this.Registration = this.editPersonalInfo[0].registration;
    this.Warranty = this.editPersonalInfo[0].Warranty;
    this.Accessories = this.editPersonalInfo[0].accessories;
    this.HpTax = this.editPersonalInfo[0].hp;
    this.Discount = this.editPersonalInfo[0].discount;
    this.totalAmount = this.editPersonalInfo[0].total_amt;
  }
  backsaleDetails() {
    this.router.navigate(['sale-details'])
  }
}
