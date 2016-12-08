import { Pipe } from "@angular/core";

import { Exam } from './../../model/exam'

@Pipe({
    name: "sort"
})
export class OrderByPipe {
    transform(array: Array<Exam>, args: string): Array<Exam> {
        if (args !== "date") {
            return array.sort((a: any, b: any) => {
                if (a[args].toUpperCase() < b[args].toUpperCase()) {
                    return -1;
                } else if (a[args].toUpperCase() > b[args].toUpperCase()) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else {
            return array.sort((a: any, b: any) => {
                return b.date - a.date;
            })
        }
    }
}