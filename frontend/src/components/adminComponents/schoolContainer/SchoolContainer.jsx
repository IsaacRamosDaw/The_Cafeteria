import { useEffect, useState } from "react";
import SchoolCard from "../schoolCard/SchoolCard";
import { get, remove } from "../../../services/schoolService";
import './SchoolContainer.scss'


function SchoolContainer() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await get();
      setSchools(data);
    }

    fetchData();
  }, []);

<<<<<<< HEAD
  return (
    <section className="section-container-school-cards">
      {schools.map((school) => (
        <SchoolCard key={school.id} name={school.name} id={school.id} />
=======
    const handleDelete = async (id) => {
      await remove(id);
      setSchools((prevSchool) => prevSchool.filter((school) => school.id !== id));
    }

  return (
    <section className="section-container-school-cards">
      {schools.map((school) => (
        <SchoolCard
          key={schools.id}
          name={school.name}
          id={school.id}
          onDelete={handleDelete}
        />
>>>>>>> 986291ef8a93c526b70af33c5629c97813e8a98d
      ))}
    </section>
  );
}

export default SchoolContainer;