import { DateSpanPipe } from '../../pipes/date-span/date-span.pipe';
import { WinningSet } from './../../types/winning-set';
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
import { BallData } from '../../types/ball-data';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MegaMillionsService } from '../../services/mega-millions.service';
import { BehaviorSubject, Subscription, combineLatest, debounceTime, map, skip, tap } from 'rxjs';
import { Ball } from '../../types/ball';
import { buildBallData, buildBallAverageData } from '../../utils/synthesizers';
import { HttpClientModule } from '@angular/common/http';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressBar } from '@angular/material/progress-bar';
import { CdkColumnDef } from '@angular/cdk/table';
import { BallAverageData } from '../../types/ball-average-data';
import { BallFilter } from '../../types/ball-filter';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PercentToPipe } from '../../pipes/percent-to/percent-to.pipe';
import { MeanPipe } from '../../pipes/mean/mean.pipe';

@Component({
	selector: 'app-ball-table',
	standalone: true,
	imports: [
		MatTableModule,
		HttpClientModule,
		MatSortModule,
		MatProgressBar,
		CommonModule,
		MatCardModule,
		MatCardModule,
		DateSpanPipe,
		PercentToPipe,
		MeanPipe,
	],
	templateUrl: './ball-table.component.html',
	styleUrl: './ball-table.component.scss',
	providers: [MegaMillionsService, CdkColumnDef, DateSpanPipe, PercentToPipe, MeanPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BallTableComponent implements OnDestroy, AfterViewInit {
	@Input({ required: false }) set ballFilter(setFilter: BehaviorSubject<BallFilter> | undefined) {
		if (setFilter) {
			this.filterSubscription = setFilter
				.asObservable()
				.pipe(skip(1), debounceTime(1000))
				.subscribe((filter: BallFilter) => (this.dataSource.filter = JSON.stringify(filter)));
		}
	}
	@Input({ required: true }) ballCutoff!: BehaviorSubject<number>;
	@Input({ required: true }) dateCutoff!: BehaviorSubject<Date>;

	private filterSubscription?: Subscription;
	private megaService = inject(MegaMillionsService, { self: true });
	private ballData?: Subscription;
	private changeDetector = inject(ChangeDetectorRef, { self: true });
	protected dataSource = new MatTableDataSource<BallData>();
	protected footerData?: BallAverageData;
	protected selectedRows = new Set<BallData>();
	protected displayedColumns: string[] = [
		'ball',
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
		this.ballData = combineLatest([
			this.megaService.getAllBalls(),
			this.megaService.getAllWinningSets(),
			this.ballCutoff?.asObservable(),
			this.dateCutoff?.asObservable(),
		])
			.pipe(
				map(
					([balls, sets, ballCutoff, dateCutoff]: [Ball[], WinningSet[], number, Date]): [
						Ball[],
						WinningSet[],
					] => [
						balls.filter((ball: Ball) => ball.number <= ballCutoff),
						sets.filter((set: WinningSet) => set.date.getTime() >= dateCutoff.getTime()),
					]
				),
				map(([balls, sets]: [Ball[], WinningSet[]]) => balls.map((ball: Ball) => buildBallData(ball, sets))),
				map((ballData: BallData[]) => ballData.filter((ball: BallData) => !!ball.firstDraw)),
				tap((ballData: BallData[]) => (this.footerData = buildBallAverageData(ballData)))
			)
			.subscribe((ballData: BallData[]) => {
				this.dataSource.data = ballData;
				this.changeDetector.markForCheck();
			});
	}

	ngOnDestroy(): void {
		this.ballData?.unsubscribe();
		this.filterSubscription?.unsubscribe();
	}

	protected handleRowSelection(row: BallData): void {
		if (this.selectedRows.has(row)) {
			this.selectedRows.delete(row);
		} else {
			this.selectedRows.add(row);
		}
	}

	private filterPredicate = (data: BallData, filter: string): boolean => {
		if (!filter || filter.length === 0) {
			return true;
		}
		const filterObject: BallFilter = Object.assign({} as BallFilter, JSON.parse(filter));

		const afterBallStart: boolean = filterObject.ballStart === null || filterObject.ballStart <= data.ball;
		const beforeBallEnd: boolean = filterObject.ballEnd === null || filterObject.ballEnd >= data.ball;
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
			(data.lastDraw !== null && new Date(filterObject.lastDrawEnd).getTime() >= data.lastDraw?.getTime());
		const afterFirstDrawStart: boolean =
			filterObject.firstDrawStart === null ||
			(data.firstDraw !== null && new Date(filterObject.firstDrawStart).getTime() <= data.firstDraw?.getTime());
		const beforeFirstDrawEnd: boolean =
			filterObject.firstDrawEnd === null ||
			(data.firstDraw !== null && new Date(filterObject.firstDrawEnd).getTime() >= data.firstDraw?.getTime());
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
