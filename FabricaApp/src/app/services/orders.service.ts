import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseurl:string='https://localhost:7119/api/Pedido'
  token:any ="";
  ordersAll!:any[];
  eventModal = new EventEmitter<boolean>();

  
  constructor(private Http:HttpClient,private toastr:ToastrService,private router:Router) { }

  listOrders(){
    this.token = sessionStorage.getItem('token');
    const headers={
      'Authorization':'Bearer '+this.token
    }
    return this.Http.get<any>(`${this.baseurl}`,{headers}).subscribe(response => {
      this.ordersAll = response;
    })
  }

  guardarorders(form:any){ 
    const headers={
      'Authorization':'Bearer '+this.token
    }
    return this.Http.post(`${this.baseurl}`,{
      productoID: form.productoID,
      cantidad: form.cantidad,
      usuarioID: form.usuarioID
      },
      {headers})
    }


    buscarpedido(id:number){
      const headers={
        'Authorization':'Bearer '+this.token
      }
      return this.Http.get(`${this.baseurl}/Unico/${id}`,{headers})
      }
  
  editarpedido(form:any){

    const headers={
      'Authorization':'Bearer '+this.token
    }
    return this.Http.put(`${this.baseurl}/${form.id}`,{
      id: form.id,
      productoID: form.productoID,
      cantidad: form.cantidad,
      usuarioID: form.usuarioID},
      {headers})

  }



  eliminarpedido(id:number){
    console.log("antes de eliminar service"+id);

    const headers={
      'Authorization':'Bearer '+this.token
    }
    return this.Http.delete(`${this.baseurl}/${id}`,{headers})
  }

}
