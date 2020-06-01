import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'time'
})
export class TimePipe implements PipeTransform {

    transform(value: string): string {
        let result = value.split(':');
        if (result.length <= 1)
        {
            return value;
        }
        let hours = parseInt(result[0]);
        let minutes = parseInt(result[1]);

        let hoursText = hours > 0 ? `${result[0]}h` : '';
        let minutesText = minutes > 0 ? `${result[1]}min` : '';

        return `${hoursText} ${minutesText}`;
    }

}
