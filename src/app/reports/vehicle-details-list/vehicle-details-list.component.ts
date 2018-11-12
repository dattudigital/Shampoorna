import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { VehicleDetailService } from '../../services/vehicle-detail.service'
@Component({
  selector: 'app-vehicle-details-list',
  templateUrl: './vehicle-details-list.component.html',
  styleUrls: ['./vehicle-details-list.component.css']
})
export class VehicleDetailsListComponent implements OnInit {
 
  bikes: any[];
  cols: any[];

  constructor(private router:Router,private service:VehicleDetailService) { }

  ngOnInit() {
    this.cols = [
      { field: 'vehicle_engineno', header: 'Engine No.' },
      { field: 'vehicle_name', header: 'Name' },
      { field: 'color_name', header: 'Color' },
      { field: 'type_name', header: 'Type' },
      { field: 'make_name', header: 'Make' },
      { field: 'model_name', header: 'Model' },
      { field: 'vehicle_cost', header: 'Cost' },
      { field: 'vechile_key' , header:'Key No.'},
      { field: 'vechicle_dcno', header: 'DC No.' }, 
      { field: 'vehicle_frameno', header: 'Frame No.' },
      { field: 'vechicle_invoiceno', header: 'Invoice No.' },
    ];

    this.service.getVehicleDetails().subscribe(res => {
      console.log(res.json().result)
      this.bikes = res.json().result
    });
  }
  backToReports() {
    this.router.navigate(['reports']);
  }
}
