Welcome to Serenade's TODO app, version 1!

# Introduction

This small, 2-page app helps us track our pending TO-DOs across projects.

We have completed all the frontend features we needed, so don't worry about any of the UI - even if it doesn't look great yet.

The app has two pages, the [task board](http://localhost:3000/) and the [project board](http://localhost:3000/projects). 
Both pages use asynchronous calls to fetch data from the backend.

The backend has 3 API endpoints:
- /api/tasks
- /api/projects
- /api/done

These are implemented as Next.JS API routes - you can find them under src/pages/api

# How to run it

```shell
npm install
npm run dev
```

This installs all dependencies and starts serving the app in http://localhost:3000

We use PostgreSQL as our data store, so before the app is accessible we also need to spin it up: 

## With Docker

If you use Docker, you can run 
```shell
docker-compose up
```
to get Postgres up and running. This will bring up two postgres services for dev testing and integration tests,

01. on port 5432 in your machine, so make sure it's free.

Initial schema and test data will be created automatically.

## Without Docker
You can spin up your own Postgres instance and update the connection settings in src/database/database.ts

Next, execute the SQL in the database/init.sql file to get the schema and initial data loaded.

## If you make changes to the init.sql file

Note the schema init script only runs when you first kick off the database.
If you make changes to it, run
```shell
docker-compose down && docker-compose up
```
to recreate the database with the new schema. 

## env properties

file | what it for
--- | ---
.env | default environment properties.
.env.development | local developement environment properties.
.env.test | test environment properties.

Refer nextjs docs [here](https://nextjs.org/docs/basic-features/environment-variables).

## Runing tests

01. ```docker-compose up```
02. ```npm run test```

Or ```npm run:unit``` to run unit tests mocking dao layer.

Jest has been configured to run api level testing with node execution enviornment. It will force all dao tests to be executed as database integration test against the test-db docker container. These tests at the moment will depends on the init script to have the scema ready and data ready for initial test cases.

# Exercises

* Feel free to modify any of the files in this whole project when completing these exercises.
* Complete the exercises as if you were writing code for production. So whatever you would normally do for code going into PROD - the same should apply here.
* You shouldn't need to change any of the frontend.

### How to submit

When you have completed the exercises, please commit into a private GitHub repo and tag the following github usernames as collaborators so we can review.

* surenw-serenade
* erwinrommel
* akbortoli
* thecodelifter


## 1. Filter tasks by title

The tasks board page in http://localhost:3000/ has a filtering feature based on task title.

The frontend is sending the query parameter correctly to the /api/tasks endpoint, but we haven't done the backend part yet.

We should:
 - Complete the filtering feature based on the query parameter in the /api/tasks endpoint
 - Make sure this is safe and doesn't pose a security risk
 - Make sure it's as efficient as possible


## 2. Pagination types

Both API endpoints (/api/projects and /api/tasks) return a very similar JSON shape, which is typed in the index.d.ts file
in the root of the project. 

As we're getting ready to add more routes and types, we'd like to reduce redundancy and duplication and maybe come up
with a new type that can encompass any paginated response types in the future. Could you help with this?


## 3. Projects API improvements

The projects page in http://localhost:3000/projects fetches all the data from the /api/projects endpoint.

This is working well in our local, but when doing load testing with a lot of projects and tasks we saw a serious performance degradation.

We should make sure this API is as performant as possible, as it will be under heavy load.
