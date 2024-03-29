import { MegaBall } from './../types/mega-ball';
import { BallData } from '../types/ball-data';
import { Ball } from '../types/ball';
import { WinningSet } from '../types/winning-set';
import { MegaBallData } from '../types/mega-ball-data';
import { SetData } from '../types/set-data';
import { BallAverageData } from '../types/ball-average-data';
import { SetRangeData } from '../types/set-range-data';
import { BallStatistics } from '../types/ball-statistics';
import { DrawnPosition } from '../types/drawnPosition';
import { BallStatsMeanModeRange } from '../types/ball-stats-mean-mode-range';

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
				const position: number | undefined = data.drawnPositions.get(1);
				if (position !== undefined) {
					data.drawnPositions.set(1, position + 1);
				} else {
					data.drawnPositions.set(1, 1);
				}
				const adjacentBall: number | undefined = data.adjacentBalls.get(set.secondBall.number);
				if (adjacentBall !== undefined) {
					data.adjacentBalls.set(set.secondBall.number, adjacentBall + 1);
				} else {
					data.adjacentBalls.set(set.secondBall.number, 1);
				}
			} else if (ball.id === set.secondBall.id) {
				const position: number | undefined = data.drawnPositions.get(2);
				if (position !== undefined) {
					data.drawnPositions.set(2, position + 1);
				} else {
					data.drawnPositions.set(2, 1);
				}
				const adjacentBall: number | undefined = data.adjacentBalls.get(set.thirdBall.number);
				if (adjacentBall !== undefined) {
					data.adjacentBalls.set(set.thirdBall.number, adjacentBall + 1);
				} else {
					data.adjacentBalls.set(set.thirdBall.number, 1);
				}
			} else if (ball.id === set.thirdBall.id) {
				const position: number | undefined = data.drawnPositions.get(3);
				if (position !== undefined) {
					data.drawnPositions.set(3, position + 1);
				} else {
					data.drawnPositions.set(3, 1);
				}
				const adjacentBall: number | undefined = data.adjacentBalls.get(set.fourthBall.number);
				if (adjacentBall !== undefined) {
					data.adjacentBalls.set(set.fourthBall.number, adjacentBall + 1);
				} else {
					data.adjacentBalls.set(set.fourthBall.number, 1);
				}
			} else if (ball.id === set.fourthBall.id) {
				const position: number | undefined = data.drawnPositions.get(4);
				if (position !== undefined) {
					data.drawnPositions.set(4, position + 1);
				} else {
					data.drawnPositions.set(4, 1);
				}
				const adjacentBall: number | undefined = data.adjacentBalls.get(set.fifthBall.number);
				if (adjacentBall !== undefined) {
					data.adjacentBalls.set(set.fifthBall.number, adjacentBall + 1);
				} else {
					data.adjacentBalls.set(set.fifthBall.number, 1);
				}
			} else if (ball.id === set.fifthBall.id) {
				const position: number | undefined = data.drawnPositions.get(5);
				if (position !== undefined) {
					data.drawnPositions.set(5, position + 1);
				} else {
					data.drawnPositions.set(5, 1);
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
		lastDrawStart: lastDrawMin,
		lastDrawEnd: lastDrawMax,
		firstDrawStart: firstDrawMin,
		firstDrawEnd: firstDrawMax,
		meanLastDrawInterval: totalLastDrawInterval / balls.length,
		meanMaxDrawInterval: totalMaxDrawInterval / balls.length,
		meanMinDrawInterval: totalMinDrawInterval / balls.length,
		meanMeanDrawInterval: totalMeanDrawInterval / balls.length,
		meanModeDrawInterval: totalModeDrawInterval / balls.length,
		meanModeDrawInstances: totalModeDrawInstances / balls.length,
	};

	return data;
}

