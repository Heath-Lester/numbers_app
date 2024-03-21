import { MegaBall } from './../types/mega-ball';
import { BallData } from '../types/ball-data';
import { Ball } from '../types/ball';
import { WinningSet } from '../types/winning-set';
import { MegaBallData } from '../types/mega-ball-data';
import { SetData } from '../types/set-data';
import { BallAverageData } from '../types/ball-average-data';

function getModeAndInstances(numbers: number[]): [number, number] | [null, null] {
	if (numbers.length === 0) return [null, null];

	const instanceMap = new Map<number, number>();

	for (const number of numbers) {
		const instances: number | undefined = instanceMap.get(number);
		if (instances !== undefined) {
			instanceMap.set(number, instances + 1);
		} else {
			instanceMap.set(number, 1);
		}
	}
	let maxInstance = 0;
	let currentMode = 0;

	for (const [key, value] of instanceMap.entries()) {
		if (value >= maxInstance) {
			maxInstance = value;
			currentMode = key;
		}
	}

	return [currentMode, maxInstance];
}

function getMean(numbers: number[]): number | null {
	if (numbers.length === 0) return null;
	return numbers.reduce((p, c) => p + c, 0) / numbers.length;
}

export function buildBallData(ball: Ball, sets: WinningSet[]): BallData {
	sets.sort((a: WinningSet, b: WinningSet) => a.date.getTime() - b.date.getTime());

	const data: BallData = {
		ball: ball.number,
		totalDraws: 0,
		drawPercentage: 0,
		lastDrawInterval: 0,
		maxDrawInterval: 0,
		minDrawInterval: 0,
		meanDrawInterval: null,
		modeDrawInterval: null,
		modeDrawInstances: null,
		lastDraw: null,
		firstDraw: null,
		drawnDates: new Array<Date>(),
		drawnPositions: new Map(),
		adjacentBalls: new Map(),
	};

	let drawInterval: number = 0;
	const drawIntervals: number[] = [];

	for (const set of sets) {
		if (
			ball.id === set.firstBall.id ||
			ball.id === set.secondBall.id ||
			ball.id === set.thirdBall.id ||
			ball.id === set.fourthBall.id ||
			ball.id === set.fifthBall.id
		) {
			data.drawnDates.push(set.date);
			data.totalDraws++;
			if (data.firstDraw == null) {
				data.firstDraw = set.date;
			}
			if (data.lastDraw === null || data.lastDraw.getTime() < set.date.getTime()) {
				data.lastDraw = set.date;
			}

			if (ball.id === set.firstBall.id) {
				const position: number | undefined = data.drawnPositions.get('firstBall');
				if (position !== undefined) {
					data.drawnPositions.set('firstBall', position + 1);
				} else {
					data.drawnPositions.set('firstBall', 1);
				}
				const adjacentBall: number | undefined = data.adjacentBalls.get(set.secondBall.number);
				if (adjacentBall !== undefined) {
					data.adjacentBalls.set(set.secondBall.number, adjacentBall + 1);
				} else {
					data.adjacentBalls.set(set.secondBall.number, 1);
				}
			} else if (ball.id === set.secondBall.id) {
				const position: number | undefined = data.drawnPositions.get('secondBall');
				if (position !== undefined) {
					data.drawnPositions.set('secondBall', position + 1);
				} else {
					data.drawnPositions.set('secondBall', 1);
				}
				const adjacentBall: number | undefined = data.adjacentBalls.get(set.thirdBall.number);
				if (adjacentBall !== undefined) {
					data.adjacentBalls.set(set.thirdBall.number, adjacentBall + 1);
				} else {
					data.adjacentBalls.set(set.thirdBall.number, 1);
				}
			} else if (ball.id === set.thirdBall.id) {
				const position: number | undefined = data.drawnPositions.get('thirdBall');
				if (position !== undefined) {
					data.drawnPositions.set('thirdBall', position + 1);
				} else {
					data.drawnPositions.set('thirdBall', 1);
				}
				const adjacentBall: number | undefined = data.adjacentBalls.get(set.fourthBall.number);
				if (adjacentBall !== undefined) {
					data.adjacentBalls.set(set.fourthBall.number, adjacentBall + 1);
				} else {
					data.adjacentBalls.set(set.fourthBall.number, 1);
				}
			} else if (ball.id === set.fourthBall.id) {
				const position: number | undefined = data.drawnPositions.get('fourthBall');
				if (position !== undefined) {
					data.drawnPositions.set('fourthBall', position + 1);
				} else {
					data.drawnPositions.set('fourthBall', 1);
				}
				const adjacentBall: number | undefined = data.adjacentBalls.get(set.fifthBall.number);
				if (adjacentBall !== undefined) {
					data.adjacentBalls.set(set.fifthBall.number, adjacentBall + 1);
				} else {
					data.adjacentBalls.set(set.fifthBall.number, 1);
				}
			} else if (ball.id === set.fifthBall.id) {
				const position: number | undefined = data.drawnPositions.get('fifthBall');
				if (position !== undefined) {
					data.drawnPositions.set('fifthBall', position + 1);
				} else {
					data.drawnPositions.set('fifthBall', 1);
				}
			}

			if (drawInterval > data.maxDrawInterval) {
				data.maxDrawInterval = drawInterval;
			}

			if (data.minDrawInterval === 0) {
				data.minDrawInterval = drawInterval;
			} else if (drawInterval < data.minDrawInterval) {
				data.minDrawInterval = drawInterval;
			}

			drawIntervals.push(drawInterval);
			drawInterval = 0;
		} else {
			drawInterval++;
		}
	}

	data.lastDrawInterval = drawInterval;
	data.drawPercentage = (data.totalDraws / sets.length) * 100;
	data.meanDrawInterval = getMean(drawIntervals);
	const [mode, modeInstances] = getModeAndInstances(drawIntervals);
	data.modeDrawInterval = mode;
	data.modeDrawInstances = modeInstances;

	return data;
}

