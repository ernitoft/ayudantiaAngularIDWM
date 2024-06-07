import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CloudService } from '../../services/cloud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit{

  forms!: FormGroup;
  error: boolean = false;
  errorMessages: string[] = [];

  constructor(private formBuilder: FormBuilder, private CloudService: CloudService, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.forms = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit(){
    if (this.forms.invalid) return;

    try{

      const response = await this.CloudService.login(this.forms);
      if (response) console.log('Usuario logueado', response);
      else console.log('Usuario no logueado');

      this.error = false;
      this.errorMessages = [];

      console.log('Petición finalizada');
      this.router.navigateByUrl('auth/home');

    }catch(error:any){

      if (error.status === 0){
        this.error = true;
        this.errorMessages.push('Error en la conexión con el servidor');
        return;
      }
      console.log('Error en el login', error);
      this.error = true;
      this.errorMessages.push(error.error);
    } finally {
      console.log('Petición finalizada');
      this.forms.reset();
    }
  }

  get emailInvalid(){
    return this.forms.get('email')?.invalid && this.forms.get('email')?.touched;
  }

  get passwordInvalid(){
    return this.forms.get('password')?.invalid && this.forms.get('password')?.touched;
  }
}
