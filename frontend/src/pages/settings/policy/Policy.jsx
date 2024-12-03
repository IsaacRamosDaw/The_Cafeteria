import "./Policy.scss";
import { Link } from "react-router-dom";

function Policy() {
  return (
    <div id="privacy-container">
      <section id="header">
        <Link to={'/studentsettings'}>
          ←
        </Link>
        <h1>Centro de privacidad</h1>
        <p>Elige las opciones de privacidad que consideres adecuadas. Obténinformación sobre cómo administrar y controlar tu privacidad en esta aplicación</p>
      </section>
      <section id="card-container">

        <div>
          <h2>Icon</h2>
          <h5>Comprobación de configuración de privacidad</h5>
          <p>
            Algunas herramientas como la comprobación te permiten controlar tu
            privacidad fácilmente
          </p>
        </div>

        <div>
          <h2>Icon</h2>
          <h5>Mensajes privados</h5>
          <p>
            Nuestros productos de mensajes ofrecen cifrado de extremo
            a extremo para proteger tus conversaciones
          </p>
        </div>

        <div>
          <h2>Icon</h2>
          <h5>Privacidad para adolescentes</h5>
          <p>
            Nuestra configuración predeterminaada en Favebook e instagram ayuda a amantener privadas las cuentas de adolescentes
          </p>
        </div>

      </section>
      <section id="description">

        <h2>Configuración para ayudarte a controlar tu privacidad</h2>
        <p>
          Hemos creado opciones de configuración fáciles de usar para que tomes
          las decisiones de privacidad que consideres adecuadas.
        </p>
        <div id="image-container">
          <img src="ruta-de-tu-imagen" alt="Icono de configuración" />
        </div>

        {/* <button>Administración de privacidad</button> */}

      </section>
    </div>
  );
}

export default Policy;
