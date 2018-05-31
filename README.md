[![Build Status](https://travis-ci.org/ascii-dev/maintenance-tracker.svg?branch=develop)](https://travis-ci.org/ascii-dev/maintenance-tracker)
[![Coverage Status](https://coveralls.io/repos/github/ascii-dev/maintenance-tracker/badge.svg?branch=develop)](https://coveralls.io/github/ascii-dev/maintenance-tracker?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/c961accccb9c57c80a68/maintainability)](https://codeclimate.com/github/ascii-dev/maintenance-tracker/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c961accccb9c57c80a68/test_coverage)](https://codeclimate.com/github/ascii-dev/maintenance-tracker/test_coverage)

# Maintenance Tracker
Maintenance Tracker App is an application that provides users with the ability to reach out to 
operations or repairs department regarding repair or maintenance requests and monitor the 
status of their request.

### Features
* Users can create an account and log in
* The users should be able to make maintenance or repairs request
* An admin should be able to approve/reject a repair/maintenance request
* The admin should be able to mark request as resolved once it is done
* The admin should be able to view all maintenance/repairs requests on the application
* The admin should be able to filter requests
* The user can view all his/her requests

## Getting Started
Instructions to get the project running successfully on your website

### Prerequisites
You need to have these installed before cloning the project
* NodeJS (atleast v8.11.2) - https://nodejs.org/en/download/
* Postgres - https://www.postgresql.org/download/


### Technologies Used
* NodeJS
* Express
* Postgres
* Mocha
* Chai

### Coding Style
[Airbnb JavaScript style guide](https://github.com/airbnb/javascript)

### How To Install
* Clone from github
  ```git clone https://github.com/ascii-dev/maintenance-tracker.git```
* CD into the directory
  ```cd maintenance-tracker```
* Install dependencies
  ```npm install```
* Install database tables
  ```psql -U [your postgres username] -d [your postgres database] -f tables.sql```
* Copy .env.example file into .env
  ```cp .env.example .env```
* Fill in database fields in the `.env` file created

### How To Run
  ```npm run dev```

### How To Test
  ```npm test```

### Working Endpoints
| Endpoint                              | Functionality                                     |
| ------------------------------------- | ------------------------------------------------- |
| POST /auth/signup                     | Register a user                                   |
| POST /auth/login                      | Login a user                                      |
| GET /users/requests                   | Fetch all the requests of a logged in​ user        |
| GET /users/requests/:requestId        | Fetch a request that belongs to a logged in user  |
| POST /users/requests                  | Create a request                                  |
| PUT /users/requests/:requestId        | Modify a request                                  |
| Get /requests/                        | Fetch all the requests                            |
| PUT /requests/:requestId/approve      | Approve request                                   |
| PUT /requests/:requestId/disapprove   | Disapprove request                                |
| PUT /requests/:requestId/resolve      | Resolve request                                   |

## License
This project is licensed under the MIT License 

## Author
[Samuel Afolaranmi](https://asciidev.com.ng)

## Acknowledgements
[Andela](https://andela.com)
[Scotch.io](https://scotch.io)
[PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
[FreeCodeCamp](https://medium.freecodecamp.com)
[Google](https://google.com)

## Acces running application
[Github Pages](https://asii-dev.github.io/maintenance-tracker/UI)<br>
[Heroku](https://ascii-mt.herokuapp.com)