import {NgModule, Component} from '@angular/core';

@Component({
	selector: 'embedded-app',
	template: `Hello World!`,
	styles: [
		`:host {
			display: flex;
		}`
	]
})
export class EmbeddedApp {

}

@NgModule({
	declarations: [EmbeddedApp]
})
export class EmbeddedAppModule {}
