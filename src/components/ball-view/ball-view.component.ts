import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BallTableComponent } from '../ball-table/ball-table.component';
import { MegaBallTableComponent } from '../mega-ball-table/mega-ball-table.component';
import { BehaviorSubject } from 'rxjs';
import { BallFilter } from '../../types/ball-filter';
import { BallTableFilterComponent } from '../ball-table-filter/ball-table-filter.component';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-ball-view',
	standalone: true,
	imports: [BallTableComponent, MegaBallTableComponent, BallTableFilterComponent, CommonModule],
	templateUrl: './ball-view.component.html',
	styleUrl: './ball-view.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BallViewComponent {
	private readonly newBallFilter: BallFilter = {
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

	protected readonly ballFilter = new BehaviorSubject<BallFilter>(this.newBallFilter);
	protected readonly ballCutoff = new BehaviorSubject<number>(0);
	protected readonly dateCutoff = new BehaviorSubject<Date>(new Date(0));
	protected readonly filterExpanded = new BehaviorSubject<boolean>(false);
}
