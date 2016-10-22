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

Create a generic "greeting" Database

```
$ create database greeting;
```

Create a development user

```
$ create user 'greetusr'@'localhost' identified by 'greetpwd';
```

Grant access to the user

```
$ grant all on greeting.* to 'greetusr'@'localhost';
```
```
$ Flush privileges;
```