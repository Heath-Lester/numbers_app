import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { SetFilter } from '../../types/set-filter';
import { BehaviorSubject, Subscription, combineLatest, skip } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-set-table-filter',
	standalone: true,
	imports: [
		MatCardModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatDatepickerModule,
		MatSliderModule,
	],
	templateUrl: './set-table-filter.component.html',
	styleUrl: './set-table-filter.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetTableFilterComponent implements OnDestroy {
	@Input() setFilter?: BehaviorSubject<SetFilter>;

	protected earliestDate = new Date('2010-2-1');
	protected latestDate = new Date();

	protected indexStart = new BehaviorSubject<number | null>(null);
	protected indexEnd = new BehaviorSubject<number | null>(null);
	protected startDate = new BehaviorSubject<Date | null>(null);
	protected endDate = new BehaviorSubject<Date | null>(null);
	protected firstBall = new BehaviorSubject<number | null>(null);
	protected secondBall = new BehaviorSubject<number | null>(null);
	protected thirdBall = new BehaviorSubject<number | null>(null);
	protected fourthBall = new BehaviorSubject<number | null>(null);
	protected fifthBall = new BehaviorSubject<number | null>(null);
	protected megaBall = new BehaviorSubject<number | null>(null);
	protected megaplier = new BehaviorSubject<number | null>(null);

	private filterSubscription: Subscription = combineLatest([
		this.indexStart,
		this.indexEnd,
		this.startDate,
		this.endDate,
		this.firstBall,
		this.secondBall,
		this.thirdBall,
		this.fourthBall,
		this.fifthBall,
		this.megaBall,
		this.megaplier,
	])
		.pipe(skip(1))
		.subscribe(
			([
				indexStart,
				indexEnd,
				startDate,
				endDate,
				firstBall,
				secondBall,
				thirdBall,
				fourthBall,
				fifthBall,
				megaBall,
				megaplier,
			]) => {
				this.setFilter?.next({
					indexStart,
					indexEnd,
					startDate,
					endDate,
					firstBall,
					secondBall,
					thirdBall,
					fourthBall,
					fifthBall,
					megaBall,
					megaplier,
				});
			}
		);

	ngOnDestroy(): void {
		this.filterSubscription.unsubscribe();
	}
}
