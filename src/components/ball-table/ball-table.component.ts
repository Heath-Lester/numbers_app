import { WinningSet } from './../../types/winning-set';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { BallData } from '../../types/ball-data';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MegaMillionsService } from '../../services/mega-millions.service';
import { Subscription, combineLatest, first, map } from 'rxjs';
import { Ball } from '../../types/ball';
import { buildBallData } from '../../utils/synthesizers';
import { HttpClientModule } from '@angular/common/http';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
	selector: 'app-ball-table',
	standalone: true,
	imports: [MatTableModule, HttpClientModule, MatSortModule, MatProgressBar],
	templateUrl: './ball-table.component.html',
	styleUrl: './ball-table.component.scss',
	providers: [MegaMillionsService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BallTableComponent implements AfterViewInit, OnDestroy {
	private megaService = inject(MegaMillionsService, { self: true });

	private ballData: Subscription = combineLatest([
		this.megaService.getAllBalls(),
		this.megaService.getAllWinningSets(),
	])
		.pipe(
			map(([balls, sets]: [Ball[], WinningSet[]]) => balls.map((ball: Ball) => buildBallData(ball, sets))),
			first()
		)
		.subscribe((ballData: BallData[]) => (this.dataSource.data = ballData));

	protected dataSource = new MatTableDataSource<BallData>();

	@ViewChild(MatSort) sort!: MatSort;

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
	}

	ngOnDestroy(): void {
		this.ballData.unsubscribe();
	}
}
