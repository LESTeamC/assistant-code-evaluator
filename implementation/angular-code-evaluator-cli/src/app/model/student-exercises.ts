export class StudentExercises{
    //student name and username
    public name?: string;
    public username?: string;
    public exercises?: string[];

    constructor(student:string){
        this.username = student;
        this.exercises = new Array<string>();
    }

    public hasExercise(exercise:string):boolean{
        return (this.exercises.indexOf(exercise) >= 0);
    }

    public addExercise(exercise:string):void{
        this.exercises.push(exercise);
    }
}