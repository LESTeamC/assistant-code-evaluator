/*
 * MySQL script.
 * Load the database with reference data and unit test data.
 */

INSERT INTO Greeting (referenceId, text, version, createdBy, createdAt, updatedBy, updatedAt) VALUES ('1e0d5287-67fd-4043-9ac4-b8d358d6d7ce', 'Hello World!', 0, 'user', NOW(), NULL, NULL);
INSERT INTO Greeting (referenceId, text, version, createdBy, createdAt, updatedBy, updatedAt) VALUES ('37c3178d-3b49-47b6-99d1-277b1a3e8df8', 'Hola Mundo!', 0, 'user', NOW(), NULL, NULL);


-- password is 'admin'
INSERT INTO Account (referenceId, username, password, enabled, credentialsexpired, expired, locked, version, createdBy, createdAt, updatedBy, updatedAt) VALUES ('a07bd221-3ecd-4893-a0f0-78d7c0fbf94e', 'user', '$2a$10$LaCUwxyZEFiyrEwwwOtaPe.FUv8zAHxCDsWAz1yBcMkQ6zPOP2YzK', true, false, false, false, 0, 'user', NOW(), NULL, NULL);
-- password is 'operations'
INSERT INTO Account (referenceId, username, password, enabled, credentialsexpired, expired, locked, version, createdBy, createdAt, updatedBy, updatedAt) VALUES ('7bd137c8-ab64-4a45-bf2d-d9bae3574622', 'operations', '$2a$10$CoMVfutnv1qZ.fNlHY1Na.rteiJhsDF0jB1o.76qXcfdWN6As27Zm', true, false, false, false, 0, 'user', NOW(), NULL, NULL);
INSERT INTO Account (referenceId, username, password, enabled, credentialsexpired, expired, locked, version, createdBy, createdAt, updatedBy, updatedAt) VALUES ('7bd137c8-ab64-4a45-bf2d-d9bae3574623', 'up2011765544', '$2a$10$LaCUwxyZEFiyrEwwwOtaPe.FUv8zAHxCDsWAz1yBcMkQ6zPOP2YzK', true, false, false, false, 0, 'user', NOW(), NULL, NULL);
INSERT INTO Account (referenceId, username, password, enabled, credentialsexpired, expired, locked, version, createdBy, createdAt, updatedBy, updatedAt) VALUES ('7bd137c8-ab64-4a45-bf2d-d9bae3574333', 'up2011765533', '$2a$10$LaCUwxyZEFiyrEwwwOtaPe.FUv8zAHxCDsWAz1yBcMkQ6zPOP2YzK', true, false, false, false, 0, 'user', NOW(), NULL, NULL);

INSERT INTO Role (id, code, label, ordinal, effectiveAt, expiresAt, createdAt) VALUES (1, 'ROLE_USER', 'User', 0, '2015-01-01 00:00:00', NULL, NOW());
INSERT INTO Role (id, code, label, ordinal, effectiveAt, expiresAt, createdAt) VALUES (2, 'ROLE_ADMIN', 'Admin', 1, '2015-01-01 00:00:00', NULL, NOW());
INSERT INTO Role (id, code, label, ordinal, effectiveAt, expiresAt, createdAt) VALUES (3, 'ROLE_SYSADMIN', 'System Admin', 2, '2015-01-01 00:00:00', NULL, NOW());

INSERT INTO AccountRole (accountId, roleId) SELECT a.id, r.id FROM Account a, Role r WHERE a.username = 'user' and r.id = 1;
INSERT INTO AccountRole (accountId, roleId) SELECT a.id, r.id FROM Account a, Role r WHERE a.username = 'operations' and r.id = 3;
INSERT INTO AccountRole (accountId, roleId) SELECT a.id, r.id FROM Account a, Role r WHERE a.username = 'up2011765544' and r.id = 1;
INSERT INTO AccountRole (accountId, roleId) SELECT a.id, r.id FROM Account a, Role r WHERE a.username = 'up2011765533' and r.id = 1;

-- Exam DATA

