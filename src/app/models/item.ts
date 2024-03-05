export interface Home{
  tours: Tour[]

}
export interface Tour{

  id: number,
  nameTour: string,
  descriptionTour:string,
  date: Date,
  price: number,
  user_id:number
}

export interface TourDetails {
  tourId: number;
}

export interface HomeBookings{
  booking: Booking[]

}

export interface Booking{

  id:number,
  dateBooking:Date,
  nameUser: string,
  surName: string
  numPerson: number
  tours_id: number
}

export interface User{

  id:number,
  userName:string,
  email: string,
  password: string
}

