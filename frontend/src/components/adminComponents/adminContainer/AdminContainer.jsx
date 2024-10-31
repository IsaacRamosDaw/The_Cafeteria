// import { get } from "../../../services/adminService";
import AdminCard from "../adminCard/AdminCard";
import "./AdminContainer.scss";

function AdminContainer() {
  // let data = get();

  return (
    <section className="section-container-admins-cards">
      {/* {
      data.map((e, index) => {
        return <AdminCard key={index} id={e.id} name={e.name} />;
      })
      } */}
      <AdminCard name={"Administrador 1"} id={"1"} />
      <AdminCard name={"Administrador 2"} id={"2"} />
    </section>
  );
}

export default AdminContainer;
