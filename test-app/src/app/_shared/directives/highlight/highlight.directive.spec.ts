import { Component, DebugElement, Renderer2, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';


describe('HighlightDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let element: DebugElement;
  let renderer: Renderer2;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ HighlightDirective, TestComponent ]
    })
    .createComponent(TestComponent);
    element = fixture.debugElement.query(By.css('p'));
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>)
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new HighlightDirective(element, renderer);
    expect(directive).toBeTruthy();
  });

  it('should have span with text pedro', () => {
    const directive = new HighlightDirective(element, renderer);
    directive.searchedWord = 'pedro';
    directive.text = 'el señor pedro es un buen chico';
    expect(directive.getFormattedText()).toContain('<span class="bg-primary text-white pr-1 pl-1">pedro</span>');
  });

});

@Component({
  template: `
    <p appHighlight
      [searchedWord]="pedro"
      [text]="'el señor pedro es un buen chico'" 
      class="small text-muted mb-0">
    </p>
  `
})
class TestComponent { }
