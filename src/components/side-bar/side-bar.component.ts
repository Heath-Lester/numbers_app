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
	@Input({ required: true }) toggle!: BehaviorSubject<boolean>;

	protected readonly routes: Routes = [
		{ title: 'Picker', path: '/picker' },
		{ title: 'Predictions', path: '/predictions' },
		{ title: 'Winning Sets', path: '/sets' },
		{ title: 'Balls', path: '/balls' },
		{ title: 'Ball Statistics', path: '/ball' },
		{ title: 'Mega Balls', path: '/mega-balls' },
	];
}
