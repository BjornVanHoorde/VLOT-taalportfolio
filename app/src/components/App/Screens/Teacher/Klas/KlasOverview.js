import { useParams } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import Loading from "../../../../Design/Loading/Loading";
import KlasHeader from "../../../Shared/Klas/KlasHeader";
import KlasGrid from "../../../Shared/Klas/Klasgrid";
import "./styles/klasOverview.css";
import { useEffect, useState } from "react";
import Message from "../../../../Design/Message/Message";

const KlasOverview = () => {
  // Get the class name from the url
  const { klas } = useParams();
  // State for the filtered students
  const [filteredStudents, setFilteredStudents] = useState();
  // Get the students from the database
  const {
    data: students,
    invalidate,
    isLoading,
  } = useFetch(`/students/klas/name/${klas}`);

  // Filter the students based on the search input
  const filterStudents = (search) => {
    const filteredStudents = students.filter((student) => {
      const name = `${student.voornaam} ${student.achternaam}`;
      return name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredStudents(filteredStudents);
  };

  useEffect(() => {
    invalidate();
  }, [klas]);

  useEffect(() => {
    if (students) {
      setFilteredStudents(students);
    }
  }, [students]);

  // Handle the search input
  const handleSearch = (value) => {
    filterStudents(value);
  };

  return (
    <div className="klas-overview">
      {students && <KlasHeader klas={klas} onSearch={handleSearch} />}
      {isLoading && <Loading />}
      {filteredStudents && <KlasGrid students={filteredStudents} />}
      {students && students?.length === 0 && (
        <Message message="Deze klas bevat geen leerlingen" />
      )}
      {students?.length > 0 &&
        filteredStudents &&
        filteredStudents?.length === 0 && (
          <Message message="Er zijn geen leerlingen gevonden met deze naam" />
        )}
    </div>
  );
};

export default KlasOverview;
