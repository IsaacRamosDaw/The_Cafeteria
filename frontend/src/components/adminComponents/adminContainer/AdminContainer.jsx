import { useEffect, useState } from "react";
import AdminCard from "../adminCard/AdminCard";
import "./AdminContainer.scss";
import { get } from "../../../services/adminService.js";

function AdminContainer() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await get();
      setAdmins(data);
    }

    fetchData();
  }, []);

  return (
    <section className="section-container-admins-cards">
      {admins.map((admin) => (
        <AdminCard key={admin.id} name={admin.name} id={admin.id} />
      ))}
    </section>
  );
}

export default AdminContainer;
