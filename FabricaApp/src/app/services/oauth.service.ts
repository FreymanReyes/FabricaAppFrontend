import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class OauthService {

  baseurl:string='https://localhost:7119/api/Usuario/'

  constructor (private http:HttpClient) {}

  ngOnInit(): void {

  }

  loginuser(form:any){ return this.http.post(`${this.baseurl}Login`,{
      Username: form.usuario,
      Upassword: form.contraseña
    })
  }

  registeruser(form:any){ return this.http.post(`${this.baseurl}Registrar`,{
    email: form.email,
    userName: form.usuario,
    password: form.contraseña
  }) }
}
