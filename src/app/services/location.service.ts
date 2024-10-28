import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  baseApi: any;
  private openStreetMapAPI = 'https://nominatim.openstreetmap.org/search?';
  httpHeaders: HttpHeaders = new HttpHeaders({
    apikey: environment.API_KEY
  });
  searchResult: any;

  constructor(public httpClient: HttpClient) {
    this.baseApi = environment.API_URI + 'location/';
  }

  searchLocation(options: any) {
    if (!options || options.trim() === '') {
      return this.searchResult = [];
    }
    const url = this.openStreetMapAPI + 'street=' + options  + '&country=IN&format=jsonv2';
    this.searchResult = this.httpClient.get(url);
    return this.searchResult;
  }

  getAllLocations() {
    return this.httpClient.get(this.baseApi + 'all', { headers: this.httpHeaders});
  }

  getRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  getHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
      const R = 6371; // Radius of the Earth in kilometers

      const dLat = this.getRadians(lat2 - lat1);
      const dLon = this.getRadians(lon2 - lon1);

      const a = Math.sin(dLat / 2) ** 2 +
                Math.cos(this.getRadians(lat1)) * Math.cos(this.getRadians(lat2)) *
                Math.sin(dLon / 2) ** 2;

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in kilometers
  }
}
