import { AdjacentBalls } from './adjacent-balls';
import { DrawnPositions } from './drawn-positions';

export type BallData = {
	/** The ball for this data set */
	ball: number;
	/** Total number of times the ball has been drawn */
	totalDraws: number;
	/** Percentage of when a ball was drawn to total number of winning sets */
	drawPercentage: number;
	/** The most recent date the ball was drawn */
	lastDraw: Date | null;
	/** The date the ball was first drawn */
	firstDraw: Date | null;
	/** All of the dates a ball was drawn */
	drawnDates: Date[];
	/** How many drawings have occurred since the last time the ball was drawn */
	intervalSinceLastDrawing: number;
	/** Maximum number of sets that occurred before the ball was drawn again */
	maxDrawInterval: number;
	/** Minimum number of sets that occurred before the ball was drawn again */
	minDrawInterval: number;
	/** Mean number of sets that occurred before the ball was drawn again */
	meanDrawInterval: number | null;
	/** Mode number of sets that occurred before the ball was drawn again */
	modeDrawInterval: number | null;
	/** Instances of the mode number of sets that occurred before the ball was drawn again */
	modeDrawInstances: number | null;
	/** The positions that a ball was drawn in and how many times it was drawn in the relevant position */
	drawnPositions: DrawnPositions;
	/** The next ball that was drawn and how many that same number was drawn adjacently */
	adjacentBalls: AdjacentBalls;
};
