# Assistant Code Evaluator

This system aims to aid professor's task of grading exams on computer science degrees.

Take a look at our Wiki to know more.

#Release Notes

## Release 0.2 (20/11/2016)

http://les16c.fe.up.pt:3000/login

###Delivered User Stories:

1.<br>
As an administrator<br>
I want to create new examiners attributing them a name, username, email and password<br>
So that I can add new examiners' profiles to the platform.<br>

2.<br>
As an administrator<br>
I want to be alerted if the "password" and "confirm password" fields do not match<br>
So that I can prevent this action. <br>

3.<br>
As an administrator<br>
I want to create several criterias to an exercise.<br>
So that the Examiner knows how to evaluate the exercise.<br>

4.<br>
As an administrator<br>
I want to to define a Range to a criteria of an exercise.<br>
So that the Examiner knows what values he must assign when evaluating an exercise.<br>

5.<br>
As an administrator<br>
I want to to define a percentage to an exercise.<br>
So that the Examiner knows the weight of the exercise in the whole exam.<br>

6.<br>
As an administrator<br>
I want to view a table with my exams, respective created questions and assigned examiners<br>
So that I can delegate exams to the examiners available.<br>

7.<br>
As an administrator<br>
I want to select, by username, a examiner available<br>
So that I can delegate him to a exercise from an exam<br>

7.<br>
As an Aministrator<br>
I want to submit students <br>
So that the Examiners can evaluate them.<br>


###Main Features

1. General Improvements on the look and feel of the application, namely on the Color schemes used
2. Logout buttons added to Admin and Examiner screens
3. On the Examiner Screen, a header was created showing the name of the Examiner
4. Improvements on the Create Exam feature.
    4.1 - Allow to add different Criterias to Exercise
    4.2 - Allow to Add Student through a CSV File
5. Create Examiner Funtionality
6. Delegate Exercise Funcionality

###Known Issues
1. The Datepicker functionality only works on Chrome, which generates an error on the other browsers<br>
This bug will be fixed in the upcoming delivery.

##Notes
The CSV File for Student import is required to have the desired format.
There is an example [here](https://github.com/LESTeamC/assistant-code-evaluator/blob/staging/implementation/angular-code-evaluator/students.csv) that can be uses for testing!

##Beta Release (11/11/2016)

http://les16c.fe.up.pt:3000/login

###Delivered User Stories:

1.<br>
As an administrator<br>
I want to login into the system<br>
So that I can have the available options of the platform<br>

2.<br>
As an examiner<br>
I want to login into the system<br>
So that I can initiate the code evaluation<br>

3.<br>
As an Administrator <br>
I want to create an exam <br>
So that I can have an automatic evaluation.<br>

4.<br>
As an Administrator <br>
I want to create an exercise <br>
So that I can use it on an exam.<br>


7.<br>
As an administrator<br>
I want to save an exercise.<br>
So that I have the guarantee that I do not lost my work.<br>


###Main Features

1. Two different login pages, with navigation from one page to another;
2. Login is made using Basic Authorization;
3. Different error messages for cases where access is forbidden, unauthorized or just error in connection occured.
3. Angular AuthGuards prevent from accessing page URLs directly without logging in;
4. Color pallet, global look and feel for the application, as well as an original logo and favicon.
5. Global routing for the page, both Administrator (sidebar) and Examiner modules.
6. Create Exams Module, for Administrator allows to create an exam and persist it to database;
7. Create Exams Module, for Administrator allows to create different exercises inside an exam and persist it to database;
8. Create Exams Module, for Administrator allows to create different criterias for each exercise inside an exam and persist it to database;
9. Exercise weights and Criteria weights cannot exceed 100% - Custom error messages are presented otherwise.

###Notes

Credentials for examiner login (username/password) - __up2011765544/admin__ <br>
Credentials for admin logn (username/password) - __operations/operations__ <br>

##Technologies:

<img src="https://code-maven.com/img/angularjs.png" alt="Drawing" width="100px" height="100px"/>
<img src="https://www.seeklogo.net/wp-content/uploads/2011/06/java-logo-vector.png" alt="Drawing" width="100px" height="100px"/>
<img src="http://gettingstartedon.com/wp-content/uploads/2016/02/SpingIcon.png" alt="Drawing" width="100px" height="100px"/>
<img src="http://www.polisdetecnologia.com.br/wp-content/uploads/2016/09/mysql_hosting.png" alt="Drawing" width="100px" height="100px"/>


[Angular 2](https://angular.io/)<br>
[Spring boot](https://projects.spring.io/spring-boot/)<br>
[MySQL](http://www.mysql.com/)<br>
[MOSS software similarity](https://github.com/nordicway/moji)<br>

# Development flow

<img src="http://nvie.com/img/git-model@2x.png" alt="Drawing" width="500px"/>

Info [here](http://nvie.com/posts/a-successful-git-branching-model/)

The **develop** branch will be the main branch for the development flow. This branch can be used for regular commits while developing.
We consider origin/develop to be the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release.

The **releases** branch will serve as a system testing branch.
Release branches support preparation of a new production release. They allow for last-minute dotting of i’s and crossing t’s. Furthermore, they allow for minor bug fixes and preparing meta-data for a release (version number, build dates, etc.).

The **master** branch will be like production.
We consider origin/master to be the main branch where the source code of HEAD always reflects a production-ready state.


# Useful Links

## Some great tutorials about Spring Framework

[Spring Boot Fundamentals](https://www.youtube.com/playlist?list=PLGDwUiT1wr6-Fn3N2oqJpTdhGjFHnIIKY)<br>
[Spring Security Fundamentals](https://www.youtube.com/playlist?list=PLGDwUiT1wr6-cvT21QHjfB_9xf7b7k7a-)<br>
[Spring Data Fundamentals](https://www.youtube.com/playlist?list=PLGDwUiT1wr693flGbjtm0WoB_722X6lNc)<br>

## Good explanation on JPA

[Understanding JPA, Part 1](http://www.javaworld.com/article/2077817/java-se/understanding-jpa-part-1-the-object-oriented-paradigm-of-data-persistence.html)<br>
[Understanding JPA, Part 2](http://www.javaworld.com/article/2077819/java-se/understanding-jpa-part-2-relationships-the-jpa-way.html)<br>
<br>
[A beginner’s guide to JPA and Hibernate Cascade Types](https://vladmihalcea.com/2015/03/05/a-beginners-guide-to-jpa-and-hibernate-cascade-types/)


## Good tutorial Angular 2

[Angular for Begginers](https://www.udemy.com/angular-2-tutorial-for-beginners/)

## Using Bootstrap with Angular 2

[Official API Documentation](https://ng-bootstrap.github.io/#/home)<br>
[Examples](https://valor-software.com/ng2-bootstrap/#/)

## Useful JS Library for Unzipping !

[JSZip](https://stuk.github.io/jszip/)

## Useful JS Library for Code Highlighting

[JSHighlight](https://highlightjs.org/)

