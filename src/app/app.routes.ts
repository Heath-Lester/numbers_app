import { Routes } from '@angular/router';
import { PickerViewComponent } from '../components/picker-view/picker-view.component';
import { NumbersViewComponent } from '../components/numbers-view/numbers-view.component';
import { SetsViewComponent } from '../components/sets-view/sets-view.component';

export const routes: Routes = [
	{ path: 'picker', component: PickerViewComponent },
	{ path: 'numbers', component: NumbersViewComponent },
	{ path: 'sets', component: SetsViewComponent },
];
