import {Component, Input} from '@angular/core';
import {defineComponent} from '../../platform/platform'

@Component({
	selector: 'hello-world',
	template: `Hello World!`,
	styles: [
		`:host {
			display: flex;
		}`
	]
})
export class HelloWorld {
  @Input() name = 'World'
}


export default defineComponent(HelloWorld);
