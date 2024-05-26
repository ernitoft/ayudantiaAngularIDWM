import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CloudService } from '../../shared/services/cloud.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  forms!: FormGroup;
  error: boolean = false;
  errorMessages: string[] = [];

  constructor(private formBuilder: FormBuilder, private CloudService: CloudService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.forms = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
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

    }catch(error:any){
      console.log('Error en el login', error);
      this.error = true;
      this.errorMessages.push(error.error);
    } finally {
      console.log('Petición finalizada');
      this.forms.reset();
    }
  }
}