export function buildMegaBallData(megaBall: MegaBall, sets: WinningSet[]): MegaBallData {
	sets.sort((a: WinningSet, b: WinningSet) => a.date.getTime() - b.date.getTime());

	const data: MegaBallData = {
		megaBall: megaBall.number,
		totalDraws: 0,
		drawPercentage: 0,
		lastDrawInterval: 0,
		maxDrawInterval: 0,
		minDrawInterval: 0,
		meanDrawInterval: null,
		modeDrawInterval: null,
		modeDrawInstances: null,
		lastDraw: null,
		firstDraw: null,
		drawnDates: new Array<Date>(),
	};

	let drawInterval: number = 0;

	const drawIntervals: number[] = [];

	for (const set of sets) {
		if (megaBall.id === set.megaBall.id) {
			data.drawnDates.push(set.date);
			data.totalDraws++;
			if (data.firstDraw == null) {
				data.firstDraw = set.date;
			}
			if (data.lastDraw === null || data.lastDraw.getTime() < set.date.getTime()) {
				data.lastDraw = set.date;
			}

			if (drawInterval > data.maxDrawInterval) {
				data.maxDrawInterval = drawInterval;
			}

			if (data.minDrawInterval === 0) {
				data.minDrawInterval = drawInterval;
			} else if (drawInterval < data.minDrawInterval) {
				data.minDrawInterval = drawInterval;
			}

			drawIntervals.push(drawInterval);
			drawInterval = 0;
		} else {
			drawInterval++;
		}
	}

	data.lastDrawInterval = drawInterval;
	data.meanDrawInterval = getMean(drawIntervals);
	data.drawPercentage = (data.totalDraws / sets.length) * 100;
	const [mode, modeInstances] = getModeAndInstances(drawIntervals);
	data.modeDrawInterval = mode;
	data.modeDrawInstances = modeInstances;

	return data;
}

export function buildBallAverageData(balls: BallData[] | MegaBallData[]): BallAverageData {
	let totalTotalDraws: number = 0;
	let totalDrawPercentage: number = 0;
	let lastDrawMax: Date = new Date(0);
	let lastDrawMin: Date = new Date(0);
	let firstDrawMax: Date = new Date(0);
	let firstDrawMin: Date = new Date(0);
	let totalLastDrawInterval: number = 0;
	let totalMaxDrawInterval: number = 0;
	let totalMinDrawInterval: number = 0;
	let totalMeanDrawInterval: number = 0;
	let totalModeDrawInterval: number = 0;
	let totalModeDrawInstances: number = 0;

	for (const ball of balls) {
		totalTotalDraws += ball.totalDraws;
		totalDrawPercentage += ball.drawPercentage;
		if (
			lastDrawMax.getTime() === 0 ||
			(ball.lastDraw && ball.lastDraw.getTime() > new Date(lastDrawMax).getTime())
		) {
			lastDrawMax = ball.lastDraw ?? new Date(0);
		} else if (
			lastDrawMin.getTime() === 0 ||
			(ball.lastDraw && ball.lastDraw.getTime() < new Date(lastDrawMin).getTime())
		) {
			lastDrawMin = ball.lastDraw ?? new Date(0);
		}
		if (
			firstDrawMax.getTime() === 0 ||
			(ball.firstDraw && ball.firstDraw.getTime() > new Date(firstDrawMax).getTime())
		) {
			firstDrawMax = ball.firstDraw ?? new Date(0);
		} else if (
			firstDrawMin.getTime() === 0 ||
			(ball.firstDraw && ball.firstDraw.getTime() < new Date(firstDrawMin).getTime())
		) {
			firstDrawMin = ball.firstDraw ?? new Date(0);
		}
		totalLastDrawInterval += ball.lastDrawInterval;
		totalMaxDrawInterval += ball.maxDrawInterval;
		totalMinDrawInterval += ball.minDrawInterval;
		totalMeanDrawInterval += ball.meanDrawInterval ?? 0;
		totalModeDrawInterval += ball.modeDrawInterval ?? 0;
		totalModeDrawInstances += ball.modeDrawInstances ?? 0;
	}

	const data: BallAverageData = {
		meanTotalDraws: totalTotalDraws / balls.length,
		meanDrawPercentage: totalDrawPercentage / balls.length,
		lastDrawSpan: new Date(lastDrawMax.getTime() - lastDrawMin.getTime()),
		firstDrawSpan: new Date(firstDrawMax.getTime() - firstDrawMin.getTime()),
		meanLastDrawInterval: totalMeanDrawInterval / balls.length,
		meanMaxDrawInterval: totalMaxDrawInterval / balls.length,
		meanMinDrawInterval: totalMinDrawInterval / balls.length,
		meanMeanDrawInterval: totalMeanDrawInterval / balls.length,
		meanModeDrawInterval: totalModeDrawInterval / balls.length,
		meanModeDrawInstances: totalModeDrawInstances / balls.length,
	};

	return data;
}

export function buildSetData(set: WinningSet, index: number): SetData {
	const data: SetData = {
		index,
		date: set.date,
		firstBall: set.firstBall.number,
		secondBall: set.secondBall.number,
		thirdBall: set.thirdBall.number,
		fourthBall: set.fourthBall.number,
		fifthBall: set.fifthBall.number,
		megaBall: set.megaBall.number,
		megaplier: set.megaplier,
	};

	return data;
}