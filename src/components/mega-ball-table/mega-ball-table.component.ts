import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { MegaMillionsService } from '../../services/mega-millions.service';
import { Subscription, combineLatest, first, map } from 'rxjs';
import { MegaBall } from '../../types/mega-ball';
import { WinningSet } from '../../types/winning-set';
import { buildMegaBallData } from '../../utils/synthesizers';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MegaBallData } from '../../types/mega-ball-data';
import { HttpClientModule } from '@angular/common/http';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
	selector: 'app-mega-ball-table',
	standalone: true,
	imports: [MatTableModule, HttpClientModule, MatSortModule, MatProgressBar],
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
				megaBalls.map((megaBall: MegaBall) => buildMegaBallData(megaBall, sets))
			),
			map((megaBallData: MegaBallData[]) =>
				megaBallData.filter((megaBall: MegaBallData) => !!megaBall.firstDraw)
			),
			first()
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
