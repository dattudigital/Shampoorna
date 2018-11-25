import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { InventoryAssigningService } from '../../services/inventory-assigning.service'
import { InventoryListPipe } from '../../pipe/inventory-list.pipe';
import { Http } from '@angular/http'
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import { NotificationsService } from 'angular2-notifications';
import { AllVehicleService } from '../../services/all-vehicle.service';

@Component({
  selector: 'app-inventory-acknowledge',
  templateUrl: './inventory-acknowledge.component.html',
  styleUrls: ['./inventory-acknowledge.component.css']
})
export class InventoryAcknowledgeComponent implements OnInit {

  inventoryData: any[];
  cols: any[];
  editData: any = [];
  typeData: any[];
  makeData: any[];
  modelData: any[];
  colorData: any[];
  variantData:any[];

  //vehicleTypeFilter = "";
  vehicleModelFilter = "";
  vehicleColorFilter = "";
  vehicleMakeFilter = "";
  fromDate = "";
  toDate = "";
  public options = { position: ["top", "right"] }

  constructor(private router:Router,private allvehicleservice: AllVehicleService, private service: InventoryAssigningService,private invAssignService: InventoryListPipe, private http: Http, private notif: NotificationsService) { }

  ngOnInit() {
    let loginData = JSON.parse(sessionStorage.getItem('secondaryLoginData'));
    console.log("#####")
    console.log(loginData._results.employee_branch_id)
    var brurl= '';
      brurl = brurl + '&branchid='+loginData._results.employee_branch_id;
    this.service.getAcknowledgeList(brurl).subscribe(res => {
      console.log(res.json().result)
      //this.inventoryData = this.invAssignService.transform(res.json().result);
      this.inventoryData = res.json().result
    });
    this.allvehicleservice.getColor().subscribe(data => {
      console.log(data.json())
      this.colorData = data.json().result;
    });
    this.allvehicleservice.getCategory().subscribe(data => {
      console.log(data.json())
      this.typeData = data.json().result;
    });
    this.allvehicleservice.getModel().subscribe(data => {
      this.modelData = data.json().result;
      console.log(this.modelData)
    });
    this.allvehicleservice.getVariant().subscribe(data => {
      this.variantData = data.json().result;
      console.log(this.variantData)
    })
  

    this.cols = [
      { field: 'branch_name', header: 'Branch' },
      { field: 'indent_req_id', header: 'Indent ID' },
      { field: 'employee_firstname', header: 'Assaigned By' },
      { field: 'generated_shipping_id', header: 'Shipping ID' },
      { field: 'shipped_by', header: 'Shipped By' },
      { field: 'shipped_vechile_no', header: 'Vehicle No.' },
      { field: 'br_mgr_ack', header: 'Manager ACk' },
      { field: 'br_mgr_comment', header: 'Manager Comment' },
      { field: 'chassisno', header: 'Chasis No.' },
      { field: 'color', header: 'Color' },
      { field: 'engineno', header: 'Engine No.' },
      { field: 'frameno', header: 'Frame No.' },
      { field: 'make', header: 'Make.' },
      { field: 'model', header: 'Model' }
    ];
  }

  backToInventory() {
    this.router.navigate(['inventory']);
  }

  fromDa() {
    let newDate = moment(this.fromDate).format('YYYY-MM-DD').toString();
    this.fromDate = newDate;
    console.log(this.fromDate)
  }

  toDa() {
    let newDate1 = moment(this.toDate).format('YYYY-MM-DD').toString();
    this.toDate = newDate1;
    console.log(this.toDate)

  }

  detailsGo() {
    let loginData = JSON.parse(sessionStorage.getItem('secondaryLoginData'));
    console.log(loginData._results.branch_id)
    var url = '';
    if (this.fromDate) {
      url = url + 'startdate=' + this.fromDate;
    }
    if (this.toDate) {
      url = url + '&enddate=' + this.toDate;
    }
    // if (this.vehicleTypeFilter) {
    //   url = url + '&type=' + '"' + this.vehicleTypeFilter + '"';
    // }
    if (this.vehicleMakeFilter) {
      url = url + '&make=' + this.vehicleMakeFilter;
    }
    if (this.vehicleModelFilter) {
      url = url + '&model=' + '"'+ this.vehicleModelFilter + '"';
    }
    if (this.vehicleColorFilter) {
      url = url + '&color=' + '"'+ this.vehicleColorFilter + '"';
    }
    url = url + '&branchid='+loginData._results.branch_id;
    console.log(this.vehicleMakeFilter);
    console.log(url)
    this.service.getAcknowledgeFilter(url).subscribe(res => {
      console.log(res.json());
      console.log("*******")
      console.log(res)
      console.log(res.json().status)

      if (res.json().status == true) {
        this.inventoryData = res.json().result;
        console.log(this.inventoryData)
        this.notif.success(
          'Success',
          'Filter Applied Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      else {
        this.inventoryData = res.json()._body;
        this.notif.warn(
          'Sorry',
          'No Records Found',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        ) 
      }
    })
  }

  detailsReset() {
    let loginData = JSON.parse(sessionStorage.getItem('secondaryLoginData'));
    console.log("#####")
    console.log(loginData._results.branch_id)
    var brurl= '';
      brurl = brurl + '&branchid='+loginData._results.branch_id;
    this.service.getAcknowledgeList(brurl).subscribe(res => {
      console.log(res.json().result)
      this.inventoryData = res.json().result
      if(res.json().status ==true){
        this.notif.success(
          'Success',
          'Reset Applied Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
    });
    //this.vehicleTypeFilter = " ";
    this.vehicleModelFilter = " ";
    this.vehicleColorFilter = " ";
    this.vehicleMakeFilter = " ";
    this.fromDate = " ";
    this.toDate = " ";
  }

  status='';
  inventory_assign_id='';
  branch_name='';

  yesAcknowledgement(data,index){
   //this.inventoryData.splice(index,1)
    console.log(data)
    console.log(index)
    this.editData = data;
    this.inventory_assign_id = this.editData[index].inventory_assign_id;
    this.branch_name=this.editData[index].branch_name
    this.status = this.editData[index].status;
    console.log(this.editData[index].branch_name)
    console.log(this.editData[index].inventory_assign_id)
    var val = {
      inventory_assign_id:this.inventory_assign_id,
      status: "1"
    }
    console.log("********")
    console.log(val)
    this.inventoryData.splice(index,1)
    this.service.addInventoryAssign(val).subscribe(res => {
    console.log(res.json());
    if(res.json().status ==true){
      this.notif.success(
        'Success',
        'Added Successfully',
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 50
        }
      )
    }
    });
  }
  noAcknowledgement(data,index){
    console.log(data)
    console.log(index)
    this.editData = data;
    data.index = index;
    this.inventory_assign_id = this.editData[index].inventory_assign_id;
    this.status = this.editData[index].status;
    console.log(this.editData[index].inventory_assign_id)
    var val = {
      inventory_assign_id:this.inventory_assign_id,
      status: "2"
    }
    console.log("********")
    console.log(val)
    this.inventoryData.splice(index,1)
    this.service.addInventoryAssign(val).subscribe(res => {
      console.log(res.json());
      if(res.json().status ==true){
        this.notif.success(
          'Success',
          'Rejected Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
    });
  }
}
