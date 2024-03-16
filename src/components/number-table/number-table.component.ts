import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-number-table',
  standalone: true,
  imports: [],
  templateUrl: './number-table.component.html',
  styleUrl: './number-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberTableComponent {

}
