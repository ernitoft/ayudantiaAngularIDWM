import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './-auth-routing.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SharedModule } from '../shared/shared.module';
import { TableComponent } from './components/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormEditComponent } from './components/form-edit/form-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomepageComponent,
    TableComponent,
    FormEditComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
