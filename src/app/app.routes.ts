import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
    {path:'employe',component:EmployeeDashboardComponent},
    {path:'admin',component:AdminDashboardComponent}
];
