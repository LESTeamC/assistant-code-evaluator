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

    public getExerciseNames(){
        let exArray:string[] = new Array<string>();
        for(let i = 0; i < this.exercises.length; i++){
            exArray.push(this.exercises[i].name);
        }
        return exArray;
    }

    public getStudentUsernames():string[]{
        let stArray:string[] = new Array<string>();
        for(let i = 0; i < this.students.length; i++){
            stArray.push(this.students[i].username);
        }
        return stArray;
    }

    public hasStudent(student:string){
        if (this.students === undefined || this.students.length === 0){
            return false;
        }

        return this.getStudentUsernames().includes(student);
    }


}
