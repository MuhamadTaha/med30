import { NgControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[disableControl]',
})
export class DisableControlDirective {
  @Input('disableControl') disableControl: any;
  constructor(private ngControl: NgControl) { }

  ngOnChanges(changes: any) {
    if (changes['disableControl']) {
      const action = this.disableControl ? 'disable' : 'enable';

      if (this.ngControl.control) this.ngControl.control[action]();
    }
  }
}
