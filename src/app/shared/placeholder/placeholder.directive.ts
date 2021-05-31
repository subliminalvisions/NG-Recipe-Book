import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[appPlaceholder]'
  // attribute selector
})
export class PLaceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