export function buildBallStatsMeanModeRangeData(ballStats: BallStatistics[]): BallStatsMeanModeRange {
	const data: BallStatsMeanModeRange = {
		descendingDrawnPositions: new Array<DrawnPosition>(),
		modePosition: 1,
		drawnIntervalMean: 0,
		drawnIntervalMode: 0,
		drawnIntervalMax: null,
		drawnIntervalMin: null,
		leftBallMean: 0,
		leftBallMode: 0,
		leftBallMin: null,
		leftBallMax: null,
		rightBallMean: 0,
		rightBallMode: 0,
		rightBallMin: null,
		rightBallMax: null,
	};
	let allDrawnPositions = new Map<DrawnPosition, number>();
	let totalDrawnInterval = 0;
	let allDrawnIntervals = new Map<number, number>();
	let totalLeftBallValue = 0;
	let allLeftBallValues = new Map<number, number>();
	let totalRightBallValue = 0;
	let allRightBallValues = new Map<number, number>();
	for (const stat of ballStats) {
		const drawnPositionCount: number | undefined = allDrawnPositions.get(stat.drawnPosition);
		if (drawnPositionCount) {
			allDrawnPositions.set(stat.drawnPosition, drawnPositionCount + 1);
		} else {
			allDrawnPositions.set(stat.drawnPosition, 1);
		}
		totalDrawnInterval += stat.drawInterval ?? 0;
		const drawnInterval: number | undefined = allDrawnIntervals.get(stat.drawInterval);
		if (drawnInterval) {
			allDrawnIntervals.set(stat.drawInterval, drawnInterval + 1);
		} else {
			allDrawnIntervals.set(stat.drawInterval, 1);
		}
		if (data.drawnIntervalMax === null || data.drawnIntervalMax < stat.drawInterval) {
			data.drawnIntervalMax = stat.drawInterval;
		}
		if (data.drawnIntervalMin === null || data.drawnIntervalMin > stat.drawInterval) {
			data.drawnIntervalMin = stat.drawInterval;
		}
		totalLeftBallValue += stat.leftBall ?? 0;
		if (stat.leftBall) {
			const leftBall: number | undefined = allLeftBallValues.get(stat.leftBall);
			if (leftBall) {
				allLeftBallValues.set(stat.leftBall, leftBall + 1);
			} else {
				allLeftBallValues.set(stat.leftBall, 1);
			}
		}
		if (data.leftBallMax === null || (stat.leftBall !== null && data.leftBallMax < stat.leftBall)) {
			data.leftBallMax = stat.leftBall;
		}
		if (data.leftBallMin === null || (stat.leftBall !== null && data.leftBallMin < stat.leftBall)) {
			data.leftBallMin = stat.leftBall;
		}
		totalRightBallValue += stat.rightBall ?? 0;
		if (stat.rightBall) {
			const rightBall: number | undefined = allRightBallValues.get(stat.rightBall);
			if (rightBall) {
				allRightBallValues.set(stat.rightBall, rightBall + 1);
			} else {
				allRightBallValues.set(stat.rightBall, 1);
			}
		}
		if (data.rightBallMax === null || (stat.rightBall !== null && data.rightBallMax < stat.rightBall)) {
			data.rightBallMax = stat.rightBall;
		}
		if (data.rightBallMin === null || (stat.rightBall !== null && data.rightBallMin < stat.rightBall)) {
			data.rightBallMin = stat.rightBall;
		}
	}

	let maxDrawnPosition: DrawnPosition | null = null;
	for (const [key, value] of allDrawnPositions.entries()) {
		if (maxDrawnPosition === null || maxDrawnPosition < value) {
			data.modePosition = key;
		}
	}
	let allDrawIntervalInstances: number | null = null;
	for (const [key, value] of allDrawnIntervals.entries()) {
		if (allDrawIntervalInstances === null || allDrawIntervalInstances < value) {
			data.drawnIntervalMax = key;
		}
	}
	let maxLeftBallInstances: number | null = null;
	for (const [key, value] of allLeftBallValues.entries()) {
		if (maxLeftBallInstances === null || maxLeftBallInstances < value) {
			data.leftBallMode = key;
		}
	}
	let maxRightBallInstances: number | null = null;
	for (const [key, value] of allRightBallValues.entries()) {
		if (maxRightBallInstances === null || maxRightBallInstances < value) {
			data.rightBallMode = key;
		}
	}

	data.drawnIntervalMean = totalDrawnInterval / ballStats.length;
	data.leftBallMean = totalLeftBallValue / ballStats.length;
	data.rightBallMean = totalRightBallValue / ballStats.length;

	const descendingPositionInstances: number[] = new Array<number>(...allDrawnPositions.values()).sort(
		(a, b) => b - a
	);

	const previousDrawPosition: number | null = null;
	for (const [key, value] of allDrawnPositions.entries()) {
		if (previousDrawPosition === null) {
			data.descendingDrawnPositions.push(key);
		}
	}

	return data;
}

