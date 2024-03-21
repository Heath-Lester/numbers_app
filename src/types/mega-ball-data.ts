import { MegaBall } from './mega-ball';

export type MegaBallData = {
	/** The mega ball for this data set */
	megaBall: number;
	/** Total number of times the mega ball has been drawn */
	totalDraws: number;
	/** Percentage the mega ball was drawn to total number of winning sets */
	drawPercentage: number;
	/** The most recent date the mega ball was drawn */
	lastDraw: Date | null;
	/** The date the ball was first drawn */
	firstDraw: Date | null;
	/** All of the dates the mega ball was drawn */
	drawnDates: Date[];
	/** How many drawings have occurred since the last time the mega ball was drawn */
	intervalSinceLastDrawing: number;
	/** Maximum number of sets that occurred before the mega ball was drawn again */
	maxDrawInterval: number;
	/** Minimum number of sets that occurred before the mega ball was drawn again */
	minDrawInterval: number;
	/** Mean number of sets that occurred before the mega ball was drawn again */
	meanDrawInterval: number | null;
	/** Mode number of sets that occurred before the mega ball was drawn again */
	modeDrawInterval: number | null;
	/** Instances of the mode number of sets that occurred before the mega ball was drawn again */
	modeDrawInstances: number | null;
};
