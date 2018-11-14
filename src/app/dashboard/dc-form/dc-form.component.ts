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
    this.dcFormInfo = JSON.parse(sessionStorage.getItem('dcFormData'));
    console.log("********");
    console.log(this.dcFormInfo);
    this.vehicleModel = this.dcFormInfo.vechile_mode
    this.engineNo = this.dcFormInfo.eng_no;
    this.frameNo = this.dcFormInfo.frame_no;
    this.vehicleColor = this.dcFormInfo.vechile_color
    console.log(this.vehicleColor);
  }
  backsaleDetails() {
    sessionStorage.removeItem('dcFormData');
    this.router.navigate(['sale-details'])
  }
  //   PrintRecord = function () {
  //    this.printData();
  //   window.print()
  //   }
  //   printData() {
  //     var divToPrint = document.getElementById("deliveryform");
  //     var newWin = window.open();
  //     newWin.document.write(divToPrint.outerHTML);
  //     newWin.print();
  //     newWin.close();
  //   }
  printComponent(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }



}
