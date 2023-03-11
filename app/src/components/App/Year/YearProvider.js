import { createContext, useContext, useEffect, useState } from "react";
import Years from "./Years";
import { useAuthContext } from "../Auth/AuthProvider";
import { isStudent, isTeacher } from "../../../core/helpers/isRole";

const YearContext = createContext();

// Get the year from the user
const getYear = (user) => {
  if (!user) return null;
  let year;
  // If the user is a student, get the year from the klas
  if (isStudent(user)) {
    const klas = user.user.klas.klas.split("");
    klas.map((item) => {
      if (!isNaN(item)) {
        year = parseFloat(item);
      }
    });
  }

  // If the user is a teacher, get the year from the current date
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

// Get the year from the local storage
const getYearFromStorage = (user) => {
  if (!user) return null;

  // If the user is a student, get the year from the local storage
  if (isStudent(user)) {
    const Year = localStorage.getItem("Student-VLOT-Year");
    if (Year) {
      return Year;
    }
    const currentYear = getYear(user);
    return Years[currentYear - 1].value;
  }

  // If the user is a teacher, get the year from the local storage
  if (isTeacher(user)) {
    const Year = localStorage.getItem("Teacher-VLOT-Year");
    if (Year) {
      return Year;
    }
    const currentYear = getYear(user);
    return currentYear;
  }
};

// Save the year to the local storage
const saveYearToStorage = (Year) => {
  localStorage.setItem("VLOT-Year", Year);
};

// Get the available years for the user
const getAvailableYears = (user) => {
  if (!user) return null;

  // If the user is a student, get the available years based on the klas
  if (isStudent(user)) {
    const years = [];
    for (let i = 0; i < getYear(user); i++) {
      years.push(Years[i]);
    }
    return years;
  }

  // If the user is a teacher, get the available years based on the klassen
  if (isTeacher(user)) {
    let years = [];
    user.user.leerkrachtKlassen.forEach((klas) => {
      years.push(
        `${new Date(klas.geldigVan).getFullYear()}-${new Date(
          klas.geldigTot
        ).getFullYear()}`
      );
    });

    // Remove duplicates
    years = [...new Set(years)];

    // tranform the years to an array of objects
    years.forEach((year, index) => {
      years[index] = {
        label: year,
        value: year,
      };
    });
    return years;
  }
};

// This is a provider that will be keeping track of the current year
const YearProvider = ({ children }) => {
  const { auth } = useAuthContext();
  const [year, setYear] = useState(getYear(auth)); // [1, 2, 3, 4
  const [selectedYear, setSelectedYear] = useState(getYearFromStorage(auth));
  const [availableYears, setAvailableYears] = useState(getAvailableYears(auth));

  const handleYearChange = (Year) => {
    setSelectedYear(Year);
    saveYearToStorage(Year);
  };

  // When the auth changes, update the year and the available years
  useEffect(() => {
    setYear(getYear(auth));
    setSelectedYear(getYearFromStorage(auth));
    setAvailableYears(getAvailableYears(auth));
  }, [auth]);

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
