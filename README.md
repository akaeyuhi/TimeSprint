# TimeSprinter

## What is TimeSprinter? 

TimeSprinter is a simple fullstack web-app that will help you organize your free time.

# Main features:

- USER:
    - [x] Create personal account
    - [x] Create tasks
    - [x] Create activities
    - [x] Create teams, create projects, add new members and admins. 
    - [x] View other people's profiles and stats
- ADMIN:
    - [x] Manage, delete, update and create entities
    - [x] Get and view all the data from the db
    - [x] Grant or revoke user's admin status

Api also has properly configured swagger at /api endpoint where you can test all the server features.

### To properly work with server and database create .env file in root backend folder
```
PORT = 3000 || any other port
JWT_SECRET = "your secret key"
JWT_REFRESH_SECRET = "your refresh token secret"
```

### Also modify ormconfig.ts file according to your db config:
```typescript
export const DatabaseConnectionConfiguration: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'timesprint_db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};

```

## Initial setup

#### Clone repository:
```bash
git clone https://github.com/akaeyuhi/TimeSprint
```

#### Install dependencies:
```bash
npm run installDependencies
```

#### Start app:
```bash
npm run start
```

#### Open http://localhost:3000/ or other link you provide and enjoy.

#### All scripts:
* `npm run installDependencies` - install dependencies
* `npm run build` - builds both client and server
* `npm run start:dev` - starts nest server in dev mode
* `npm run start` - Builds server and client and starts in production mode


### Technology stack
* Frontend - React.JS, Typescript, MUI, axios.
* Backend - NestJS, TypeORM.
* Database - PostgreSQL


### License
This program is distributed under an MIT License.
