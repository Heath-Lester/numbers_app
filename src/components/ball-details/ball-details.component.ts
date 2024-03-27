import { WinningSet } from './../../types/winning-set';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	ViewChild,
	inject,
} from '@angular/core';
import { MegaMillionsService } from '../../services/mega-millions.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Ball } from '../../types/ball';
import { Observable, Subject, combineLatest, debounceTime, filter, map, tap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { BallStatistics } from '../../types/ball-statistics';
import { buildBallStatistics, buildBallStatsMeanModeRangeData } from '../../utils/synthesizers';
import { BallStatsMeanModeRange } from '../../types/ball-stats-mean-mode-range';

@Component({
	selector: 'app-ball-details',
	standalone: true,
	imports: [
		MatSelectModule,
		MatFormFieldModule,
		CommonModule,
		HttpClientModule,
		MatSortModule,
		MatCardModule,
		MatTableModule,
		MatProgressBarModule,
		MatButtonToggleModule,
	],
	templateUrl: './ball-details.component.html',
	styleUrl: './ball-details.component.scss',
	providers: [MegaMillionsService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BallDetailsComponent implements OnDestroy {
	private megaService = inject(MegaMillionsService, { self: true });
	protected balls: Observable<Ball[]> = this.megaService.getAllBalls();
	protected selectedBall = new Subject<Ball>();
	protected dataSource = new MatTableDataSource<BallStatistics>();

	@ViewChild(MatSort) set sort(sort: MatSort) {
		if (sort) {
			this.dataSource.sort = sort;
		}
	}

	protected dataSubscription = combineLatest([this.selectedBall.asObservable(), this.megaService.getAllWinningSets()])
		.pipe(
			filter((selection) => !!selection),
			debounceTime(500),
			map(([ball, sets]: [Ball, WinningSet[]]) => buildBallStatistics(ball, sets)),
			tap((ballStats: BallStatistics[]) => (this.footerData = buildBallStatsMeanModeRangeData(ballStats)))
		)
		.subscribe((ballStats: BallStatistics[]) => {
			this.dataSource.data = ballStats;
			this.changeDetector.markForCheck();
		});
	protected footerData?: BallStatsMeanModeRange;
	private changeDetector = inject(ChangeDetectorRef, { self: true });
	protected displayedColumns: string[] = [
		'index',
		'setNumber',
		'drawDate',
		'drawnPosition',
		'drawPercentage',
		'drawInterval',
		'leftBall',
		'rightBall',
	];

	ngOnDestroy(): void {
		this.dataSubscription.unsubscribe();
	}
}
