# Backend for the Code Evaluator Project using Spring Boot and mySQL

## Set up project and development environment

### Java

Make sure you have Java installed

```
$ java -version
```

### Install Maven

[http://maven.apache.org/install.html](http://maven.apache.org/install.html)

When using Maven CLI, make sure to have your PATH variable configured

```
$ export PATH=/opt/apache-maven-3.3.9/bin:$PATH
```

Replace /opt with the directory in witch you have the files that you downloaded.

### Install Spring IDE

Just download from here 
[https://spring.io/tools/sts](https://spring.io/tools/sts)

Next, import the project from it's root and you're ready to go

### Set up mySQL Server

Install mySQL server from:
[https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)

When developing or testing, don't forget to start the mySQL server!
(in Mac, in System Preferences, mySQL Server)

Install mySQL workbench
[https://dev.mysql.com/downloads/workbench/](https://dev.mysql.com/downloads/workbench/)

Make sure you have mySQL command line in your PATH
```
$ export PATH=/opt/apache-maven-3.3.9/bin:$PATH
```
(in Mac)

### Set up Development DB

Open up your terminal and write

```
$ mysql -uroot -p
```

To login as an ADMIN in your mySQL Server

Create a generic "codeevaluator" Database

```
$ create database codeevaluator;
```

Create a development user

```
$ create user 'devusr'@'localhost' identified by 'lesteamc2016';
```

Grant access to the user

```
$ grant all on codeevaluator.* to 'devusr'@'localhost';
```
```
$ Flush privileges;
```

## Directory Description
```
+---src/main/java
|   +---org.evaluator
|       +---- .ws
|              +---- model
|              +---- repository
|              +---- security
|              +---- service
|              +---- util
|              +---- web
|                     +---- api
|                     +---- filter
+---src/main/resources
|   +---org.config
|   +---org.data
|       +---- mysql
+---src/main/test
|   +---org.evaluator.ws
|       +---- .repository
|       +---- .service
|       +---- .web.api
+---pom.xml
```

Inside the `src/main/java` goes the code, which is devided is several packages.
The application class (Responsible for running our APP), as well as the security configuration class go directly inside `org.evaluator`

- `model`: Classes belonging to entities (representations of database tables) or other useful entities.
- `repository`: Interfaces that extend JPARepository. Responsible for communication with the database
- `security`: Spring Secutiry auxiliary classes
- `service`: Service classes. Should implement all business logic and establish connection between controllers and data layer
- `util`: Utilitary classes and methods
- `web.api`: Contoller classes. Should establish our API and endpoints. Communicate with the Service layer.
- `web.filter`: Auxiliary package (Spring context initialization)


Inside `src/main/resources`go the application configuration files and the data initialization scripts

- `config`: Property files for configuring database connection and other aspects, like security properties
- `data`: Initialization scripts for MySQL database.

Inside the `src/main/test` go the unit tests for the several modules.

- `repository`: Repository tests
- `service`: Service tests
- `web.api`: Controller tests