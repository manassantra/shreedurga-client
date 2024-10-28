import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  baseApi: any;
  httpHeaders: HttpHeaders = new HttpHeaders({
    apikey: environment.API_KEY
  });

  constructor(public httpClient: HttpClient) {
    this.baseApi = environment.API_URI + 'booking/';
  }

  createBooking(data: any) {
    return this.httpClient.post(this.baseApi + 'create', data, { headers: this.httpHeaders});
  }

  getBookingDetails(id:any) {
    return this.httpClient.get(this.baseApi + '/' + `${id}`, { headers: this.httpHeaders});
  }
}
