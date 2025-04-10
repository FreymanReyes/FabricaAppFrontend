import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { NewProductComponent } from './new-product/new-product.component';
import { Subscription } from 'rxjs';


export interface productElement {
  id: string;
  prodDesc: number;
  proValor: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  dataSource: productElement[] = []

  eliminarproductoespecifico?:Subscription


  constructor(public productsservice: ProductsService,private toastr:ToastrService, private router:Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    //CARGA LA DATA INICIAL DE LOS PRODUCTOS
    this.productsservice.listProducts();

    //SUBSCRIPCION A LOS EVENTOS DEL MODAL
    this.productsservice.eventModal.subscribe(res => {
      if(res){ this.dialog.closeAll(); }
    } )
  }

  displayedColumns: string[] = ['id', 'prodDesc', 'proValor','Editar', 'Eliminar'];

  openDialog() {
    this.dialog.open(NewProductComponent, {data:{id:0,status:"new"}});
  }

  openDialogsenddata(id:number) {
    this.dialog.open(NewProductComponent, {data:{id:id,status:"edit"}});
  }

  eliminarproducto(id:number){
    this.eliminarproductoespecifico = this.productsservice.eliminarproducto(id).subscribe((resp)=>{
      this.productsservice.listProducts();
      this.toastr.success('Producto Eliminado!');
    },error => {
      if(error.error.errores.Mensaje){
        console.log(error)
        this.toastr.error(error.error.errores.Mensaje+'!' , error.status);
      }else{
        this.toastr.error('ERROR NO ESPECIFICADO!');
      }
    })
  }

}
