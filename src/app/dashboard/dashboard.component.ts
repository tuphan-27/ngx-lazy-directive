import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { NgxLazyDirective } from 'ngx-lazy-directive';

const LAZY_LOADED_COMPONENTS = {
  'app-chart': () => import('src/app/dashboard/components/chart/chart.component'),
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NgxLazyDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent {
  LAZY_LOADED_COMPONENTS = LAZY_LOADED_COMPONENTS;

  name = 'Name';
  randomNumber = 0;

  visible = false;

  constructor() {}

  onNameChanged = () => {
    this.name = `Name ${Math.round(Math.random()*2)}`;
  };

  randomNumberChanged = (value: number) => {
    this.randomNumber = value;
  };

  onClicked = () => {
    this.visible = true;
  };
}
