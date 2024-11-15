// import { useEffect, useState } from "react";
// import SchoolCard from "../schoolCard/SchoolCard";
// import { get, remove } from "../../../services/schoolService";
// import './SchoolContainer.scss'


// function SchoolContainer() {
//   const [schools, setSchools] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const data = await get();
//       setSchools(data);
//     }

//     fetchData();
//   }, []);

//     const handleDelete = async (id) => {
//       await remove(id);
//       setSchools((prevSchool) => prevSchool.filter((school) => school.id !== id));
//     }

//   return (
//     <section className="section-container-school-cards">
//       {schools.map((school) => (
//         <SchoolCard
//           key={schools.id}
//           name={school.name}
//           id={school.id}
//           onDelete={handleDelete}
//         />
//       ))}
//     </section>
//   );
// }

// export default SchoolContainer;

import { useEffect, useState } from "react";
import SchoolCard from "../schoolCard/SchoolCard";
import { get, remove } from "../../../services/schoolService";
import './SchoolContainer.scss';

function SchoolContainer() {
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await get();
      if (data.error) {
        setError(data.message);
      } else if (Array.isArray(data)) {
        setSchools(data);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await remove(id);
      setSchools((prevSchools) => prevSchools.filter((school) => school.id !== id));
    } catch (error) {
      console.error("Error al eliminar escuela:", error);
      setError("No se pudo eliminar la escuela");
    }
  };

  return (
    <section className="section-container-school-cards">
      {error && <p className="error-message">{error}</p>}
      {schools.map((school) => (
        <SchoolCard
          key={school.id}  // Corrección aquí
          name={school.name}
          id={school.id}
          onDelete={handleDelete}
        />
      ))}
    </section>
  );
}

export default SchoolContainer;
