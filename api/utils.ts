import KlasService from "./modules/Klas/Klas.service";
import { UserBody } from "./modules/User/User.types";

const CheckTeacherClasses = async (userId: number, classId: number) => {
  const klasService = new KlasService();
  let access = false;

  const klassen = await klasService.byTeacher(userId);
  klassen.forEach((klas) => {
    if (klas.id == classId) {
      access = true;
    }
  });

  return access;
};

const convertYear = (selectedYear: string, klas: string) => {
  console.log("selectedYear", selectedYear);
  const splitKlas = klas.split("");
  let convertedYear: number;
  splitKlas.map((item) => {
    if (!isNaN(parseFloat(item))) {
      convertedYear = parseFloat(item);
    }
  });
  console.log("convertedYear", convertedYear);

  // get the date of today
  const newDate = new Date();
  const dateYear = newDate.getFullYear();
  const dateMonth = String(newDate.getMonth() + 1).padStart(2, "0");
  const dateDay = String(newDate.getDate()).padStart(2, "0");
  const today = dateYear + "-" + dateMonth + "-" + dateDay;

  if (today > `${dateYear}-09-01` && today <= `${dateYear}-12-31`) {
    return dateYear - (convertedYear - Number(selectedYear));
  }

  if (today >= `${dateYear}-01-01` && today < `${dateYear}-07-01`) {
    return dateYear - (convertedYear - Number(selectedYear) + 1);
  }
};

const getGrade = (selectedYear: string) => {
  switch (String(selectedYear)) {
    case "1":
      return 1;
    case "2":
      return 1;
    case "3":
      return 2;
    case "4":
      return 2;
    case "5":
      return 3;
    case "6":
      return 3;
    case "7":
      return 3;
    default:
      break;
  }
};

export { CheckTeacherClasses, convertYear, getGrade };
