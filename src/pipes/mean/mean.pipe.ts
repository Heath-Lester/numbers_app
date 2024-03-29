import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'mean',
	standalone: true,
})
export class MeanPipe implements PipeTransform {
	transform(number: number | undefined, places: number = 1): string {
		if (number === undefined) {
			return '0.0';
		}
		return number.toFixed(places).toString();
	}
}
