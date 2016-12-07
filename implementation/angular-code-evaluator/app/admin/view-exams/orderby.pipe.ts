import { Pipe } from "@angular/core";

import { Exam } from './../../model/exam'

@Pipe({
    name: "sort"
})
export class OrderByPipe {
    transform(array: Array<Exam>, args: string): Array<Exam> {

        if (args === "name") {
            return array.sort((a: any, b: any) => {
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else if (args === "status") {
           return  array.sort((a: any, b: any) => {
                if (a.status > b.status) {
                    return -1;
                } else if (a.status < b.status) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else {
            return array.sort((a: any, b: any) => {
                return a.date - b.date;
            })
        }
    }
}