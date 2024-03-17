import { SideBarComponent } from '../components/side-bar/side-bar.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from '../components/top-bar/top-bar.component';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, TopBarComponent, SideBarComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	readonly title: string = 'Numbers';
	protected sidebarToggle = new BehaviorSubject<boolean>(false);
}
