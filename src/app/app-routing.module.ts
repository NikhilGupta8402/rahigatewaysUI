import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminGuard } from './services/auth/admin.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tour/:id', component: TourDetailComponent },

  // AUTH
  { path: 'admin/login', component: AdminLoginComponent },

  // ADMIN PANEL (protected)
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
