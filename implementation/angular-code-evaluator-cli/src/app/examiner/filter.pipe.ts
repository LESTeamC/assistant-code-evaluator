import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(array: Array<any>, param: string, value: string): any {

        return array.filter(function (el) {

            value = value.toUpperCase();

            if(param === "degree"){
                return (el.exam.degree.toUpperCase().indexOf(value) !== -1)
            }else{

                return (el[param].toUpperCase().indexOf(value) !== -1);
            }
        })
    }
}