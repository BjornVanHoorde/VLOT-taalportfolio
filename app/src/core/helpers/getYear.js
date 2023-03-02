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

export default getYear;
