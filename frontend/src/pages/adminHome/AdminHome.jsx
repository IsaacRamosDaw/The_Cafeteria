import React from "react";
import "./AdminHome.scss";
import AdminContainer from '../../components/adminComponents/adminContainer/AdminContainer'
import SchoolContainer from "../../components/adminComponents/schoolsContainer/SchoolContainers";
import WorkerContainer from '../../components/adminComponents/workerContainer/WorkerContainer'
function AdminHome() {
  return (
    <main id="admin-home">
      <SchoolContainer />
      <AdminContainer />
      <WorkerContainer />
    </main>
  );
}

export default AdminHome;
