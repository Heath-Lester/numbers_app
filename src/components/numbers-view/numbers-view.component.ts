import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-numbers-view',
  standalone: true,
  imports: [],
  templateUrl: './numbers-view.component.html',
  styleUrl: './numbers-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumbersViewComponent {

}
