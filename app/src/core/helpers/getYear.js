// This function returns the year of the student
const getYear = (user) => {
  const klas = user.user.klas.klas.split("");
  let year;
  klas.map((item) => {
    if (!isNaN(item)) {
      year = parseFloat(item);
    }
  });
  return year;
};

// This function returns the year of the klas
const getKlasYear = (klasName) => {
  const klas = klasName.split("");
  let year;
  klas.map((item) => {
    if (!isNaN(item)) {
      year = parseFloat(item);
    }
  });
  return year;
};

export { getYear, getKlasYear };
