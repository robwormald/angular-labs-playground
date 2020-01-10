import {NgModuleFactory, ɵcreateInjector as createInjector} from '@angular/core'
import {EmbeddedApp, EmbeddedAppModule} from './embedded-app';
import {EmbeddedAppModuleNgFactory} from './embedded-app.ngfactory';






function main(){
	console.info('embedded app starting up...');

	const appInjector = createInjector(EmbeddedAppModule);
	console.log(appInjector);
}


main();
