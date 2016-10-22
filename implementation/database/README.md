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

- *OneToMany* relationship with __Role__ - An account can have multiple roles
- *OneToOne* relationship with __Examiner__ - Each examiner will have one account

### Examiner

Table responsible for storing the examiner's information (not including PW - This will be stored in Account).

- *OneToOne* relationship with __Acount__ ;
- *OneToMany* relationship with __Exercise__ - Each examiner will have a list of exercises, that have been delegated to him;

> *name*: The full of the examiner;<br>
> *username*: Meant to store academic number (ex up12213)<br>
> *email*: Email address (can be useful, you never know)<br>



