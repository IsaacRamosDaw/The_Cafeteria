import { useEffect, useState } from "react";
import WorkerCard from "../workerCard/WorkerCard";
import { get, remove } from "../../../services/workerService";
import "./WorkerContainer.scss";

function WorkerContainer() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await get();
      setWorkers(data);
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await remove(id);
    setWorkers((prevWorkers) => prevWorkers.filter((worker) => worker.id !== id));
  };
  return (
    <section className="section-container-worker-cards">
      {workers.map((worker) => (
        <WorkerCard
          key={worker.id}
          username={worker.username}
          id={worker.id}
          onDelete={handleDelete}
        />
      ))}
    </section>
  );
}

export default WorkerContainer;

