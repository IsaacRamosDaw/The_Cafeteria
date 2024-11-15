// import { useEffect, useState } from "react";
// import WorkerCard from "../workerCard/WorkerCard";
// import { get, remove } from "../../../services/workerService";
// import "./WorkerContainer.scss";

// function WorkerContainer() {
//   const [workers, setWorkers] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const data = await get();
//       setWorkers(data);
//     }

//     fetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     await remove(id);
//     setWorkers((prevWorkers) => prevWorkers.filter((worker) => worker.id !== id));
//   };
//   return (
//     <section className="section-container-worker-cards">
//       {workers.map((worker) => (
//         <WorkerCard key={worker.id} name={worker.name} id={worker.id} onDelete={handleDelete} />
//       ))}
//     </section>
//   );
// }

// export default WorkerContainer;

import { useEffect, useState } from "react";
import WorkerCard from "../workerCard/WorkerCard";
import { get, remove } from "../../../services/workerService";
import "./WorkerContainer.scss";

function WorkerContainer() {
  const [workers, setWorkers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await get();
      if (data.error) {
        setError(data.message);
      } else if (Array.isArray(data)) {
        setWorkers(data);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await remove(id);
      setWorkers((prevWorkers) => prevWorkers.filter((worker) => worker.id !== id));
    } catch (error) {
      console.error("Error al eliminar trabajador:", error);
      setError("No se pudo eliminar el trabajador");
    }
  };

  return (
    <section className="section-container-worker-cards">
      {error && <p className="error-message">{error}</p>}
      {workers.map((worker) => (
        <WorkerCard
          key={worker.id}
          name={worker.name}
          id={worker.id}
          onDelete={handleDelete}
        />
      ))}
    </section>
  );
}

export default WorkerContainer;

