import {Directive, Input, ViewContainerRef, TemplateRef, SimpleChanges} from '@angular/core';


@Directive({
	selector: '[ngRepeat][ngRepeatOf]'
})
export class NgRepeat {
  constructor(private vcr: ViewContainerRef, private templateRef: TemplateRef<{}>){
	  console.log('repeater')
  }
  private _currentValues = [];

  @Input()
  set ngRepeatOf(values: any[]){
	  this._currentValues = values || [];
  }

  render(results){

	while(this.vcr.length){
	  this.vcr.remove()
	}
	for (let i = 0; i < results.length; i++) {
		  const $implicit = results[i];
		  this.vcr.createEmbeddedView(this.templateRef, {$implicit}, i);
	}
  }

  ngOnChanges(changes: SimpleChanges){
	  this.render(this._currentValues);
  }

}
