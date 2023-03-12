import { Outlet, useParams } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import Loading from "../../../../Design/Loading/Loading";

const AllStudentsLayout = () => {
  const { klas } = useParams();

  const {
    data: students,
    isLoading,
    invalidate,
  } = useFetch(`/students/klas/name/${klas}`);

  return (
    <>
      {isLoading && <Loading />}
      {students && (
        <Outlet context={{ klas, students, onUpdate: invalidate }} />
      )}
    </>
  );
};

export default AllStudentsLayout;
