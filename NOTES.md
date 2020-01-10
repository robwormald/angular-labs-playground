## Labs Experiments notes

This repo demonstrates and explores advanced / possible future techniques for Angular applications with a focus on Web Platform APIs

# Embedding Angular applications - `/embedded`

Prototyping leveraging Shadow DOM to embed complete Angular applications inside of "hostile" application. Original use case proposed for embedding AngularTS applications inside of AngularDart.


### Conflicts between `ViewEncapsulation.ShadowRoot` /  `ViewEncapsulation.Emulated` / `ViewEncapsulation.None`

Angular's View Encapsulation uses the global document and global stylesheets to emulate style-encapsultion. Angular's `SharedStylesHost` doesn't have any understanding of Shadow DOM, and so scoped stylesheets are appeneded to the *global* document. This breaks when a Component is renderered into a parent Shadow Root.

### SharedStylesHost cannot easily be overridden

Overriding and extending the behavior of the Renderer API would be the correct way to fix the conflict, but it is not possible to override the `SharedStylesHost` etc via DI, and requires a developer to construct a completely new angular `platform`. This adds a lot of risk (security, maintainence)

#### Angular Material / Component Lib specifics

Developers will likely want to leverage existing component libraries for embedded use cases.
- `@angular/material` (and others) typically assume a global, single document.
- CSS files / "global" stylesheets (eg, material themes) are typically included in the root document, and are thus *excluded in child shadow roots

- "global" JS APIs (portals, toasts, etc) are a conceptual mismatch.

TODO: Investigate this in Constructable Stylesheet demo.

#### Lazy Loading

As Angular's styles are scoped to a component, they are not applied until the component is loaded and instantiated the first time. This can lead to jank / styling issues.

Solution (see example) uses `:defined` / `:not` CSS selectors (replacement for `:unresolved` selector)

```css
embedded-app:not(:defined) {
	flex: 1;
	border: 1px solid yellow;
  }
  ```
TODO: Could Angular automate / split this?

`/constructable-stylesheets`

`/shadow-parts`

TODO: explore replacements for `/ng-deep/`

`/ce-upgrade`

TODO: explore using Angular Elements for NgUpgrade cases


