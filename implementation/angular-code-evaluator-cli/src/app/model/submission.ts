import { Exercise } from './exercise';
import { Student } from './student';
import { SubmissionCriteria } from './submissioncriteria';



export class Submission {

    public id?: number;
    public exercise?: Exercise;
    public student?: Student;
    public code?: string;
    public status?: string;
    public grade?: number;
    public path?: string;
    public output?: string;
    public comment?: string;
    public criteria?: SubmissionCriteria[];

}
