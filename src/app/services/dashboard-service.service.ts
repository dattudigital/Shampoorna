import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http'
@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  constructor(private http: Http) { }

  public getTodaySale() {
    return this.http.get(environment.host + 'search/today-sale')
  }
  public getTodayFilter(url: any) {
    return this.http.get(environment.host + 'search/today-sale?' + url)
  }
  public getTotalSale() {
    return this.http.get(environment.host + 'search/total-sale')
  }
  public getTotalSalefilter(url: any) {
    return this.http.get(environment.host + 'search/total-sale?' + url)
  }

  public getSaleAndInventoryCount(branchId:any) {
    return this.http.get(environment.host + 'count-sale-inventory/'+branchId)
  }

}
