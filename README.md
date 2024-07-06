## Getting Started

`ngx-lazy-directive` provides an easy way to lazy load components combined with \*ngIf directive, thereby reducing the Firrst Contentful Paint time when a module becomes larger.

## Installation

```
npm install ngx-lazy-directive
```

## Usage

1. Import the `ngx-lazy-directive` directive to the parent component(a component accomodating the lazy loaded component) and allow it to contain none-Angular elements named with dash case(-) using CUSTOM_ELEMENTS_SCHEMA.

```
@Component({
  ...
  standalone: true,
  imports: [LazyLoadDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  ...
})
export class DashboardComponent {
```

2. Define a list of component should be lazy loaded.

```
export const LAZY_LOADED_COMPONENTS = {
	'app-chart': () => import('src/app/dashboard/chat.component.ts')
}
```

3. Pass the import function to the `loadChild` property.

```
<app-chart  *ngIf="visible"
      		ngxLazyDirective
      		[loadChild]="LAZY_LOADED_COMPONENTS['app-chart']">
</app-chart>
```

4. Pass binding data and event handlers for the lazy loaded component within inputs and outputs objects.

```
<app-chart  *ngIf="visible"
      		ngxLazyDirective
      		[loadChild]="LAZY_LOADED_COMPONENTS['app-chart']"
      		[inputs]="{
        		dataSource: dataSource,
        		name: name
      		}"
      		[outputs]="{
        		nameChanged: onNameChanged
      		}">
</app-chart>
```

5. Define event handlers.
   **Note**: Event handlers should be arrow functions.

```
onNameChanged = (name: string) => {
	this.name = name;
}
```
