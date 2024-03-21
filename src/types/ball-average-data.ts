export type BallAverageData = {
	/** Average numbers of times all balls have been drawn */
	meanTotalDraws: number;
	/** Average percentage of when all balls were drawn to the total number of winning sets */
	meanDrawPercentage: number;
	/** The span of time between when all balls were most recently drawn */
	lastDrawSpan: Date;
	/** The span of time between when all balls were most recently drawn */
	firstDrawSpan: Date;
	/** Average of number of drawings that have occurred since the last time all balls were drawn */
	meanLastDrawInterval: number;
	/** Average number of the maximum number of sets that occurred before all balls were drawn again */
	meanMaxDrawInterval: number;
	/** Average number of minimum number of sets that occurred before all balls were drawn again */
	meanMinDrawInterval: number;
	/** Average number of the mean number of sets that occurred before all balls were drawn again */
	meanMeanDrawInterval: number;
	/** Average number of mode number of sets that occurred before all balls were drawn again */
	meanModeDrawInterval: number;
	/** Average number of instances of the mode number of sets that occurred before all balls were drawn again */
	meanModeDrawInstances: number;
};
