import {NgModuleFactory, ɵcreateInjector as createInjector} from '@angular/core'
import {platformBrowser} from '@angular/platform-browser'
import {EmbeddedApp, EmbeddedAppModule} from './embedded-app';
import {APIService} from './api-service'
import {renderComponent, rendererFactory, NgHostElement} from '../platform/index'




function main(){

  const sharedInjector = createInjector(EmbeddedAppModule, null, [{provide: APIService, useClass: APIService}]);


	customElements.define('embedded-app', class extends NgHostElement {
    constructor(){
      super();
      const v = sharedInjector.get(APIService);
      console.log(v);
    }
  })
}


main();
