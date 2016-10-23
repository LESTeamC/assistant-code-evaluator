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

INSERT INTO Exam (name, date, degree, course, status, progress, nquestions, referenceId, version, createdBy, createdAt, updatedBy, updatedAt) 
VALUES ('Exam1', '2015-01-01 00:00:00', 'MIEIC', 'Programacao1', 'O', 0, 2, '7bd137c8-ab64-4a45-bf2d-d9bae3574233', 0, 'user', NOW(), NULL, NULL);
INSERT INTO Exam (name, date, degree, course, status, progress, nquestions, referenceId, version, createdBy, createdAt, updatedBy, updatedAt) 
VALUES ('Exam2', '2015-01-01 00:00:00', 'MESW', 'LES', 'O', 0, 1, '7bd137c8-ab64-4a45-bf2d-d9bae3574223', 0, 'user', NOW(), NULL, NULL);

-- Examiner DATA
INSERT INTO Examiner (name, username, email, accountId) 
SELECT 'Luis Teixeira', 'up2011765544', 'up2011765544@fe.up.pt', a.id FROM Account a WHERE a.username = 'up2011765544';
INSERT INTO Examiner (name, username, email, accountId) 
SELECT 'Nuno Flores', 'up2011765533', 'up2011765533@fe.up.pt', a.id FROM Account a WHERE a.username = 'up2011765533';

-- Exercise DATA
INSERT INTO Exercise (examinerID, examID, question, name, status, progress, nsubmissions, weight, command, path) 
SELECT Examiner.id, Exam.id, 'What is your name?', 'Exercise1', 'O', 0, 2, 50, 'MKDIR', 'C://' 
FROM Examiner, Exam WHERE Examiner.username = 'up2011765544' AND Exam.name='Exam1';

INSERT INTO Exercise (examinerID, examID, question, name, status, progress, nsubmissions, weight, command, path) 
SELECT NULL, Exam.id, 'Who are you?', 'Exercise2', 'O', 0, 1, 50, 'MKDIR', 'C://' 
FROM Exam WHERE Exam.name='Exam1';

INSERT INTO Exercise (examinerID, examID, question, name, status, progress, nsubmissions, weight, command, path) 
SELECT Examiner.id, Exam.id, 'How old are you?', 'Exercise3', 'O', 0, 1, 100, 'MKDIR', 'C://' 
FROM Examiner, Exam WHERE Examiner.username = 'up2011765533' AND Exam.name='Exam2';


-- ExerciseCriteria DATA

INSERT INTO ExerciseCriteria (exerciseId, description, gama, weight) 
SELECT Exercise.id, 'code compiled', 3, 50 
FROM Exercise WHERE Exercise.name='Exercise1';

INSERT INTO ExerciseCriteria (exerciseId, description, gama, weight) 
SELECT Exercise.id, 'two if blocks', 3, 50 
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

INSERT INTO Submission (examId, exerciseId, studentId, code, status, grade, path)
SELECT e.id, ex.id, s.id, 'System.out.print("Hello World")', 'O', 0, 'C://submissions' 
FROM Exam e, Exercise ex, Student s WHERE s.name='Ana' and e.name='Exam1' and ex.name='Exercise1';

INSERT INTO Submission (examId, exerciseId, studentId, code, status, grade, path)
SELECT e.id, ex.id, s.id, 'System.out.print("Ola Mundo")', 'O', 0, 'C://submissions' 
FROM Exam e, Exercise ex, Student s WHERE s.name='Ana' and e.name='Exam1' and ex.name='Exercise2';

INSERT INTO Submission (examId, exerciseId, studentId, code, status, grade, path)
SELECT e.id, ex.id, s.id, 'System.out.print("Gutten tag")', 'O', 0, 'C://submissions' 
FROM Exam e, Exercise ex, Student s WHERE s.name='Joao' and e.name='Exam1' and ex.name='Exercise1';

INSERT INTO Submission (examId, exerciseId, studentId, code, status, grade, path)
SELECT e.id, ex.id, s.id, 'System.out.print("Hi there")', 'O', 0, 'C://submissions' 
FROM Exam e, Exercise ex, Student s WHERE s.name='Ana' and e.name='Exam2' and ex.name='Exercise1';

INSERT INTO Submission (examId, exerciseId, studentId, code, status, grade, path)
SELECT e.id, ex.id, s.id, 'System.out.print("Boas pessoal")', 'O', 0, 'C://submissions' 
FROM Exam e, Exercise ex, Student s WHERE s.name='Luis' and e.name='Exam2' and ex.name='Exercise1';


-- Submission Criteria Data

INSERT INTO SubmissionCriteria (submissionId, exerciseCriteriaId, grade)
SELECT s.id, ec.id, 0
FROM Submission s, ExerciseCriteria ec WHERE s.id=1  and ec.id=1;