INSERT INTO Exam (name, date, degree, course, status, progress, nquestions, language, referenceId, version, createdBy, createdAt, updatedBy, updatedAt) 
VALUES ('Exam1', '2015-01-01 00:00:00', 'MIEIC', 'Programacao1', 'O', 0, 2,'Java', '7bd137c8-ab64-4a45-bf2d-d9bae3574233', 0, 'user', NOW(), NULL, NULL);
INSERT INTO Exam (name, date, degree, course, status, progress, nquestions, language, referenceId, version, createdBy, createdAt, updatedBy, updatedAt) 
VALUES ('Exam2', '2015-01-01 00:00:00', 'MESW', 'LES', 'O', 0, 1, 'C', '7bd137c8-ab64-4a45-bf2d-d9bae3574223', 0, 'user', NOW(), NULL, NULL);

-- Examiner DATA
INSERT INTO Examiner (name, username, email, accountId) 
SELECT 'Luis Teixeira', 'up2011765544', 'up2011765544@fe.up.pt', a.id FROM Account a WHERE a.username = 'up2011765544';
INSERT INTO Examiner (name, username, email, accountId) 
SELECT 'Nuno Flores', 'up2011765533', 'up2011765533@fe.up.pt', a.id FROM Account a WHERE a.username = 'up2011765533';

-- Exercise DATA
INSERT INTO Exercise (examinerID, examID, examname, question, name, status, progress, nsubmissions, weight, commandbuild, commandrun, path) 
SELECT Examiner.id, Exam.id,'Exam1', 'What is your name?', 'Exercise1', 'O', 0, 2, 50, 'MKDIR', 'RUN', 'C://' 
FROM Examiner, Exam WHERE Examiner.username = 'up2011765544' AND Exam.name='Exam1';

INSERT INTO Exercise (examinerID, examID, examname, question, name, status, progress, nsubmissions, weight, commandbuild, commandrun, path) 
SELECT NULL, Exam.id,'Exam1', 'Who are you?', 'Exercise2', 'O', 0, 1, 50, 'MKDIR','RUN', 'C://' 
FROM Exam WHERE Exam.name='Exam1';

INSERT INTO Exercise (examinerID, examID, examname, question, name, status, progress, nsubmissions, weight, commandbuild, commandrun, path) 
SELECT Examiner.id, Exam.id,'Exam2', 'How old are you?', 'Exercise3', 'O', 0, 1, 100, 'MKDIR','RUN', 'C://' 
FROM Examiner, Exam WHERE Examiner.username = 'up2011765533' AND Exam.name='Exam2';


-- ExerciseCriteria DATA

INSERT INTO ExerciseCriteria (exerciseId, description, gama, weight) 
SELECT Exercise.id, 'code compiled', 3, 50 
FROM Exercise WHERE Exercise.name='Exercise1';

INSERT INTO ExerciseCriteria (exerciseId, description, gama, weight) 
SELECT Exercise.id, 'two if blocks', 6, 50 
FROM Exercise WHERE Exercise.name='Exercise1';

INSERT INTO ExerciseCriteria (exerciseId, description, gama, weight) 
SELECT Exercise.id, 'two switch blocks', 3, 100 
FROM Exercise WHERE Exercise.name='Exercise2';

INSERT INTO ExerciseCriteria (exerciseId, description, gama, weight) 
SELECT Exercise.id, 'two for blocks', 3, 100 
FROM Exercise WHERE Exercise.name='Exercise3';

-- Student DATA

INSERT INTO Student (name, username) VALUES ('Ana', 'up20165544');
INSERT INTO Student (name, username) VALUES ('Joao', 'up20165545');
INSERT INTO Student (name, username) VALUES ('Luis', 'up20165546');
INSERT INTO Student (name, username) VALUES ('Pedro', 'up20165547');

-- StudentExam DATA

INSERT INTO StudentExam (studentId, examId, grade, status)
SELECT s.id, e.id, 0, 'O' 
FROM Student s, Exam e WHERE s.name='Ana' and e.name='Exam1';

INSERT INTO StudentExam (studentId, examId, grade, status)
SELECT s.id, e.id, 0, 'O' 
FROM Student s, Exam e WHERE s.name='Ana' and e.name='Exam2';

INSERT INTO StudentExam (studentId, examId, grade, status)
SELECT s.id, e.id, 0, 'O' 
FROM Student s, Exam e WHERE s.name='Joao' and e.name='Exam1';

INSERT INTO StudentExam (studentId, examId, grade, status)
SELECT s.id, e.id, 0, 'O' 
FROM Student s, Exam e WHERE s.name='Luis' and e.name='Exam2';


