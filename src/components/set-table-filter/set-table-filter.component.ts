import { ChangeDetectionStrategy, Component, Input, OnDestroy, Output } from '@angular/core';
import { SetFilter } from '../../types/set-filter';
import { BehaviorSubject, Subject, Subscription, combineLatest, skip } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

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
		MatSelectModule,
	],
	templateUrl: './set-table-filter.component.html',
	styleUrl: './set-table-filter.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetTableFilterComponent implements OnDestroy {
	@Input() setFilter?: BehaviorSubject<SetFilter>;

	protected earliestDate = new Date('2010-2-1');
	protected latestDate = new Date();

	protected cutoffDates: Date[] = new Array(this.latestDate.getFullYear() - this.earliestDate.getFullYear() + 1)
		.fill(this.latestDate.getFullYear())
		.map((value, index) => {
			return new Date(`1-1-${value - index}`);
		});

	@Output() protected cutoffDate = new BehaviorSubject<Date>(this.cutoffDates[7]);

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

	protected getStartIndexMax(): number {
		if (this.indexEnd.value !== null) {
			return this.indexEnd.value;
		} else {
			return 2000;
		}
	}

	protected getEndIndexMin(): number {
		if (this.indexStart.value !== null) {
			return this.indexStart.value;
		} else {
			return 1;
		}
	}

	protected firstBallMax(): number {
		if (this.secondBall.value !== null) {
			return this.secondBall.value - 1;
		} else if (this.thirdBall.value !== null) {
			return this.thirdBall.value - 2;
		} else if (this.fourthBall.value !== null) {
			return this.fourthBall.value - 3;
		} else if (this.fifthBall.value !== null) {
			return this.fifthBall.value - 4;
		} else {
			return 71;
		}
	}
	protected secondBallMax(): number {
		if (this.thirdBall.value !== null) {
			return this.thirdBall.value - 1;
		} else if (this.fourthBall.value !== null) {
			return this.fourthBall.value - 2;
		} else if (this.fifthBall.value !== null) {
			return this.fifthBall.value - 3;
		} else {
			return 72;
		}
	}
	protected thirdBallMax(): number {
		if (this.fourthBall.value !== null) {
			return this.fourthBall.value - 1;
		} else if (this.fifthBall.value !== null) {
			return this.fifthBall.value - 2;
		} else {
			return 73;
		}
	}
	protected fourthBallMax(): number {
		if (this.fifthBall.value !== null) {
			return this.fifthBall.value - 1;
		} else {
			return 74;
		}
	}
	protected fifthBallMin(): number {
		if (this.fourthBall.value !== null) {
			return this.fourthBall.value + 1;
		} else if (this.thirdBall.value !== null) {
			return this.thirdBall.value + 2;
		} else if (this.secondBall.value !== null) {
			return this.secondBall.value + 3;
		} else if (this.firstBall.value !== null) {
			return this.firstBall.value + 4;
		} else {
			return 5;
		}
	}
	protected fourthBallMin(): number {
		if (this.thirdBall.value !== null) {
			return this.thirdBall.value + 1;
		} else if (this.secondBall.value !== null) {
			return this.secondBall.value + 2;
		} else if (this.firstBall.value !== null) {
			return this.firstBall.value + 3;
		} else {
			return 4;
		}
	}
	protected thirdBallMin(): number {
		if (this.secondBall.value !== null) {
			return this.secondBall.value + 1;
		} else if (this.firstBall.value !== null) {
			return this.firstBall.value + 2;
		} else {
			return 3;
		}
	}
	protected secondBallMin(): number {
		if (this.firstBall.value !== null) {
			return this.firstBall.value + 1;
		} else {
			return 2;
		}
	}
}
