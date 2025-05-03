import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSignOutAlt, faClipboardList, faBox } from '@fortawesome/free-solid-svg-icons'; // Importa los iconos necesarios

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: false
})
export class LayoutComponent implements OnInit {

  // Iconos
  faSignOutAlt = faSignOutAlt; // Cerrar sesión
  faClipboardList = faClipboardList; // Productos
  faBox = faBox; // Pedidos

  constructor(private route: Router) { }

  ngOnInit(): void { }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('IdUsuario');
    this.route.navigate(['login']);
  }
}
