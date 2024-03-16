import { Routes } from '@angular/router';
import { PickerViewComponent } from '../components/picker-view/picker-view.component';
import { NumbersViewComponent } from '../components/numbers-view/numbers-view.component';
import { SetsViewComponent } from '../components/sets-view/sets-view.component';
import { PredictionsViewComponent } from '../components/predictions-view/predictions-view.component';
import { NumberDetailsComponent } from '../components/number-details/number-details.component';
import { SetDetailsComponent } from '../components/set-details/set-details.component';
import { PredictionDetailsComponent } from '../components/prediction-details/prediction-details.component';

export const routes: Routes = [
	{ path: 'picker', component: PickerViewComponent },
	{ path: 'set', component: SetDetailsComponent },
	{ path: 'sets', component: SetsViewComponent },
	{ path: 'number', component: NumberDetailsComponent },
	{ path: 'numbers', component: NumbersViewComponent },
	{ path: 'predictions', component: PredictionsViewComponent },
	{ path: 'prediction', component: PredictionDetailsComponent },
];
