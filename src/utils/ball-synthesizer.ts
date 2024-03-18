import { BallData } from './../types/ball-data';
import { Ball } from '../types/ball';
import { WinningSet } from '../types/winning-set';
import { MegaBall } from '../types/mega-ball';
import { MegaBallData } from '../types/mega-ball-data';

export function buildBallData(ball: Ball, sets: WinningSet[]): BallData {
	sets.sort((a: WinningSet, b: WinningSet) => a.date.getTime() - b.date.getTime());

	const data: BallData = {
		ball: ball,
		totalDraws: 0,
		drawPercentage: 0,
		intervalSinceLastDrawing: 0,
		maxDrawInterval: 0,
		minDrawInterval: 0,
		averageDrawInterval: 0,
		mostRecentDraw: null,
		drawnDates: new Array<Date>(),
		drawnPositions: new Map(),
		adjacentBalls: new Map(),
	};

	let drawInterval: number = 0;

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
			if (data.mostRecentDraw === null || data.mostRecentDraw < set.date) {
				data.mostRecentDraw = set.date;
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

			drawInterval = 0;
		} else {
			drawInterval++;
		}
	}

	data.intervalSinceLastDrawing = drawInterval;
	data.averageDrawInterval = (data.maxDrawInterval + data.minDrawInterval) / 2;
	data.drawPercentage = (data.totalDraws / sets.length) * 100;
	return data;
}

export function buildMegaBallData(megaBall: MegaBall, sets: WinningSet[]): MegaBallData {
	sets.sort((a: WinningSet, b: WinningSet) => a.date.getTime() - b.date.getTime());

	const data: MegaBallData = {
		megaBall: megaBall,
		totalDraws: 0,
		drawPercentage: 0,
		intervalSinceLastDrawing: 0,
		maxDrawInterval: 0,
		minDrawInterval: 0,
		averageDrawInterval: 0,
		mostRecentDraw: null,
		drawnDates: new Array<Date>(),
	};

	let drawInterval: number = 0;

	for (const set of sets) {
		if (megaBall.id === set.megaBall.id) {
			data.drawnDates.push(set.date);
			data.totalDraws++;
			if (data.mostRecentDraw === null || data.mostRecentDraw < set.date) {
				data.mostRecentDraw = set.date;
			}

			if (drawInterval > data.maxDrawInterval) {
				data.maxDrawInterval = drawInterval;
			}

			if (data.minDrawInterval === 0) {
				data.minDrawInterval = drawInterval;
			} else if (drawInterval < data.minDrawInterval) {
				data.minDrawInterval = drawInterval;
			}

			drawInterval = 0;
		} else {
			drawInterval++;
		}
	}

	data.intervalSinceLastDrawing = drawInterval;
	data.averageDrawInterval = (data.maxDrawInterval + data.minDrawInterval) / 2;
	data.drawPercentage = (data.totalDraws / sets.length) * 100;

	return data;
}
