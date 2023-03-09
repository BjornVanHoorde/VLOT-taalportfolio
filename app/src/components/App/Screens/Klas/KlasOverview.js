import { useParams } from "react-router-dom";

const KlasOverview = () => {
  const { klas } = useParams();

  return klas;
};

export default KlasOverview;
