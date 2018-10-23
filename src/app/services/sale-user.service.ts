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

}
