import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import Loading from "../../../Design/Loading/Loading";
import KlasHeader from "../../../Design/Modules/Klas/KlasHeader";
import KlasGrid from "../../Shared/Klas/Klasgrid";
import "./styles/klasOverview.css";

const KlasOverview = () => {
  const { klas } = useParams();

  const {
    data: students,
    invalidate,
    isLoading,
  } = useFetch(`/students/klas/name/${klas}`);

  return (
    <div className="klas-overview">
      <KlasHeader klas={klas} />
      {isLoading && <Loading />}
      {students && <KlasGrid students={students} />}
    </div>
  );
};

export default KlasOverview;
