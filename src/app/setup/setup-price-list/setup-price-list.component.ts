import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';
import { Http } from '@angular/http';

@Component({
  selector: 'app-setup-price-list',
  templateUrl: './setup-price-list.component.html',
  styleUrls: ['./setup-price-list.component.css'],
  providers: [
    DatePipe
  ]
})
export class SetupPriceListComponent implements OnInit {

  addList: any[];
  cols: any[];

  constructor(private router: Router, private http: Http, private dp: DatePipe) { }

  
  ngOnInit() {
    this.http.get(environment.host + 'setup-price-lists').subscribe(res => {
      console.log(res.json().result)
      this.addList = res.json().result
    });

    this.cols = [
      { field: 'pricing_list_date', header: 'List Date', type: this.dp },
      { field: 'ex_price', header: 'Ex-price' },
      { field: 'ltax_tr', header: 'LTAX & TR' },
      { field: 'ins_1yr_cmprncv_5yr_3rd_prty', header: 'INS - 1 Yr Comprh and 5 Yr Third Party' },
      { field: 'faciliation_chrgs', header: 'FACILIATION CHARGES' },
      { field: 'total', header: 'TOTAL' },
      { field: 'std_accessories', header: 'STD ACC' },
      { field: 'optnl_accessories' , header:'Optional ACC'},
      { field: 'op_one_nil_dip_1_+_5', header: 'Optional NIL DIP - 1+ 5Yr' }, 
      { field: 'registration_cost', header: 'Registation Cost' },
      { field: 'hp_charges', header: 'HP Charges' },
      { field: 'total_1_+_5_tp_without_nildip', header: 'TOTAL RS. With I Year + 5Y TP INS - Without NIL Dip' },
      { field: 'total_1_+_5_tp_with_nildip', header: 'TOTAL RS. With I Year + 5Y TP INS - With NIL Dip' },
      { field: 'custm_pay_without_nil_dip', header: 'Customer To Pay - Without PR/NIL DIP' },
      { field: 'custm_pay_with_nil_dip', header: 'Customer To Pay - with PR+NIL DIP' },
      { field: 'price_list_type', header: 'Type' },
    ];

  }
  backToSetup() {
    this.router.navigate(['setup'])
  }

  redirctToAddPriceList(){
    this.router.navigate(['setup/price-list/add-list'])
  }

}
