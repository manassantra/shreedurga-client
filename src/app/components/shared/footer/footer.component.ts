import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  author: any;
  bootstrapUrl: any;

  constructor() {
    this.author = 'The_Trayee_Pani';
    this.bootstrapUrl = 'https://getbootstrap.com/docs/5.3/getting-started/introduction/';
  }

}
