import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {

  private modalSubject = new Subject<{ isOpen: boolean, tourId?: number }>();
  modalState$ = this.modalSubject.asObservable();

  openModal(tourId?: number) {
    this.modalSubject.next({ isOpen: true, tourId });
  }

  closeModal() {
    this.modalSubject.next({ isOpen: false });
  }
}
