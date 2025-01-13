import { Link, useNavigate } from "react-router-dom";
import { FaGear, FaChildren, } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import "./Policy.scss";

function Policy() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); 
  };
  return (
    <div id="privacy-container">
      <section id="header">
        <Link onClick={handleBack}>
          <FaArrowLeftLong />
        </Link>
        <h1>Centro de privacidad</h1>
        <p>Elige las opciones de privacidad que consideres adecuadas. Obtén información sobre cómo administrar y controlar tu privacidad en esta aplicación</p>
      </section>
      <section id="card-container">

        <div>
        {/* Make components */}
          <FaGear className="icons" />
          <p>Comprobación de configuración de privacidad</p>
          <p>
            Algunas herramientas como la comprobación te permiten controlar tu
            privacidad fácilmente
          </p>
        </div>

        <div>
          <FaChildren className="icons" />
          <p>Mensajes privados</p>
          <p>
            Nuestros productos de mensajes ofrecen cifrado de extremo
            a extremo para proteger tus conversaciones
          </p>
        </div>

        <div>
          <MdOutlineSecurity className="icons" />
          <p>Privacidad para adolescentes</p>
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

        <div>
          <img src="/images/settings/security.jpg" alt="" />
        </div>


        {/* <button>Administración de privacidad</button> */}

      </section>
    </div>
  );
}

export default Policy;