-- Submission DATA

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Ana' and ex.name='Exercise1';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Ola Mundo")', 'O', 0, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Ana' and ex.name='Exercise3';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT  ex.id, s.id, 'System.out.print("Gutten tag")', 'O', 0, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Joao' and ex.name='Exercise3';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Hi there")', 'O', 0, 'C://submissions' , 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Ana' and ex.name='Exercise3';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment)
SELECT ex.id, s.id, 'System.out.print("Boas pessoal")', 'O', 0, 'C://submissions', 'one two', ""
FROM Exercise ex, Student s WHERE s.name='Luis' and ex.name='Exercise3';


-- Submission Criteria Data

INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade)
SELECT s.id, ec.id, -1
FROM Submission s, ExerciseCriteria ec WHERE s.id=1  and ec.id=1;

INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade)
SELECT s.id, ec.id, -1
FROM Submission s, ExerciseCriteria ec WHERE s.id=1  and ec.id=2;


INSERT INTO Exam (name, date, degree, course, status, progress, nquestions, language, referenceId, version, createdBy, createdAt, updatedBy, updatedAt) 
VALUES ('Recolha Final', '2017-01-22 00:00:00', 'MESW', 'Programacao2', 'O', 0, 2,'C', '7bd137c8-ab64-4a45-bf2d-d9cae3594233', 0, 'user', NOW(), NULL, NULL);

INSERT INTO Exercise (examinerID, examID, examname, question, name, status, progress, nsubmissions, weight, commandbuild, commandrun, path) 
SELECT Examiner.id, Exam.id,'Recolha Final', 'Create an Activity Diagram', 'prob1', 'O', 0, 10, 50, 'dummy', 'dummy', 'dummy' 
FROM Examiner, Exam WHERE Examiner.username = 'up2011765544' AND Exam.name='Recolha Final';

INSERT INTO Exercise (examinerID, examID, examname, question, name, status, progress, nsubmissions, weight, commandbuild, commandrun, path) 
SELECT Examiner.id, Exam.id,'Recolha Final', 'Create a Component Diagram', 'prob2', 'O', 0, 10, 50, 'dummy', 'dummy', 'dummy' 
FROM Examiner, Exam WHERE Examiner.username = 'up2011765544' AND Exam.name='Recolha Final';

INSERT INTO Student (name, username) VALUES ('Aluno1', 'UP201507724');
INSERT INTO Student (name, username) VALUES ('Aluno2', 'UP201505032');
INSERT INTO Student (name, username) VALUES ('Aluno3', 'UP201505003');
INSERT INTO Student (name, username) VALUES ('Aluno4', 'UP201504985');
INSERT INTO Student (name, username) VALUES ('Aluno5', 'UP201504961');
INSERT INTO Student (name, username) VALUES ('Aluno6', 'UP201504951');
INSERT INTO Student (name, username) VALUES ('Aluno7', 'UP201504936');
INSERT INTO Student (name, username) VALUES ('Aluno8', 'UP201504921');
INSERT INTO Student (name, username) VALUES ('Aluno9', 'UP201504911');
INSERT INTO Student (name, username) VALUES ('Aluno10', 'UP201504878');

