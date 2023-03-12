import { useNavigate, useParams } from "react-router-dom";
import {
  AllStudentRoutes,
  route,
  StudentRoutes,
} from "../../../../core/routes";
import StudentCard from "../../../Design/Modules/Klas/studentCard";
import "./styles/klasGrid.css";

const KlasGrid = ({ students }) => {
  const { klas } = useParams();
  const navigate = useNavigate();

  return (
    <div className="klas-grid">
      <div className="klas-grid__students">
        {students.map((student) => (
          <StudentCard
            student={student}
            key={student.id}
            onClick={() =>
              navigate(
                route(StudentRoutes.Overview, {
                  student: `${student.voornaam} ${student.achternaam}`,
                })
              )
            }
          />
        ))}
      </div>
      <div className="klas-grid__allStudents">
        <StudentCard
          AllStudents={true}
          onClick={() => navigate(route(AllStudentRoutes.Overview, { klas }))}
        />
      </div>
    </div>
  );
};

export default KlasGrid;
