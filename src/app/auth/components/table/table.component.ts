import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseGetALL, Usuario} from '../../interfaces/ResponseGETAll';
import { ResponseDelete } from '../../interfaces/ResponseDelete';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent{

    private baseUrl: string = 'http://localhost:8000/api/usuarios';
    public users: Usuario[] = [];
    showModal = false;
    userToDelete!: Usuario;
    userToEdit!: Usuario;
    showFormEdit = false;

    constructor(private HttpClient: HttpClient, private authService: AuthServiceService, private router: Router) {
      this.chargeData();
    }

    chargeData():void {
      this.HttpClient.get<ResponseGetALL>(this.baseUrl, this.crearHeader()).subscribe(
        (data) => {
          this.users = data.usuarios;
        },
        (error:any) => {
          console.log('Error', error);
        }
      );
    }


  openModal(user: any) {
    this.userToDelete = user;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  goForm(user: Usuario) {
    this.userToEdit = user;
    const serializedUser = JSON.stringify(this.userToEdit);
    console.log(this.userToEdit);
    this.router.navigate(['/auth/edit'], { queryParams: { user: serializedUser } });
  }

  confirmDelete() {
    this.HttpClient.delete<ResponseDelete>(this.baseUrl+'/'+this.userToDelete.id, this.crearHeader()).subscribe(
      (data: ResponseDelete) => {
        this.users = this.users.filter((user) => user.id !== this.userToDelete.id);
        this.closeModal();
        console.log(data.usuario);
      }
    );

  //Mostrar un mensaje de error de que no se pudo eliminar el usuario ó que se elimino correctamente


  }
    crearHeader() {
      return {
        headers: new HttpHeaders({
          'Authorization': 'Bearer'+this.authService.getToken()
        })
      }
    }
}
