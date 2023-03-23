import { Outlet, useOutletContext, useParams } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import Loading from "../../../../Design/Loading/Loading";

// This is a layout that will be used for the student pages
const StudentLayout = () => {
  const { id } = useParams();
  const {
    onOtherLanguageChange,
    onOtherLanguageDismiss,
    onBasisgeletterdheid,
    onBasisgeletterdheidDismiss,
  } = useOutletContext();

  const { data: studentData, isLoading, invalidate } = useFetch(`/user/${id}`);

  return (
    <>
      {isLoading && <Loading />}
      {studentData && (
        <Outlet
          context={{
            student: studentData,
            onUpdate: invalidate,
            onOtherLanguageChange,
            onOtherLanguageDismiss,
            onBasisgeletterdheid,
            onBasisgeletterdheidDismiss,
          }}
        />
      )}
    </>
  );
};

export default StudentLayout;
