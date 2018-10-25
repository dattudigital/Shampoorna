import { Component, OnInit } from '@angular/core';
import { SaleUserService } from '../../services/sale-user.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.css'],
  providers: [
    DatePipe
  ]
})
export class SaleDetailsComponent implements OnInit {

  lists: any[];
  cols: any[];


  constructor(private service: SaleUserService,private dp: DatePipe) { }

  ngOnInit() {

    this.service.getListDetails().subscribe(res => {
      console.log(res.json().result)
      this.lists = res.json().result
    });

    this.cols = [
      { field: 'firstname', header: 'First Name' },
      { field: 'display_name_on_rc', header: 'Display Name' },
      { field: 'email_id', header: 'Email' },
      { field: 'mobile', header: 'Mobile' },
      { field: 'gender', header: 'Gender' },
      { field: 'relation', header: 'Relation' },
      { field: 'password ', header: 'Password' },
      { field: 'city', header: 'City' },
      { field: 'address', header: 'Address' },
      { field: 'dob', header: 'DOB',type: this.dp },
      { field: 'mandal', header: 'Mandal' },
      { field: 'district', header: 'District' },
      { field: 'proof_type', header: 'Proof Type' }
    ];
  }

  editList(){}
  deleteList(){}
}
