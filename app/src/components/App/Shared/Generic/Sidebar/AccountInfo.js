import no_picture from "../../../../../img/no_picture.svg";

const AccountInfo = () => {
  return (
    <div className="account-info">
      <img src={no_picture} alt="geen afbeelding" />
      <p>Naam Voornaam</p>
      <p>Klasnummer</p>
    </div>
  );
};

export default AccountInfo;
