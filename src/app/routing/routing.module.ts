import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FaceDetectComponent } from '../face-detect/face-detect.component';
import { DasboardComponent } from '../dasboard/dasboard.component';

const routes: Routes = [
  { path: 'detect/:id', component: FaceDetectComponent },
  { path: 'dashboard', component: DasboardComponent },
  { path: '', redirectTo:'dashboard',pathMatch:'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
