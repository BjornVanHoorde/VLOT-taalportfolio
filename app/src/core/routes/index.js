const AuthRoutes = {
  Index: "/auth",
  Login: "/auth/login",
};

const TaalprofielRoutes = {
  Index: "/taalprofiel",
  Overview: "/taalprofiel/:student",
};

const TaaldossierRoutes = {
  Index: "/taaldossier",
  Overview: "/taaldossier/:student",
};

const TaalgroeiRoutes = {
  Index: "/taalgroei",
  Vaardigheden: "/taalgroei/vaardigheden",
  Foutanalyse: "/taalgroei/foutanalyse",
  Woordenschat: "/taalgroei/woordenschat",
  Taaltips: "/taalgroei/taaltips",
};

const BasisgeletterdheidRoutes = {
  Index: "/basisgeletterdheid",
  Overview: "/basisgeletterdheid/:student",
};

const ProfielRoute = {
  Index: "/profiel",
};

const KlasRoutes = {
  Index: "/klas",
  Overview: "/klas/:klas",
};

const StudentRoutes = {
  Index: "/leerling",
  Overview: "/leerling/:student",
};

const AllStudentRoutes = {
  Index: "/leerlingen",
  Overview: "/leerlingen/:klas",
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
  AllStudentRoutes,
  TaaldossierRoutes,
  BasisgeletterdheidRoutes,
};
