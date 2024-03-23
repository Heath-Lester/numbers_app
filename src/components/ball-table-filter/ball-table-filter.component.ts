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
	protected earliestDate = new Date('2010-2-1');
	protected latestDate = new Date();
	protected cutoffBalls: number[] = [];
	protected cutoffDates: Date[] = new Array(this.latestDate.getFullYear() - this.earliestDate.getFullYear() + 1)
		.fill(this.latestDate.getFullYear())
		.map((value, index) => {
			return new Date(`1-1-${value - index}`);
		});

	@Output() protected ballCutoff = new BehaviorSubject<number>(0);
	@Output() protected dateCutoff = new BehaviorSubject<Date>(this.cutoffDates[7]);
	@Output() protected filterExpanded = new BehaviorSubject<boolean>(false);

	protected ballStart = new BehaviorSubject<number | null>(null);
	protected ballEnd = new BehaviorSubject<number | null>(null);
	protected totalDrawsStart = new BehaviorSubject<number | null>(null);
	protected totalDrawsEnd = new BehaviorSubject<number | null>(null);
	protected percentageStart = new BehaviorSubject<number | null>(null);
	protected percentageEnd = new BehaviorSubject<number | null>(null);
	protected lastDrawStart = new BehaviorSubject<Date | null>(null);
	protected lastDrawEnd = new BehaviorSubject<Date | null>(null);
	protected firstDrawStart = new BehaviorSubject<Date | null>(null);
	protected firstDrawEnd = new BehaviorSubject<Date | null>(null);
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
	protected modeInstanceStart = new BehaviorSubject<number | null>(null);
	protected modeInstanceEnd = new BehaviorSubject<number | null>(null);

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
