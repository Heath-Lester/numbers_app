import { DrawnPosition } from './drawn-position';

export type BallStatsMeanModeRange = {
	total: number;
	descendingDrawnPositions: DrawnPosition[];
	modePosition: DrawnPosition | null;
	meanDrawPercentage: number;
	drawnIntervalMean: number;
	drawnIntervalMode: number;
	drawnIntervalMax: number | null;
	drawnIntervalMin: number | null;
	leftBallMean: number;
	leftBallMode: number;
	leftBallMin: number | null;
	leftBallMax: number | null;
	rightBallMean: number;
	rightBallMode: number;
	rightBallMin: number | null;
	rightBallMax: number | null;
};
