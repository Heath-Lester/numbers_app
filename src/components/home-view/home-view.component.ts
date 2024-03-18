import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewComponent {

}
