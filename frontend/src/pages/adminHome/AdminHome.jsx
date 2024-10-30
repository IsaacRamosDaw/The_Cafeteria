import React from "react";
import ProfileBar from "../../components/profileBar/ProfileBar";
import SchoolsContainers from "../../components/adminHomeComponents/schoolsContainers/SchoolContainers";
import "./AdminHome.scss";

function AdminHome() {
  return (
    <>
      <ProfileBar />
      <main id="admin-home">
        <SchoolsContainers />
      </main>
    </>
  );
}

export default AdminHome;
