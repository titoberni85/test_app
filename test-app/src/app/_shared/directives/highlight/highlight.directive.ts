import { Directive, Input, SimpleChanges, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input() searchedWord: string = '';
  @Input() text: string = '';
  
  classToApply: string = 'bg-primary text-white pr-1 pl-1';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.searchedWord || !this.searchedWord.length || !this.classToApply) {
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.text);
      return;
    }

    this.renderer.setProperty(
      this.el.nativeElement,
      'innerHTML',
      this.getFormattedText()
    );
  }

  getFormattedText() {
    const re = new RegExp(`(${this.searchedWord})`, 'g');

    return this.text.replace(re, `<span class="${this.classToApply}">$1</span>`);
  }
}
