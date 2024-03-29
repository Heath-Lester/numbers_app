import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
	OnDestroy,
	ViewChild,
	inject,
} from '@angular/core';
import { WinningSet } from './../../types/winning-set';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MegaMillionsService } from '../../services/mega-millions.service';
import { BehaviorSubject, Subscription, map, skip, debounceTime, filter, combineLatest, tap, Subject } from 'rxjs';
import { buildSetData, buildSetRangeData } from '../../utils/synthesizers';
import { HttpClientModule } from '@angular/common/http';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SetData } from '../../types/set-data';
import { SetFilter } from '../../types/set-filter';
import { CdkColumnDef } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { SetRangeData } from '../../types/set-range-data';
import { DateSpanPipe } from '../../pipes/date-span.pipe';

@Component({
	selector: 'app-set-table',
	standalone: true,
	templateUrl: './set-table.component.html',
	styleUrl: './set-table.component.scss',
	providers: [MegaMillionsService, CdkColumnDef, DateSpanPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		MatTableModule,
		HttpClientModule,
		MatSortModule,
		CommonModule,
		MatProgressBarModule,
		MatCardModule,
		MatDividerModule,
		DateSpanPipe,
	],
})
export class SetTableComponent implements AfterViewInit, OnDestroy {
	@Input({ required: false }) set setFilter(setFilter: BehaviorSubject<SetFilter> | undefined) {
		if (setFilter) {
			this.filterSubscription = setFilter
				.asObservable()
				.pipe(
					skip(1),
					filter((filter: SetFilter) => {
						const isStartIndexLargerThanEndIndex: boolean =
							filter.indexStart !== null &&
							filter.indexEnd !== null &&
							filter.indexStart > filter.indexEnd;
						const isStartDateLargerThanEndDate: boolean =
							filter.startDate !== null &&
							filter.endDate !== null &&
							new Date(filter.startDate).getTime() > new Date(filter.endDate).getTime();
						return !isStartIndexLargerThanEndIndex && !isStartDateLargerThanEndDate;
					}),
					debounceTime(1000)
				)
				.subscribe((filter: SetFilter) => (this.dataSource.filter = JSON.stringify(filter)));
		}
	}
	@Input({ required: true }) set dateCutoff(dateCutoff: BehaviorSubject<Date>) {
		if (dateCutoff) {
			this.dataSubscription = combineLatest([this.megaService.getAllWinningSets(), dateCutoff.asObservable()])
				.pipe(
					debounceTime(500),
					map(([sets, dateCutoff]) =>
						sets.filter((set: WinningSet) => set.date.getTime() > dateCutoff.getTime())
					),
					map((sets: WinningSet[]) =>
						sets.sort((a: WinningSet, b: WinningSet) => a.date.getTime() - b.date.getTime())
					),
					map((sets: WinningSet[]) => buildSetData(sets)),
					map((setsData: SetData[]) => setsData.sort((a: SetData, b: SetData) => b.index - a.index)),
					tap((setsData: SetData[]) => (this.footerData = buildSetRangeData(setsData)))
				)
				.subscribe((ballData: SetData[]) => {
					this.dataSource.data = ballData;
					this.changeDetector.markForCheck();
				});
		}
	}

	@ViewChild(MatSort) set sort(sort: MatSort) {
		if (sort) {
			this.dataSource.sort = sort;
		}
	}

	private megaService = inject(MegaMillionsService, { self: true });
	private changeDetector = inject(ChangeDetectorRef, { self: true });
	private filterSubscription?: Subscription;
	private dataSubscription?: Subscription;
	private recalculateSpans = new Subject<void>();
	private recalculateSpansSubscription = this.recalculateSpans
		.asObservable()
		.pipe(debounceTime(10))
		.subscribe(() => {
			this.footerData = buildSetRangeData(this.dataSource.filteredData);
			this.changeDetector.markForCheck();
		});
	protected dataSource = new MatTableDataSource<SetData>();
	protected footerData?: SetRangeData;

	protected displayedColumns: string[] = [
		'index',
		'date',
		'firstBall',
		'secondBall',
		'thirdBall',
		'fourthBall',
		'fifthBall',
		'megaBall',
		'megaplier',
	];

	ngAfterViewInit(): void {
		this.dataSource.filterPredicate = this.filterPredicate;
	}

	ngOnDestroy(): void {
		this.dataSubscription?.unsubscribe();
		this.filterSubscription?.unsubscribe();
		this.recalculateSpansSubscription.unsubscribe();
	}

	private filterPredicate = (data: SetData, filter: string): boolean => {
		if (!filter || filter.length === 0) {
			return true;
		}
		const filterObject: SetFilter = Object.assign({} as SetFilter, JSON.parse(filter));

		const afterStartIndex: boolean = filterObject.indexStart === null || filterObject.indexStart <= data.index;
		const beforeEndIndex: boolean = filterObject.indexEnd === null || filterObject.indexEnd >= data.index;
		const afterStartDate: boolean =
			filterObject.startDate === null ||
			(data.date !== null && new Date(filterObject.startDate).getTime() <= data.date?.getTime());
		const beforeEndDate: boolean =
			filterObject.endDate === null ||
			(data.date !== null && new Date(filterObject.endDate).getTime() >= data.date?.getTime());
		const ballMatch: boolean =
			filterObject.ball === null ||
			filterObject.ball === data.firstBall ||
			filterObject.ball === data.secondBall ||
			filterObject.ball === data.thirdBall ||
			filterObject.ball === data.fourthBall ||
			filterObject.ball === data.fifthBall;
		const firstBallMatch: boolean = filterObject.firstBall === null || filterObject.firstBall === data.firstBall;
		const secondBallMatch: boolean =
			filterObject.secondBall === null || filterObject.secondBall === data.secondBall;
		const thirdBallMatch: boolean = filterObject.thirdBall === null || filterObject.thirdBall === data.thirdBall;
		const fourthBallMatch: boolean =
			filterObject.fourthBall === null || filterObject.fourthBall === data.fourthBall;
		const fifthBallMatch: boolean = filterObject.fifthBall === null || filterObject.fifthBall === data.fifthBall;
		const megaBallMatch: boolean = filterObject.megaBall === null || filterObject.megaBall === data.megaBall;
		const megaplierMatch: boolean = filterObject.megaplier === null || filterObject.megaplier === data.megaplier;

		this.recalculateSpans.next();
		if (filterObject.ball === null) {
			return (
				afterStartIndex &&
				beforeEndIndex &&
				afterStartDate &&
				beforeEndDate &&
				firstBallMatch &&
				secondBallMatch &&
				thirdBallMatch &&
				fourthBallMatch &&
				fifthBallMatch &&
				megaBallMatch &&
				megaplierMatch
			);
		} else {
			return (
				afterStartIndex &&
				beforeEndIndex &&
				afterStartDate &&
				beforeEndDate &&
				ballMatch &&
				megaBallMatch &&
				megaplierMatch
			);
		}
	};
}
