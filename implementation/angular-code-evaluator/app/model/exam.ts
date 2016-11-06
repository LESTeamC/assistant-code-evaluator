import {Exercise} from './exercise'

export class Exam {
    public id?: number;
    public name?: string;
    public date?: Date;
    public degree?: string;
    public course?: string;
    public status?: string;
    public progress?: number;
    public nquestions?: number;
    public language?: string;
    public exercises?: Exercise[];

}