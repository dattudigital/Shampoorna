import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from '../common-session/session.check';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';                 //api
import {CalendarModule} from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

// import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {SelectItem} from 'primeng/api';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {TableModule} from 'primeng/table';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InventoryComponent } from './inventory/inventory.component';
import { VehicleDetailsComponent } from './inventory/vehicle-details/vehicle-details.component';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';
import { IndentRaisingComponent } from './inventory/indent-raising/indent-raising.component';
import { IndentListComponent } from './inventory/indent-list/indent-list.component';
import { InventoryAssigningComponent } from './inventory/inventory-assigning/inventory-assigning.component';
import { InventoryAcknowledgeComponent } from './inventory/inventory-acknowledge/inventory-acknowledge.component';
import { InventoryListPipe } from './pipe/inventory-list.pipe';
import { TimeClockComponent } from './time-clock/time-clock.component';
import { MessageService } from 'primeng/api';
import { AddEmployeeComponent } from './manager/add-employee/add-employee.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard' , component:DashboardComponent, canActivate: [AuthGuard] },
  { path: 'inventory' , component:InventoryComponent, canActivate: [AuthGuard], },
  { path: 'inventory/vehicle-details' , component:VehicleDetailsComponent, canActivate: [AuthGuard] },
  { path: 'inventory/inventory-list' , component:InventoryListComponent, canActivate: [AuthGuard] },
  { path: 'inventory/indent-raising' , component:IndentRaisingComponent, canActivate: [AuthGuard] },
  { path: 'inventory/indent-list' , component:IndentListComponent, canActivate: [AuthGuard] },
  { path: 'inventory/inventory-assigning' , component:InventoryAssigningComponent, canActivate: [AuthGuard] },
  { path: 'inventory/inventory-acknowledge' , component:InventoryAcknowledgeComponent, canActivate: [AuthGuard] },
  { path: 'time-clocks' , component:TimeClockComponent, canActivate: [AuthGuard] },
  { path: 'manager/add-employee' , component:AddEmployeeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    InventoryComponent,
    VehicleDetailsComponent,
    InventoryListComponent,
    IndentRaisingComponent,
    IndentListComponent,
    InventoryAssigningComponent,
    InventoryAcknowledgeComponent,
    TimeClockComponent,
    AddEmployeeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AccordionModule,
    CalendarModule,
    TableModule,
    DropdownModule,
    MultiSelectModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true }),
    AlertModule.forRoot(),
    FileUploadModule,
    TypeaheadModule.forRoot(),


  ],
  providers: [AuthGuard,InventoryListPipe,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
