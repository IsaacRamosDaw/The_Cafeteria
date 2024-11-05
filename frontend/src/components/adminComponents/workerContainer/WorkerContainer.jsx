import { useEffect, useState } from "react";
import WorkerCard from "../workerCard/WorkerCard";
import './WorkerContainer.scss'
import { get } from "../../../services/workerService";

function WorkerContainer() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await get();
      setWorkers(data);
    }

    fetchData();
  }, []);
  return (
    <section className="section-container-worker-cards">
      {workers.map((worker, index) => (
        <WorkerCard key={index} name={worker.name} id={worker.id} />
      ))}
     </section>
  );
}

export default WorkerContainer;
