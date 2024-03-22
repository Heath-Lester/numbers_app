import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BallFilter } from '../../types/ball-filter';
import { MegaBallTableComponent } from '../mega-ball-table/mega-ball-table.component';
import { BallTableFilterComponent } from '../ball-table-filter/ball-table-filter.component';

@Component({
	selector: 'app-mega-ball-view',
	standalone: true,
	imports: [MegaBallTableComponent, BallTableFilterComponent],
	templateUrl: './mega-ball-view.component.html',
	styleUrl: './mega-ball-view.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MegaBallViewComponent {
	private newBallFilter: BallFilter = {
		ballStart: null,
		ballEnd: null,
		totalDrawsStart: null,
		totalDrawsEnd: null,
		percentageStart: null,
		percentageEnd: null,
		lastDrawStart: null,
		lastDrawEnd: null,
		firstDrawStart: null,
		firstDrawEnd: null,
		currentDrawStart: null,
		currentDrawEnd: null,
		meanDrawStart: null,
		meanDrawEnd: null,
		maximumDrawStart: null,
		maximumDrawEnd: null,
		minimumDrawStart: null,
		minimumDrawEnd: null,
		modeDrawStart: null,
		modeDrawEnd: null,
		modeInstanceStart: null,
		modeInstanceEnd: null,
	};

	protected megaBallFilter = new BehaviorSubject<BallFilter>(this.newBallFilter);
	protected ballCutoff = new BehaviorSubject<number>(0);
	protected dateCutoff = new BehaviorSubject<Date>(new Date(0));
}
