import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MegaMillionsService } from '../../services/mega-millions.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Ball } from '../../types/ball';
import { Observable, Subject } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

@Component({
	selector: 'app-ball-details',
	standalone: true,
	imports: [MatSelectModule, MatFormFieldModule, CommonModule, HttpClientModule, MatCardModule],
	templateUrl: './ball-details.component.html',
	styleUrl: './ball-details.component.scss',
	providers: [MegaMillionsService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BallDetailsComponent {
	private megaService = inject(MegaMillionsService, { self: true });
	protected balls: Observable<Ball[]> = this.megaService.getAllBalls();
	protected selectedBall = new Subject<Ball>();
}
