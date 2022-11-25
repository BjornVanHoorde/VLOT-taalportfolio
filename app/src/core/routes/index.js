const AuthRoutes = {
  Index: "/auth",
  Login: "/auth/login",
};

export const route = (path, options = {}) => {
  Object.keys(options).forEach((key) => {
    path = path.replace(`:${key}`, options[key]);
  });
  return path;
};

export { AuthRoutes };
