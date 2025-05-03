import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OauthService } from 'src/app/services/oauth.service';
import { faUser, faLock, faEye, faEyeSlash, faLockOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {

  // ✅ Necesario para manejar la visibilidad de la contraseña
  hidePassword: boolean = true;

  // Íconos
  faUser = faUser;
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faLockOpen = faLockOpen;

  // Formulario
  formlogin!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private LoginService: OauthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formlogin = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(6)]],
      contraseña: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/)
        ]
      ]
    });
  }

  // Cambiar visibilidad de la contraseña
  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  // Lógica de login
  loginuser(): void {
    if (this.formlogin.invalid) return;

    this.LoginService.loginuser(this.formlogin.value).subscribe({
      next: (res: any) => {
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('IdUsuario', res.id);
        this.formlogin.reset();
        this.toastr.success('ACCESO AUTORIZADO!', 'Bienvenido!');
        this.router.navigate(['products']);
      },
      error: (error: any) => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('IdUsuario');

        if (error.status === 401) {
          this.toastr.error('Valida tus credenciales de acceso!', 'ACCESO NO AUTORIZADO!');
        } else if (error.status === 500) {
          this.toastr.error('Sin conexión con el servidor!', 'ERROR!');
        } else {
          this.toastr.error('Error no especificado!', 'ERROR!');
        }
      }
    });
  }

}
