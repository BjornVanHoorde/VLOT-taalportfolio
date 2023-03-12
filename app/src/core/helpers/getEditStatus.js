import getYear from "./getYear";

// Get the edit status of the student
const getEditStatusStudent = (student, selectedYear) => {
  return getYear(student) === Number(selectedYear) ? false : true;
};

export default getEditStatusStudent;
