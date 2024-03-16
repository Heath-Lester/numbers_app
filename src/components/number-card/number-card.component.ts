import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-number-card',
  standalone: true,
  imports: [],
  templateUrl: './number-card.component.html',
  styleUrl: './number-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberCardComponent {

}
