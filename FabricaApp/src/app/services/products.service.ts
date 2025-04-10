import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseurl:string='https://localhost:7119/api/Producto'

  token:any ="";

  productsAll!:any[];

  eventModal = new EventEmitter<boolean>();

  constructor(private Http:HttpClient,private toastr:ToastrService,private router:Router) { }

  listProducts(){
    this.token = sessionStorage.getItem('token');
    const headers={
      'Authorization':'Bearer '+this.token
    }
    this.Http.get<any>(`${this.baseurl}`,{headers}).subscribe(response => {
      this.productsAll = response;
    })
  }

  guardarProduct(form:any){ 
    const headers={
      'Authorization':'Bearer '+this.token
    }
    return this.Http.post(`${this.baseurl}`,{
      descripcion: form.descripcion,
      precio: form.precio
      },
      {headers})
    }
  
  
    buscarproducto(id:number){
    const headers={
      'Authorization':'Bearer '+this.token
    }
    return this.Http.get(`${this.baseurl}/Unico/${id}`,{headers})
    }


    editarproducto(form:any){
      const headers={
        'Authorization':'Bearer '+this.token
      }
      console.log("desde el servide"+form)
      return this.Http.put(`${this.baseurl}/${form.id}`,{
        id: form.id,
        descripcion: form.descripcion,
        precio: form.precio},
        {headers})
      }

    eliminarproducto(id:number){
      const headers={
        'Authorization':'Bearer '+this.token
      }
      return this.Http.delete(`${this.baseurl}/${id}`,{headers})
    }
}
