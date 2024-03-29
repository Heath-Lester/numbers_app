import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'percentTo',
	standalone: true,
})
export class PercentToPipe implements PipeTransform {
	transform(number: number | undefined, places: number = 3): string {
		if (number === undefined) {
			return '0.0%';
		} else {
			return `${number.toFixed(places)}%`;
		}
	}
}
