import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-top-bar',
	standalone: true,
	imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, MatTooltipModule, CommonModule],
	templateUrl: './top-bar.component.html',
	styleUrl: './top-bar.component.scss',
	providers: [Router],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
	@Input({ required: true }) title?: string;
	@Input({ required: true }) menuToggle!: BehaviorSubject<boolean>;

	protected router = inject(Router, { self: true });
	protected goToMega() {
		const url: string = encodeURI('https://www.megamillions.com/Winning-Numbers/Previous-Drawings.aspx');
		window.open(url, '_blank');
	}
}
