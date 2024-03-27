import { DrawnPosition } from './drawnPosition';

export type BallStatsMeanModeRange = {
	descendingDrawnPositions: DrawnPosition[];
	modePosition: DrawnPosition;
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
