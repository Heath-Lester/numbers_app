import { Routes } from '@angular/router';
import { PickerViewComponent } from '../components/picker-view/picker-view.component';
import { NumbersViewComponent } from '../components/numbers-view/numbers-view.component';
import { SetsViewComponent } from '../components/sets-view/sets-view.component';
import { PredictionsViewComponent } from '../components/predictions-view/predictions-view.component';
import { NumberDetailsComponent } from '../components/number-details/number-details.component';
import { SetDetailsComponent } from '../components/set-details/set-details.component';
import { PredictionDetailsComponent } from '../components/prediction-details/prediction-details.component';

export const routes: Routes = [
	{ path: 'picker', component: PickerViewComponent, title: 'Picker' },
	{ path: 'set', component: SetDetailsComponent, title: 'Set' },
	{ path: 'sets', component: SetsViewComponent, title: 'Sets' },
	{ path: 'number', component: NumberDetailsComponent, title: 'Number' },
	{ path: 'numbers', component: NumbersViewComponent, title: 'Numbers' },
	{ path: 'prediction', component: PredictionDetailsComponent, title: 'Prediction' },
	{ path: 'predictions', component: PredictionsViewComponent, title: 'Predictions' },
];
