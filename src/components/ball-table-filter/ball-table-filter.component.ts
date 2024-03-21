import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject, Subscription, combineLatest, skip } from 'rxjs';
import { BallFilter } from '../../types/ball-filter';

@Component({
	selector: 'app-ball-table-filter',
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
		MatSelectModule,
	],
	templateUrl: './ball-table-filter.component.html',
	styleUrl: './ball-table-filter.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BallTableFilterComponent {
	@Input() ballFilter?: BehaviorSubject<BallFilter>;
	protected earliestDate = new Date('2010-2-1');
	protected latestDate = new Date();

	protected cutoffDates: Date[] = new Array(this.latestDate.getFullYear() - this.earliestDate.getFullYear() + 1)
		.fill(this.latestDate.getFullYear())
		.map((value, index) => {
			return new Date(`1-1-${value - index}`);
		});

	@Output() protected cutoffDate = new BehaviorSubject<Date>(this.cutoffDates[7]);

	protected ballStart = new BehaviorSubject<number | null>(null);
	protected ballEnd = new BehaviorSubject<number | null>(null);
	protected totalDrawsStart = new BehaviorSubject<number | null>(null);
	protected totalDrawsEnd = new BehaviorSubject<number | null>(null);
	protected percentageStart = new BehaviorSubject<number | null>(null);
	protected percentageEnd = new BehaviorSubject<number | null>(null);
	protected recentDrawStart = new BehaviorSubject<Date | null>(null);
	protected recentDrawEnd = new BehaviorSubject<Date | null>(null);
	protected currentDrawStart = new BehaviorSubject<number | null>(null);
	protected currentDrawEnd = new BehaviorSubject<number | null>(null);
	protected meanDrawStart = new BehaviorSubject<number | null>(null);
	protected meanDrawEnd = new BehaviorSubject<number | null>(null);
	protected maximumDrawStart = new BehaviorSubject<number | null>(null);
	protected maximumDrawEnd = new BehaviorSubject<number | null>(null);
	protected minimumDrawStart = new BehaviorSubject<number | null>(null);
	protected minimumDrawEnd = new BehaviorSubject<number | null>(null);
	protected modeDrawStart = new BehaviorSubject<number | null>(null);
	protected modeDrawEnd = new BehaviorSubject<number | null>(null);

	private filterSubscription: Subscription = combineLatest([
		this.ballStart,
		this.ballEnd,
		this.totalDrawsStart,
		this.totalDrawsEnd,
		this.percentageStart,
		this.percentageEnd,
		this.recentDrawStart,
		this.recentDrawEnd,
		this.currentDrawStart,
		this.currentDrawEnd,
		this.meanDrawStart,
		this.meanDrawEnd,
		this.maximumDrawStart,
		this.maximumDrawEnd,
		this.minimumDrawStart,
		this.minimumDrawEnd,
		this.modeDrawStart,
		this.modeDrawEnd,
	])
		.pipe(skip(1))
		.subscribe(
			([
				ballStart,
				ballEnd,
				totalDrawsStart,
				totalDrawsEnd,
				percentageStart,
				percentageEnd,
				recentDrawStart,
				recentDrawEnd,
				currentDrawStart,
				currentDrawEnd,
				meanDrawStart,
				meanDrawEnd,
				maximumDrawStart,
				maximumDrawEnd,
				minimumDrawStart,
				minimumDrawEnd,
				modeDrawStart,
				modeDrawEnd,
			]) => {
				this.ballFilter?.next({
					ballStart,
					ballEnd,
					totalDrawsStart,
					totalDrawsEnd,
					percentageStart,
					percentageEnd,
					recentDrawStart,
					recentDrawEnd,
					currentDrawStart,
					currentDrawEnd,
					meanDrawStart,
					meanDrawEnd,
					maximumDrawStart,
					maximumDrawEnd,
					minimumDrawStart,
					minimumDrawEnd,
					modeDrawStart,
					modeDrawEnd,
				});
			}
		);

	ngOnDestroy(): void {
		this.filterSubscription.unsubscribe();
	}

	protected getBallStartMax(): number {
		if (this.ballEnd.value !== null) {
			return this.ballEnd.value;
		} else {
			return 75;
		}
	}

	protected getBallEndMin(): number {
		if (this.ballStart.value !== null) {
			return this.ballStart.value;
		} else {
			return 1;
		}
	}
}
