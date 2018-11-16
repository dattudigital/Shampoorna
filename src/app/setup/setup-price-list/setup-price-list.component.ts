import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-setup-price-list',
  templateUrl: './setup-price-list.component.html',
  styleUrls: ['./setup-price-list.component.css']
})
export class SetupPriceListComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  backToSetup(){
    this.router.navigate(['setup'])
      }

}
