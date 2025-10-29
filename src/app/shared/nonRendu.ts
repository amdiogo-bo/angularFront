import { Directive,ElementRef}from '@angular/core';

@Directive({
  selector: '[appNomRendu]'
})
export class NonRendu {

   constructor(el:ElementRef) { 
    const n = el.nativeElement;
    n.style.fontWeight = 'bold';
    n.style.color = 'red';
    n.style.border = '2px solid red';
    n.style.padding = '10px';
    n.style.margin = '10px';

   //element.innerText = "Non Rendu ! Non Rendu ! Non Rendu !" + element.innerText;
  }
}
