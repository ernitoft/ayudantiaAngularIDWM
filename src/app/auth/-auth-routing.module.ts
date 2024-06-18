import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { activateRouteGuard } from './guards/activate-route.guard';
import { FormEditComponent } from './components/form-edit/form-edit.component';

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
        path: 'edit',
        component: FormEditComponent
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
