const AuthRoutes = {
  Index: "/auth",
  Login: "/auth/login",
};

const TaalprofielRoutes = {
  Index: "/taalprofiel",
  Overview: "/taalprofiel/:student",
};

const ProfielRoute = {
  Index: "/profiel",
};

const TaalgroeiRoutes = {
  Index: "/taalgroei",
  Vaardigheden: "/taalgroei/vaardigheden",
  Foutanalyse: "/taalgroei/foutanalyse",
  Woordenschat: "/taalgroei/woordenschat",
  Taaltips: "/taalgroei/taaltips",
};

const KlasRoutes = {
  Index: "/klas",
  Overview: "/klas/:klas",
};

const StudentRoutes = {
  Index: "/leerling",
  Overview: "/leerling/:student",
};

export const route = (path, options = {}) => {
  Object.keys(options).forEach((key) => {
    path = path.replace(`:${key}`, options[key]);
  });
  return path;
};

export {
  AuthRoutes,
  TaalprofielRoutes,
  ProfielRoute,
  TaalgroeiRoutes,
  KlasRoutes,
  StudentRoutes,
};
