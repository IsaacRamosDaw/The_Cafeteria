import ProfileBar from "../../components/profileBar/ProfileBar";
import SchoolContainers from "../../components/adminComponents/schoolContainer/SchoolContainers";
import AdminContainer from "../../components/adminComponents/adminContainer/AdminContainer";
import WorkerContainer from "../../components/adminComponents/workerContainer/WorkerContainer";
import Separator from "../../components/separator/Separator";
import "./Admin.scss";

function Admin() {
  return (
    <>
      <ProfileBar />
      <Separator />
      <main id="admin-home">
        <SchoolContainers />
        <AdminContainer />
        <WorkerContainer />
      </main>
    </>
  );
}

export default Admin;
