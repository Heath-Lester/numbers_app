import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NumberCardComponent } from '../ball-card/ball-card.component';
import { MegaMillionsService } from '../../services/mega-millions.service';
import { Observable } from 'rxjs';
import { Ball } from '../../types/ball';
import { MegaBall } from '../../types/mega-ball';

@Component({
	selector: 'app-picker-view',
	standalone: true,
	imports: [NumberCardComponent],
	templateUrl: './picker-view.component.html',
	styleUrl: './picker-view.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickerViewComponent {
	private megaService = inject(MegaMillionsService);

	protected balls: Observable<Ball[]> = this.megaService.getAllBalls();
	protected megaBalls: Observable<MegaBall[]> = this.megaService.getAllMegaBalls();
}
