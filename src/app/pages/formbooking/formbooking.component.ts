import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format, isValid, parseISO } from 'date-fns';
import { BookingService } from 'src/app/core/services/booking/booking.service';
import { FormService } from 'src/app/core/services/form/form.service';

@Component({
  selector: 'app-formbooking',
  templateUrl: './formbooking.component.html',
  styleUrls: ['./formbooking.component.css']
})
export class FormbookingComponent {
  bookingForm!: FormGroup;
  constructor(private fb: FormBuilder, private bookingService: BookingService, private modalForm:FormService){}



  ngOnInit(): void{

    this.createForm()
  }

  createForm(): void {
    this.bookingForm = this.fb.group({
      nameUser: ['', Validators.required],
      surName: ['', Validators.required],
      dateBooking_str: ['',new Date(), Validators.required],
      numPerson: ['', Validators.required],
      tours_id: ['', Validators.required],
    });

  }


  clearForm(): void {
    this.bookingForm.reset({
      nameUser: '',
      surName: '',
      dateBooking_str: '',
      numPerson: 0,
      tours_id: 0,
    });
  }

  customDateValidator(control: any) {
    const enteredDate = parseISO(control.value); // Intentar analizar la fecha
    return isValid(enteredDate) ? null : { invalidDate: true };
  }

  onSubmit(): void {

    if (this.bookingForm.valid) {
      // Formatear la fecha antes de enviarla al backend
      const formattedDate = format(this.bookingForm.value.dateBooking_str, 'dd/MM/yyyy');

      // Crear una copia del formulario para evitar modificaciones directas en los valores
      const formData = { ...this.bookingForm.value, dateBooking_str: formattedDate };



        this.bookingService.postBooging(formData,).subscribe(
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

    closeModal(){

      this.modalForm.$modal.emit(false)
  }
}
