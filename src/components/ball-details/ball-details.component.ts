import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ball-details',
  standalone: true,
  imports: [],
  templateUrl: './ball-details.component.html',
  styleUrl: './ball-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BallDetailsComponent {

}
