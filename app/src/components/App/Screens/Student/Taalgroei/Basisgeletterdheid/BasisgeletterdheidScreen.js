import useFetch from "../../../../../../core/hooks/useFetch";
import Loading from "../../../../../Design/Loading/Loading";
import { useAuthContext } from "../../../../Auth/AuthProvider";
import BasisgeletterdheidForm from "../../../../Shared/Taalgroei/Basisgeletterdheid/BasisgeletterheidForm";

const BasisgeletterdheidScreen = () => {
  const { auth } = useAuthContext();

  const { data, isLoading } = useFetch(
    `/basisgeletterdheid/leerling/${auth.user.id}}`
  );

  return (
    <>
      {isLoading && <Loading />}
      {data && <BasisgeletterdheidForm data={data} isStudent={true} />}
    </>
  );
};

export default BasisgeletterdheidScreen;
