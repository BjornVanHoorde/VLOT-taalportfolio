import Roles from "../constants/Roles";

const isStudent = (user) => user.user.rol === Roles.Student;

const isTeacher = (user) => user.user.rol === Roles.Teacher;

export { isStudent, isTeacher };
