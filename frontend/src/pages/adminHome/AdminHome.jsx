import React from "react";
import ProfileBar from "../../components/profileBar/ProfileBar";
import "./AdminHome.scss";
import AdminContainer from "../../components/adminComponents/adminContainer/AdminContainer";
import SchoolContainer from "../../components/adminComponents/schoolsContainer/SchoolContainers";
import WorkerContainer from "../../components/adminComponents/workerContainer/WorkerContainer";
function AdminHome() {
  return (
    <main id="container-admin-home">
      <ProfileBar />
      <div className="main-content">
        <SchoolContainer />
        <AdminContainer />
        <WorkerContainer />
      </div>
    </main>
  );
}

export default AdminHome;
