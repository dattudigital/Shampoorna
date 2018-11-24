import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../services/login.service'
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  password = "";
  mailId = "";
  titleStyle = "hidden";
  errorMessage = false;
  btnDisable = true;
  alerts: any[] = [];
  test1: any;
  vehicledetails = false;
  inventorylist = false;
  indentraise = false;
  listindent = false;
  inventoryass = false;
  acknowledgement = false;


  constructor(private router: Router,private spinner: NgxSpinnerService, private http: HttpClient, private service: LoginService) { }

  ngOnInit() {
    sessionStorage.removeItem('secondaryLoginData1'); 
    sessionStorage.removeItem('secondaryLoginData2'); 
    sessionStorage.removeItem('backBtnReports'); 
    sessionStorage.removeItem('backBtnTimeclocks');
    sessionStorage.removeItem('backBtnManager'); 

    this.loginPopUp();
    this.roleLogin();
    // if (sessionStorage.getItem('inventory-routing') == '"vehicle"') {
    //   this.vehicleDetailClick();
    // } else if (sessionStorage.getItem('inventory-routing') == '"invlist"') {
    //   this.inventoryListClick();
    // } else if (sessionStorage.getItem('inventory-routing') == '"raise"') {
    //   this.indentRaiseClick();
    // } else if (sessionStorage.getItem('inventory-routing') == '"indlist"') {
    //   this.indentListClick();
    // } else if (sessionStorage.getItem('inventory-routing') == '"invassn"') {
    //   this.invAssaignClick();
    // } else if (sessionStorage.getItem('inventory-routing') == '"invack"') {
    //   this.InventoryAckClick();
    // }
  }

  roleLogin() {
    console.log("##########")
    let loginData = JSON.parse(sessionStorage.getItem('secondaryLoginData'));
    console.log(loginData);
    if(loginData){
    if (loginData.status == true && loginData._results.emp_type_id == 1) {
      console.log("1111111")
      this.vehicledetails = true;
      this.inventorylist = true;
      this.indentraise = true;
      this.listindent = true;
      this.inventoryass = true;
      this.acknowledgement = true;
      sessionStorage.setItem('backBtnInventory', 'Y');
      this.titleStyle = "visible";
      this.spinner.hide();
    } else if (loginData.status == true && loginData._results.emp_type_id == 2) {
      console.log("2222222")
      this.inventorylist = true;
      this.indentraise = true;
      this.acknowledgement = true;
      sessionStorage.setItem('backBtnInventory', 'Y');
      this.titleStyle = "visible";
      this.spinner.hide();
    } else if (loginData.status == true && loginData._results.emp_type_id == 3) {
      console.log("3333333")
      this.vehicledetails = true;
      this.listindent = true;
      this.inventoryass = true;
      sessionStorage.setItem('backBtnInventory', 'Y');
      this.titleStyle = "visible";
      this.spinner.hide();
    }
    // else if (loginData.status == false ){
    //   this.errorMessage = true;
    // }
  }
}

  errorClear() {
    this.errorMessage = false;
    if (this.password && this.mailId) {
      this.btnDisable = false;
    }
    else {
      this.btnDisable = true;
    }
  }

  loginPopUp() {
    if (sessionStorage.backBtnInventory) {
      $('#myModal').modal('hide');
      this.titleStyle = "visible";
    }
    else {
      $('#myModal').modal('show');
    }
  }

  // backLocation() {
  //   this._location.back();
  // }

  loginSubmite() {
    if (sessionStorage.secondaryLoginData) {
      window.sessionStorage.removeItem('secondaryLoginData');
      //console.log('secondaryLoginData')
    }
    var data = {
      password: this.password,
      email_id: this.mailId
    }
    this.spinner.show();
    if (this.mailId && this.password) {
      console.log(data)
      this.service.dataLogin(data).subscribe(inData => {
        this.test1 = inData.json()._results;
        sessionStorage.setItem('secondaryLoginData', JSON.stringify(inData.json()));
        
        console.log("*****************")
        if (inData.json().status == false){
          this.errorMessage = true;
          this.spinner.hide();
        } else {
          this.roleLogin();
          $('#myModal').modal('hide');
        }
      });
    } else {
      this.spinner.hide();
      this.alerts = [{
        type: 'danger',
        msg: `Invalid credentials`,
        timeout: 1000
      }];
    }
  }

  redirectToVehicle() {
    this.router.navigate(['inventory/vehicle-details']);
  }

  redirectToInvList() {
    this.router.navigate(['inventory/inventory-list'])
  }

  redirectToIndent() {
    this.router.navigate(['inventory/indent-raising'])
  }

  redirectToInList() {
    this.router.navigate(['inventory/indent-list'])
  }

  redirectToInvAss() {
    this.router.navigate(['inventory/inventory-assigning'])
  }

  redirectToInvAck() {
    this.router.navigate(['inventory/inventory-acknowledge'])
  }

  RedirectToHome() {
    this.router.navigate(['sale-dashboard']);
  }

  // vehicleDetailClick() {
  //   sessionStorage.setItem('inventory-routing', JSON.stringify("vehicle"));
  //   $(".vehicle-detail").trigger("click");
  //   this.removeClass();
  //   $(".vehicle-detail").addClass("active");
  // }

  // inventoryListClick() {
  //   sessionStorage.setItem('inventory-routing', JSON.stringify("invlist"));
  //   $(".inventory-list").trigger("click");
  //   this.removeClass();
  //   $(".inventory-list").addClass("active");
  // }

  // indentRaiseClick() {
  //   sessionStorage.setItem('inventory-routing', JSON.stringify("raise"));
  //   $(".indent-raise").trigger("click");
  //   this.removeClass();
  //   $(".indent-raise").addClass("active");
  // }

  // indentListClick() {
  //   sessionStorage.setItem('inventory-routing', JSON.stringify("indlist"));
  //   $(".indent-list").trigger("click");
  //   this.removeClass();
  //   $(".indent-list").addClass("active");
  // }

  // invAssaignClick() {
  //   sessionStorage.setItem('inventory-routing', JSON.stringify("invassn"));
  //   $(".inventory-assn").trigger("click");
  //   this.removeClass();
  //   $(".inventory-assn").addClass("active");
  // }

  // InventoryAckClick() {
  //   sessionStorage.setItem('inventory-routing', JSON.stringify("invack"));
  //   $(".inventory-ack").trigger("click");
  //   this.removeClass();
  //   $(".inventory-ack").addClass("active");
  // }

  // removeClass() {
  //   $(".vehicle-detail").removeClass("active");
  //   $(".inventory-list").removeClass("active");
  //   $(".indent-raise").removeClass("active");
  //   $(".indent-list").removeClass("active");
  //   $(".inventory-assn").removeClass("active");
  //   $(".inventory-ack").removeClass("active");
  // }

}
