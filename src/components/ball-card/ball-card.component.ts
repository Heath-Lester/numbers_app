import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Ball } from '../../types/ball';
import { MegaBall } from '../../types/mega-ball';
import { MatCardModule } from '@angular/material/card';

@Component({
	selector: 'app-ball-card',
	standalone: true,
	imports: [MatCardModule],
	templateUrl: './ball-card.component.html',
	styleUrl: './ball-card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberCardComponent {
	@Input({ required: false }) protected title!: string;
	@Input({ required: true }) protected ball!: Ball | MegaBall;
}
