# Database Model

![model](https://github.com/LESTeamC/assistant-code-evaluator/blob/master/implementation/database/EERDiagram.png?raw=true)

## Table Explanation

#### Role

This table stores the different user roles. It will be used by Spring Security for Authorization purposes.
- *ManyToOne* relationship with __Account__ - An account can have multiple roles

**code**: Role code like SYS_ADMIN<br>
**label**: Role label like System Administrator<br>

#### Account

This table stores the different accounts and is also used by Spring Security for user Access to the platform.<br>
It's responsible for storing encrypted passwords and usernames.
Also has some interesting features, like expire dates and locks.

- *ManyToMany* relationship with __Role__ - An account can have multiple roles;
- *OneToOne* relationship with __Examiner__ - Each examiner will have one account.


#### Examiner

Table responsible for storing the examiner's information (not including PW - This will be stored in Account).

- *OneToOne* relationship with __Account__ ;
- *OneToMany* relationship with __Exercise__ - Each examiner will have a list of exercises, that have been delegated to him.

> *name*: The full of the examiner;<br>
> *username*: Meant to store academic number (ex up12213);<br>
> *email*: Email address (can be useful for contact.<br>


#### Exercise

This table will store information about one exercise, which is associated with one exam. Should not be confused with a submission, which is associeted with one particular student.
Each exercise has a collection of submissions.

- *ManyToOne* relationship with __Examiner__ ;
- *ManyToOne* relationship with __Exam__ - Each exam will have a collection of questions;
- *OneToMany* relationship with __ExerciseCriteria__ - Each exercise will have a collection of criteria;
- *OneToMany* relationship with __Submission__ - Each exercise will have a collection of submissions.

> *question*: Full text question for the exercise;<br>
> *name*: Unique name for the exercise (ex up12213);<br>
> *status*: Qualifies the status: Open, corrected, etc.<br>
> *progress*: Percentage value: (corrected submissions) * [100 / (total submissions)];<br>
> *nsubmissions*: Total number of submissions;<br>
> *weight*: Percentage value representing the weight of this quention on final grading;<br>
> *commandbuild*: Command line value to run to build the submission code;<br>
> *commandrun*: Command line value to run, to execute submission code, if builds;<br>
> *path*: Directory path to the library files (files needed to try to compile submissions).<br>


#### Exam

This table will store information about the exams.

- *OneToMany* relationship with __Exercise__ ;
- *OneToMany* relationship with __Submission__ ;
- *OneToMany* relationship with __StudentExam__ (explained later).

> *name*: Unique exam name;<br>
> *date*: Date of the exam;<br>
> *degree*: Degree (course) of the exam;<br>
> *class*: Class (course unit) of the exam;<br>
> *status*: Qualifies if its open, closed, etc;<br>
> *progress*: Percentage value: (corrected questions) * [100 / (total questions)];<br>
> *nquestions*: Total number os questions for the exam;<br>
> *language*: Programming language;<br>
> other attributes are for controlling purposes.


#### Exercise Criteria

This table will store generic information about the different criteria for the different exercises.

- *ManyToOne* relationship with __Exercise__ ;
- *OneToMany* relationship with __SubmissionCriteria__ - Each Submission has it's own criteria, because we will need to save the scores of each examination. So, each "exercise criteria" will have many "submission criteria".

> *description*: Description of what the examiner will look for;<br>
> *range*: Range of values for grading;<br>
> *weight*: Percentage - weight of this criteria for final grading (some criteria can be more important).<br>


#### Submission Criteria

This table will store specific grading values for each criteria of each submission.

- *ManyToOne* relationship with __SubmissionCriteria__;
- *ManyToOne* relationship with __Submission__.

> *grade*: Grade given to each of these criteria.<br>


#### Submission

This table will store specific information about the student's submissions.

- *ManyToOne* relationship with __Exam__;
- *ManyToOne* relationship with __Exercise__;
- *ManyToOne* relationship with __Student__ - each student can have a collection of submissions;
- *OneToMany* relationship with __SubmissionCriteria__ - each submission will have a collection of submission criteria.

> *code*: Text of the student's code submission;<br>
> *status*: Submitted, open, etc.<br>
> *grade*: Total grade calculated according to the criteria;<br>
> *path*: Directory path to the file of the submission.<br>
> *output*: Output of program, if bulds and runs.<br>


#### Student

Table saving each students information.

- *OneToMany* relationship with __Submission__;
- *OneToMany* relationship with __StudentExam__ - (explained below).

> *name*: Student full name;<br>
> *username*: Student academic number.<br>


#### StudentExam

This table will be responsible for saving the information of a student for a specific exam.
Has a composite Primary Key.
This will be useful for storing the student's final grade.

- *ManyToMany* relationship with __Exam__ Each exam will have multiple values stored in Student Exam
- *ManyToMany* relationship with __Student__

> *grade* student's final grade from a spefific exam;<br>
> *username*: Student academic number.<br>


