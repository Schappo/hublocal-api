# Felipe Schappo - Hublocal API

## Description

This is a project for a Hublocal technical interview. 
We can register a User, each user can create many companies and update and delete as well.
Each company can have many locations, the user can create update and delete locations for all yours companies.

## Installation

```bash
$ npm install
```

Install Docker and Docker Compose to run Postgres image

```bash
$ docker-compose up -d
```

### Bootstrap app script

The project have ZX installed. With this library makes easy to write script in JS syntax. 
In scripts folder have a `bootstrap-app.script.mjs` file, run it to initialize the project.

After installed install project and have docker engine running, go to scripts folder and run the command:

```bash
$ zx bootstrap-app.script.mjs
```

After you can run prisma seed to populate you database. 

```bash
$ npx prisma db seed
```

You can login the app with credentials below

```js
  email: 'admin@admin.com',
  name: 'Admin',
  password: 'admin$1Admin'
```

## Running the API

**Make sure you have hublocal API running**

```bash
# development
$ npm run dev

```