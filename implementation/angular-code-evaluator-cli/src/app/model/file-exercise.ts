import {Exercise} from './exercise'

export class FileExercise {
    
    constructor(file:File, exercise:Exercise){
        this.file = file;
        this.exercise = exercise;
    }

    public id?: number;
    public file?: File;
    public exercise?: Exercise;
}