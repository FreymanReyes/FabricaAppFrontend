import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { OrdersService } from '../../../services/orders.service';
import { ProductsService } from '../../../services/products.service';
import { OrdersComponent } from '../orders.component';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {

  hide = true;

  formNew!: FormGroup;

  productos!:[];

  statusform:string = "";

  datopedido:any;

  subslistusuarios?:Subscription;



  constructor(private fb: FormBuilder,private orderservice: OrdersService,public productsservice: ProductsService, private toastr:ToastrService
    ,public dialogRef: MatDialogRef<OrdersComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
      this.statusform = this.data.status;
    }

  ngOnInit(): void {

    const usuarioId:any = sessionStorage.getItem('IdUsuario');
    
    if(this.statusform === "edit"){
      this.formNew = this.fb.group({
        id:[''],
        productoID: ['', [Validators.required]],
        cantidad: ['', [Validators.required]],
        usuarioID: [usuarioId, [Validators.required]]
      });
      }else{
        this.formNew = this.fb.group({
          productoID: ['', [Validators.required]],
          cantidad: ['', [Validators.required]],
          usuarioID: [usuarioId, [Validators.required]]
        });
      }


    this.productsservice.listProducts();
    this.datopedido = this.data.id;


    if(this.statusform === "edit"){
      console.log("editando... "+this.datopedido)
      this.subslistusuarios = this.orderservice.buscarpedido(this.datopedido).subscribe((res:any)=>{
        console.log(res)
    const usuarioId:any = sessionStorage.getItem('IdUsuario');

        this.formNew = this.fb.group({
          id: res.id,
          productoID: res.productoId,
          cantidad: res.pedCant,
          usuarioId: usuarioId
        })
      })
    }

  }

  

  guardarProducto(){
    if(this.statusform === "new"){
    this.orderservice.guardarorders(this.formNew.value).subscribe(res=>{
      this.orderservice.listOrders();
      this.toastr.success('Pedido almacenado');
      this.orderservice.eventModal.emit(true);
    },error=>{
        this.toastr.error('No se pudo guardar el pedido');
      });
    }else{
        this.orderservice.editarpedido(this.formNew.value).subscribe(res=>{
        this.productsservice.listProducts();
        this.toastr.success('Producto Editado');
        this.orderservice.eventModal.emit(true);
      },error=>{
        this.toastr.error('No se pudo Editar el producto');
      });
    }
  }

}
