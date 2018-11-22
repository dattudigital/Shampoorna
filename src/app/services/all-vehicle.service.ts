import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AllVehicleService {

  constructor(private http:Http) { }

  public getColor(){
    return this.http.get(environment.host +'vehicle-colors');
  }
  public getCategory(){
    return this.http.get(environment.host +'vehicle-types');
  }
  public getModel(){
    return this.http.get(environment.host +'vehicle-models');
  }
  public getVariant(){
    return this.http.get(environment.host +'vehicle-variants');
  }
}
