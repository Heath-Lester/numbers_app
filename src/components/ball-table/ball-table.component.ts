import { WinningSet } from './../../types/winning-set';
import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { BallData } from '../../types/ball-data';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MegaMillionsService } from '../../services/mega-millions.service';
import { Subscription, combineLatest, map } from 'rxjs';
import { Ball } from '../../types/ball';
import { buildBallData } from '../../utils/ball-synthesizer';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'app-ball-table',
	standalone: true,
	imports: [MatTableModule, MatCheckboxModule, HttpClientModule],
	templateUrl: './ball-table.component.html',
	styleUrl: './ball-table.component.scss',
	providers: [MegaMillionsService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BallTableComponent implements OnDestroy {
	private megaService = inject(MegaMillionsService, { self: true });

	private ballData: Subscription = combineLatest([
		this.megaService.getAllBalls(),
		this.megaService.getAllWinningSets(),
	])
		.pipe(map(([balls, sets]: [Ball[], WinningSet[]]) => balls.map((ball: Ball) => buildBallData(ball, sets))))
		.subscribe((ballData: BallData[]) => (this.dataSource.data = ballData));

	protected dataSource = new MatTableDataSource<BallData>();

	ngOnDestroy(): void {
		this.ballData.unsubscribe();
	}
}
