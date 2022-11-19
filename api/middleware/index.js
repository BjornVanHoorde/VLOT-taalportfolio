import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import { QueryFailedError, TypeORMError } from "typeorm";

const registerMiddleware = (app) => {
  // use CORS middleware
  // add "allow all" cors
  if (process.env.ENV === "production") {
    const corsOptions = {
      origin: process.env.APP_URL,
      optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions));
  } else {
    app.use(cors());
  }

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.xssFilter());
};

const registerErrorHandler = (app) => {
  // Default error handler
  app.use(function (err, req, res, next) {
    let message;
    let statusCode;
    let errors = {};

    if (err instanceof QueryFailedError) {
      message = err.driverError.detail;
      statusCode =  400;
    } else if (err instanceof TypeORMError) {
      message = err.message;
      statusCode = 500;
    } else if (err instanceof BaseError) {
      message = err.message;
      statusCode = err.statusCode;
      errors = err.errors;
    } else {
      message = String(err);
      statusCode = 500;
    }
    res.status(statusCode).json({
      message,
      statusCode,
      errors
    });
  });
};

export {registerMiddleware, registerErrorHandler}