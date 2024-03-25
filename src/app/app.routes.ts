import { Routes } from '@angular/router';
import { PickerViewComponent } from '../components/picker-view/picker-view.component';
import { SetsViewComponent } from '../components/sets-view/sets-view.component';
import { PredictionsViewComponent } from '../components/predictions-view/predictions-view.component';
import { SetDetailsComponent } from '../components/set-details/set-details.component';
import { PredictionDetailsComponent } from '../components/prediction-details/prediction-details.component';
import { HomeViewComponent } from '../components/home-view/home-view.component';
import { BallDetailsComponent } from '../components/ball-details/ball-details.component';
import { BallViewComponent } from '../components/ball-view/ball-view.component';
import { MegaBallDetailsComponent } from '../components/mega-ball-details/mega-ball-details.component';
import { MegaBallViewComponent } from '../components/mega-ball-view/mega-ball-view.component';

export const routes: Routes = [
	{ path: '', component: HomeViewComponent, title: 'Home' },
	{ path: 'picker', component: PickerViewComponent, title: 'Picker' },
	{ path: 'set', component: SetDetailsComponent, title: 'Winning Set' },
	{ path: 'sets', component: SetsViewComponent, title: 'Winning Sets' },
	{ path: 'ball', component: BallDetailsComponent, title: 'Ball Statistics' },
	{ path: 'balls', component: BallViewComponent, title: 'Balls' },
	{ path: 'mega-ball', component: MegaBallDetailsComponent, title: 'Mega Ball' },
	{ path: 'mega-balls', component: MegaBallViewComponent, title: 'Mega Balls' },
	{ path: 'prediction', component: PredictionDetailsComponent, title: 'Prediction' },
	{ path: 'predictions', component: PredictionsViewComponent, title: 'Predictions' },
];
