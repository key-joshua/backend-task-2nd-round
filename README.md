[![Maintainability](https://api.codeclimate.com/v1/badges/1d78d8d35c44964eeeff/maintainability)](https://codeclimate.com/github/key-joshua/backend-task-2nd-round/maintainability)
[![CircleCI](https://circleci.com/gh/key-joshua/backend-task-2nd-round/tree/develop.svg?style=svg)](https://circleci.com/gh/key-joshua/backend-task-2nd-round/tree/develop)
[![Coverage Status](https://coveralls.io/repos/github/key-joshua/backend-task-2nd-round/badge.svg?branch=main)](https://coveralls.io/github/key-joshua/backend-task-2nd-round?branch=main)
[![codecov](https://codecov.io/gh/key-joshua/backend-task-2nd-round/branch/main/graph/badge.svg?token=wSbmlMz2v9)](https://codecov.io/gh/key-joshua/backend-task-2nd-round)

# BACKEND TASK - 2nd Round

Task for creating server application with Node.js

#### This is the Hosted link of the backend challenge
https://backend-task-2nd-round.herokuapp.com

#### This is the Hosted link of testing swagger documentation
https://backend-task-2nd-round.herokuapp.com/api/documentation

#### This is the Github repository link of the backend challenge 
https://github.com/key-joshua/backend-task-2nd-round


<br>

## Features

- Select all employees.
- Select particular employee.
- delete an employee.
- update an employee.

## Test Backend Task 2nd round APIs

Before we get started Remember to take  :coffee:   :pizza:  and :dancer:  When You Are coding, come on Dude it all about relax

### Backend tools

 - All Neccessary libraries.
 - Express JS.
 - NodeJs.

#### TABLE OF API ENDPOINTS SPECIFICATION AND DESCRIPTION

- Versioning API using URL starts with https://backend-task-2nd-round.herokuapp.com/path  


|NO  | VERBS  | ENDPOINTS                                      | STATUS  | ACCESS  | DESCRIPTION                         |
|----|--------|------------------------------------------------|---------|---------|-------------------------------------|
| 1  | GET    | /api/employees/select-employees?page=1&limit=1 | 200 OK  | public  | select all employees                |
| 2  | GET    | /api/employees/select-employee/:employeeId     | 200 OK  | public  | select particular employee          |
| 3  | DELETE | /api/employees/delete-employee/:employeeId     | 200 OK  | public  | delete an employee by employee id   |
| 4  | PATCH  | /api/employees/update-employee/:employeeId     | 200 OK  | public  | update an employee by employee id   |


#### Other Tools

Other tools and technologies used in development of this application are;
- Hosting: [Heroku](https://heroku.com/).
- Compiler: [Babel](https://babeljs.io/).
- Style Guide: [Airbnb](https://airbnb.io/projects/javascript/).
- Framework: [ExpressJS](http://expressjs.com/).
- Documentation: [Swagger](https://swagger.io/).
- Linting Library: [ESLint](https://eslint.org/).
- API Testing environment: [Postman](https://www.getpostman.com).
- Programming language: [JavaScript(ES6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/).
- Text Editor: [VSCode](https://code.visualstudio.com), [Sublime Text](https://www.sublimetext.com/).

## GETTING TEST WITH PROJECT GLOBALLY

- [API Swagger Documentation](https://backend-task-2nd-round.herokuapp.com/api/documentation)

## GETTING TEST WITH PROJECT LOCALLY

- Open your Gitbash/cmd and run command below to Clone repository into your local machine:
```
git clone https://github.com/key-joshua/backend-task-2nd-round.git
```

- Run command below to dive into cloned repository in your local machine:
```
cd backend-task-2nd-round
```

- Install the required dependencies found in package.json by running this command:
```
npm install
```

- And then to start running  this project on your machine , run this command:
```
npm run start
 ```

- then to run test, run this commands:
```
npm run kill
```
```
- npm run test
```