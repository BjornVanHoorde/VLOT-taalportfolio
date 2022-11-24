import * as passport from "passport";
import AuthError from "../../errors/AuthError";
import LocalStrategy from "./LocalStrategy";
import ForbiddenError from "../../errors/ForbiddenError";
import * as jwt from "jsonwebtoken";
import JwtStrategy from "./JwtStrategy";

passport.use("local", LocalStrategy);
passport.use("jwt", JwtStrategy);

const passportWithErrorHandling = (strategy) => {
  return function (req, res, next) {
    passport.authenticate(strategy, { session: false }, function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(new AuthError());
      } else {
        req.user = user;
        return next();
      }
    })(req, res, next);
  };
};

const authLocal = passportWithErrorHandling("local");
const authJwt = passportWithErrorHandling("jwt");

const createToken = (user) => {
  return jwt.sign({ id: user.id, user: user.email }, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN_HOURS) * 60 * 60,
  });
};

const withRole = (role) => (req, res, next) => {
  const { user } = req;

  if (user.role === role) {
    next();
  } else {
    next(new ForbiddenError());
  }
};

export { authLocal, authJwt, withRole, createToken };
