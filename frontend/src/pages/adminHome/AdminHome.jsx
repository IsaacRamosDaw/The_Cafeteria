import React from "react";
import ProfileBar from "../../components/profileBar/ProfileBar";
import "./AdminHome.scss";
import AdminContainer from '../../components/adminComponents/adminContainer/AdminContainer'
import SchoolContainer from "../../components/adminComponents/schoolsContainer/SchoolContainers";
import WorkerContainer from '../../components/adminComponents/workerContainer/WorkerContainer'
function AdminHome() {
  return (
    <main id="admin-home">
      <ProfileBar/>
      <SchoolContainer />
      <AdminContainer />
      <WorkerContainer />
    </main>
  );
}

export default AdminHome;
