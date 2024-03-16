import { Ball } from './ball';
import { MegaBall } from './mega-ball';

export type PredictiveSet = {
	predictionDate: Date;
	firstBall: Ball;
	secondBall: Ball;
	thirdBall: Ball;
	fourthBall: Ball;
	fifthBall: Ball;
	megaBall: MegaBall;
};