export function getDateDifference(startDate: Date, endDate: Date): string {
	const [startMonthString, startDayString, startYearString] = startDate.toLocaleDateString().split('/');
	const [endMonthString, endDayString, endYearString] = endDate.toLocaleDateString().split('/');

	const startDay = parseInt(startDayString);
	const startMonth = parseInt(startMonthString);
	const startYear = parseInt(startYearString);
	const endDay = parseInt(endDayString);
	const endMonth = parseInt(endMonthString);
	const endYear = parseInt(endYearString);

	const years: number = endYear - startYear;
	const months: number = endMonth >= startMonth ? endMonth - startMonth : 12 - startMonth + endMonth;
	const daysInMonths: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	let days: number = 0;
	if (endDay > startDay) {
		days = endDay - startDay;
	} else if (endDay < startDay) {
		let daysInMonth = daysInMonths[startMonth - 1];
		if (startMonth === 2 && startYear % 4 === 0) {
			daysInMonth++;
		}
		days = daysInMonth - startDay + endDay;
	}

	return `${years}ys ${months}ms ${days}ds`;
}

export function buildBallStatistics(ball: Ball, sets: WinningSet[]): BallStatistics[] {
	sets.sort((a: WinningSet, b: WinningSet) => a.date.getTime() - b.date.getTime());

	const ballStatistics = new Array<BallStatistics>();
	let statIndex: number = 1;

	sets.forEach((set, index) => {
		if (
			set.firstBall.number === ball.number ||
			set.secondBall.number === ball.number ||
			set.thirdBall.number === ball.number ||
			set.fourthBall.number === ball.number ||
			set.fifthBall.number === ball.number
		) {
			let drawnPosition: DrawnPosition = 1;
			let leftBall: number | null = null;
			let rightBall: number | null = null;

			if (set.secondBall.number === ball.number) {
				drawnPosition = 2;
				leftBall = set.firstBall.number;
				rightBall = set.thirdBall.number;
			} else if (set.thirdBall.number === ball.number) {
				drawnPosition = 3;
				leftBall = set.secondBall.number;
				rightBall = set.fourthBall.number;
			} else if (set.fourthBall.number === ball.number) {
				drawnPosition = 4;
				leftBall = set.thirdBall.number;
				rightBall = set.fifthBall.number;
			} else if (set.fifthBall.number === ball.number) {
				drawnPosition = 5;
				leftBall = set.fourthBall.number;
			} else {
				rightBall = set.secondBall.number;
			}

			const data: BallStatistics = {
				index: statIndex,
				setNumber: index + 1,
				drawDate: set.date,
				drawnPosition,
				drawPercentage: ((ballStatistics.length + 1) / (index + 1)) * 100,
				drawInterval: index + 1 - (ballStatistics[statIndex - 2]?.setNumber ?? 0),
				leftBall,
				rightBall,
			};
			ballStatistics.push(data);
			statIndex++;
		}
	});

	ballStatistics.sort((a, b) => b.index - a.index);

	return ballStatistics;
}

