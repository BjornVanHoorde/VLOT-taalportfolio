import getYear from "./getYear";

const getEditStatusStudent = (student, selectedYear) => {
  return getYear(student) === Number(selectedYear) ? false : true;
};

export default getEditStatusStudent;
