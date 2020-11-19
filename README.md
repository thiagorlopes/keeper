## Keeper - note taking app

Simple note taking app created with React, Node, Express and PostgreSQL

Production build: https://herokeeper.herokuapp.com/

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

### General info

This project is a simple note taking app inspired by the [Google Keep](https://keep.google.com/).

I learned in [The Complete 2020 Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/) how to create the Add and Delete notes functionality for this app in React.

In order to deepen my knowledge on the technologies learned in the course, I decided to create a fullstack application with Create, Read, Update and Delete functionalities.

[![Keeper demo](https://i.imgur.com/A6dQSmF.png)](https://youtu.be/l2lTnYmxgkU)

### Technologies

Project is created with:

- [React 16](https://reactjs.org/)
- [Node 12](https://nodejs.org/en/)
- [Express 6](https://expressjs.com/pt-br/)
- [PostgreSQL 12](https://www.postgresql.org/)

### Setup
#### Server
You can install the server locally by running npm:

```
$ npm install
$ npm run dev
```
The server will run on port 9000.

The following table shows an overview of the REST APIs that are exported:

| Methods | URLs      | Actions           |
| ------- | --------- | ----------------- |
| GET     | notes     | get all Notes     |
| GET     | notes/:id | get Note by id    |
| POST    | notes     | add new Note      |
| PUT     | notes/:id | update Note by id |
| DELETE  | notes     | remove all Notes  |
| DELETE  | notes/:id | remove Note by id |

#### Client
To run this project, install the client locally by running npm:

```
$ cd ./client
$ npm install
$ npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


### To Do

- Work on placement of notes in home screen;
- Add login and register pages;
- Implement authentication system;
- Create mailer system for email confirmation.

# Keeper

Thiago Rodrigues © 2020

