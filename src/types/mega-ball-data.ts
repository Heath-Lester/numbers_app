import { MegaBall } from './mega-ball';

export type MegaBallData = {
	megaBall: MegaBall;
	totalDraws: number;
	drawPercentage: number;
	mostRecentDraw: Date | null;
	drawnDates: Date[];
	intervalSinceLastDrawing: number;
	maxDrawInterval: number;
	minDrawInterval: number;
	averageDrawInterval: number;
};
