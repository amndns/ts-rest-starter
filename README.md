<h1 align="center">TypeScript REST API Starter</h1>
<p align="center">
  <a href="https://github.com/amndns/ts-rest-starter/blob/main/README.md" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/amndns/ts-rest-starter/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/amndns/ts-rest-starter/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-green.svg" />
  </a>
</p>

> TypeScript REST API Starter is a boilerplate for building RESTful API services using NodeJS Express and TypeScript.

## ✨ Features

- **Clear Structure** with different layers such as controllers, services, repositories, models, middlewares, and so on.
- **Dependency Injection** done with the nice framework from [TypeDI](https://github.com/pleerock/typedi).
- **Simplified Database Query** with the ORM [TypeORM](https://github.com/typeorm/typeorm).
- **Smart Validation** thanks to [class-validator](https://github.com/typestack/class-validator).
- **Smart Transformation** thanks to [class-transformer](https://github.com/typestack/class-transformer).
- **Smart Utilities** thanks to [@amndns/service-utils](https://github.com/amndns/service-utils).
- **Easy Exception Handling** thanks to [routing-controllers](https://github.com/typestack/routing-controllers).
- **Easy API Testing** with included unit testing thanks to [Jest](https://facebook.github.io/jest).
- **Easy RabbitMQ Integration** thanks to [@amndns/amqp-ts](https://github.com/amndns/amqp-ts).
- **Easy Redis Integration** thanks to [@amndns/redis-ts](https://github.com/amndns/redis-ts).

Give a ⭐️ if this project helped you!

### Good for First Timers

- [ ] Add E2E tests using [supertest](https://github.com/visionmedia/supertest).
- [ ] Improve authentication using [passport](https://github.com/jaredhanson/passport).
- [ ] Add basic security features using [Helmet](https://helmetjs.github.io/).
- [ ] Add basic monitoring using [express-status-monitor](https://github.com/RafalWilinski/express-status-monitor).

## 🔬 Project Structure

| Name                              | Description |
| --------------------------------- | ----------- |
| **.vscode/**                      | VSCode tasks, launch configuration, and some other settings |
| **dist/**                         | Compiled source files |
| **src/**                          | Source files |
| **src/api/common/**               | Common API controllers, services, repositories, models, middlewares, etc. |
| **src/api/\*\*/controllers/**     | REST API controller layer |
| **src/api/\*\*/middlewares/**     | Express middlewares like logging |
| **src/api/\*\*/models/**          | TypeORM entity models and REST API backend models |
| **src/api/\*\*/producers/**       | RabbitMQ publishers |
| **src/api/\*\*/repositories/**    | REST API repository/DAO layer |
| **src/api/\*\*/services/**        | REST API service layer |
| **src/auth/**                     | Authentication checkers and services |
| **src/config/**                   | Environment configurations loaded into the project |
| **src/database/factories/**       | Factory that generates fake entities |
| **src/database/migrations/**      | Database migration scripts |
| **src/database/seeds/**           | Seeds to create some data in the database |
| **src/loaders/**                  | REST API server configuration loader |
| **src/utils/**                    | Common REST API utilities |
| **test/**                         | Tests |
| **test/unit/**                    | Unit tests and their mocks |
| **.env.example**                  | Example raw environment configurations |

## ⚙️ API Endpoints

The route prefix is `/api` by default, but you can change this in the `.env` file.

| Route          | Description |
| -------------- | ----------- |
| **/api/customers** | Example entity endpoint |

## 🚀 Get Started

This project was created using [TypeScript](https://www.typescriptlang.org/).

Before running any of the `yarn` commands below, make sure you create a `.env` file first. You can simply copy the contents of the `.env.example` into your local `.env` file. Moreover, make sure you also have the proper local resources running before starting the server (e.g. RabbitMQ, Redis, PostgreSQL).

Below is a guide on the common commands you might use all throughout the development process. In the project directory, you can run:

#### `yarn install`

Installs all package dependencies of the app. Make sure you have [yarn](https://yarnpkg.com/) installed and configured first.

#### `yarn start`

Starts the server by transpiling all of the `.ts` code to `.js` and then running the `dist/app.js` entrypoint.

#### `yarn start:watch`

Starts the server in watch mode by concurrently transpiling all of the `.ts` code to `.js` and running the `dist/app.js` entrypoint.

#### `yarn lint`

Launches the linter against all of the `.ts` files from the `src/` and `test/` directory. The project specifically uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) as the linter and code formatter, respectively.

#### `yarn test:unit`

Launches the test runner in interactive watch mode using Jest. The test is launched against all of the `.ts` files from the `test/` directory.

## 📑 Logging

[Winston](https://github.com/winstonjs/winston) is being used as the logger. To log HTTP requests, we use the express middleware [morgan](https://github.com/expressjs/morgan). You can check a sample usage of the logger utility.

```typescript
import { Logger, WinstonLogger } from '@amndns/service-utils/logger';

@Service()
export class SampleService {
    constructor(
      @Logger(__filename) private log: WinstonLogger,
    ) {}

    ...
```

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_