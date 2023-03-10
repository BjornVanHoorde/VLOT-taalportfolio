import { useNavigate } from "react-router-dom";
import { route, StudentRoutes } from "../../../../core/routes";
import StudentCard from "../../../Design/Modules/Klas/studentCard";
import "./styles/klasGrid.css";

const KlasGrid = ({ students }) => {
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
        <h3>Alle leerlingen</h3>
      </div>
    </div>
  );
};

export default KlasGrid;
