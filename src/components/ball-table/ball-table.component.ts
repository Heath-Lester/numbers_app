import { WinningSet } from './../../types/winning-set';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { BallData } from '../../types/ball-data';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MegaMillionsService } from '../../services/mega-millions.service';
import { Subscription, combineLatest, first, map, tap } from 'rxjs';
import { Ball } from '../../types/ball';
import { buildBallData, buildBallAverageData } from '../../utils/synthesizers';
import { HttpClientModule } from '@angular/common/http';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressBar } from '@angular/material/progress-bar';
import { CdkColumnDef } from '@angular/cdk/table';
import { BallAverageData } from '../../types/ball-average-data';

@Component({
	selector: 'app-ball-table',
	standalone: true,
	imports: [MatTableModule, HttpClientModule, MatSortModule, MatProgressBar],
	templateUrl: './ball-table.component.html',
	styleUrl: './ball-table.component.scss',
	providers: [MegaMillionsService, CdkColumnDef],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BallTableComponent implements OnDestroy {
	private megaService = inject(MegaMillionsService, { self: true });

	private ballData: Subscription = combineLatest([
		this.megaService.getAllBalls(),
		this.megaService.getAllWinningSets(),
	])
		.pipe(
			map(([balls, sets]: [Ball[], WinningSet[]]) => balls.map((ball: Ball) => buildBallData(ball, sets))),
			map((ballData: BallData[]) => ballData.filter((ball: BallData) => !!ball.firstDraw)),
			tap((ballData: BallData[]) => (this.footerData = buildBallAverageData(ballData))),
			first()
		)
		.subscribe((ballData: BallData[]) => (this.dataSource.data = ballData));

	protected dataSource = new MatTableDataSource<BallData>();

	protected footerData?: BallAverageData;

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
			this.dataSource.sort = this.sort;
		}
	}

	ngOnDestroy(): void {
		this.ballData.unsubscribe();
	}

	protected displayTimeSpan(date: Date): string {
		const epochStart = new Date(0);
		const years = date.getFullYear() - epochStart.getFullYear();
		const months = date.getMonth();
		const days = date.getDay();

		return `${years}yrs ${months}mths ${days}dys`;
	}
}
