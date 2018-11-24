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

  public saveExchangeVehicle(exchange:any){
    return this.http.post(environment.host +'sale-vechile-exchanges',exchange)
  }
public getTax(){
  return this.http.get(environment.host +'taxs');
}

public getListDetails(){
  return this.http.get( environment.host + 'complete-sale-users');
}

public getVehicleDetails(){
  return this.http.get(environment.host + 'sale-user-vechiles');
}

public addPaymentEmi(data:any){
  return this.http.post(environment.host + 'sale-payments',data)
}

public getPriceList(id:any){
  return this.http.get(environment.host + 'setup-price-lists/'+id)
}
}
