import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { activateRouteGuard } from './guards/activate-route.guard';

const routes: Routes = [
  {
    path:'',
    canActivateChild:[activateRouteGuard],
    children:[
      {
        path: 'home',
        component: HomepageComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
