import { DrawnPosition } from './drawn-position';

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
