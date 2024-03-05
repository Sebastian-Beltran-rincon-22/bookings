import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking/booking.service';
import { FormService } from 'src/app/core/services/form/form.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent{
  bookingDataList: any[] = [];
  searchTerm: string = '';
  filteredBookings: any[] = [];
  selectedUser: string = '';
  uniqueNames: Set<string> = new Set();
  isModalVisible !: boolean;

  constructor(private bookingServices: BookingService, private modalForm:FormService) {}

  ngOnInit(): void {
    this.modalForm.$modal.subscribe((valu) => { this.isModalVisible = valu })
    this.dataLoadBookings();
  }

  public dataLoadBookings() {
    this.bookingServices.getBookings().subscribe(data => {
      this.bookingDataList = data.booking;

      this.uniqueNames = new Set(this.bookingDataList.map(booking => `${booking.nameUser} ${booking.surName}`));

      this.resetFilter();
    });
  }

  filterBookings(): void {
    if (this.selectedUser) {
      this.filteredBookings = this.bookingDataList.filter(booking =>
        `${booking.nameUser} ${booking.surName}` === this.selectedUser
      );
    } else {
      this.resetFilter();
    }
  }

  resetFilter(): void {
    this.filteredBookings = [...this.bookingDataList];
  }
  clearFilter(): void {
    this.selectedUser = '';
    this.resetFilter();
  }

  //DELETE
  deleteBook(id: number): void {
    this.bookingServices.deleteBooking(id).subscribe(
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

  getNumberOfReservations(): number {
    return this.filteredBookings.length;
  }

  openModal() {
    this.isModalVisible = true
  }
}
