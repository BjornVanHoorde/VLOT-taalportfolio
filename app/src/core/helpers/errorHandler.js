const errorHandler = (err) => {
  if (err === "401 Unauthorized") {
    return "Gebruikersnaam of wachtwoord onjuist";
  }
};

export default errorHandler;
