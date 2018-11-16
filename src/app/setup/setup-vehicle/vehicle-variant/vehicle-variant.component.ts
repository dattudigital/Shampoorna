import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-vehicle-variant',
  templateUrl: './vehicle-variant.component.html',
  styleUrls: ['./vehicle-variant.component.css']
})
export class VehicleVariantComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  backToSetup(){
    this.router.navigate(['vehicle-setup'])
  }
}
