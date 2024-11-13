import React, { useState, useEffect, useRef } from "react";
import "./Setting.scss";

function Setting({ title, text, placeholder, type = 'text' }) {
  const [isFormVisible, setFormVisible] = useState(false);
  const formRef = useRef(null);

  const handleClick = () => {
    setFormVisible(!isFormVisible);
  };

    const handleOutsideClick = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setFormVisible(false);
      }
  };
  
    const handleFormSubmit = (e) => {
      e.preventDefault(); // Evita el comportamiento de recarga de página por defecto
      // Aquí puedes añadir la lógica de envío de datos, por ejemplo:
      console.log("Formulario enviado");
      setFormVisible(false); // Oculta el formulario después del envío
    };

  useEffect(() => {
    if (isFormVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isFormVisible]);

  return (
    <div id="setting">
      <p onClick={handleClick}>{title}</p>
      <form
        id="modal"
        ref={formRef}
        className={isFormVisible ? "visible" : ""}
        onSubmit={handleFormSubmit}
      >
        <h3>{text}</h3>
        <input type={type} id="inpu" placeholder={placeholder} />
      </form>
    </div>
  );
}

export default Setting;
