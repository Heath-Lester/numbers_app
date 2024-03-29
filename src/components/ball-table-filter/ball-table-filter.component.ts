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
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';

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
		MatButtonModule,
		MatDividerModule,
		MatExpansionModule,
	],
	templateUrl: './ball-table-filter.component.html',
	styleUrl: './ball-table-filter.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BallTableFilterComponent {
	@Input({ required: true }) ballFilter!: BehaviorSubject<BallFilter>;
	@Input({ required: true }) set numberOfBalls(numberOfBalls: number | undefined) {
		if (numberOfBalls !== undefined) {
			this.cutoffBalls = new Array(numberOfBalls).fill(numberOfBalls).map((value, index) => {
				return value - index;
			});
		}
	}
	@Input({ required: true }) set initialBallCutoff(ball: number | undefined) {
		if (ball !== undefined && this.cutoffBalls) {
			this.ballCutoff.next(this.cutoffBalls.find((a) => a === ball) ?? 0);
		}
	}
	protected readonly earliestDate = new Date('2010-2-1');
	protected readonly latestDate = new Date();
	protected cutoffBalls: number[] = [];
	protected readonly cutoffDates: Date[] = new Array(
		this.latestDate.getFullYear() - this.earliestDate.getFullYear() + 1
	)
		.fill(this.latestDate.getFullYear())
		.map((value, index) => {
			return new Date(`1-1-${value - index}`);
		});

	@Output() protected readonly ballCutoff = new BehaviorSubject<number>(0);
	@Output() protected readonly dateCutoff = new BehaviorSubject<Date>(this.cutoffDates[6]);
	@Output() protected readonly filterExpanded = new BehaviorSubject<boolean>(false);

	protected readonly ballStart = new BehaviorSubject<number | null>(null);
	protected readonly ballEnd = new BehaviorSubject<number | null>(null);
	protected readonly totalDrawsStart = new BehaviorSubject<number | null>(null);
	protected readonly totalDrawsEnd = new BehaviorSubject<number | null>(null);
	protected readonly percentageStart = new BehaviorSubject<number | null>(null);
	protected readonly percentageEnd = new BehaviorSubject<number | null>(null);
	protected readonly lastDrawStart = new BehaviorSubject<Date | null>(null);
	protected readonly lastDrawEnd = new BehaviorSubject<Date | null>(null);
	protected readonly firstDrawStart = new BehaviorSubject<Date | null>(null);
	protected readonly firstDrawEnd = new BehaviorSubject<Date | null>(null);
	protected readonly currentDrawStart = new BehaviorSubject<number | null>(null);
	protected readonly currentDrawEnd = new BehaviorSubject<number | null>(null);
	protected readonly meanDrawStart = new BehaviorSubject<number | null>(null);
	protected readonly meanDrawEnd = new BehaviorSubject<number | null>(null);
	protected readonly maximumDrawStart = new BehaviorSubject<number | null>(null);
	protected readonly maximumDrawEnd = new BehaviorSubject<number | null>(null);
	protected readonly minimumDrawStart = new BehaviorSubject<number | null>(null);
	protected readonly minimumDrawEnd = new BehaviorSubject<number | null>(null);
	protected readonly modeDrawStart = new BehaviorSubject<number | null>(null);
	protected readonly modeDrawEnd = new BehaviorSubject<number | null>(null);
	protected readonly modeInstanceStart = new BehaviorSubject<number | null>(null);
	protected readonly modeInstanceEnd = new BehaviorSubject<number | null>(null);

	private filterSubscription: Subscription = combineLatest([
		this.ballStart,
		this.ballEnd,
		this.totalDrawsStart,
		this.totalDrawsEnd,
		this.percentageStart,
		this.percentageEnd,
		this.lastDrawStart,
		this.lastDrawEnd,
		this.firstDrawStart,
		this.firstDrawEnd,
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
		this.modeInstanceStart,
		this.modeInstanceEnd,
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
				lastDrawStart,
				lastDrawEnd,
				firstDrawStart,
				firstDrawEnd,
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
				modeInstanceStart,
				modeInstanceEnd,
			]) => {
				this.ballFilter?.next({
					ballStart,
					ballEnd,
					totalDrawsStart,
					totalDrawsEnd,
					percentageStart,
					percentageEnd,
					lastDrawStart,
					lastDrawEnd,
					firstDrawStart,
					firstDrawEnd,
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
					modeInstanceStart,
					modeInstanceEnd,
				});
			}
		);

	ngOnDestroy(): void {
		this.filterSubscription.unsubscribe();
	}

	protected displayString(subject: BehaviorSubject<number | null>, defaultNumber: number): string {
		if (subject.value !== null) {
			return subject.value.toString();
		} else {
			return defaultNumber.toString();
		}
	}
}
