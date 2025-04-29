import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { ProductsComponent } from '../products.component';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Component({
    selector: 'app-new-product',
    templateUrl: './new-product.component.html',
    styleUrls: ['./new-product.component.scss'],
    standalone: false
})
export class NewProductComponent implements OnInit {
  
  hide = true;

  formNew!: UntypedFormGroup

  datoprooducto:any;
  subslistusuarios?:Subscription;
  statusform:string = "";

  constructor(private fb: UntypedFormBuilder,private Productsservice: ProductsService, private toastr:ToastrService
    ,public dialogRef: MatDialogRef<ProductsComponent>,@Inject(MAT_DIALOG_DATA) public data: any) 
    { 
      this.statusform = this.data.status;
     }

  ngOnInit(): void {
    if(this.statusform === "edit"){
    this.formNew = this.fb.group({
      id:[''],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]]
    });
    }else{
      this.formNew = this.fb.group({
        descripcion: ['', [Validators.required]],
        precio: ['', [Validators.required]]
      });
    }
    this.datoprooducto = this.data.id;

    if(this.statusform === "edit"){
      console.log("editando... "+this.datoprooducto)
      this.subslistusuarios = this.Productsservice.buscarproducto(this.datoprooducto).subscribe((res:any)=>{
        console.log(res)
        this.formNew = this.fb.group({
          id: res.id,
          descripcion: res.prodDesc,
          precio: res.proValor
        })
      })
    }
  }

  guardarProducto(){
    if(this.statusform === "new"){
      console.log("guardando "+this.formNew.value)
      this.Productsservice.guardarProduct(this.formNew.value).subscribe(res=>{
        this.Productsservice.listProducts();
        this.toastr.success('Producto almacenado');
        this.Productsservice.eventModal.emit(true);
      },error=>{
        this.toastr.error('No se pudo guardar el producto');
      });
    }else{
      console.log("editando"+this.formNew.value)
      this.Productsservice.editarproducto(this.formNew.value).subscribe(res=>{
        this.Productsservice.listProducts();
        this.toastr.success('Producto Editado');
        this.Productsservice.eventModal.emit(true);
      },error=>{
        this.toastr.error('No se pudo Editar el producto');
      });
    }
  }

}
