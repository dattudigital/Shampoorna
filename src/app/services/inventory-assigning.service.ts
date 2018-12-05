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

  // public getInventoryList(){
  //   return this.http.get( environment.host + 'invassigns');
  // }

  public getAcknowledgeList(brurl:any){
    console.log( environment.host + 'invassigns?status=0'+brurl)
    return this.http.get( environment.host + 'invassigns?status=0'+brurl);
  }

  public getInventoryList(brurl:any){
    console.log( environment.host + 'invassigns?status=1'+brurl)
    return this.http.get( environment.host + 'invassigns?status=1'+brurl);
  }

  public getInventoryFilter(url:any){
    console.log(environment.host + 'invassigns?status=1'+url)
    return this.http.get(environment.host + 'invassigns?status=1'+url );
  }

  public getAcknowledgeFilter(url:any){
    console.log(environment.host + 'invassigns?status=0'+url)
    return this.http.get(environment.host + 'invassigns?status=0&'+url );
  }

  // public editAcknowledgeList(data:any){
  //   return this.http.get( environment.host + 'invassigns?status=0', data);
  // }
}

