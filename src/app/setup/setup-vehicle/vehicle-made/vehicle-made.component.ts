import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-vehicle-made',
  templateUrl: './vehicle-made.component.html',
  styleUrls: ['./vehicle-made.component.css']
})
export class VehicleMadeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  backToSetup(){
    this.router.navigate(['vehicle-setup'])
  }
}
