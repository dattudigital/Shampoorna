import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
declare var $: any;
@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.css']
})
export class BranchDetailsComponent implements OnInit {
  branchData: any = [];
  cols: any[];
  branchName:'';
  branchAddress:'';
  branchArea:'';
  branchLocation:'';
  contactNumber:'';

  constructor(private router: Router, private http: Http) { }

  ngOnInit() {
   
    this.cols = [
      { field: 'branch_name', header: 'Branch Name' },
      { field: 'branch_address', header: 'Branch Address' },
      { field: 'branch_location', header: 'Location' },
      { field: 'branch_contact_number', header: 'Contact Number' }
    ];

    this.http.get(environment.host + 'branches').subscribe(res => {
      this.branchData = res.json().result;
      console.log(this.branchData)
    });
 
  }
  backToSetup() {
    this.router.navigate(['setup'])
  }
  addBranch(){
    var data={
      branch_name:this.branchName,
      branch_address:this.branchAddress,
      branch_area:this.branchArea,
      branch_location:this.branchLocation,
      branch_contact_number:this.contactNumber,
      rec_status:1
    }
    console.log(data);
    this.http.post(environment.host + 'branches',data).subscribe(res=>{
      console.log(res.json());
      this.branchData.push(res.json().result)
      console.log(this.branchData);
      $('#addBranch').modal('hide');
    })
  }

}
