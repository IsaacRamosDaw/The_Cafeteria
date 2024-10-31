import React from "react";
import ProfileBar from "../../components/profileBar/ProfileBar";
import AdminContainer from "../../components/adminComponents/adminContainer/AdminContainer";
import SchoolContainer from "../../components/adminComponents/schoolsContainer/SchoolContainers";
import WorkerContainer from "../../components/adminComponents/workerContainer/WorkerContainer";
import Separator from "../../components/separator/Separator";
import "./Admin.scss";

function Admin() {
  return (
    <>
      <ProfileBar />
      <Separator />
      <main id="admin-home">
        <SchoolContainer />

        <AdminContainer />

        <WorkerContainer />
      </main>
    </>
  );
}

export default Admin;