INSERT INTO StudentExam (studentId, examId, grade, status) SELECT s.id, e.id, 0, 'O' FROM Student s, Exam e WHERE s.name='Aluno1' and e.name='Recolha Final';
INSERT INTO StudentExam (studentId, examId, grade, status) SELECT s.id, e.id, 0, 'O' FROM Student s, Exam e WHERE s.name='Aluno2' and e.name='Recolha Final';
INSERT INTO StudentExam (studentId, examId, grade, status) SELECT s.id, e.id, 0, 'O' FROM Student s, Exam e WHERE s.name='Aluno3' and e.name='Recolha Final';
INSERT INTO StudentExam (studentId, examId, grade, status) SELECT s.id, e.id, 0, 'O' FROM Student s, Exam e WHERE s.name='Aluno4' and e.name='Recolha Final';
INSERT INTO StudentExam (studentId, examId, grade, status) SELECT s.id, e.id, 0, 'O' FROM Student s, Exam e WHERE s.name='Aluno5' and e.name='Recolha Final';
INSERT INTO StudentExam (studentId, examId, grade, status) SELECT s.id, e.id, 0, 'O' FROM Student s, Exam e WHERE s.name='Aluno6' and e.name='Recolha Final';
INSERT INTO StudentExam (studentId, examId, grade, status) SELECT s.id, e.id, 0, 'O' FROM Student s, Exam e WHERE s.name='Aluno7' and e.name='Recolha Final';
INSERT INTO StudentExam (studentId, examId, grade, status) SELECT s.id, e.id, 0, 'O' FROM Student s, Exam e WHERE s.name='Aluno8' and e.name='Recolha Final';
INSERT INTO StudentExam (studentId, examId, grade, status) SELECT s.id, e.id, 0, 'O' FROM Student s, Exam e WHERE s.name='Aluno9' and e.name='Recolha Final';
INSERT INTO StudentExam (studentId, examId, grade, status) SELECT s.id, e.id, 0, 'O' FROM Student s, Exam e WHERE s.name='Aluno10' and e.name='Recolha Final';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment) SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'C://submissions' , 'one two', "1" FROM Exercise ex, Student s WHERE s.name='Aluno1' and ex.name='prob1';
INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment) SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'O://submissions' , 'one two', "2" FROM Exercise ex, Student s WHERE s.name='Aluno2' and ex.name='prob1';
INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment) SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'O://submissions' , 'one two', "3" FROM Exercise ex, Student s WHERE s.name='Aluno3' and ex.name='prob1';
INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment) SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'O://submissions' , 'one two', "4" FROM Exercise ex, Student s WHERE s.name='Aluno4' and ex.name='prob1';
INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment) SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'O://submissions' , 'one two', "5" FROM Exercise ex, Student s WHERE s.name='Aluno5' and ex.name='prob1';
INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment) SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'O://submissions' , 'one two', "6" FROM Exercise ex, Student s WHERE s.name='Aluno6' and ex.name='prob1';
INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment) SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'O://submissions' , 'one two', "7" FROM Exercise ex, Student s WHERE s.name='Aluno7' and ex.name='prob1';
INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment) SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'O://submissions' , 'one two', "8" FROM Exercise ex, Student s WHERE s.name='Aluno8' and ex.name='prob1';
INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment) SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'O://submissions' , 'one two', "9" FROM Exercise ex, Student s WHERE s.name='Aluno9' and ex.name='prob1';
INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment) SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'O://submissions' , 'one two', "10" FROM Exercise ex, Student s WHERE s.name='Aluno10' and ex.name='prob1';

INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment) SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'C://submissions' , 'one two', "49" FROM Exercise ex, Student s WHERE s.name='Aluno1' and ex.name='prob2';
INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment) SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'O://submissions' , 'one two', "50" FROM Exercise ex, Student s WHERE s.name='Aluno2' and ex.name='prob2';
INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment) SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'O://submissions' , 'one two', "51" FROM Exercise ex, Student s WHERE s.name='Aluno3' and ex.name='prob2';
INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment) SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'O://submissions' , 'one two', "52" FROM Exercise ex, Student s WHERE s.name='Aluno4' and ex.name='prob2';
INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment) SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'O://submissions' , 'one two', "53" FROM Exercise ex, Student s WHERE s.name='Aluno5' and ex.name='prob2';
INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment) SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'O://submissions' , 'one two', "54" FROM Exercise ex, Student s WHERE s.name='Aluno6' and ex.name='prob2';
INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment) SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'O://submissions' , 'one two', "55" FROM Exercise ex, Student s WHERE s.name='Aluno7' and ex.name='prob2';
INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment) SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'O://submissions' , 'one two', "56" FROM Exercise ex, Student s WHERE s.name='Aluno8' and ex.name='prob2';
INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment) SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'O://submissions' , 'one two', "57" FROM Exercise ex, Student s WHERE s.name='Aluno9' and ex.name='prob2';
INSERT INTO Submission (exerciseId, studentId, code, status, grade, path, output, comment) SELECT ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'O://submissions' , 'one two', "58" FROM Exercise ex, Student s WHERE s.name='Aluno10' and ex.name='prob2';


INSERT INTO ExerciseCriteria (exerciseId, description, gama, weight) SELECT Exercise.id, 'Code Compiled', 3, 50 FROM Exercise WHERE Exercise.name='prob1';
INSERT INTO ExerciseCriteria (exerciseId, description, gama, weight) SELECT Exercise.id, 'CRITERIO 2', 3, 50 FROM Exercise WHERE Exercise.name='prob1';
INSERT INTO ExerciseCriteria (exerciseId, description, gama, weight) SELECT Exercise.id, 'CRITERIO 1', 3, 50 FROM Exercise WHERE Exercise.name='prob2';
INSERT INTO ExerciseCriteria (exerciseId, description, gama, weight) SELECT Exercise.id, 'CRITERIO 2', 3, 50 FROM Exercise WHERE Exercise.name='prob2';


INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade) SELECT s.id, ec.id, -1 FROM Submission s, ExerciseCriteria ec, Exercise ex WHERE s.comment="1"  and ec.exerciseId=ex.id and ex.name="prob1";
INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade) SELECT s.id, ec.id, -1 FROM Submission s, ExerciseCriteria ec, Exercise ex WHERE s.comment="2"  and ec.exerciseId=ex.id and ex.name="prob1";
INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade) SELECT s.id, ec.id, -1 FROM Submission s, ExerciseCriteria ec, Exercise ex WHERE s.comment="3"  and ec.exerciseId=ex.id and ex.name="prob1";
INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade) SELECT s.id, ec.id, -1 FROM Submission s, ExerciseCriteria ec, Exercise ex WHERE s.comment="4"  and ec.exerciseId=ex.id and ex.name="prob1";
INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade) SELECT s.id, ec.id, -1 FROM Submission s, ExerciseCriteria ec, Exercise ex WHERE s.comment="5"  and ec.exerciseId=ex.id and ex.name="prob1";
INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade) SELECT s.id, ec.id, -1 FROM Submission s, ExerciseCriteria ec, Exercise ex WHERE s.comment="6"  and ec.exerciseId=ex.id and ex.name="prob1";
INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade) SELECT s.id, ec.id, -1 FROM Submission s, ExerciseCriteria ec, Exercise ex WHERE s.comment="7"  and ec.exerciseId=ex.id and ex.name="prob1";
INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade) SELECT s.id, ec.id, -1 FROM Submission s, ExerciseCriteria ec, Exercise ex WHERE s.comment="8"  and ec.exerciseId=ex.id and ex.name="prob1";
INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade) SELECT s.id, ec.id, -1 FROM Submission s, ExerciseCriteria ec, Exercise ex WHERE s.comment="9"  and ec.exerciseId=ex.id and ex.name="prob1";
INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade) SELECT s.id, ec.id, -1 FROM Submission s, ExerciseCriteria ec, Exercise ex WHERE s.comment="10"  and ec.exerciseId=ex.id and ex.name="prob1";


INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade) SELECT s.id, ec.id, -1 FROM Submission s, ExerciseCriteria ec, Exercise ex WHERE s.comment="49"  and ec.exerciseId=ex.id and ex.name="prob2";
INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade) SELECT s.id, ec.id, -1 FROM Submission s, ExerciseCriteria ec, Exercise ex WHERE s.comment="50"  and ec.exerciseId=ex.id and ex.name="prob2";
INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade) SELECT s.id, ec.id, -1 FROM Submission s, ExerciseCriteria ec, Exercise ex WHERE s.comment="51"  and ec.exerciseId=ex.id and ex.name="prob2";
INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade) SELECT s.id, ec.id, -1 FROM Submission s, ExerciseCriteria ec, Exercise ex WHERE s.comment="52"  and ec.exerciseId=ex.id and ex.name="prob2";
INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade) SELECT s.id, ec.id, -1 FROM Submission s, ExerciseCriteria ec, Exercise ex WHERE s.comment="53"  and ec.exerciseId=ex.id and ex.name="prob2";
INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade) SELECT s.id, ec.id, -1 FROM Submission s, ExerciseCriteria ec, Exercise ex WHERE s.comment="54"  and ec.exerciseId=ex.id and ex.name="prob2";
INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade) SELECT s.id, ec.id, -1 FROM Submission s, ExerciseCriteria ec, Exercise ex WHERE s.comment="55"  and ec.exerciseId=ex.id and ex.name="prob2";
INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade) SELECT s.id, ec.id, -1 FROM Submission s, ExerciseCriteria ec, Exercise ex WHERE s.comment="56"  and ec.exerciseId=ex.id and ex.name="prob2";
INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade) SELECT s.id, ec.id, -1 FROM Submission s, ExerciseCriteria ec, Exercise ex WHERE s.comment="57"  and ec.exerciseId=ex.id and ex.name="prob2";
INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade) SELECT s.id, ec.id, -1 FROM Submission s, ExerciseCriteria ec, Exercise ex WHERE s.comment="58"  and ec.exerciseId=ex.id and ex.name="prob2";

