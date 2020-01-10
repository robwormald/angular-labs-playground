import {createPlatformFactory, ɵgetComponentViewDefinitionFactory} from '@angular/core';

export class HostElement extends HTMLElement {
	static ngComponentType: any;
	constructor(){
		super();
		this.attachShadow({mode: 'open'});
	}
}

function defineHostElement<T>(componentType: T): typeof HostElement {
	ɵgetComponentViewDefinitionFactory(componentType as any)
  const selector = componentType
  return class extends HostElement {
	  static ngComponentType = componentType;
  }
}
