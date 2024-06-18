import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseAPI } from '../interfaces/ResponseAPI';
import { firstValueFrom } from 'rxjs';
import { AuthServiceService } from '../auth/services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  private baseUrl: string = 'http://localhost:8000/api/';

  constructor(private http: HttpClient, private authService: AuthServiceService) {
    console.log('Hola desde el constructor de CloudService');
  }

  async login (form: any): Promise<ResponseAPI>{
    try{
      const data = await firstValueFrom(this.http.post<ResponseAPI>(this.baseUrl+'login', form.value));
      if (data.token){
        this.authService.setToken(data.token);
      }
      return Promise.resolve(data);
    } catch (error:any){
      console.log('Error en el login', error);
      let e = error as HttpErrorResponse
      return Promise.reject(error);
    }
  }

}
