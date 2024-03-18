import { SetFilter } from './../../types/set-filter';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SetTableComponent } from '../set-table/set-table.component';
import { SetTableFilterComponent } from '../set-table-filter/set-table-filter.component';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-sets-view',
	standalone: true,
	imports: [SetTableComponent, SetTableFilterComponent],
	templateUrl: './sets-view.component.html',
	styleUrl: './sets-view.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetsViewComponent {
	protected filter = new BehaviorSubject<SetFilter>({
		indexStart: null,
		indexEnd: null,
		startDate: null,
		endDate: null,
		firstBall: null,
		secondBall: null,
		thirdBall: null,
		fourthBall: null,
		fifthBall: null,
		megaBall: null,
		megaplier: null,
	});
}
