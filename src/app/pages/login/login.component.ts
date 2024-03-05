import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  contactForm!: FormGroup;
  errorResponseMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router, private readonly fb:FormBuilder) {}

  // Inicializa el grupo de formulario al cargar el componente.
  ngOnInit(): void {
    this.contactForm = this.initFrom();
  }

  signIn() {
    // Llama el metodo signIn de authService para la autenticacion del user
    this.authService.signIn(this.contactForm.value)
      .subscribe(res => {
        console.log(res)
        // Alamcena el token en el almacenamiento local.
        localStorage.setItem('token', res.token);

        // Obtiene el id que devuelve el metodo 'getLoggedInUserId' en auth.service
        const userId = this.authService.getLoggedInUserId();
        console.log('Logged In User ID:', userId);
        // Comprueba que el id exista. y en caso de exito lo asigna a la url de destino y lo redirige
        if (userId) {
          this.router.navigate(['/home', userId]);
        } else {
          console.log('No se encontro id')
        }
      },
        // manejo de la respuesta de los distintos errores
        err => {
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            this.errorResponseMessage = err.error.message;
          }
        }
      );
  }

  // Muestra en consola la informacion typeada en el formulario de logeo
  onSubmit(): void {
    console.log('form ->', this.contactForm.value);
  }

    //  Inicializa el formulario con reglas de validación.
  initFrom(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }
}
