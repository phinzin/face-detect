import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { FaceDetectComponent } from './face-detect/face-detect.component';
import { FaceDetectService } from './service/face-detect.service';
import { RoutingModule } from './routing/routing.module';


@NgModule({
  declarations: [
    AppComponent,
    DasboardComponent,
    FaceDetectComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RoutingModule
  ],
  providers: [FaceDetectService],
  bootstrap: [AppComponent]
})

export class AppModule {

}
