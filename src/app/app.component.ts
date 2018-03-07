import { Component, ViewChild } from '@angular/core';
import { DataService } from "./service/data.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  imageUrl: string = "";
  personAge: string;
  personCount: string;
  @ViewChild('inputImageUrl') inputImageUrl;
  constructor(private data: DataService) {
    // this.imageUrl = '';
  }
  getPersonAge() {
    this.data.getPersonAge(this.imageUrl).subscribe(data => {
      this.personAge = data;
      this.personCount = data.length;
    });
  }

  //
  values = '';

  onKey(event: any) { // without type info
    this.values = event.target.value;
    this.imageUrl = event.target.value;
  }

}
