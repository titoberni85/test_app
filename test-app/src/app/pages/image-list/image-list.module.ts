import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageListRoutingModule } from './image-list-routing.module';
import { ImageListComponent } from './_main/image-list.component';
import { ListComponent } from './components/list/list.component';
import { FilterComponent } from './components/filter/filter.component';
import { ImageListService } from './services/image-list.service';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../../_shared/shared.module';


@NgModule({
  declarations: [
    ImageListComponent,
    ListComponent,
    FilterComponent
  ],
  providers: [
    ImageListService
  ],
  imports: [
    CommonModule,
    ImageListRoutingModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    SharedModule
  ]
})
export class ImageListModule { }
