import { HttpErrorResponse } from '@angular/common/http';
import { Component} from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TourService } from 'src/app/core/services/tour/tour.service';
import { format, isValid, parseISO } from 'date-fns';


@Component({
  selector: 'app-tourform',
  templateUrl: './tourform.component.html',
  styleUrls: ['./tourform.component.css']
})
export class TourformComponent {
  tourForm!: FormGroup;
  user_id!: number;

  constructor(private fb: FormBuilder, private tourService: TourService,
    private authService:AuthService){}



  ngOnInit(): void{

    this.user_id = this.authService.getLoggedInUserId();
    this.createForm()
  }

  createForm(): void {
    this.tourForm = this.fb.group({
      nameTour: ['', Validators.required],
      descriptionTour: ['', Validators.required],
      date_str: ['',new Date(), Validators.required],
      price: ['', Validators.required],
      user_id: [this.user_id],
    });

    this.tourForm.get('user_id')?.setValue(this.user_id);
  }


  clearForm(): void {
    this.tourForm.reset({
      nameTour: '',
      descriptionTour: '',
      date_str: '',
      price: 0,
      user_id: this.user_id,
    });
  }

  customDateValidator(control: any) {
    const enteredDate = parseISO(control.value); // Intentar analizar la fecha
    return isValid(enteredDate) ? null : { invalidDate: true };
  }

  onSubmit(): void {

    if (this.tourForm.valid) {
      // Formatear la fecha antes de enviarla al backend
      const formattedDate = format(this.tourForm.value.date_str, 'dd/MM/yyyy');

      // Crear una copia del formulario para evitar modificaciones directas en los valores
      const formData = { ...this.tourForm.value, date_str: formattedDate };

      // Obtén el token del servicio de autenticación
      const token = this.authService.getToken();

      // Verifica que haya un token antes de realizar la solicitud
      if (token) {
        // Incluye el token en el encabezado de autorización
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        this.tourService.postTourData(formData, headers).subscribe(
          {
            next: (res) => {
              console.log("creado", res)
              window.location.reload();
            },
            error:(err)=>{
              console.error("error ", err)
              if (err instanceof HttpErrorResponse) {
                console.error('Detalles del error:', err.error);
              }
            }
          }
        );
      }
    }
    else{
      console.error('Formulario no válido. Revise los campos.');
    }
  }


}

