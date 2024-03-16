import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Ball } from '../types/ball';
import { MegaBall } from '../types/mega-ball';
import { WinningSet } from '../types/winning-set';
import { WinningSetPython } from '../types/winning-set-python';
import { convertWinningSet, convertWinningSets } from '../utils/mega-object-converter';

@Injectable({
	providedIn: 'root',
})
export class MegaMillionsService {
	private readonly megaAPI: string = environment.djangoServer + '/mega_millions';
	// TODO: Remove
	private readonly headers: {
		[header: string]: string | string[];
	} = {
		Authorization: `Token ${environment.token}`,
		'Content-Type': 'application/json',
	};

	constructor(private client: HttpClient) {}
	/**
	 * @returns all standard balls
	 */
	public getAllBalls(): Observable<Array<Ball>> {
		return this.client.get<Array<Ball>>(`${this.megaAPI}/balls`, {
			headers: this.headers,
		});
	}
	/**
	 * @param number
	 * @returns a ball matching the specified number
	 */
	public getBall(number: string): Observable<Ball> {
		return this.client.get<Ball>(`${this.megaAPI}/balls/${number}`, {
			headers: this.headers,
		});
	}
	/**
	 * @returns all mega balls
	 */
	public getAllMegaBalls(): Observable<Array<MegaBall>> {
		return this.client.get<Array<Ball>>(`${this.megaAPI}/mega_balls`, {
			headers: this.headers,
		});
	}
	/**
	 * @param number
	 * @returns a mega ball matching the specified number
	 */
	public getMegaBall(number: string): Observable<MegaBall> {
		return this.client.get<Ball>(`${this.megaAPI}/mega_balls/${number}`, {
			headers: this.headers,
		});
	}
	/**
	 * @returns all winning sets
	 */
	public getAllWinningSets(): Observable<Array<WinningSet>> {
		return this.client
			.get<Array<WinningSetPython>>(`${this.megaAPI}/winning_sets`, {
				headers: this.headers,
			})
			.pipe(map((sets: Array<WinningSetPython>) => convertWinningSets(sets)));
	}
	/**
	 * @param number
	 * @returns a winning set with the matching ID
	 */
	public getWinningSet(setID: string): Observable<WinningSet> {
		return this.client
			.get<WinningSetPython>(`${this.megaAPI}/winning_sets/${setID}`, {
				headers: this.headers,
			})
			.pipe(map((set: WinningSetPython) => convertWinningSet(set)));
	}
	/**
	 * @param ball
	 * @returns all winning sets where the specified ball is the first ball
	 */
	public getWinningSetsWithFirstBall(ball: Ball): Observable<Array<WinningSet>> {
		return this.client
			.post<Array<WinningSetPython>>(`${this.megaAPI}/winning_sets/first_ball`, ball, {
				headers: this.headers,
			})
			.pipe(map((sets: Array<WinningSetPython>) => convertWinningSets(sets)));
	}
	/**
	 * @param ball
	 * @returns all winning sets where the specified ball is the second ball
	 */
	public getWinningSetsWithSecondBall(ball: Ball): Observable<Array<WinningSet>> {
		return this.client
			.post<Array<WinningSetPython>>(`${this.megaAPI}/winning_sets/second_ball`, ball, {
				headers: this.headers,
			})
			.pipe(map((sets: Array<WinningSetPython>) => convertWinningSets(sets)));
	}
	/**
	 * @param ball
	 * @returns all winning sets where the specified ball is the third ball
	 */
	public getWinningSetsWithThirdBall(ball: Ball): Observable<Array<WinningSet>> {
		return this.client
			.post<Array<WinningSetPython>>(`${this.megaAPI}/winning_sets/third_ball`, ball, {
				headers: this.headers,
			})
			.pipe(map((sets: Array<WinningSetPython>) => convertWinningSets(sets)));
	}
	/**
	 * @param ball
	 * @returns all winning sets where the specified ball is the fourth ball
	 */
	public getWinningSetsWithFourthBall(ball: Ball): Observable<Array<WinningSet>> {
		return this.client
			.post<Array<WinningSetPython>>(`${this.megaAPI}/winning_sets/fourth_ball`, ball, {
				headers: this.headers,
			})
			.pipe(map((sets: Array<WinningSetPython>) => convertWinningSets(sets)));
	}
	/**
	 * @param ball
	 * @returns all winning sets where the specified ball is the fifth ball
	 */
	public getWinningSetsWithFifthBall(ball: Ball): Observable<Array<WinningSet>> {
		return this.client
			.post<Array<WinningSetPython>>(`${this.megaAPI}/winning_sets/fifth_ball`, ball, {
				headers: this.headers,
			})
			.pipe(map((sets: Array<WinningSetPython>) => convertWinningSets(sets)));
	}
	/**
	 * @param megaBall
	 * @returns all winning sets where the mega ball matches the specified mega ball
	 */
	public getWinningSetsWithMegaBall(megaBall: MegaBall): Observable<Array<WinningSet>> {
		return this.client
			.post<Array<WinningSetPython>>(`${this.megaAPI}/winning_sets/mega_ball`, megaBall, {
				headers: this.headers,
			})
			.pipe(map((sets: Array<WinningSetPython>) => convertWinningSets(sets)));
	}
	/**
	 * @param ball
	 * @returns all winning sets that contain the specified ball in any position except the mega ball
	 */
	public getWinningSetsWithBall(ball: Ball): Observable<Array<WinningSet>> {
		return this.client
			.post<Array<WinningSetPython>>(`${this.megaAPI}/winning_sets/ball`, ball, {
				headers: this.headers,
			})
			.pipe(map((sets: Array<WinningSetPython>) => convertWinningSets(sets)));
	}
	/**
	 * @param ball
	 * @returns all winning sets that contain the specified ball in all positions, including the mega ball position
	 */
	public getWinningSetsWithAnyBall(ball: Ball): Observable<Array<WinningSet>> {
		return this.client
			.post<Array<WinningSetPython>>(`${this.megaAPI}/winning_sets/any_ball`, ball, {
				headers: this.headers,
			})
			.pipe(map((sets: Array<WinningSetPython>) => convertWinningSets(sets)));
	}
}
