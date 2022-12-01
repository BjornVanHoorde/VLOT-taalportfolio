import { userRoles } from "./constants";

const isAdmin = (user) => {
  if (user) {
    return user.rol === userRoles.Admin;
  }
  return false;
};

const isTeacher = (user) => {
  if (user) {
    return user.rol === userRoles.Teacher;
  }
  return false;
};

const isStudent = (user) => {
  if (user) {
    return user.rol === userRoles.Student;
  }
  return false;
};

export { isAdmin, isStudent, isTeacher };
