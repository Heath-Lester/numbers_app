import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Ball } from '../types/ball';

@Injectable({
	providedIn: 'root',
})
export class MegaMillionsService {
	private readonly megaAPI: string =
		environment.djangoServer + 'mega_millions/';

	constructor(private client: HttpClient) {}
}
