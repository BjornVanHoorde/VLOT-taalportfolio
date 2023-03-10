import "./styles/KlasHeader.css";

const KlasHeader = ({ klas }) => {
  return (
    <div className="klas-overview__header">
      <div className="klas-overview__header__title">
        <h1>{klas}: leerlingen</h1>
      </div>
      <div className="klas-overview__header__search">
        <input type="text" placeholder="Zoek een leerling" />
      </div>
    </div>
  );
};

export default KlasHeader;
