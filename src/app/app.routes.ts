import { Routes } from '@angular/router';
import { PickerViewComponent } from '../components/picker-view/picker-view.component';
import { SetsViewComponent } from '../components/sets-view/sets-view.component';
import { PredictionsViewComponent } from '../components/predictions-view/predictions-view.component';
import { SetDetailsComponent } from '../components/set-details/set-details.component';
import { PredictionDetailsComponent } from '../components/prediction-details/prediction-details.component';
import { HomeViewComponent } from '../components/home-view/home-view.component';
import { BallDetailsComponent } from '../components/ball-details/ball-details.component';
import { BallViewComponent } from '../components/ball-view/ball-view.component';

export const routes: Routes = [
	{ path: '', component: HomeViewComponent, title: 'Home' },
	{ path: 'picker', component: PickerViewComponent, title: 'Picker' },
	{ path: 'set', component: SetDetailsComponent, title: 'Set' },
	{ path: 'sets', component: SetsViewComponent, title: 'Sets' },
	{ path: 'number', component: BallDetailsComponent, title: 'Number' },
	{ path: 'numbers', component: BallViewComponent, title: 'Numbers' },
	{ path: 'prediction', component: PredictionDetailsComponent, title: 'Prediction' },
	{ path: 'predictions', component: PredictionsViewComponent, title: 'Predictions' },
];
