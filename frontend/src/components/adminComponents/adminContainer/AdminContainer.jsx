<<<<<<< HEAD
=======
// AdminContainer.jsx
>>>>>>> 3d6e623c149b7e83ebfbc3ba32bb394e0c77b15b
import { useEffect, useState } from "react";
import AdminCard from "../adminCard/AdminCard";
import "./AdminContainer.scss";
import { get, remove } from "../../../services/adminService.js";

function AdminContainer() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await get();
      setAdmins(data);
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await remove(id);
    setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
  };

  return (
    <section className="section-container-admins-cards">
      {admins.map((admin) => (
        <AdminCard key={admin.id} name={admin.name} id={admin.id} onDelete={handleDelete} />
      ))}
    </section>
  );
}

export default AdminContainer;
