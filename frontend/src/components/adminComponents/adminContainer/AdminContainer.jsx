import AdminCard from "../adminCard/AdminCard";
import './AdminContainer.scss';

function AdminContainer() {
  return (
      <section className="section-container-admins-cards">
        <AdminCard name={'Administrador 1'}/>
        <AdminCard name={'Administrador 2'}/>
        <AdminCard name={'Administrador 3'}/>      
      </section>
  );
}

export default AdminContainer;
