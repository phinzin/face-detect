import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DataService } from './service/data.service';
import { FaceRecognitionService } from './service/face-recognition-service';
import { ImageService } from './service/image.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [DataService, FaceRecognitionService,ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
