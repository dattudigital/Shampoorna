import { Component, OnInit } from '@angular/core';
import {FooterServiceService} from '../../services/footer-service.service';
@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.css']
})
export class GlobalSearchComponent implements OnInit {
  selectedValue:'';
  searchList:any=[];
  titleStyle = "hidden";
  cols: any[];

  constructor(private service:FooterServiceService) { }

  ngOnInit() {
    this.cols = [
      { field: 'vehicle_engineno', header: 'Engine No' },
      { field: 'vehicle_name', header: 'Vehicle Name' },
      { field: 'make_name', header: 'Make Name' },
      { field: 'model_name', header: 'Model Name' },
      { field: 'color_name', header: 'Color' },
      { field: 'type_name', header: 'Type Name' },

    ];
  }
  searchVehicleDetails(){
    console.log(this.selectedValue);
    console.log(this.selectedValue.length);
    if(this.selectedValue.length>2){
      this.titleStyle = "visible";
      this.service.globalSearch(this.selectedValue).subscribe(res=>{
        console.log(res.json().result);
        if(res.json().status ==true){
          this.searchList =res.json().result;
          this.titleStyle = "visible";
        }else{
          this.searchList =[];
          this.titleStyle = "hidden";
        }
      })
    } else{
      this.searchList =[];
          this.titleStyle = "hidden";
    }
  }
}
