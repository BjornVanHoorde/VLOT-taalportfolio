// This function returns the year of the student
const getYear = (user) => {
  const klas = user.user.klas.klas.split("");
  let first = false;
  let year;
  klas.map((item) => {
    if (!isNaN(item)) {
      if (!first) {
        first = true;
        year = parseFloat(item);
      }
    }
  });
  return year;
};

// This function returns the year of the klas
const getKlasYear = (klasName) => {
  const klas = klasName.split("");
  let year;
  let first = false;
  klas.map((item) => {
    if (!isNaN(item)) {
      if (!first) {
        first = true;
        year = parseFloat(item);
      }
    }
  });
  return year;
};

export { getYear, getKlasYear };
