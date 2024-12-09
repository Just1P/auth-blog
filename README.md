# TODO 1

- Add CRUD BDD
- edit services for user and post
- edit controller for user and post
- Protect route POST /posts (create post)
- Protect route DELETE /posts/:id (delete post)
- Protect route UPDATE /posts/:id (update post)

# TODO 2

- Create into db relation use>post (OneToMany)
- add user relation to insert new post
- Check owner of post when delete or update

# Back (API)

- express
- postgres

## Routes

- users (CRUD)
- posts (CRUD)

## Tables

### Users

- id [Int PK]
- username [varchar]
- password [varchar]
- email [varchar]
- created_at [timestamp]

### Post

- id [int PK]
- user_id [Int FK] (Many To One)
- title [varchar]
- content [varchar]
- created_at [timestamp]
  image_path [varchar]

# Step to init project (Back)

- create folder (api)
- npm init
- typescript init
- install dependencies (express, typescript, npm i ts-node-dev --save-dev, nodemon, dotenv...)
- create files and folders project (index.ts, folder, src...)
- create routes (users, posts)
- test with Postman
- config docker-compose
- up containers
- create database and tables
- install dependencies postgres
- connect db
