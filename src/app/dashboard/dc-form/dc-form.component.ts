import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-dc-form',
  templateUrl: './dc-form.component.html',
  styleUrls: ['./dc-form.component.css']
})
export class DcFormComponent implements OnInit {
  dcFormInfo: any = [];
  vehicleModel: ''
  engineNo: '';
  frameNo: '';
  vehicleColor: '';
  constructor(private router: Router) { }

  ngOnInit() {
    this.dcFormInfo = JSON.parse(sessionStorage.getItem('userSaleData'));
    console.log(this.dcFormInfo);
    this.vehicleModel=this.dcFormInfo[0].vechile_mode
    this.engineNo = this.dcFormInfo[0].eng_no;
    this.frameNo = this.dcFormInfo[0].frame_no;
    this.vehicleColor = this.dcFormInfo[0].vechile_color
    console.log(this.vehicleColor);
  }
  backsaleDetails() {
    this.router.navigate(['sale-details'])
  }
}
