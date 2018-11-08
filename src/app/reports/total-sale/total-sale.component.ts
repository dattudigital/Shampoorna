import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {DashboardServiceService} from '../../services/dashboard-service.service'

@Component({
  selector: 'app-total-sale',
  templateUrl: './total-sale.component.html',
  styleUrls: ['./total-sale.component.css']
})
export class TotalSaleComponent implements OnInit {
  cols: any[];
  totalSaleList:any =[]
  constructor(private http:Http,private router:Router,private service:DashboardServiceService) { }

  ngOnInit() {
    this.service.getTotalSale().subscribe(response=>{
      console.log(response.json().result);
     this.totalSaleList =response.json().result;
    });
    this.cols = [
      { field: 'firstname', header: 'First Name' },
      { field: 'email_id', header: 'Email' },
      { field: 'address', header: 'Address' },
      { field: 'mandal', header: 'Mandal' },
      { field: 'district', header: 'District' },
      { field: 'proof_type', header: 'Proof Type' },
      { field: 'eng_no', header: 'EngineNo' },
      { field: 'frame_no', header: 'FrameNo' },
      { field: 'dc_no', header: 'DcNo' },
      { field: 'total_amt', header: 'Total Amount' }

    ];
  }
  backToReports(){
    this.router.navigate(['sale-dashboard']);
  }
}
