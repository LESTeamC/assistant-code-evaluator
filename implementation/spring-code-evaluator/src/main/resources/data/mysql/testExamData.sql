

INSERT INTO Exam (name, date, degree, course, status, progress, nquestions, language, referenceId, version, createdBy, createdAt, updatedBy, updatedAt) 
VALUES ('Final Exam', '2017-01-22 00:00:00', 'MESW', 'Software Architectude and Design', 'O', 2, 3,'C', '7bd137c8-ab64-4a45-bf2d-d9cae3574233', 0, 'user', NOW(), NULL, NULL);





INSERT INTO Exercise (examinerID, examID, examname, question, name, status, progress, nsubmissions, weight, commandbuild, commandrun, path) 
SELECT Examiner.id, Exam.id,'Final Exam', 'Create an Activity Diagram', 'Q1', 'C', 10, 10, 50, 'dummy', 'dummy', 'dummy' 
FROM Examiner, Exam WHERE Examiner.username = 'up2011765544' AND Exam.name='Final Exam';

INSERT INTO Exercise (examinerID, examID, examname, question, name, status, progress, nsubmissions, weight, commandbuild, commandrun, path) 
SELECT Examiner.id, Exam.id,'Final Exam', 'Create a Component Diagram', 'Q2', 'O', 8, 10, 25, 'dummy', 'dummy', 'dummy' 
FROM Examiner, Exam WHERE Examiner.username = 'up2011765544' AND Exam.name='Final Exam';

INSERT INTO Exercise (examinerID, examID, examname, question, name, status, progress, nsubmissions, weight, commandbuild, commandrun, path) 
SELECT Examiner.id, Exam.id,'Final Exam', 'Create a Deployment Diagram', 'Q3', 'C', 9, 9, 25, 'dummy', 'dummy', 'dummy' 
FROM Examiner, Exam WHERE Examiner.username = 'up2011765544' AND Exam.name='Final Exam';




INSERT INTO Student (name, username) VALUES ('Aluno1', 'up01');
INSERT INTO Student (name, username) VALUES ('Aluno2', 'up02');
INSERT INTO Student (name, username) VALUES ('Aluno3', 'up03');
INSERT INTO Student (name, username) VALUES ('Aluno4', 'up04');
INSERT INTO Student (name, username) VALUES ('Aluno5', 'up05');
INSERT INTO Student (name, username) VALUES ('Aluno6', 'up06');
INSERT INTO Student (name, username) VALUES ('Aluno7', 'up07');
INSERT INTO Student (name, username) VALUES ('Aluno8', 'up08');
INSERT INTO Student (name, username) VALUES ('Aluno9', 'up09');
INSERT INTO Student (name, username) VALUES ('Aluno10', 'up10');





INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 100, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno1' and ex.name='Q1';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 60, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno2' and ex.name='Q1';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 45, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno3' and ex.name='Q1';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 50, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno4' and ex.name='Q1';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 89, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno5' and ex.name='Q1';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 71, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno6' and ex.name='Q1';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 77, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno7' and ex.name='Q1';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 99, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno8' and ex.name='Q1';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 11, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno9' and ex.name='Q1';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 0, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno10' and ex.name='Q1';




INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 89, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno1' and ex.name='Q2';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno2' and ex.name='Q2';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 25, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno3' and ex.name='Q2';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 30, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno4' and ex.name='Q2';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 82, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno5' and ex.name='Q2';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 77, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno6' and ex.name='Q2';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 100, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno7' and ex.name='Q2';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno8' and ex.name='Q2';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 10, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno9' and ex.name='Q2';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 100, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno10' and ex.name='Q2';



INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 20, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno1' and ex.name='Q3';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 100, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno2' and ex.name='Q3';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 100, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno3' and ex.name='Q3';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 76, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno4' and ex.name='Q3';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 56, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno5' and ex.name='Q3';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 43, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno6' and ex.name='Q3';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 91, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno7' and ex.name='Q3';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 20, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno8' and ex.name='Q3';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'C', 100, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Aluno10' and ex.name='Q3';

