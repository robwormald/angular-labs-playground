
import {defineComponentHost} from './component_host';

export function defineComponent(ngComponentType: any, options = {}) {
  console.log('defininf')
  const HostElement = defineComponentHost(ngComponentType, options);
  HostElement.ngDefine && HostElement.ngDefine();
  const selector = HostElement.ngElementDef!.selector;
  customElements.define(selector, HostElement);
  return customElements.get(selector);
}
