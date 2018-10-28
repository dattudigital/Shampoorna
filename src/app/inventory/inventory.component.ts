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
  alerts: any[] = [];

  test1: any;


  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.loginPopUp();

  }

  vehicleDetailClick() {
    this.router.navigate(['inventory/vehicle-details']);
  }

  inventoryListClick() {
    this.router.navigate(['inventory/inventory-list'])
  }

  indentRaiseClick() {
    this.router.navigate(['inventory/indent-raising'])
  }

  indentListClick() {
    this.router.navigate(['inventory/indent-list'])
  }

  invAssaignClick() {
    this.router.navigate(['inventory/inventory-assigning'])
  }

  InventoryAckClick() {
    this.router.navigate(['inventory/inventory-acknowledge'])
  }

  RedirectToHome() {
    this.router.navigate(['dashboard']);
  }

  errorClear() {
    this.errorMessage = false;
  }


  loginPopUp() {

    // if (sessionStorage.backBtnTimeclocks) {
    //   $('#myModal').modal('hide');
    //   this.titleStyle = "visible";
    // }

    // else {
      $('#myModal').modal('show');
    //}
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
      this.http.post('http://ec2-54-88-194-105.compute-1.amazonaws.com:3001/time-clocks/login', data).subscribe(response => {
        console.log(response);
        this.test1 = response;


        if (this.test1.status == true) {
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

}
