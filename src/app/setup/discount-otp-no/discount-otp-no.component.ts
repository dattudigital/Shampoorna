import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';

@Component({
  selector: 'app-discount-otp-no',
  templateUrl: './discount-otp-no.component.html',
  styleUrls: ['./discount-otp-no.component.css']
})
export class DiscountOtpNoComponent implements OnInit {

  mobileNo: any = [];
  cols: any = [];
  mobile:any = {
    'discountsendotp_id': null,
    'name': '',
    'number': '',
    'status': ''
  }
 
  constructor(private router: Router, private http: Http) { }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: ' Name' },
      { field: 'number', header: 'No.' }
    ];

    this.http.get(environment.host + 'discount-otp-no').subscribe(data => {
      if (data.json().status == true) {
        this.mobileNo = data.json().result;
      } 
    });
  }

}
