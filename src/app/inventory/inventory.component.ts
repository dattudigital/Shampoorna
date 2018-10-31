import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    sessionStorage.removeItem('backBtnTimeclocks');
    this.loginPopUp();
    if (sessionStorage.getItem('inventory-routing') == '"vehicle"') {
      this.vehicleDetailClick()
    } else if (sessionStorage.getItem('inventory-routing') == '"invlist"') {
      this.inventoryListClick();
    } else if (sessionStorage.getItem('inventory-routing') == '"raise"') {
      this.indentRaiseClick();
    } else if (sessionStorage.getItem('inventory-routing') == '"indlist"') {
      this.indentListClick();
    } else if (sessionStorage.getItem('inventory-routing') == '"invassn"') {
      this.invAssaignClick();
    } else if (sessionStorage.getItem('inventory-routing') == '"invack"') {
      this.InventoryAckClick();
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
    if (this.mailId && this.password) {
      console.log(data)
      this.http.post('http://ec2-54-88-194-105.compute-1.amazonaws.com:3005/time-clocks/login', data).subscribe(inData => {
        console.log(inData);
        this.test1 = inData;
        console.log(this.test1.result.emp_id)
        console.log(this.test1.status)

        if (this.test1.status == true) {
          sessionStorage.setItem('secondaryLoginData', JSON.stringify(this.test1.result));
          sessionStorage.setItem('backBtnInventory', 'Y');
          $('#myModal').modal('hide');
          this.titleStyle = "visible";
        } else {
          this.errorMessage = true;
        }
      });
    } else {
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
    this.router.navigate(['dashboard']);
  }

  vehicleDetailClick() {
    sessionStorage.setItem('inventory-routing', JSON.stringify("vehicle"));
    $(".vehicle-detail").trigger("click");
    this.removeClass();
    $(".vehicle-detail").addClass("active");
  }

  inventoryListClick() {
    sessionStorage.setItem('inventory-routing', JSON.stringify("invlist"));
    $(".inventory-list").trigger("click");
    this.removeClass();
    $(".inventory-list").addClass("active");
  }

  indentRaiseClick() {
    sessionStorage.setItem('inventory-routing', JSON.stringify("raise"));
    $(".indent-raise").trigger("click");
    this.removeClass();
    $(".indent-raise").addClass("active");
  }

  indentListClick() {
    sessionStorage.setItem('inventory-routing', JSON.stringify("indlist"));
    $(".indent-list").trigger("click");
    this.removeClass();
    $(".indent-list").addClass("active");
  }

  invAssaignClick() {
    sessionStorage.setItem('inventory-routing', JSON.stringify("invassn"));
    $(".inventory-assn").trigger("click");
    this.removeClass();
    $(".inventory-assn").addClass("active");
  }

  InventoryAckClick() {
    sessionStorage.setItem('inventory-routing', JSON.stringify("invack"));
    $(".inventory-ack").trigger("click");
    this.removeClass();
    $(".inventory-ack").addClass("active");
  }

  removeClass() {
    $(".vehicle-detail").removeClass("active");
    $(".inventory-list").removeClass("active");
    $(".indent-raise").removeClass("active");
    $(".indent-list").removeClass("active");
    $(".inventory-assn").removeClass("active");
    $(".inventory-ack").removeClass("active");
  }

}
