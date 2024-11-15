// import { useEffect, useState } from "react";
// import AdminCard from "../adminCard/AdminCard";
// import { get, remove } from "../../../services/adminService.js";
// import "./AdminContainer.scss";

// function AdminContainer() {
//   const [admins, setAdmins] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const data = await get();
//       setAdmins(data);
//     }

//     fetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     await remove(id);
//     setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
//   };

//   return (
//     <section className="section-container-admins-cards">
//       {admins.map((admin) => (
//         <AdminCard
//           key={admin.id}
//           name={admin.name}
//           id={admin.id}
//           onDelete={handleDelete}
//         />
//       ))}
//     </section>
//   );
// }

// export default AdminContainer;

// AdminContainer.js
import { useEffect, useState } from "react";
import AdminCard from "../adminCard/AdminCard";
import { get, remove, login } from "../../../services/adminService.js";
import "./AdminContainer.scss";

function AdminContainer() {
  const [admins, setAdmins] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.username, credentials.password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (isAuthenticated) {
        const data = await get();
        setAdmins(data);
      }
    }
    fetchData();
  }, [isAuthenticated]);

  const handleDelete = async (id) => {
    await remove(id);
    setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
  };

  return (
    <section className="section-container-admins-cards">
      {!isAuthenticated ? (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        admins.map((admin) => (
          <AdminCard
            key={admin.id}
            name={admin.name}
            id={admin.id}
            onDelete={handleDelete}
          />
        ))
      )}
    </section>
  );
}

export default AdminContainer;

