import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment'
@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.css']
})
export class BranchDetailsComponent implements OnInit {
  branchData: any = [];
  cols: any[];

  constructor(private router: Router, private http: Http) { }

  ngOnInit() {
   
    this.cols = [
      { field: 'branch_name', header: 'Branch Name' },
      { field: 'branch_address', header: 'Branch Address' },
      { field: 'branch_location', header: 'Location' },
      { field: 'branch_contact_number', header: 'Contact Number' },
      { field: 'rec_status', header: 'Branch Status' }
    ];

    this.http.get(environment.host + 'branches').subscribe(res => {
      this.branchData = res.json().result;
      console.log(this.branchData)
    });
 
  }
  backToSetup() {
    this.router.navigate(['setup'])
  }

}
