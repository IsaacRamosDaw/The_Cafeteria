import React from "react";
import ProfileBar from "../../components/profileBar/ProfileBar";
import AdminContainer from "../../components/adminComponents/adminContainer/AdminContainer";
import SchoolContainer from "../../components/adminComponents/schoolsContainer/SchoolContainers";
import WorkerContainer from "../../components/adminComponents/workerContainer/WorkerContainer";
import "./Admin.scss";
import Separator from "../../components/separator/Separator";

function Admin() {
  return (
    <>
      <Separator/>
    <main id="container-admin-home">
      <ProfileBar />
      <div className="main-content">
        <SchoolContainer />
        <AdminContainer />
        <WorkerContainer />
      </div>
    </main>
    </>
  );
}

export default Admin;
