import {Exam} from './exam';
import {ExerciseCriteria} from './exercise-criteria';

export class Exercise {

    public id?: number;
    public examiner?: any;
    public exam?: Exam;
    public name?: string;
    public question?: string;
    public status?: string;
    public progress?: number;
    public nsubmissions?: number;
    public weight?: number;
    public commandbuild?: string;
    public commandrun?: string;
    public path?: string[];
    public criteria?: ExerciseCriteria[];
}