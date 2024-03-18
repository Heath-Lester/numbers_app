import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { MegaMillionsService } from '../../services/mega-millions.service';
import { Subscription, combineLatest, map } from 'rxjs';
import { MegaBall } from '../../types/mega-ball';
import { WinningSet } from '../../types/winning-set';
import { buildMegaBallData } from '../../utils/ball-synthesizer';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MegaBallData } from '../../types/mega-ball-data';
import { HttpClientModule } from '@angular/common/http';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
	selector: 'app-mega-ball-table',
	standalone: true,
	imports: [MatTableModule, HttpClientModule, MatSortModule],
	templateUrl: './mega-ball-table.component.html',
	styleUrl: './mega-ball-table.component.scss',
	providers: [MegaMillionsService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MegaBallTableComponent {
	private megaService = inject(MegaMillionsService, { self: true });

	private megaBallData: Subscription = combineLatest([
		this.megaService.getAllMegaBalls(),
		this.megaService.getAllWinningSets(),
	])
		.pipe(
			map(([megaBalls, sets]: [MegaBall[], WinningSet[]]) =>
				megaBalls.map((ball: MegaBall) => buildMegaBallData(ball, sets))
			)
		)
		.subscribe((megaBallData: MegaBallData[]) => (this.dataSource.data = megaBallData));

	protected dataSource = new MatTableDataSource<MegaBallData>();

	@ViewChild(MatSort) sort!: MatSort;

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
	}

	ngOnDestroy(): void {
		this.megaBallData.unsubscribe();
	}
}
