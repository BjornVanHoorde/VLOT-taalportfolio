import { createContext, useContext, useState } from "react";
import Years from "./Years";
import { useAuthContext } from "../Auth/AuthProvider";
import { isStudent, isTeacher } from "../../../core/helpers/isRole";

const YearContext = createContext();

const getYear = (user) => {
  if (!user) return null;
  let year;
  if (isStudent(user)) {
    const klas = user.user.klas.klas.split("");
    klas.map((item) => {
      if (!isNaN(item)) {
        year = parseFloat(item);
      }
    });
  }

  if (isTeacher(user)) {
    const newDate = new Date();
    const dateYear = newDate.getFullYear();
    const dateMonth = String(newDate.getMonth() + 1).padStart(2, "0");
    const dateDay = String(newDate.getDate()).padStart(2, "0");
    const today = dateYear + "-" + dateMonth + "-" + dateDay;

    if (today > `${dateYear}-09-01` && today <= `${dateYear}-12-31`) {
      return `${dateYear}-${dateYear + 1}`;
    }

    if (today >= `${dateYear}-01-01` && today < `${dateYear}-07-01`) {
      return `${dateYear - 1}-${dateYear}`;
    }
  }
  return year;
};

const getYearFromStorage = (user) => {
  if (!user) return null;

  if (isStudent(user)) {
    const Year = localStorage.getItem("Student-VLOT-Year");
    if (Year) {
      return Year;
    }
    const currentYear = getYear(user);
    return Years[currentYear - 1].value;
  }

  if (isTeacher(user)) {
    const Year = localStorage.getItem("Teacher-VLOT-Year");
    if (Year) {
      return Year;
    }
    const currentYear = getYear(user);
    return currentYear;
  }
};

const saveYearToStorage = (Year) => {
  localStorage.setItem("VLOT-Year", Year);
};

const getAvailableYears = (user) => {
  if (!user) return null;
  if (isStudent(user)) {
    const years = [];
    for (let i = 0; i < getYear(user); i++) {
      years.push(Years[i]);
    }
    return years;
  }

  if (isTeacher(user)) {
    let years = [];
    user.user.leerkrachtKlassen.forEach((klas) => {
      years.push(
        `${new Date(klas.geldigVan).getFullYear()}-${new Date(
          klas.geldigTot
        ).getFullYear()}`
      );
    });

    years = [...new Set(years)];

    years.forEach((year, index) => {
      years[index] = {
        label: year,
        value: year,
      };
    });
    return years;
  }
};

const YearProvider = ({ children }) => {
  const { auth } = useAuthContext();
  const [year, setYear] = useState(getYear(auth)); // [1, 2, 3, 4
  const [selectedYear, setSelectedYear] = useState(getYearFromStorage(auth));
  const [availableYears, setAvailableYears] = useState(getAvailableYears(auth));

  const handleYearChange = (Year) => {
    setSelectedYear(Year);
    saveYearToStorage(Year);
  };

  return (
    <YearContext.Provider
      value={{
        selectedYear,
        year,
        changeYear: handleYearChange,
        availableYears,
      }}
    >
      {children}
    </YearContext.Provider>
  );
};

export const useYearContext = () => {
  return useContext(YearContext);
};

export default YearProvider;
