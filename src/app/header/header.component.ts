import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 


  constructor(private router: Router) {
    if (this.router.url == '/dashboard') {
      $(document).ready(function () {
        $("#__sale").addClass("active");
      });
    }

    if (this.router.url == '/inventory') {
      $(document).ready(function () {
        $("#__inventory").addClass("active");
      });
    }
   }
  ngOnInit() {
  }

  redirectToDashbaord() {
    this.router.navigate(['sale-dashboard']);
    $("#__sale").click(function () {
      $("#__sale").addClass("active");
    });
  }

  redirectToInventory() {
    this.router.navigate(['inventory'])
    $("#__inventory").click(function () {
      $("#__inventory").addClass("active");
    });
  }

  redirectToReport(){
    this.router.navigate(['reports'])
    $("#__reports").click(function () {
      $("#__reports").addClass("active");
    });
  }

  redirectToTimeClocks(){
    this.router.navigate(['time-clocks'])
    $("#__time-clocks").click(function () {
      $("#__time-clocks").addClass("active");
    });
  }

  redirectToManager(){
    this.router.navigate(['manager/add-employee'])
    $("#__manager").click(function () {
      $("#__manager").addClass("active");
    });
  }

}
