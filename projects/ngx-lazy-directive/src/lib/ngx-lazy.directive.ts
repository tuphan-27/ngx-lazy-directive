import {
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[ngxLazyDirective]',
  standalone: true,
})
export class NgxLazyDirective implements OnChanges {
  /**
   * A function of importing component
   */
  @Input() loadChild!: () => Promise<any>;
  /**
   * Inputs of the host component
   */
  @Input() inputs!: Record<string, any>;
  /**
   * Event handlers of the host component
   * Note: event handlers should be arrow functions
   */
  @Input() outputs!: Record<string, any>;

  /**
   * Occurring when starting to lazy load the component
   */
  @Output() started = new EventEmitter();
  /**
   * Occurring when finishing lazy loading the component
   */
  @Output() completed = new EventEmitter();

  componentRef!: ComponentRef<any>;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['loadChild']?.currentValue) {
      this.loadComponent();
    }

    if (changes['inputs']?.currentValue && this.componentRef) {
      this.bindingInputs();
    }

    if (changes['outputs']?.currentValue && this.componentRef) {
      this.bindingOutputs();
    }
  }

  loadComponent() {
    this.started.emit();

    this.loadChild().then((component) => {
      this.componentRef = this.viewContainer.createComponent(
        component[Object.keys(component)[0]]
      );

      this.bindingInputs();
      this.bindingOutputs();

      this.completed.emit();

      this.changeDetectorRef.detectChanges();
    });
  }

  bindingInputs() {
    Object.keys(this.inputs ?? {}).forEach((input) => {
      this.componentRef.instance[input] = this.inputs[input];
    });
  }

  bindingOutputs() {
    Object.keys(this.outputs ?? {}).forEach((output) => {
      this.componentRef.instance[output].observers = [
        {
          next: (event: any) => {
            this.outputs[output](event);
          },
        },
      ];
    });
  }
}
