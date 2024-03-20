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
import { BehaviorSubject, Subscription, first, map, skip, debounceTime, filter, tap } from 'rxjs';
import { buildSetData } from '../../utils/synthesizers';
import { HttpClientModule } from '@angular/common/http';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SetData } from '../../types/set-data';
import { SetFilter } from '../../types/set-filter';
import { CdkColumnDef } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
	selector: 'app-set-table',
	standalone: true,
	imports: [
		MatTableModule,
		HttpClientModule,
		MatSortModule,
		CommonModule,
		MatProgressBarModule,
		MatCardModule,
		MatDividerModule,
	],
	templateUrl: './set-table.component.html',
	styleUrl: './set-table.component.scss',
	providers: [MegaMillionsService, CdkColumnDef],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetTableComponent implements AfterViewInit, OnDestroy {
	@Input() set setFilter(setFilter: BehaviorSubject<SetFilter> | undefined) {
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
	private megaService = inject(MegaMillionsService, { self: true });
	private changeDetector = inject(ChangeDetectorRef, { self: true });
	private filterSubscription?: Subscription;
	private dataSubscription: Subscription = this.megaService
		.getAllWinningSets()
		.pipe(
			map((sets: WinningSet[]) =>
				sets.sort((a: WinningSet, b: WinningSet) => a.date.getTime() - b.date.getTime())
			),
			map((sets: WinningSet[]) => sets.map((set: WinningSet, index: number) => buildSetData(set, index + 1))),
			map((sets: SetData[]) => sets.sort((a: SetData, b: SetData) => b.index - a.index)),
			first()
		)
		.subscribe((ballData: SetData[]) => {
			this.dataSource.data = ballData;
			this.changeDetector.markForCheck();
		});

	protected dataSource = new MatTableDataSource<SetData>();

	@ViewChild(MatSort) sort!: MatSort;

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
		const firstBallMatch: boolean = filterObject.firstBall === null || filterObject.firstBall === data.firstBall;
		const secondBallMatch: boolean =
			filterObject.secondBall === null || filterObject.secondBall === data.secondBall;
		const thirdBallMatch: boolean = filterObject.thirdBall === null || filterObject.thirdBall === data.thirdBall;
		const fourthBallMatch: boolean =
			filterObject.fourthBall === null || filterObject.fourthBall === data.fourthBall;
		const fifthBallMatch: boolean = filterObject.fifthBall === null || filterObject.fifthBall === data.fifthBall;
		const megaBallMatch: boolean = filterObject.megaBall === null || filterObject.megaBall === data.megaBall;
		const megaplierMatch: boolean = filterObject.megaplier === null || filterObject.megaplier === data.megaplier;

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
	};

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.filterPredicate = this.filterPredicate;
	}

	ngOnDestroy(): void {
		this.dataSubscription.unsubscribe();
		this.filterSubscription?.unsubscribe();
	}
}
