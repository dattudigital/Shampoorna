import { Component, OnInit } from '@angular/core';
import { SaleUserService } from '../../services/sale-user.service'
import { DatePipe } from '@angular/common';
import { ClipboardService } from 'ngx-clipboard'
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
  editPersonalInfo: any = [];
  temp: any;


  constructor(private service: SaleUserService, private dp: DatePipe,private _clipboardService: ClipboardService) { }

  ngOnInit() {

    this.service.getListDetails().subscribe(res => {
      console.log(res.json().result)
      this.lists = res.json().result
      console.log(this.lists);
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
      { field: 'dob', header: 'DOB', type: this.dp },
      { field: 'mandal', header: 'Mandal' },
      { field: 'district', header: 'District' },
      { field: 'proof_type', header: 'Proof Type' }
    ];
  }




  firstname: '';
  display_name_on_rc: '';
  email_id: '';
  mobile: '';
  relation: '';
  password;'';
  city:'';
  address:'';
  dob:'';
  mandal:'';
  district:'';
  proof_type:'';
  proof_num:'';

  editList(data, index) {
    console.log(index);
    this.editPersonalInfo = data;
    data.index = index;
    this.temp = index;
    this.firstname = this.editPersonalInfo[index].firstname;
   this.display_name_on_rc=this.editPersonalInfo[index].display_name_on_rc;
   this.email_id=this.editPersonalInfo[index].email_id;
   this.mobile=this.editPersonalInfo[index].mobile;
   this.relation=this.editPersonalInfo[index].relation;
   this.password=this.editPersonalInfo[index].password;
   this.city=this.editPersonalInfo[index].city;
   this.address=this.editPersonalInfo[index].address;
   this.dob=this.editPersonalInfo[index].dob;
   this.mandal=this.editPersonalInfo.mandal;
   this.district=this.editPersonalInfo.display_name_on_rc;
   this.proof_type=this.editPersonalInfo.proof_type;
   this.proof_num=this.editPersonalInfo.proof_num
  }
  deleteList() { }
}
