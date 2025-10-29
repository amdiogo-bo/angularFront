import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRendu]'
})
export class Rendu {

  constructor(private el: ElementRef) {
    const n = this.el.nativeElement;
    n.style.color = 'green';       // "color" avec un c minuscule
    n.style.border = '2px solid green';
  }

}
