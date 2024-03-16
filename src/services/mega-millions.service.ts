import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Ball } from '../types/ball';
import { MegaBall } from '../types/mega-ball';
import { WinningSet } from '../types/winning-set';

@Injectable({
	providedIn: 'root',
})
export class MegaMillionsService {
	private readonly megaAPI: string = environment.djangoServer + '/mega_millions';
	// TODO: Remove
	private readonly auth: string = `Token ${environment.token}`;

	constructor(private client: HttpClient) {}

	public getAllBalls(token: string): Observable<Array<Ball>> {
		return this.client.get<Array<Ball>>(`${this.megaAPI}/balls`, {
			headers: { Authorization: this.auth },
		});
	}

	public getBall(token: string, primaryKey: string): Observable<Ball> {
		return this.client.get<Ball>(`${this.megaAPI}/balls/${primaryKey}`, {
			headers: { Authorization: this.auth },
		});
	}

	public getAllMegaBalls(token: string): Observable<Array<MegaBall>> {
		return this.client.get<Array<Ball>>(`${this.megaAPI}/mega_balls`, {
			headers: { Authorization: this.auth },
		});
	}

	public getMegaBall(token: string, primaryKey: string): Observable<MegaBall> {
		return this.client.get<Ball>(`${this.megaAPI}/mega_balls/${primaryKey}`, {
			headers: { Authorization: this.auth },
		});
	}

	public getAllWinningSets(token: string): Observable<Array<WinningSet>> {
		return this.client.get<Array<WinningSet>>(`${this.megaAPI}/winning_sets`, {
			headers: { Authorization: this.auth },
		});
	}

	public getWinningSet(token: string, primaryKey: string): Observable<WinningSet> {
		return this.client.get<WinningSet>(`${this.megaAPI}/winning_sets/${primaryKey}`, {
			headers: { Authorization: this.auth },
		});
	}

	public getWinningSetsWithFirstBall(token: string, ball: Ball): Observable<Array<WinningSet>> {
		return this.client.post<Array<WinningSet>>(`${this.megaAPI}/winning_sets/first_ball`, ball, {
			headers: { Authorization: this.auth },
		});
	}

	public getWinningSetsWithSecondBall(token: string, ball: Ball): Observable<Array<WinningSet>> {
		return this.client.post<Array<WinningSet>>(`${this.megaAPI}/winning_sets/second_ball`, ball, {
			headers: { Authorization: this.auth },
		});
	}

	public getWinningSetsWithThirdBall(token: string, ball: Ball): Observable<Array<WinningSet>> {
		return this.client.post<Array<WinningSet>>(`${this.megaAPI}/winning_sets/third_ball`, ball, {
			headers: { Authorization: this.auth },
		});
	}

	public getWinningSetsWithFourthBall(token: string, ball: Ball): Observable<Array<WinningSet>> {
		return this.client.post<Array<WinningSet>>(`${this.megaAPI}/winning_sets/fourth_ball`, ball, {
			headers: { Authorization: this.auth },
		});
	}

	public getWinningSetsWithFifthBall(token: string, ball: Ball): Observable<Array<WinningSet>> {
		return this.client.post<Array<WinningSet>>(`${this.megaAPI}/winning_sets/fifth_ball`, ball, {
			headers: { Authorization: this.auth },
		});
	}

	public getWinningSetsWithMegaBall(token: string, megaBall: MegaBall): Observable<Array<WinningSet>> {
		return this.client.post<Array<WinningSet>>(`${this.megaAPI}/winning_sets/mega_ball`, megaBall, {
			headers: { Authorization: this.auth },
		});
	}

	public getWinningSetsWithBall(token: string, ball: Ball): Observable<Array<WinningSet>> {
		return this.client.post<Array<WinningSet>>(`${this.megaAPI}/winning_sets/ball`, ball, {
			headers: { Authorization: this.auth },
		});
	}

	public getWinningSetsWithAnyBall(token: string, ball: Ball): Observable<Array<WinningSet>> {
		return this.client.post<Array<WinningSet>>(`${this.megaAPI}/winning_sets/any_ball`, ball, {
			headers: { Authorization: this.auth },
		});
	}
}
