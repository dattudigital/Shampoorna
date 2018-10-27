import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'


@Component({
  selector: 'app-dc-form',
  templateUrl: './dc-form.component.html',
  styleUrls: ['./dc-form.component.css']
})
export class DcFormComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  backsaleDetails(){
this.router.navigate(['sale-details'])
  }
}
