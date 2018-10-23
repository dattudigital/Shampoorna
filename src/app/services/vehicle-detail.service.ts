import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http} from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class VehicleDetailService {

  constructor(private http:Http) { }

  public addVehicleDetails(data: any) {
    return this.http.post(environment.host + 'vehile-details', data)
  }

  public getVehicleDetails(){
    return this.http.get( environment.host + 'vehile-details ');
  }

  public getVehicleFilter(url:any ){
    return this.http.get(environment.host + 'vehile-details?'+url ) 
  }
}
