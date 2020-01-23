const NG_COMP_DEF = 'ɵcmp';
type NgComponentDef<T> = import('@angular/core').ɵComponentDef<T>;
type ViewEncapsulation = import('@angular/core').ViewEncapsulation;

import {NgHostElement, NgElementDef, NgElementConstructor} from './host_element';

const enum ViewEncapsulationType  {
  ShadowRoot = 3
}

export function defineComponentHost<T = {}>(componentType: T, options: {}): typeof NgHostElement {

  const componentDef = getComponentDef(componentType);
  console.log(componentDef);
  const selector = componentDef.selectors[0][0] as string;
  const shadowRoot = componentDef.encapsulation === 3 ? { mode: 'open' } : false;
  const props = componentDef.inputs;
  const attrs:string[] = Object.keys(props);

  const elementDef: NgElementDef = {
    selector,
    shadowRoot :(shadowRoot as ShadowRootInit),
    props,
    attrs,
    resolved: true
  }
  return class extends NgHostElement {
    static ngElementDef = elementDef;
  }

}

function getComponentDef<T>(componentType: T): NgComponentDef<T>{

  return (componentType as any)[NG_COMP_DEF] || null;
}

function validateSelector(selector: string){}
