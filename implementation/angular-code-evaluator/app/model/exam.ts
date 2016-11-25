import {Exercise} from './exercise'
import {Student} from './student'

export class Exam {
    public id?: number;
    public referenceId?:string;
    public version?:number;
    public createdBy?:string;
    public createdAt?:Date;
    public updatedBy?:string;
    public updatedAt?:Date;
    public name?: string;
    public date?: Date;
    public degree?: string;
    public course?: string;
    public status?: string;
    public progress?: number;
    public nquestions?: number;
    public language?: string;
    public exercises?: Exercise[];
    public students?: Student[];
    public dateString?: string;

}
