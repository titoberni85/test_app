import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { ErrorHandlerService } from './services/error-handler/error-handler.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HighlightDirective
  ],
  providers: [
    ErrorHandlerService
  ],
  exports: [
    HighlightDirective
  ]
})
export class SharedModule { }