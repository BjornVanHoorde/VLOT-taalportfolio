import Roles from "../constants/Roles";

// get the roles of a user
const isStudent = (user) => user.user.rol === Roles.Student;

const isTeacher = (user) => user.user.rol === Roles.Teacher;

export { isStudent, isTeacher };
