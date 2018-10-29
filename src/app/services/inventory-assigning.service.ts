import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http} from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class InventoryAssigningService {

  constructor(private http:Http) { }

  public addInventoryAssign(data:any){
    return this.http.post(environment.host + 'invassigns', data)
  }

  public getInventoryList(){
    return this.http.get( environment.host + 'invassigns');
  }

  public getAcknowledgeList(){
    return this.http.get( environment.host + 'invassigns?status=0');
  }
}

