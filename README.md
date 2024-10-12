## Getting Started

`ngx-lazy-directive` provides an easy way to lazy load components combined with `*ngIf` directive, thereby reducing the Firrst Contentful Paint time when a module becomes larger.

### Angular Version

- Support for Angular version 15

## Installation

```sh
npm install ngx-lazy-directive
```

## Usage

1. Define a list of components should be lazy loaded.

**Note**: components should be standalone.

```js
export const LAZY_LOADED_COMPONENTS = {
 'app-chart': () => import('src/app/dashboard/components/chart.component.ts')
}
```

2. Pass the import function to the `loadChild` property.

```html
<ng-container
     *ngIf="visible"
     ngxLazyDirective
     [loadChild]="LAZY_LOADED_COMPONENTS['app-chart']">
</ng-container>
```

3. Pass binding data and event handlers to the lazy loaded component using the inputs and outputs properties.

```html
<ng-container
    *ngIf="visible"
    ngxLazyDirective
    [loadChild]="LAZY_LOADED_COMPONENTS['app-chart']"
    [inputs]="{
      dataSource: dataSource,
      name: name
    }"
    [outputs]="{
      nameChanged: onNameChanged
    }">
</ng-container>
```

4. Define event handlers.

```js
// Event handlers must be arrow functions
onNameChanged = (name: string) => {
  this.name = name;
}
```
