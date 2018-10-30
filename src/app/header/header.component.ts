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
    // if (this.router.url == '/sale-dashboard') {
    //   $(document).ready(function () {
    //     $("#__sale").addClass("active");
    //   });
    // }

    // if (this.router.url == '/inventory') {
    //   $(document).ready(function () {
    //     $("#__inventory").addClass("active");
    //   });
    // }

    if (this.router.url == '/appointments') {
      this.removeActiveClass();
      $(document).ready(function () {
        $("#__appt").addClass("active");
      });
    }

    if (this.router.url == '/dashboard') {
      this.removeActiveClass();
      $(document).ready(function () {
        $("#__sale").addClass("active");
      });
    }
    if (this.router.url == '/time-clocks') {
      this.removeActiveClass();
      $(document).ready(function () {
        $("#__timeclock").addClass("active");
      });
    }
    if (this.router.url == '/schedule') {
      this.removeActiveClass();
      $(document).ready(function () {
        $("#__schedule").addClass("active");
      });
    }

    if (this.router.url == '/reports') {
      this.removeActiveClass();
      $(document).ready(function () {
        $("#__reports").addClass("active");
      });
    }

    if (this.router.url == '/management') {
      this.removeActiveClass();
      $(document).ready(function () {
        $("#__manager").addClass("active");
      });
    }

    if (this.router.url == '/inventory') {
      this.removeActiveClass();
      $(document).ready(function () {
        $("#__inventory").addClass("active");
      });
    }
    if (this.router.url == '/setup') {
      this.removeActiveClass();
      $(document).ready(function () {
        $("#__setup").addClass("active");
      });
    }
  

   }
  ngOnInit() {
    

  }
  removeActiveClass(){
    $(document).ready(function () {
      $("#__sale").removeClass("active");
      $("#__appt").removeClass("active");
      $("#__timeclock").removeClass("active");
      $("#__schedule").removeClass("active");
      $("#__reports").removeClass("active");
      $("#__manager").removeClass("active");
      $("#__inventory").removeClass("active");     
      $("#__setup").removeClass("active");  
    });
  }
  
  redirectToDashbaord() {
    this.removeActiveClass();
    this.router.navigate(['sale-dashboard']);
    $("#__sale").click(function () {
      $("#__sale").addClass("active");
    });
  }

  redirectToInventory() {
    this.removeActiveClass();
    this.router.navigate(['inventory'])
    $("#__inventory").click(function () {
      $("#__inventory").addClass("active");
    });
  }

  redirectToReport(){
    this.removeActiveClass();
    this.router.navigate(['reports'])
    $("#__reports").click(function () {
      $("#__reports").addClass("active");
    });
  }

  redirectToTimeClocks(){
    this.removeActiveClass();
    this.router.navigate(['time-clocks'])
    $("#__time-clocks").click(function () {
      $("#__time-clocks").addClass("active");
    });
  }

  redirectToManager(){
    this.removeActiveClass();
    this.router.navigate(['manager/add-employee'])
    $("#__manager").click(function () {
      $("#__manager").addClass("active");
    });
  }

}
