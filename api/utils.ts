import KlasService from "./modules/Klas/Klas.service";

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

const getGradeYear = (selectedYear: string) => {
  return Number(selectedYear) % 2 === 0 ? 2 : 1;
};

const convertYear = (selectedYear: string, klas: string) => {
  const splitKlas = klas.split("");
  let convertedYear: number;
  splitKlas.map((item) => {
    if (!isNaN(parseFloat(item))) {
      convertedYear = parseFloat(item);
    }
  });

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

const convertTeacherYear = (selectedYear: string, klas: string) => {
  const firstYear = selectedYear.split("-")[0];
  const secondYear = selectedYear.split("-")[1];
  const splitKlas = klas.split("");
  let classYear: number;
  splitKlas.map((item) => {
    if (!isNaN(parseFloat(item))) {
      classYear = parseFloat(item);
    }
  });

  const newDate = new Date();
  const dateYear = newDate.getFullYear();
  const dateMonth = String(newDate.getMonth() + 1).padStart(2, "0");

  if (dateMonth >= "09" && dateMonth <= "12") {
    return classYear - (dateYear - Number(firstYear));
  }

  if (dateMonth >= "01" && dateMonth <= "6") {
    return classYear - (dateYear - Number(secondYear));
  }
};

export {
  CheckTeacherClasses,
  convertYear,
  getGrade,
  getGradeYear,
  convertTeacherYear,
};
