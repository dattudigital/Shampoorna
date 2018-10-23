import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleUserService {

  constructor(private http: Http) { }

  public saveSalesUser(data: any) {
    return this.http.post(environment.host + 'sale-users', data);
  }

  public searchEngine(val:any){
    return this.http.get(environment.host +'search/engineno/'+val)
  }
  
  public saveSalesVehicle(vehicle:any){
    return this.http.post(environment.host +'sale-user-vechiles',vehicle)
  }
}
