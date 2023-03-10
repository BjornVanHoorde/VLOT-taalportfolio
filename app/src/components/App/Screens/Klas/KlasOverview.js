import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import Loading from "../../../Design/Loading/Loading";
import KlasHeader from "../../Shared/Klas/KlasHeader";
import KlasGrid from "../../Shared/Klas/Klasgrid";
import "./styles/klasOverview.css";
import { useState } from "react";

const KlasOverview = () => {
  // Get the class name from the url
  const { klas } = useParams();
  // State for the filtered students
  const [filteredStudents, setFilteredStudents] = useState();
  // Get the students from the database
  const { data: students, isLoading } = useFetch(`/students/klas/name/${klas}`);

  // Filter the students based on the search input
  const filterStudents = (search) => {
    const filteredStudents = students.filter((student) => {
      const name = `${student.voornaam} ${student.achternaam}`;
      return name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredStudents(filteredStudents);
  };

  // Handle the search input
  const handleSearch = (value) => {
    filterStudents(value);
  };

  return (
    <div className="klas-overview">
      {students && <KlasHeader klas={klas} onSearch={handleSearch} />}
      {isLoading && <Loading />}
      {filteredStudents && <KlasGrid students={filteredStudents} />}
      {filteredStudents && filteredStudents.length === 0 && (
        <p>Er zijn geen leerlingen gevonden met deze naam</p>
      )}
    </div>
  );
};

export default KlasOverview;
