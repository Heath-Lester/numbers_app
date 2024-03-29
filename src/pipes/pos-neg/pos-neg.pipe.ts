import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'posNeg',
	standalone: true,
})
export class PosNegPipe implements PipeTransform {
	transform(number: number | undefined): string {
		if (number === undefined) {
			return '0';
		} else if (number > 0) {
			return `+${number}`;
		} else if (number < 0) {
			return `-${Math.abs(number)}`;
		} else {
			return '0';
		}
	}
}
