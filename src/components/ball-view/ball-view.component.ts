import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BallTableComponent } from '../ball-table/ball-table.component';
import { MegaBallTableComponent } from '../mega-ball-table/mega-ball-table.component';

@Component({
	selector: 'app-ball-view',
	standalone: true,
	imports: [BallTableComponent, MegaBallTableComponent],
	templateUrl: './ball-view.component.html',
	styleUrl: './ball-view.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BallViewComponent {}
