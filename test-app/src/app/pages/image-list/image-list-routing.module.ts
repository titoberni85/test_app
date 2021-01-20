import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { ImageListComponent } from './_main/image-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: ImageListComponent }
    ]),
  ]
})
export class ImageListRoutingModule { }