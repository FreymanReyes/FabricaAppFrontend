import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {



  formlogin!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, private LoginService: OauthService, private toastr:ToastrService, private router:Router) {
    
   }

  ngOnInit(): void {
    this.formlogin = this.fb.group({
      usuario: ['fareyes32', [Validators.required]],
      contraseña: ['Fareyes32$', Validators.required]
    })
  }

  loginuser(){
    this.LoginService.loginuser(this.formlogin.value).subscribe((res:any)=>{
      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('IdUsuario', res.id);
      this.formlogin.reset();
      this.toastr.success('ACCESO AUTORIZADO!', 'Bienvenido!');
      this.router.navigate(['products']);
    },(error:any) => {
      if(error.status == '401'){
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('IdUsuario');
        this.toastr.error('Valida tus credenciales de acceso!', 'ACCESO NO AUTORIZADO!');
      }else if(error.status == '500'){
        this.toastr.error('Sin conexion con el servidor!', 'ERROR!');
      }else{
        this.toastr.error('Error no especificado!', 'ERROR!');
      }
    }
  )}

}
