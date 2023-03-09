import { useParams } from "react-router-dom";

const KlasOverview = () => {
  const { id } = useParams();

  return id;
};

export default KlasOverview;
