import WorkerCard from "../workerCard/WorkerCard";
import './WorkerContainer.scss'

function WorkerContainer() {
  return (
    <section className="section-container-worker-cards">
      <WorkerCard name={'Worker 1'} />
      <WorkerCard name={'Worker 2'} />
      <WorkerCard name={'Worker 3'} />
     </section>
  );
}

export default WorkerContainer;
