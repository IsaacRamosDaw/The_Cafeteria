import "./WalletBalance.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { IoMdAddCircleOutline } from "react-icons/io";

import { useState } from "react";

export default function WalletBalance() {

  // Add money, card and details handlers
  const [openMoney, setOpenMoney] = useState(false);
  const handleAddMoney = () => setOpenMoney(openMoney ? false : true);

  
  return (
    <section id="wallet-balance-container">
      <div id="container-balance">
        <p className="balance-title">Tu saldo</p>
        <h1 className="amount-balance"> € </h1>
      </div>
      <div id="container-card-credit">
        <div id="carusel-credit-card">
          

          {/* <Modal open={openAddCard} onClose={handleAddCard}>
            <Box className="modal-container">
              <div className="container-exit-icon">
                <IoClose className="icon-exit" onClick={handleAddCard} />
              </div>
              <form onSubmit={handleFormAddCard} className="content-modal">
                <InputFormSetting
                  title={"Numero de tarjeta"}
                  placeholder={card.number}
                  disable={false}
                  type={"number"}
                />
                <InputFormSetting
                  title={"Fecha de caducidad"}
                  placeholder={card.date}
                  disable={false}
                  type={"date"}
                />
                <InputFormSetting
                  title={"CVC"}
                  placeholder={card.cvc}
                  disable={false}
                  type={"number"}
                />
                <button
                  onClick={handleAddCard}
                  type="submit"
                  className="btn-modal"
                >
                  Añadir
                </button>
              </form>
            </Box>
          </Modal> */}
        </div>
      </div>

      <div id="card-options">
        <div className="option-card add" onClick={handleAddMoney}>
          <IoMdAddCircleOutline className="card-icon-option" />
          <h2>Añadir dinero</h2>
        </div>
        {/* <Modal open={openMoney} onClose={handleAddMoney}>
          <Box className="modal-container">
            <div className="container-exit-icon">
              <IoClose className="icon-exit" onClick={handleAddMoney} />
            </div>
            <form onSubmit={handleFormAddMoney} className="content-modal">
              <InputFormSetting
                title={"Cuenta"}
                placeholder={card.number}
                disable={true}
              />
              <InputFormSetting
                title={"Importe"}
                placeholder={"0,00 €"}
                type={"number"}
              />
              <div className="container-btn-recargar">
                <button type="submit" className="btn-modal">
                  Recargar
                </button>
              </div>
            </form>
          </Box>
        </Modal> */}
      </div>
    </section>
  );
}
