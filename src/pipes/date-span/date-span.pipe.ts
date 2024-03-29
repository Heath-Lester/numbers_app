import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'dateSpan',
	standalone: true,
})
export class DateSpanPipe implements PipeTransform {
	transform(startDate: Date | undefined, endDate: Date | undefined): string {
		if (!startDate || !endDate) {
			return '--ys --ms --ds';
		}
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
}
