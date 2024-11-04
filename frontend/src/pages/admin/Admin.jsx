import ProfileBar from "../../components/profileBar/ProfileBar";
import SchoolContainer from "../../components/adminComponents/schoolContainer/SchoolContainer";
import AdminContainer from "../../components/adminComponents/adminContainer/AdminContainer";
import WorkerContainer from "../../components/adminComponents/workerContainer/WorkerContainer";
import "./Admin.scss";

function Admin() {
  return (
    <div className="page-admin-container">
      <ProfileBar />

      <main id="admin-home">
        <details>
          <summary>
            <h2>Admins</h2>
          </summary>
          <AdminContainer />
        </details>

        <details>
          <summary>
            <h2>Schools</h2>
          </summary>
          <SchoolContainer />
        </details>

        <details>
          <summary>
            <h2>Workers</h2>
          </summary>
          <WorkerContainer />
        </details>
        
      </main>
    </div>
  );
}

export default Admin;