export function buildSetRangeData(setsData: SetData[]): SetRangeData {
	const totalSets: number = setsData.length;
	let indexRangeStart: number = 0;
	let indexRangeEnd: number = 0;
	let drawDateRangeStart: Date = new Date(0);
	let drawDateRangeEnd: Date = new Date(0);
	let firstBallRangeStart: number = 0;
	let firstBallRangeEnd: number = 0;
	let secondBallRangeStart: number = 0;
	let secondBallRangeEnd: number = 0;
	let thirdBallRangeStart: number = 0;
	let thirdBallRangeEnd: number = 0;
	let fourthBallRangeStart: number = 0;
	let fourthBallRangeEnd: number = 0;
	let fifthBallRangeStart: number = 0;
	let fifthBallRangeEnd: number = 0;
	let megaBallRangeStart: number = 0;
	let megaBallRangeEnd: number = 0;
	let megaplierRangeStart: number = 0;
	let megaplierRangeEnd: number = 0;

	for (const setData of setsData) {
		if (indexRangeStart === 0 || indexRangeStart > setData.index) {
			indexRangeStart = setData.index;
		}
		if (indexRangeEnd === 0 || indexRangeEnd < setData.index) {
			indexRangeEnd = setData.index;
		}
		if (
			drawDateRangeStart.getTime() === 0 ||
			(setData.date && setData.date.getTime() < drawDateRangeStart.getTime())
		) {
			drawDateRangeStart = setData.date ?? new Date(0);
		}
		if (drawDateRangeEnd.getTime() === 0 || (setData.date && setData.date.getTime() > drawDateRangeEnd.getTime())) {
			drawDateRangeEnd = setData.date ?? new Date(0);
		}
		if (firstBallRangeStart === 0 || setData.firstBall < firstBallRangeStart) {
			firstBallRangeStart = setData.firstBall;
		}
		if (firstBallRangeEnd === 0 || setData.firstBall > firstBallRangeEnd) {
			firstBallRangeEnd = setData.firstBall;
		}
		if (secondBallRangeStart === 0 || setData.secondBall < secondBallRangeStart) {
			secondBallRangeStart = setData.secondBall;
		}
		if (secondBallRangeEnd === 0 || setData.secondBall > secondBallRangeEnd) {
			secondBallRangeEnd = setData.secondBall;
		}
		if (thirdBallRangeStart === 0 || setData.thirdBall < thirdBallRangeStart) {
			thirdBallRangeStart = setData.thirdBall;
		}
		if (thirdBallRangeEnd === 0 || setData.thirdBall > thirdBallRangeEnd) {
			thirdBallRangeEnd = setData.thirdBall;
		}
		if (fourthBallRangeStart === 0 || setData.fourthBall < fourthBallRangeStart) {
			fourthBallRangeStart = setData.fourthBall;
		}
		if (fourthBallRangeEnd === 0 || setData.fourthBall > fourthBallRangeEnd) {
			fourthBallRangeEnd = setData.fourthBall;
		}
		if (fifthBallRangeStart === 0 || setData.fifthBall < fifthBallRangeStart) {
			fifthBallRangeStart = setData.fifthBall;
		}
		if (fifthBallRangeEnd === 0 || setData.fifthBall > fifthBallRangeEnd) {
			fifthBallRangeEnd = setData.fifthBall;
		}
		if (megaBallRangeStart === 0 || setData.megaBall < megaBallRangeStart) {
			megaBallRangeStart = setData.megaBall;
		}
		if (megaBallRangeEnd === 0 || setData.megaBall > megaBallRangeEnd) {
			megaBallRangeEnd = setData.megaBall;
		}
		if (megaplierRangeStart === 0 || setData.megaplier < megaplierRangeStart) {
			megaplierRangeStart = setData.megaplier;
		}
		if (megaplierRangeEnd === 0 || setData.megaplier > megaplierRangeEnd) {
			megaplierRangeEnd = setData.megaplier;
		}
	}

	const data: SetRangeData = {
		totalSets,
		indexRangeStart,
		indexRangeEnd,
		drawDateRangeStart,
		drawDateRangeEnd,
		firstBallRangeStart,
		firstBallRangeEnd,
		secondBallRangeStart,
		secondBallRangeEnd,
		thirdBallRangeStart,
		thirdBallRangeEnd,
		fourthBallRangeStart,
		fourthBallRangeEnd,
		fifthBallRangeStart,
		fifthBallRangeEnd,
		megaBallRangeStart,
		megaBallRangeEnd,
		megaplierRangeStart,
		megaplierRangeEnd,
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
