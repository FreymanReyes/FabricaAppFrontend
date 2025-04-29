import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OauthService } from '../../services/oauth.service';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';




@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: false
})
export class RegisterComponent implements OnInit {

  faUser = faUser;
  faLock = faLock;
  faEnvelope = faEnvelope;

  formregister!:UntypedFormGroup;

  constructor(
    private fb:UntypedFormBuilder,
    private RegisterService:OauthService,
    private toastr:ToastrService,
    private router:Router) {
  
  }

  ngOnInit(): void {
    this.formregister = this.fb.group({
      email: ['FAREYES31@MISENA.EDU.CO', [Validators.email, Validators.required]],
      usuario: ['ANDRESREYES', [ Validators.required]],
      contraseña: ['12345678fF$',[ Validators.required, Validators.minLength(8)]]
    })
  }

  registeruser(){
    this.RegisterService.registeruser(this.formregister.value).subscribe((res:any)=>{
      console.log(res)
      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('IdUsuario', res.id);
      this.formregister.reset();
      this.toastr.success('ACCESO AUTORIZADO!', 'Bienvenido!');
      this.router.navigate(['products']);
    },error => {
      if(error.error.errores.mensaje){
        this.toastr.error(error.error.errores.mensaje+'!' , error.status);
      }else if(error.error.errores){
        this.toastr.error(error.error.errores+' password requiere alfanumerico y caracter especial!' , error.status);
      }else{
        this.toastr.error('ERROR NO ESPECIFICADO!');
      }
    })
  }
}
