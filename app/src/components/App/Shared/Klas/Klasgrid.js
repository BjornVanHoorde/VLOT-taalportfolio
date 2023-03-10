import StudentCard from "../../../Design/Modules/Klas/studentCard";
import "./styles/klasGrid.css";

const KlasGrid = ({ students }) => {
  return (
    <div className="klas-grid">
      <div className="klas-grid__students">
        {students.map((student) => (
          <StudentCard student={student} key={student.id} />
        ))}
      </div>
      <div className="klas-grid__allStudents">
        <h3>Alle leerlingen</h3>
      </div>
    </div>
  );
};

export default KlasGrid;
