import {RendererType2} from '@angular/core';

export interface NgHostElementDef {
  selector: string;
}

export class NgHostElement extends HTMLElement {
  private _ngElementInternals: void;

  private _attachNgInternals(){

  }

  private _getInitialProps(){}

  protected attachNgInternals(){}

  constructor(){
    super();
    console.log('host init')
  }
}

export function declareHostElement<T>(Component: T){}
