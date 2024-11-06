import { useEffect, useState } from "react";
import SchoolCard from "../schoolCard/SchoolCard";
import './SchoolContainer.scss'
import { get } from "../../../services/schoolService";

function SchoolContainer() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await get();
      setSchools(data);
    }

    fetchData();
  }, []);

  return (
    <section className="section-container-school-cards">
      {schools.map((school) => (
        <SchoolCard key={school.id} name={school.name} id={school.id} />
      ))}
     </section>
  );
}

export default SchoolContainer;