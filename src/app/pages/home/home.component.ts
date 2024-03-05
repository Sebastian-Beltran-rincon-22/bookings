import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SwitchService } from 'src/app/core/services/modal/switch.service';
import { TourService } from 'src/app/core/services/tour/tour.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isModalVisible !: boolean;
  tourDataList:any;
  tourForm!: FormGroup;
  tourId!:number

  constructor(private tourService: TourService, private modalSS: SwitchService) {}

  ngOnInit(): void {
    this.modalSS.modalState$.subscribe((value) => {
      this.isModalVisible = value.isOpen;
      if (value.tourId !== undefined) {
        // Haz algo con value.tourId, por ejemplo, almacénalo en una propiedad del componente
        this.tourId = value.tourId;
      }
    });

    this.loadData();
  }

  public loadData(){
    this.tourService.getTourData().subscribe(data =>{
      this.tourDataList = data.tours
    })
  }

  openModalToUpdate(tourId: number) {
    this.modalSS.openModal(tourId);
  }

  onSubmit(tourId: number) {
    this.tourService.getTourById(tourId).subscribe((result) => {
      this.tourService.updateTourData(tourId, this.tourForm.value).subscribe((updateResult) => {
        console.log('Datos actualizados:', updateResult);
      });
    });
  }

  deleteTour(id: number): void {
    this.tourService.deleteTourData(id).subscribe(
      {
        next: (res) => {
          console.log("eliminado", res)
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

  getNumberOfTours(): number {
    return this.tourDataList.length;
  }
}

