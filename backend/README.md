## Components

1)Auth

2)Posts

3)Comments

## Routes
# Auth
POST http://localhost:3000/v1/auth/createUser

POST http://localhost:3000/v1/auth/login

PUT http://localhost:3000/v1/auth/update

GET http://localhost:3000/v1/auth/user/:id 

# Comment
GET http://localhost:3000/comments

POST http://localhost:3000/comments/create

PUT http://localhost:3000/comments/like

GET http://localhost:3000/comments/:id 

# Post
GET http://localhost:3000/posts

GET http://localhost:3000/posts/:id

GET http://localhost:3000/posts/:id

POST http://localhost:3000/posts/create

POST http://localhost:3000/posts/sort

PUT http://localhost:3000/posts/update

PUT http://localhost:3000/posts/like

## Installation

```bash
$ npm install
```
## Running the seeds
```bash
$ npm run seed
```
## Running the app
```bash
$ npm run start
