import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { PagesNotFoundComponent } from './errors/pages-not-found/pages-not-found.component';
import { guardGuard } from 'src/guard/guard.guard';

const routes: Routes = [
  {path:'home/:id', component:HomeComponent, canActivate:[guardGuard]},
  {path:'', component: LoginComponent},
  {path:'bookings', component:BookingsComponent, canActivate:[guardGuard]},


  //404
  {path:'**',component:PagesNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
