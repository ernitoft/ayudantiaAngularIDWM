import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResponseAPI } from '../../interfaces/ResponseAPI';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  private baseUrl: string = 'http://localhost:5023/api/';

  constructor(private http: HttpClient) {
    console.log('Hola desde el constructor de CloudService');
  }

  async login (form: any): Promise<ResponseAPI>{
    try{
      const data = await firstValueFrom(this.http.post<ResponseAPI>(this.baseUrl+'auth/login', form.value));
      return Promise.resolve(data);
    } catch (error:any){
      console.log('Error en el login', error);
      let e = error as HttpErrorResponse
      return Promise.reject(error);
    }
  }

}
