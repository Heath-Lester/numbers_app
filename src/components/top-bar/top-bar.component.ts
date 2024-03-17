import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-top-bar',
	standalone: true,
	imports: [MatToolbarModule, MatButtonModule, MatIconModule],
	templateUrl: './top-bar.component.html',
	styleUrl: './top-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
	@Input({ required: false }) title?: string;
	@Input() menuToggle!: BehaviorSubject<boolean>;
}
