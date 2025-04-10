import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { NewOrderComponent } from './new-order/new-order.component';
import {MatDialog} from '@angular/material/dialog';


export interface orderElement {
  id: string;
  pedVrUnit: number;
  pedCant: number;
  pedSubtot: number;
  pedIVA: number;
  pedTotal: number;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  listproductssubs?:Subscription
  dataSource: orderElement[] = []
  eliminarpedidoespecifico?:Subscription


  constructor(public ordersservice: OrdersService,private toastr:ToastrService, private router:Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    //CARGA LA DATA INICIAL DE LOS PRODUCTOS
    this.ordersservice.listOrders();

        //SUBSCRIPCION A LOS EVENTOS DEL MODAL
        this.ordersservice.eventModal.subscribe(res => {
          if(res){ this.dialog.closeAll(); }
        } )
  }

  displayedColumns: string[] = ['id','pedVrUnit','pedCant','pedSubtot','pedIVA','pedTotal','producto','usuario','Editar','Eliminar'];

  openDialog() {
    this.dialog.open(NewOrderComponent,{data:{id:0,status:"new"}});
  }

  openDialogsenddata(id:number) {
    this.dialog.open(NewOrderComponent, {data:{id:id,status:"edit"}});
  }

  eliminarpedido(id:number){
    console.log("antes de eliminar"+id);
    this.eliminarpedidoespecifico = this.ordersservice.eliminarpedido(id).subscribe((resp)=>{
      this.ordersservice.listOrders();
      this.toastr.success('Pedido Eliminado!');
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
