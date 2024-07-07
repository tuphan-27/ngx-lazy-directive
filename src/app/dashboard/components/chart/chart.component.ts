import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class ChartComponent {
  @Input() name = '';
  @Input() randomNumber = 0;

  @Output() nameChanged = new EventEmitter<string>();
  @Output() randomNumberChanged = new EventEmitter<number>();

  constructor() {}

  onValueChanged() {
    this.randomNumberChanged.emit(Math.random());
    this.nameChanged.emit();
  }
}
