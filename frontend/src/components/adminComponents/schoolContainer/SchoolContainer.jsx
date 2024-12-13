import { useEffect, useState } from "react";
import SchoolCard from "./schoolCard/SchoolCard";
import { get, remove} from "../../../services/school.service";
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

    const handleDelete = async (id) => {
      await remove(id);
      setSchools((prevSchool) => prevSchool.filter((school) => school.id !== id));
    }

  return (
    <section className="section-container-school-cards">
      {schools.map((school) => (
        <SchoolCard
          key={school.id}
          name={school.name}
          id={school.id}
          photo={school.filename}
          onDelete={handleDelete}
        />
      ))}
    </section>
  );
}

export default SchoolContainer;
