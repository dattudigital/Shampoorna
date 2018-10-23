import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-inventory-acknowledge',
  templateUrl: './inventory-acknowledge.component.html',
  styleUrls: ['./inventory-acknowledge.component.css']
})
export class InventoryAcknowledgeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  backToInventory() {
    this.router.navigate(['inventory']);
  }


}
