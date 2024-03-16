import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-number-details',
  standalone: true,
  imports: [],
  templateUrl: './number-details.component.html',
  styleUrl: './number-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberDetailsComponent {

}
