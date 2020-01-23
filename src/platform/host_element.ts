let BaseElementCtor:typeof HTMLElement | undefined;

const elementDefCache = new WeakMap();
const internalsCache = new WeakMap();

export interface NgElementDef {
  selector: string;
  shadowRoot: ShadowRootInit | false;
  props: {},
  attrs: string[];
  resolved: boolean;

}

export interface NgElementRef {
  markForCheck(): void;
  detectChanges(): void;
  setInput(name: string, value: any): void;
}



export interface NgElementConstructor<P> {
  /**
   * An array of observed attribute names for the custom element,
   * derived by transforming input property names from the source component.
   */
  readonly observedAttributes: string[] | undefined;
  readonly ngElementDef: NgElementDef;
  readonly ngDefined: boolean;

  /**
   * Initializes a constructor instance.
   * @param injector The source component's injector.
   */
  new (): NgHostElement & P;
}



export class NgHostElement extends HTMLElement {
  /**
   * @nocollapse
   * */
  static ngElementDef: NgElementDef | undefined | null = null;
  private __ngData?: any[];

  /**
   * @nocollapse
   *  */
  static get observedAttributes(): string[]{
    this.ngDefine();
    return readAttributes(this as NgElementConstructor<any>);
  }

  static ngDefined = false;

  /**
   * @nocollapse
   * */
  static ngDefine(){
    const superCtor = Object.getPrototypeOf(this);
    if (!superCtor.hasOwnProperty('ngDefined')) {
      superCtor.ngDefine();
    }
    defineNgElement(this as NgElementConstructor<any>);
  }
  constructor(){
    super();
    this.__attachNgInternals();
  }
  private __attachNgInternals(){
    const element = this;
    const elementDef = readElementDef((element.constructor as NgElementConstructor<any>));
    if(elementDef && elementDef.resolved){
      this.__ngData = createElementData(element, elementDef);
    }
  }

}

function defineNgElement(elementCtor: NgElementConstructor<any>){
  if(elementCtor.ngDefined) return;
  (elementCtor as any).ngDefined = true;
  const def = readElementDef(elementCtor);
  console.log(def);
  if(def && def.props){
    console.log('defining props')
    Object.keys(def.props).forEach(propName => defineProp(elementCtor, propName));
  }
}

function defineProp(ctor: NgElementConstructor<any>, propName:string){
  Object.defineProperty(ctor.prototype, propName, {
    set(value){
      const ctx = this;
      setProp(ctx, propName, value);
    },
    get(){
      const ctx = this;
      return readProp(ctx, propName);
    }
})
}

function setProp(element: NgHostElement, propName: string, value: any){
  console.log('setting prop...', element), propName, value;
}
function readProp(element: NgHostElement, propName: string){
  console.log('reading prop', element, propName)
}

function readAttributes(elementCtor: NgElementConstructor<any>){
  return elementCtor.ngElementDef ? elementCtor.ngElementDef.attrs : [];
}

function readElementData(hostElement: NgHostElement){
  return (hostElement as any).__ngData;
}

function createElementData(hostElement: NgHostElement, elementDef: NgElementDef){
  return [];
}



function readElementDef(hostElement:NgElementConstructor<any>): NgElementDef | undefined {
  const def = (hostElement.constructor as typeof NgHostElement).ngElementDef;
  if(def && def.resolved){
    return def;
  }
}
