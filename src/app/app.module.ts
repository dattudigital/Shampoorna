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
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { MenuItem } from 'primeng/api';                 //api
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxSpinnerModule } from 'ngx-spinner';
// import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import { SelectItem } from 'primeng/api';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
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
import { SaleDetailsComponent } from './dashboard/sale-details/sale-details.component';
import { InvoiceListComponent } from './dashboard/invoice-list/invoice-list.component';
import { SaleDashboardComponent } from './sale-dashboard/sale-dashboard.component';
import { DcFormComponent } from './dashboard/dc-form/dc-form.component';
import { ReportsComponent } from './reports/reports.component';
import { InventoryAddPipe } from './pipe/inventory-add.pipe';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SetupComponent } from './setup/setup.component';
import { TodaySaleListComponent } from './reports/today-sale-list/today-sale-list.component';
import { TotalSaleListComponent } from './reports/total-sale-list/total-sale-list.component';
import { VehicleDetailsListComponent } from './reports/vehicle-details-list/vehicle-details-list.component';
import { InventoryDetailsListComponent } from './reports/inventory-details-list/inventory-details-list.component';
import { GlobalSearchComponent } from './footer/global-search/global-search.component';
import { AddVehicleBulkComponent } from './inventory/add-vehicle-bulk/add-vehicle-bulk.component';
import { BranchDetailsComponent } from './setup/branch-details/branch-details.component';
import { SetupVehicleComponent } from './setup/setup-vehicle/setup-vehicle.component';
import { SetupPriceListComponent } from './setup/setup-price-list/setup-price-list.component';
import { VehicleTypeComponent } from './setup/setup-vehicle/vehicle-type/vehicle-type.component';
import { VehicleModelComponent } from './setup/setup-vehicle/vehicle-model/vehicle-model.component';
import { VehicleVariantComponent } from './setup/setup-vehicle/vehicle-variant/vehicle-variant.component';
import { VehicleColorComponent } from './setup/setup-vehicle/vehicle-color/vehicle-color.component';
import { VehicleMadeComponent } from './setup/setup-vehicle/vehicle-made/vehicle-made.component';
import { AddPriceListComponent } from './setup/add-price-list/add-price-list.component';
import { EmpTypePipe } from './pipe/emp-type.pipe';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sale-dashboard', component: SaleDashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard] },
  { path: 'time-clocks', component: TimeClockComponent, canActivate: [AuthGuard] },
  { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'manager/add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard], },
  { path: 'setup', component: SetupComponent, canActivate: [AuthGuard] },
  { path: 'inventory/vehicle-details', component: VehicleDetailsComponent, canActivate: [AuthGuard] },
  { path: 'inventory/vehicle-details/bulk-import', component: AddVehicleBulkComponent, canActivate: [AuthGuard] },
  { path: 'inventory/inventory-list', component: InventoryListComponent, canActivate: [AuthGuard] },
  { path: 'inventory/indent-raising', component: IndentRaisingComponent, canActivate: [AuthGuard] },
  { path: 'inventory/indent-list', component: IndentListComponent, canActivate: [AuthGuard] },
  { path: 'inventory/inventory-assigning', component: InventoryAssigningComponent, canActivate: [AuthGuard] },
  { path: 'inventory/inventory-acknowledge', component: InventoryAcknowledgeComponent, canActivate: [AuthGuard] },
  { path: 'sale-details', component: SaleDetailsComponent, canActivate: [AuthGuard] },
  { path: 'invoice-list', component: InvoiceListComponent, canActivate: [AuthGuard] },
  { path: 'dc-form', component: DcFormComponent, canActivate: [AuthGuard] },
  { path: 'reports/today-sale-list', component: TodaySaleListComponent, canActivate: [AuthGuard] },
  { path: 'reports/total-sale-list', component: TotalSaleListComponent, canActivate: [AuthGuard] },
  { path: 'reports/vehicle-details-list', component: VehicleDetailsListComponent, canActivate: [AuthGuard] },
  { path: 'reports/inventory-list', component: InventoryDetailsListComponent, canActivate: [AuthGuard] },
  { path: 'footer/global-search', component: GlobalSearchComponent, canActivate: [AuthGuard] },
  { path: 'setup/branch', component: BranchDetailsComponent, canActivate: [AuthGuard] },
  { path: 'vehicle-setup', component: SetupVehicleComponent, canActivate: [AuthGuard] },
  { path: 'setup/price-list', component: SetupPriceListComponent, canActivate: [AuthGuard] },
  { path: 'setup/vehicle-type', component: VehicleTypeComponent, canActivate: [AuthGuard] },
  { path: 'setup/vehicle-model', component: VehicleModelComponent, canActivate: [AuthGuard] },
  { path: 'setup/vehicle-variant', component: VehicleVariantComponent, canActivate: [AuthGuard] },
  { path: 'setup/vehicle-color', component: VehicleColorComponent, canActivate: [AuthGuard] },
  { path: 'setup/vehicle-make', component: VehicleMadeComponent, canActivate: [AuthGuard] },
  { path: 'setup/price-list/add-list', component: AddPriceListComponent, canActivate: [AuthGuard] },


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
    AddEmployeeComponent,
    SaleDetailsComponent,
    InvoiceListComponent,
    SaleDashboardComponent,
    DcFormComponent,
    ReportsComponent,
    DcFormComponent,
    AppointmentsComponent,
    ScheduleComponent,
    SetupComponent,
    TodaySaleListComponent,
    TotalSaleListComponent,
    VehicleDetailsListComponent,
    InventoryDetailsListComponent,
    GlobalSearchComponent,
    AddVehicleBulkComponent,
    BranchDetailsComponent,
    SetupVehicleComponent,
    SetupPriceListComponent,
    VehicleTypeComponent,
    VehicleModelComponent,
    VehicleVariantComponent,
    VehicleColorComponent,
    VehicleMadeComponent,
    AddPriceListComponent
    

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
    ClipboardModule,
    NgxSpinnerModule


  ],
  providers: [AuthGuard, InventoryListPipe, MessageService, InventoryAddPipe,EmpTypePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }