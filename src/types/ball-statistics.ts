import { Ball } from './ball';
import { DrawnPosition } from './drawnPosition';

export type BallStatistics = {
	index: number;
	setNumber: number;
	drawDate: Date;
	drawnPosition: DrawnPosition;
	drawPercentage: number;
	drawInterval: number;
	adjacentBall: Ball | null;
};
