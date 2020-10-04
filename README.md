## Keeper - note taking app

Simple note taking app created with React, Node, Express and PostgreSQL

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

### General info

This project is a simple note taking app inspired by the Google Keep.

I learned in [The Complete 2020 Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/) how to create the Add and Delete notes functionality for this app in React.

In order to deepen my knowledge on the technologies learned in the course, I decided to create a fullstack application with Create, Read, Update and Delete functionalities.

### Technologies

Project is created with:

- [React 16](https://reactjs.org/)
- [Node 12](https://nodejs.org/en/)
- [Express 6](https://expressjs.com/pt-br/)
- [PostgreSQL 12](https://www.postgresql.org/)

### Setup

To run this project, install it locally using npm:

```
$ cd ./client
$ npm install
$ npm start
```

Open [http://localhost:9000](http://localhost:9000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

```
$ cd ./server
$ npm install
$ npm start
```

Open [http://localhost:3000](http://localhost:9000) to view it in the browser.

The following table shows an overview of the REST APIs that are exported:

| Methods | URLs      | Actions           |
| ------- | --------- | ----------------- |
| GET     | notes     | get all Notes     |
| GET     | notes/:id | get Note by id    |
| POST    | notes     | add new Note      |
| PUT     | notes/:id | update Note by id |
| DELETE  | notes     | remove all Notes  |
| DELETE  | notes/:id | remove Note by id |

The connection of the client and server through the API is in implementation.

# Keeper

Thiago Rodrigues © 2020
