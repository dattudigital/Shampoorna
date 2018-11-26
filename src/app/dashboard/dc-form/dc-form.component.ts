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
    this.vehicleModel = this.dcFormInfo.vechile_mode;
    this.engineNo = this.dcFormInfo.eng_no;
    this.frameNo = this.dcFormInfo.frame_no;
    this.vehicleColor = this.dcFormInfo.vechicle_color;
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
  // printComponent(cmpName) {
  //   let printContents = document.getElementById(cmpName).innerHTML;
  //   let originalContents = document.body.innerHTML;
  //   document.body.innerHTML = printContents;
  //  // var EngineNo=(<HTMLInputElement>document.getElementById("#engNo")).value
  //   window.print();
  //   document.body.innerHTML = originalContents;
  // }
  printComponent(deliveryform) {
    let printContents = document.getElementById(deliveryform).innerHTML;
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
