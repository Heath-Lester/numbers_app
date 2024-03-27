import { DrawnPosition } from './drawnPosition';

export type BallStatistics = {
	index: number;
	setNumber: number;
	drawDate: Date;
	drawnPosition: DrawnPosition;
	drawPercentage: number;
	drawInterval: number;
	rightBall: number | null;
	leftBall: number | null;
};
