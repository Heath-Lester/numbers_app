import { ChangeDetectionStrategy, Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { MegaMillionsService } from '../../services/mega-millions.service';
import { Subscription, combineLatest, first, map, tap } from 'rxjs';
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

@Component({
	selector: 'app-mega-ball-table',
	standalone: true,
	imports: [MatTableModule, HttpClientModule, MatSortModule, MatProgressBar, MatDividerModule],
	templateUrl: './mega-ball-table.component.html',
	styleUrl: './mega-ball-table.component.scss',
	providers: [MegaMillionsService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MegaBallTableComponent implements OnDestroy {
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

	ngOnDestroy(): void {
		this.megaBallData.unsubscribe();
	}

	protected displayTimeSpan(date: Date): string {
		const epochStart = new Date(0);
		const years = date.getFullYear() - epochStart.getFullYear();
		const months = date.getMonth();
		const days = date.getDay();

		return `${years}ys ${months}ms ${days}ds`;
	}
}
