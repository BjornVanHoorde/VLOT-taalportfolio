const StudentCard = ({ student, onClick }) => {
  return (
    <div className="klas-grid__student" onClick={onClick}>
      <h3>
        {student.voornaam} {student.achternaam}
      </h3>
    </div>
  );
};

export default StudentCard;
