import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookingDetails: any;
  bookingId: any;
  constructor(private bookingService: BookingService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.bookingId = this.route.snapshot.paramMap.get('id');
    this.getBookingDetails();
  }

  getBookingDetails() {
    this.bookingService.getBookingDetails(this.bookingId).subscribe((res:any)=>{
      this.bookingDetails = res.data;
    }, (err:any)=>{
      console.log(err.error);
    })
  }

  payAmount(data:any) {
    console.log(data);
  }

  goHome() {
    window.location.replace('');
  }

}
