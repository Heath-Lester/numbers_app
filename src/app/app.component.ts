import { SideBarComponent } from '../components/side-bar/side-bar.component';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router, RouterOutlet, Event } from '@angular/router';
import { TopBarComponent } from '../components/top-bar/top-bar.component';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, TopBarComponent, SideBarComponent, CommonModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	providers: [Router],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	protected sidebarToggle = new BehaviorSubject<boolean>(false);
	protected router = inject(Router, { self: true });
	protected title: Observable<string | undefined> = this.router.events.pipe(
		filter((event: Event) => event instanceof ActivationEnd),
		map((event: Event) => event as ActivationEnd),
		map((end: ActivationEnd) => {
			if (typeof end.snapshot.routeConfig?.title === 'string') {
				return end.snapshot.routeConfig?.title;
			} else {
				return '';
			}
		})
	);
}
