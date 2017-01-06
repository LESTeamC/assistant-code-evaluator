import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'submissionStatus'
})

export class SubmissionStatusPipe implements PipeTransform {
    transform(value: string): string {
        return (value === "O") ? "Not Submitted" : "Submitted";
    }
}