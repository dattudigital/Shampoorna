import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SaleUserService } from '../../services/sale-user.service';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-list-booking-form',
  templateUrl: './list-booking-form.component.html',
  styleUrls: ['./list-booking-form.component.css'],
  providers: [
    DatePipe
  ]
})
export class ListBookingFormComponent implements OnInit {

  bookings: any[];
  cols: any[];


  constructor(private router: Router, private dp: DatePipe, private saleservice:SaleUserService,private notif: NotificationsService) { }

  ngOnInit() {
    this.saleservice.getBookingForm().subscribe(res => {
      if (res.json().status == true) {  
      this.bookings = res.json().result
      }else{
        this.bookings = [];
      }
    })

    this.cols = [
      { field: 'booking_form_name', header: 'Name' },
      { field: 'booking_form_dob', header: 'DOB', type: this.dp },
      { field: 'booking_form_address', header: 'Address' },
      { field: 'booking_form_mobile', header: 'Mobile' },
      { field: 'booking_form_email', header: 'Email' },
      { field: 'model_name', header: 'Model' },
      { field: 'variant_name', header: 'Variant'},
      { field: 'color_name', header: 'Color' },
      { field: 'price_estimation', header: 'Price' },
      { field: 'approved_amount', header: 'Approved Amount' },
      { field: 'employee_firstname', header: 'Approved By' },
      { field: 'advance_payment', header: ' Adv. Payment' },
      { field: 'date_of_delivery', header: 'Date Of Delivery', type: this.dp}
    ];
  }

  booking_form_id:'';

  redirectToNewSale(val,index){
    sessionStorage.removeItem('salesdata');
    val.index=index;
    this.booking_form_id=val[index].booking_form_id;
    var data = {
      booking_form_id: this.booking_form_id,
      status: "0"
    }
    console.log(data)
    this.saleservice.saveBookingForm(data).subscribe(res => {
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Booking Form Added Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          })
          sessionStorage.setItem('bookingData',JSON.stringify(this.bookings[index]))
        setTimeout(() => {
          this.router.navigate(['dashboard']);
        }, 1000);
        this.bookings.splice(index, 1)
      }
    })
  }

  redirectToBookingForm(){
    this.router.navigate(['booking-form'])
  }

}
