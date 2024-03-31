import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'posNeg',
	standalone: true,
})
export class PosNegPipe implements PipeTransform {
	transform(number: number | undefined, places: number = 1): string {
		if (number === undefined) {
			return '0';
		} else if (number > 0) {
			if (number % 1 === 0) {
				return `+${number}`;
			} else {
				return `+${number.toFixed(places)}`;
			}
		} else if (number < 0) {
			if (number % 1 === 0) {
				return `-${Math.abs(number)}`;
			} else {
				return `-${Math.abs(number).toFixed(places)}`;
			}
		} else {
			return '0';
		}
	}
}
