import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, ViewChild, inject } from '@angular/core';
import { MegaMillionsService } from '../../services/mega-millions.service';
import { BehaviorSubject, Subscription, combineLatest, debounceTime, filter, first, map, skip, tap } from 'rxjs';
import { MegaBall } from '../../types/mega-ball';
import { WinningSet } from '../../types/winning-set';
import { buildBallAverageData, buildMegaBallData } from '../../utils/synthesizers';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MegaBallData } from '../../types/mega-ball-data';
import { HttpClientModule } from '@angular/common/http';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressBar } from '@angular/material/progress-bar';
import { BallAverageData } from '../../types/ball-average-data';
import { MatDividerModule } from '@angular/material/divider';
import { BallFilter } from '../../types/ball-filter';

@Component({
	selector: 'app-mega-ball-table',
	standalone: true,
	imports: [MatTableModule, HttpClientModule, MatSortModule, MatProgressBar, MatDividerModule],
	templateUrl: './mega-ball-table.component.html',
	styleUrl: './mega-ball-table.component.scss',
	providers: [MegaMillionsService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MegaBallTableComponent implements OnDestroy, AfterViewInit {
	@Input() set ballFilter(setFilter: BehaviorSubject<BallFilter> | undefined) {
		if (setFilter) {
			this.filterSubscription = setFilter
				.asObservable()
				.pipe(
					skip(1),
					filter((filter: BallFilter) => {
						const isStartBallLargerThanEndBall: boolean =
							filter.ballStart !== null && filter.ballEnd !== null && filter.ballStart > filter.ballEnd;
						const isLastStartDateLargerThanEndDate: boolean =
							filter.lastDrawStart !== null &&
							filter.lastDrawEnd !== null &&
							new Date(filter.lastDrawStart).getTime() > new Date(filter.lastDrawEnd).getTime();
						const isFirstStartDateLargerThanEndDate: boolean =
							filter.firstDrawStart !== null &&
							filter.firstDrawEnd !== null &&
							new Date(filter.firstDrawStart).getTime() > new Date(filter.firstDrawEnd).getTime();
						return (
							!isStartBallLargerThanEndBall &&
							!isLastStartDateLargerThanEndDate &&
							!isFirstStartDateLargerThanEndDate
						);
					}),
					debounceTime(1000)
				)
				.subscribe((filter: BallFilter) => (this.dataSource.filter = JSON.stringify(filter)));
		}
	}
	private filterSubscription?: Subscription;
	private megaService = inject(MegaMillionsService, { self: true });

	private megaBallData: Subscription = combineLatest([
		this.megaService.getAllMegaBalls(),
		this.megaService.getAllWinningSets(),
	])
		.pipe(
			map(([megaBalls, sets]: [MegaBall[], WinningSet[]]) =>
				megaBalls.map((megaBall: MegaBall) => buildMegaBallData(megaBall, sets))
			),
			map((megaBallData: MegaBallData[]) =>
				megaBallData.filter((megaBall: MegaBallData) => !!megaBall.firstDraw)
			),
			tap((MegaBallData: MegaBallData[]) => (this.footerData = buildBallAverageData(MegaBallData))),
			first()
		)
		.subscribe((megaBallData: MegaBallData[]) => (this.dataSource.data = megaBallData));

	protected dataSource = new MatTableDataSource<MegaBallData>();
	protected footerData?: BallAverageData;

	protected displayedColumns: string[] = [
		'megaBall',
		'totalDraws',
		'drawPercentage',
		'lastDraw',
		'firstDraw',
		'lastDrawInterval',
		'meanDrawInterval',
		'modeDrawInterval',
		'modeDrawInstances',
		'maxDrawInterval',
		'minDrawInterval',
	];

	@ViewChild(MatSort) set sort(sort: MatSort) {
		if (sort) {
			this.dataSource.sort = sort;
		}
	}

	ngAfterViewInit(): void {
		this.dataSource.filterPredicate = this.filterPredicate;
	}

	ngOnDestroy(): void {
		this.megaBallData.unsubscribe();
		this.filterSubscription?.unsubscribe();
	}

	protected displayTimeSpan(date: Date): string {
		const epochStart = new Date(0);
		const years = date.getFullYear() - epochStart.getFullYear();
		const months = date.getMonth();
		const days = date.getDay();

		return `${years}ys ${months}ms ${days}ds`;
	}

	private filterPredicate = (data: MegaBallData, filter: string): boolean => {
		if (!filter || filter.length === 0) {
			return true;
		}
		const filterObject: BallFilter = Object.assign({} as BallFilter, JSON.parse(filter));

		const afterBallStart: boolean = filterObject.ballStart === null || filterObject.ballStart <= data.megaBall;
		const beforeBallEnd: boolean = filterObject.ballEnd === null || filterObject.ballEnd >= data.megaBall;
		const afterTotalStart: boolean =
			filterObject.totalDrawsStart === null || filterObject.totalDrawsStart <= data.totalDraws;
		const beforeTotalEnd: boolean =
			filterObject.totalDrawsEnd === null || filterObject.totalDrawsEnd >= data.totalDraws;
		const afterPercentStart: boolean =
			filterObject.percentageStart === null || filterObject.percentageStart <= data.drawPercentage;
		const beforePercentEnd: boolean =
			filterObject.percentageEnd === null || filterObject.percentageEnd >= data.drawPercentage;
		const afterLastDrawStart: boolean =
			filterObject.lastDrawStart === null ||
			(data.lastDraw !== null && new Date(filterObject.lastDrawStart).getTime() <= data.lastDraw?.getTime());
		const beforeLastDrawEnd: boolean =
			filterObject.lastDrawEnd === null ||
			(data.lastDraw !== null && new Date(filterObject.lastDrawEnd).getTime() <= data.lastDraw?.getTime());
		const afterFirstDrawStart: boolean =
			filterObject.firstDrawStart === null ||
			(data.firstDraw !== null && new Date(filterObject.firstDrawStart).getTime() <= data.firstDraw?.getTime());
		const beforeFirstDrawEnd: boolean =
			filterObject.firstDrawEnd === null ||
			(data.firstDraw !== null && new Date(filterObject.firstDrawEnd).getTime() <= data.firstDraw?.getTime());
		const afterCurrentDrawStart: boolean =
			filterObject.currentDrawStart === null || filterObject.currentDrawStart <= data.lastDrawInterval;
		const beforeCurrentDrawEnd: boolean =
			filterObject.currentDrawEnd === null || filterObject.currentDrawEnd >= data.lastDrawInterval;
		const afterMeanDrawStart: boolean =
			filterObject.meanDrawStart === null ||
			(data.meanDrawInterval !== null && filterObject.meanDrawStart <= data.meanDrawInterval);
		const beforeMeanDrawEnd: boolean =
			filterObject.meanDrawEnd === null ||
			(data.meanDrawInterval !== null && filterObject.meanDrawEnd >= data.meanDrawInterval);
		const afterMaximumDrawStart: boolean =
			filterObject.maximumDrawStart === null || filterObject.maximumDrawStart <= data.maxDrawInterval;
		const beforeMaximumDrawEnd: boolean =
			filterObject.maximumDrawEnd === null || filterObject.maximumDrawEnd >= data.maxDrawInterval;
		const afterMinimumDrawStart: boolean =
			filterObject.minimumDrawStart === null || filterObject.minimumDrawStart <= data.minDrawInterval;
		const beforeMinimumDrawEnd: boolean =
			filterObject.minimumDrawEnd === null || filterObject.minimumDrawEnd >= data.minDrawInterval;
		const afterModeDrawStart: boolean =
			filterObject.modeDrawStart === null ||
			(data.modeDrawInterval !== null && filterObject.modeDrawStart <= data.modeDrawInterval);
		const beforeModeDrawEnd: boolean =
			filterObject.modeDrawEnd === null ||
			(data.modeDrawInterval !== null && filterObject.modeDrawEnd >= data.modeDrawInterval);
		const afterModeInstanceStart: boolean =
			filterObject.modeInstanceStart === null ||
			(data.modeDrawInstances !== null && filterObject.modeInstanceStart <= data.modeDrawInstances);
		const beforeModeInstanceEnd: boolean =
			filterObject.modeInstanceEnd === null ||
			(data.modeDrawInstances !== null && filterObject.modeInstanceEnd >= data.modeDrawInstances);

		return (
			afterBallStart &&
			beforeBallEnd &&
			afterTotalStart &&
			beforeTotalEnd &&
			afterPercentStart &&
			beforePercentEnd &&
			afterLastDrawStart &&
			beforeLastDrawEnd &&
			afterFirstDrawStart &&
			beforeFirstDrawEnd &&
			afterCurrentDrawStart &&
			beforeCurrentDrawEnd &&
			afterMeanDrawStart &&
			beforeMeanDrawEnd &&
			afterMaximumDrawStart &&
			beforeMaximumDrawEnd &&
			afterMinimumDrawStart &&
			beforeMinimumDrawEnd &&
			afterModeDrawStart &&
			beforeModeDrawEnd &&
			afterModeInstanceStart &&
			beforeModeInstanceEnd
		);
	};
}
