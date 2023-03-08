import { createContext, useContext, useState } from "react";
import Years from "./Years";
import { useAuthContext } from "../Auth/AuthProvider";

const YearContext = createContext();

const getYear = (user) => {
  if (!user) return null;
  const klas = user.user.klas.klas.split("");
  let year;
  klas.map((item) => {
    if (!isNaN(item)) {
      year = parseFloat(item);
    }
  });
  return year;
};

const getYearFromStorage = (user) => {
  if (!user) return null;
  const Year = localStorage.getItem("VLOT-Year");
  if (Year) {
    return Year;
  }
  const currentYear = getYear(user);
  return Years[currentYear - 1].value;
};

const saveYearToStorage = (Year) => {
  localStorage.setItem("VLOT-Year", Year);
};

const getAvailableYears = (user) => {
  if (!user) return null;
  if (user) {
    const years = [];
    for (let i = 0; i < getYear(user); i++) {
      years.push(Years[i]);
    }
    return years;
  }
  return null;
};

const YearProvider = ({ children }) => {
  const { auth } = useAuthContext();
  const [studentYear, setStudentYear] = useState(getYear(auth)); // [1, 2, 3, 4
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
        studentYear,
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
