import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-picker-view',
	standalone: true,
	imports: [],
	templateUrl: './picker-view.component.html',
	styleUrl: './picker-view.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickerViewComponent {}
