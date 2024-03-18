import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';

@Component({
	selector: 'app-side-bar',
	standalone: true,
	imports: [MatSidenavModule, CommonModule, MatListModule, RouterModule],
	templateUrl: './side-bar.component.html',
	styleUrl: './side-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent {
	@Input() toggle!: BehaviorSubject<boolean>;

	protected readonly routes: Routes = [
		{ title: 'Picker', path: '/picker' },
		{ title: 'Predictions', path: '/predictions' },
		{ title: 'Sets', path: '/sets' },
		{ title: 'Numbers', path: '/numbers' },
	];
}
