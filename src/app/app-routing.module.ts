import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminGuard } from './services/auth/admin.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RequestCallComponent } from './request-call/request-call.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ExplorePackageComponent } from './explore-package/explore-package.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tour/:id', component: TourDetailComponent },

  // AUTH
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'request-call', component: RequestCallComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'explore-packages', component: ExplorePackageComponent },
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
