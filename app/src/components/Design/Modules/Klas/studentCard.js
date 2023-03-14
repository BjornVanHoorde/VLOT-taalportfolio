import '../Klas/styles/studentCard.css'

const StudentCard = ({ student, onClick, AllStudents }) => {
  if (student) {
    return (
      <div className="klas-grid__student" onClick={onClick}>
        <h3>
          {student.voornaam} {student.achternaam}
        </h3>
      </div>
    );
  }

  if (AllStudents) {
    return (
      <div className="klas-grid__all-student" onClick={onClick}>
        <h3>Alle leerlingen</h3>
      </div>
    );
  }
};

export default StudentCard;
