import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { LocationService } from 'src/app/services/location.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bookingResult: any;
  addressList: any;
  originAddressList: any;
  destinationAddressList: any;
  originLocation: any;
  destinationLocation: any;
  originLocationData: any = {};
  destinationLocationData: any = {};
  totalDistance: any;
  totalPrice: any = 0.00;

  constructor(private bookingService: BookingService, private locationService: LocationService) {
  }

  ngOnInit(): void {  
  }

  getAddressList(event: any, field: any){
    this.locationService.searchLocation(event.target.value).subscribe((res:any)=> {
      this.addressList = res;
      if (field === 'ORIGIN') {
        this.originAddressList = this.addressList;
      } else {
        this.destinationAddressList = this.addressList;
      }
    }, (err:any)=>{
      console.log(err);
    })
  }

  setAddress(data: any, field: any) {
    if (field === 'ORIGIN') {
      this.originAddressList = [];
      this.originLocation = JSON.stringify(data.display_name);
      this.originLocationData.lat = data.lat;
      this.originLocationData.lon = data.lon;
    } else {
      this.destinationAddressList = [];
      this.destinationLocation = JSON.stringify(data.display_name);
      this.destinationLocationData.lat = data.lat;
      this.destinationLocationData.lon = data.lon;
    }
  }

  calculateDistance() {
    let lat1 = parseFloat(this.originLocationData.lat);
    let lon1 = parseFloat(this.originLocationData.lon);
    let lat2 = parseFloat(this.destinationLocationData.lat);
    let lon2 = parseFloat(this.destinationLocationData.lon);
    const dt = this.locationService.getHaversineDistance(lat1, lon1, lat2, lon2);
    this.totalDistance = dt.toFixed(2);
    this.calculatePrice();
  }

  calculatePrice() {
    const farePerKm = 13.00;
    const extraCharges = 150.00;
    this.totalPrice = ((this.totalDistance * farePerKm) + extraCharges).toFixed(2);
  }

  submitData(bookingData: any) {
    bookingData.originLocation = this.originLocation.replaceAll('"', '');;
    bookingData.destinationLocation = this.destinationLocation.replaceAll('"', '');
    bookingData.totalDistance = this.totalDistance;
    bookingData.totalPrice = this.totalPrice;
    this.bookingService.createBooking(bookingData).subscribe((res:any)=>{
      this.bookingResult = res.data;
      if (this.bookingResult && this.bookingResult._id) {
        location.replace('booking/' + this.bookingResult._id);
      } else {
        location.reload();
        alert('There might be some issue. Try again !');
      }
    }, (err:any)=>{
      console.log(err);
    })
  }
}
