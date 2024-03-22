import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BallData } from '../../types/ball-data';
import { Ball } from '../../types/ball';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
	selector: 'app-ball-selection-table',
	standalone: true,
	imports: [MatTableModule, MatCheckboxModule],
	templateUrl: './ball-selection-table.component.html',
	styleUrl: './ball-selection-table.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BallSelectionTableComponent {
	@Input({ required: true }) set balls(balls: BallData[]) {
		this.dataSource.data = balls;
	}
	@Input({ required: false }) protected disabledBalls?: Ball[];

	get selection(): SelectionModel<BallData> {
		return this.tableSelection;
	}

	protected tableSelection = new SelectionModel<BallData>(false, []);

	protected dataSource = new MatTableDataSource<BallData>();
}
