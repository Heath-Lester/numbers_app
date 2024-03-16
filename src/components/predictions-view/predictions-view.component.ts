import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-predictions-view',
  standalone: true,
  imports: [],
  templateUrl: './predictions-view.component.html',
  styleUrl: './predictions-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictionsViewComponent {

}
