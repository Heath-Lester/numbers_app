import { TestBed } from '@angular/core/testing';
import { MegaMillionsService } from './mega-millions.service';

describe('MegaMillionsService', () => {
	let service: MegaMillionsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(MegaMillionsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
