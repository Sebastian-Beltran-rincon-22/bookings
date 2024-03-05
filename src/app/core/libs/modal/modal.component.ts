import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TourService } from '../../services/tour/tour.service';
import { SwitchService } from '../../services/modal/switch.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  tourForm!: FormGroup;
  showModal: boolean = false;
  tourId!:number

  constructor(
    private fb: FormBuilder,
    private tourService: TourService,
    private route: ActivatedRoute,
    private modalSS: SwitchService,
  ) {
    this.modalSS.modalState$.subscribe((value) => {
      this.showModal = value.isOpen;
      if (value.tourId !== undefined) {
        this.tourId = value.tourId;

        // Actualiza el formulario con los datos del tour correspondiente
        this.tourService.getTourById(this.tourId).subscribe((result) => {
          this.tourForm.patchValue(result.tour);
        });
      }
    });
  }

  closeModal() {
    this.showModal = false;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.tourForm = this.fb.group({
      // Define aquí los campos del formulario según tus necesidades
      nameTour: ['', Validators.required],
      descriptionTour: ['', Validators.required],
      date_str:['', Validators.required],
      price:['',Validators.required]
      // Otros campos...
    });
  }
  onSubmit() {
    const tourId: number = this.tourId;

    if (tourId !== undefined && tourId !== null && tourId >= 0) {
      this.tourService.updateTourData(tourId, this.tourForm.value).subscribe((updateResult) => {
        console.log('Datos actualizados:', updateResult);

        this.closeModal();
        window.location.reload();
      });
    } else {
      console.error('El tourId no es válido');
    }
  }
}
