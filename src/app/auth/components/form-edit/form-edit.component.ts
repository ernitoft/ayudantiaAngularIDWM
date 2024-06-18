import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../interfaces/ResponseGETAll';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseAPI } from 'src/app/interfaces/ResponseAPI';
import { ResponseEdit } from '../../interfaces/ResponseEdit';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'auth-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit {
  FormGroup!: FormGroup;
  error: boolean = false;
  errorMessages: string[] = [];
  user!: Usuario;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private HttpClient: HttpClient,
    private authService: AuthServiceService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['user']) {
        this.user = JSON.parse(decodeURIComponent(params['user']));
        this.createForm();
        console.log(this.user);
      }
    });
  }

  createForm() {
    this.FormGroup = this.formBuilder.group({
      id: [this.user.id, [Validators.required]],
      name: [this.user.name, [Validators.required]],
      lastname: [this.user.lastname, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      rut: [this.user.rut, [Validators.required]],
      score: [this.user.score, [Validators.required]],
    });
  }

  editUser() {
    try {
      this.HttpClient.patch<ResponseEdit>('http://localhost:8000/api/update/' + this.user.id, this.FormGroup.value, this.crearHeader()).subscribe({
        next: (data: ResponseEdit) => {
          console.log('Usuario editado', data);
          this.router.navigate(['auth/home']);
        },
        error: (error: any) => {
          console.log('Error en la edición del usuario', error);
          this.error = true;
          this.errorMessages.push(error.error);
          return;
        }
      })

      this.error = false;
      this.errorMessages = [];

      console.log('Petición finalizada');
      this.router.navigateByUrl('auth/home');

    } catch (error: any) {
      if (error.status === 0) {
        this.error = true;
        this.errorMessages.push('Error en la conexión con el servidor');
        return;
      }
      console.log('Error en el form edit', error);
      this.error = true;
      this.errorMessages.push(error.error);
    } finally {
      console.log('Petición finalizada');
      this.FormGroup.reset();
     }
  }

  goTable() {
    this.router.navigate(['auth/home']);
  }

  crearHeader() {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer'+this.authService.getToken()
      })
    }
  }

  get emailInvalid() {
    return this.FormGroup.get('email')?.invalid && this.FormGroup.get('email')?.touched;
  }

  get rutInvalid() {
    return this.FormGroup.get('rut')?.invalid && this.FormGroup.get('rut')?.touched;
  }

  get scoreInvalid() {
    return this.FormGroup.get('score')?.invalid && this.FormGroup.get('score')?.touched;
  }

  get nameInvalid() {
    return this.FormGroup.get('name')?.invalid && this.FormGroup.get('name')?.touched;
  }

  get lastnameInvalid() {
    return this.FormGroup.get('lastname')?.invalid && this.FormGroup.get('lastname')?.touched;
  }
}
